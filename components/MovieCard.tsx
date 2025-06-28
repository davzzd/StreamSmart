import { icons } from '@/constants/icons';
import { useSavedMovies } from '@/hooks/useSavedMovies';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.4;

export default function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const { saveMovie, removeMovie, isMovieSaved } = useSavedMovies();
  const isSaved = isMovieSaved(movie.id);

  const handlePress = () => {
    router.push(`/movies/${movie.id}`);
  };

  const handleSaveToggle = async (e: any) => {
    e.stopPropagation();
    if (isSaved) {
      await removeMovie(movie.id);
    } else {
      await saveMovie(movie);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="mb-4"
      style={{ width: cardWidth, marginRight: index % 2 === 0 ? 12 : 0 }}
    >
      <View className="relative">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          className="w-full h-56 rounded-2xl"
          resizeMode="cover"
        />
        
        {/* Rating Badge */}
        <View className="absolute top-2 right-2 bg-overlay rounded-full px-2 py-1 flex-row items-center">
          <Image source={icons.star} className="w-3 h-3 mr-1" />
          <Text className="text-text-primary text-xs font-semibold">
            {movie.vote_average.toFixed(1)}
          </Text>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSaveToggle}
          className={`absolute top-2 left-2 rounded-full p-2 ${
            isSaved ? 'bg-accent-secondary' : 'bg-overlay'
          }`}
        >
          <Image 
            source={icons.save} 
            className="w-4 h-4" 
            tintColor={isSaved ? 'white' : '#A8B5DB'} 
          />
        </TouchableOpacity>
      </View>
      
      <View className="mt-2">
        <Text className="text-text-primary font-semibold text-sm" numberOfLines={2}>
          {movie.title}
        </Text>
        <Text className="text-text-secondary text-xs mt-1">
          {new Date(movie.release_date).getFullYear()}
        </Text>
      </View>
    </TouchableOpacity>
  );
} 