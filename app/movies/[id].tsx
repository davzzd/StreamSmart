import ErrorView from '@/components/ErrorView';
import LoadingSpinner from '@/components/LoadingSpinner';
import MoviePlayer from '@/components/MoviePlayer';
import { icons } from '@/constants/icons';
import { useFetchMovieDetails } from '@/hooks/useFetchMovies';
import { useTheme } from '@/hooks/useTheme';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const movieId = parseInt(id as string);
  const { data: movie, loading, error } = useFetchMovieDetails(movieId);
  const [showPlayer, setShowPlayer] = useState(false);
  const { isDarkMode } = useTheme();

  const handlePlayMovie = () => {
    setShowPlayer(true);
  };

  const handleBack = () => {
    if (showPlayer) {
      setShowPlayer(false);
    } else {
      router.back();
    }
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatGenres = (genres: any[]) => {
    return genres?.map(genre => genre.name).join(', ') || '';
  };

  const formatCast = (cast: any[]) => {
    return cast?.slice(0, 8).map(actor => actor.name).join(', ') || '';
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorView message={error} />;
  }

  if (showPlayer) {
    return (
      <MoviePlayer
        movieId={movieId}
        imdbId={movie?.external_ids?.imdb_id}
        movieTitle={movie?.title}
        onBack={handleBack}
      />
    );
  }

  return (
    <SafeAreaView className={`flex-1 bg-primary${isDarkMode ? ' dark' : ''}`}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Backdrop Image */}
        <View className="relative">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`,
            }}
            className="w-full h-64"
            resizeMode="cover"
          />
          
          {/* Overlay */}
          <View className="absolute inset-0 bg-overlay-light" />
          
          {/* Back Button */}
          <TouchableOpacity
            onPress={handleBack}
            className="absolute top-4 left-4 bg-overlay-light rounded-full p-2"
          >
            <Image source={icons.arrow} className="w-6 h-6" tintColor="white" />
          </TouchableOpacity>
          
          {/* Play Button */}
          <TouchableOpacity
            onPress={handlePlayMovie}
            className="absolute bottom-4 right-4 bg-accent-secondary rounded-full p-4 flex-row items-center"
          >
            <Image source={icons.play} className="w-6 h-6 mr-2" tintColor="white" />
            <Text className="text-text-primary font-semibold">Watch</Text>
          </TouchableOpacity>
        </View>

        {/* Movie Info */}
        <View className="px-4 py-6">
          <Text className="text-text-primary text-2xl font-bold mb-2">
            {movie?.title}
          </Text>
          
          <View className="flex-row items-center mb-4">
            <View className="flex-row items-center mr-4">
              <Image source={icons.star} className="w-4 h-4 mr-1" tintColor="#FFD700" />
              <Text className="text-text-primary font-semibold">
                {movie?.vote_average?.toFixed(1)}
              </Text>
            </View>
            
            <Text className="text-text-secondary mr-4">
              {new Date(movie?.release_date).getFullYear()}
            </Text>
            
            {movie?.runtime && (
              <Text className="text-text-secondary">
                {formatRuntime(movie.runtime)}
              </Text>
            )}
          </View>

          {/* Genres */}
          {movie?.genres && (
            <View className="mb-4">
              <Text className="text-text-secondary text-sm">
                {formatGenres(movie.genres)}
              </Text>
            </View>
          )}

          {/* Overview */}
          <View className="mb-6">
            <Text className="text-text-primary text-lg font-semibold mb-2">Overview</Text>
            <Text className="text-text-secondary leading-6">
              {movie?.overview}
            </Text>
          </View>

          {/* Additional Info */}
          {movie?.tagline && (
            <View className="mb-4">
              <Text className="text-text-secondary italic">"{movie.tagline}"</Text>
            </View>
          )}

          {/* Cast */}
          {movie?.credits?.cast && movie.credits.cast.length > 0 && (
            <View className="mb-6">
              <Text className="text-text-primary text-lg font-semibold mb-2">Cast</Text>
              <Text className="text-text-secondary leading-6 font-light">
                {formatCast(movie.credits.cast)}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}