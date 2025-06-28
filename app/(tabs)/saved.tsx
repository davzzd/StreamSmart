import LoadingSpinner from '@/components/LoadingSpinner';
import MovieCard from '@/components/MovieCard';
import { icons } from '@/constants/icons';
import { useSavedMovies } from '@/hooks/useSavedMovies';
import { useTheme } from '@/hooks/useTheme';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SavedScreen() {
  const { savedMovies, loading, refreshSavedMovies } = useSavedMovies();
  const [refreshing, setRefreshing] = useState(false);
  const { isDarkMode } = useTheme();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshSavedMovies();
    } finally {
      setRefreshing(false);
    }
  }, [refreshSavedMovies]);

  const renderMovieItem = ({ item, index }: { item: Movie; index: number }) => (
    <MovieCard movie={item} index={index} />
  );

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center px-4">
      <Image source={icons.save} className="w-16 h-16 mb-4" tintColor="#A8B5DB" />
      <Text className="text-text-secondary text-lg text-center mb-2">
        No saved movies yet
      </Text>
      <Text className="text-text-tertiary text-sm text-center">
        Save movies you want to watch later
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView className={`flex-1 bg-primary${isDarkMode ? ' dark' : ''}`}>
      <View className="px-4 pt-4 pb-6">
        <Text className="text-text-primary text-2xl font-bold mb-4">Saved Movies</Text>
        <Text className="text-text-secondary text-sm">
          {savedMovies.length} movie{savedMovies.length !== 1 ? 's' : ''} saved
        </Text>
      </View>

      <View className="flex-1 px-4 pb-20">
        <FlatList
          data={savedMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#3B82F6"
              colors={["#3B82F6"]}
              progressBackgroundColor="#1F2937"
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}