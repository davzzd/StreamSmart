# 🎬 StreamSmart - A Semantic Search Based Movie Streaming Platform

A beautiful and feature-rich movie streaming application built with React Native, Expo, and NativeWind.
changes to be added: 1. semantic search powered by vector embeddings
                     2. TV show integration

To test Version1 of our App(Android only for now): [Android APK download Link](https://expo.dev/accounts/davzzd2/projects/movie_app/builds/dccda9d1-ed49-47f3-823c-670cd6a552cd)

## ✨ Features

- **🎭 Browse Movies**: Discover trending, popular, top-rated, and upcoming movies
- **🔍 Search**: Search for your favorite movies with real-time results
- **💾 Save Movies**: Save movies to watch later with local storage
- **🎥 Stream Movies**: Watch movies directly in the app using Vidfast.pro
- **📱 Cross-Platform**: Works on iOS(not yet implemented), Android, and Web
- **🎨 Beautiful UI**: Modern design with NativeWind/Tailwind styling
- **⚡ Fast & Responsive**: Optimized performance with React Native

## 🛠 Tech Stack

- **React Native** with Expo SDK
- **NativeWind** for Tailwind-style styling
- **Expo Router** for navigation
- **TMDB API** for movie data
- **Vidfast.pro** for streaming
- **AsyncStorage** for local data persistence
- **TypeScript** for type safety

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- TMDB API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📱 App Structure

```
app/
├── (tabs)/
│   ├── _layout.tsx          # Tab navigation layout
│   ├── index.tsx           # Home screen with movie categories
│   ├── search.tsx          # Search functionality
│   ├── saved.tsx           # Saved movies
│   └── profile.tsx         # User profile and settings
├── movies/
│   └── [id].tsx           # Movie details and streaming
└── _layout.tsx            # Root layout

components/
├── MovieCard.tsx          # Reusable movie card component
├── SearchBar.tsx          # Search input component
├── LoadingSpinner.tsx     # Loading indicator
└── ErrorView.tsx          # Error display component

hooks/
├── useFetchMovies.ts      # TMDB API hooks
└── useSavedMovies.ts      # Local storage hooks
```

## 🎯 Key Features Explained

### Home Screen
- **Categories**: Switch between Trending, Popular, Top Rated, and Upcoming movies
- **Movie Grid**: Beautiful 2-column grid layout with movie posters
- **Save Functionality**: Tap the save icon to add movies to your list

### Search Screen
- **Semantic Search**: Toggle semantic search to query for movies based on feelings or mood. eg. "I am feeling sad", will suggest happy movies.(in development).
- **TV show/ Movies**: Toggle between search for movies or tv shows.(to be implemented in version 2).
- **Real-time Search**: Search movies as you type with debouncing
- **Results Display**: Grid layout showing search results
- **Empty States**: Helpful messages when no search is performed or no results found

### Movie Details
- **Rich Information**: Full movie details including cast, genres, and ratings
- **Streaming**: Watch movies directly in the app using Vidfast.pro
- **Similar Movies**: Discover related content
- **Save/Unsave**: Toggle movie save status

### Saved Movies
- **Local Storage**: Movies saved locally using AsyncStorage
- **Remove Movies**: Swipe or tap to remove saved movies
- **Persistent Data**: Saved movies persist between app sessions

### Profile Screen
- **User Stats**: View saved movies count and other statistics
- **Settings**: Toggle notifications and dark mode
- **App Info**: Version information and about section

## 🎨 Styling

The app uses **NativeWind** (Tailwind CSS for React Native) for styling:

- **Consistent Design**: All components follow the same design system
- **Responsive**: Works across different screen sizes
- **Dark Theme**: Beautiful dark theme optimized for movie viewing
- **Custom Colors**: Tailored color palette for the movie app experience

## 🔧 Configuration

### Tailwind Config
The app includes a custom Tailwind configuration with:
- NativeWind preset
- Custom color palette
- Responsive breakpoints

### Babel Config
Configured for:
- NativeWind support
- Environment variables
- Expo compatibility

## 📦 Dependencies

### Core Dependencies
- `expo`: Latest Expo SDK
- `react-native`: React Native framework
- `nativewind`: Tailwind CSS for React Native
- `expo-router`: File-based routing
- `react-native-webview`: For movie streaming

### API & Data
- `@react-native-async-storage/async-storage`: Local storage
- `react-native-dotenv`: Environment variables

### UI & Navigation
- `react-native-safe-area-context`: Safe area handling
- `@expo/vector-icons`: Icon library

## 🚀 Deployment

### Expo Build
```bash
# Build for production
expo build:android
expo build:ios
```

### Web Deployment
```bash
# Build for web
expo build:web
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🆘 Support

If you encounter any issues:

1. Create and submit issue in the repository
2. Ensure all dependencies are installed
3. Check the console for error messages
4. Send email to davidmathewmojish@gmail.com or contact https://github.com/davzzd

---

**Happy coding! 🎬✨**
