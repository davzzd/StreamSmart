import React, { useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

interface MoviePlayerProps {
  movieId: number;
  imdbId?: string;
  movieTitle?: string;
  onBack?: () => void;
}

export default function MoviePlayer({ movieId, imdbId, movieTitle, onBack }: MoviePlayerProps) {
  const webViewRef = useRef<WebView>(null);

  // Create the HTML content with proper responsive design and event handling
  const createPlayerHTML = () => {
    const movieIdentifier = imdbId || movieId.toString();
    const vidfastUrl = `https://vidfast.pro/movie/${movieIdentifier}?autoPlay=true&theme=16A085`;
    
    console.log('Creating player with URL:', vidfastUrl);
    console.log('Movie ID:', movieId, 'IMDb ID:', imdbId);
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 0;
              background: #000;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .player-container {
              position: relative;
              width: 100vw;
              height: 100vh;
              display: flex;
              flex-direction: column;
            }
            .header {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              z-index: 1000;
              background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
              padding: 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .back-button {
              background: rgba(0,0,0,0.7);
              color: white;
              border: none;
              padding: 10px 15px;
              border-radius: 20px;
              cursor: pointer;
              font-size: 14px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .movie-title {
              color: white;
              font-size: 16px;
              font-weight: 600;
              max-width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .iframe-container {
              position: relative;
              width: 100%;
              height: 100%;
              padding-top: 56.25%; /* 16:9 Aspect Ratio */
            }
            .player-iframe {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border: none;
            }
            .error-message {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: white;
              text-align: center;
              background: rgba(0,0,0,0.8);
              padding: 20px;
              border-radius: 10px;
            }
          </style>
        </head>
        <body>
          <div class="player-container">
            <div class="header">
              <button class="back-button" onclick="window.ReactNativeWebView.postMessage(JSON.stringify({type: 'BACK'}))">
                ← Back
              </button>
              <div class="movie-title">${movieTitle || 'Movie'}</div>
              <div style="width: 80px;"></div>
            </div>
            <div class="iframe-container">
              <iframe
                src="${vidfastUrl}"
                class="player-iframe"
                allowfullscreen
                allow="encrypted-media; autoplay; fullscreen"
                frameborder="0"
                onload="console.log('Iframe loaded successfully')"
                onerror="console.error('Iframe failed to load')"
              ></iframe>
            </div>
          </div>
          
          <script>
            console.log('Player script loaded');
            console.log('Vidfast URL:', '${vidfastUrl}');
            
            // Event listener for Vidfast.pro player events
            window.addEventListener('message', ({ origin, data }) => {
              console.log('Message received from:', origin, data);
              
              if (origin !== 'https://vidfast.pro' || !data) {
                return;
              }

              if (data.type === 'PLAYER_EVENT') {
                const { event, currentTime, duration } = data.data;
                console.log('Player event:', event, 'at', currentTime, 'of', duration);
                
                // Send event to React Native
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'PLAYER_EVENT',
                  data: {
                    event,
                    currentTime,
                    duration,
                    tmdbId: ${movieId},
                    mediaType: 'movie'
                  }
                }));
              }
              
              if (data.type === 'MEDIA_DATA') {
                // Store progress data
                localStorage.setItem('vidFastProgress', JSON.stringify(data.data));
                
                // Send to React Native
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'MEDIA_DATA',
                  data: data.data
                }));
              }
            });
            
            // Handle back button
            document.addEventListener('keydown', (e) => {
              if (e.key === 'Escape') {
                window.ReactNativeWebView.postMessage(JSON.stringify({type: 'BACK'}));
              }
            });
            
            // Send ready message to React Native
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'PLAYER_READY',
              data: { movieId: ${movieId}, imdbId: '${imdbId || ''}' }
            }));
          </script>
        </body>
      </html>
    `;
  };

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('WebView message received:', data);
      
      if (data.type === 'BACK') {
        onBack?.();
      } else if (data.type === 'PLAYER_EVENT') {
        console.log('Player event received:', data.data);
        // Handle player events (play, pause, seeked, etc.)
      } else if (data.type === 'MEDIA_DATA') {
        console.log('Media data received:', data.data);
        // Handle media progress data
      } else if (data.type === 'PLAYER_READY') {
        console.log('Player ready:', data.data);
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <WebView
        ref={webViewRef}
        source={{ html: createPlayerHTML() }}
        className="flex-1"
        allowsFullscreenVideo
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled
        domStorageEnabled
        onMessage={handleMessage}
        startInLoadingState
        scalesPageToFit
        bounces={false}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView HTTP error:', nativeEvent);
        }}
      />
    </View>
  );
} 