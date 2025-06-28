import ErrorView from '@/components/ErrorView';
import LoadingSpinner from '@/components/LoadingSpinner';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { useSearchMovies } from '@/hooks/useFetchMovies';
import { useTheme } from '@/hooks/useTheme';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const { data, loading, error } = useSearchMovies(debouncedQuery);
  const { isDarkMode } = useTheme();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle loading animations
  useEffect(() => {
    if (loading && debouncedQuery) {
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (!loading && debouncedQuery) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [loading, debouncedQuery]);

  const renderMovieItem = ({ item, index }: { item: Movie; index: number }) => (
    <MovieCard movie={item} index={index} />
  );

  const renderEmptyState = () => (
    <Animated.View 
      className="flex-1 justify-center items-center px-4"
      style={{ opacity: fadeAnim }}
    >
      <Image source={icons.search} className="w-16 h-16 mb-4" tintColor="#A8B5DB" />
      <Text className="text-text-secondary text-lg text-center mb-2">
        Search for your favorite movies
      </Text>
      <Text className="text-text-tertiary text-sm text-center">
        Type a movie title to get started
      </Text>
    </Animated.View>
  );

  const renderNoResults = () => (
    <Animated.View 
      className="flex-1 justify-center items-center px-4"
      style={{ opacity: fadeAnim }}
    >
      <Image source={icons.search} className="w-16 h-16 mb-4" tintColor="#A8B5DB" />
      <Text className="text-text-secondary text-lg text-center mb-2">
        No movies found
      </Text>
      <Text className="text-text-tertiary text-sm text-center">
        Try searching with different keywords
      </Text>
    </Animated.View>
  );

  const renderSearchResults = () => (
    <Animated.View 
      className="flex-1 px-4 pb-20"
      style={{ opacity: fadeAnim }}
    >
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-text-primary text-lg font-semibold">
          {data?.results.length} results for "{debouncedQuery}"
        </Text>
        {loading && (
          <View className="flex-row items-center">
            <View className="w-1.5 h-1.5 bg-accent-primary rounded-full mr-1 animate-pulse"></View>
            <View className="w-1.5 h-1.5 bg-accent-primary rounded-full mr-1 animate-pulse"></View>
            <View className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-pulse"></View>
          </View>
        )}
      </View>
      
      <FlatList
        data={data?.results || []}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderNoResults}
      />
    </Animated.View>
  );

  return (
    <SafeAreaView className={`flex-1 bg-primary${isDarkMode ? ' dark' : ''}`}>
      <View className="px-4 pt-4 pb-6">
        <Text className="text-text-primary text-2xl font-bold mb-4">Search</Text>
        <SearchBar onSearch={setSearchQuery} />
      </View>

      {error ? (
        <ErrorView message={error} />
      ) : debouncedQuery && data?.results ? (
        renderSearchResults()
      ) : debouncedQuery && loading ? (
        <LoadingSpinner text="Searching..." />
      ) : (
        renderEmptyState()
      )}
    </SafeAreaView>
  );
}