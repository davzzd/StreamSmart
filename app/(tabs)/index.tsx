import ErrorView from '@/components/ErrorView';
import LoadingSpinner from '@/components/LoadingSpinner';
import MovieCard from '@/components/MovieCard';
import { icons } from '@/constants/icons';
import { useFetchMovies } from '@/hooks/useFetchMovies';
import { useTheme } from '@/hooks/useTheme';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  { id: 'trending', title: 'Trending', endpoint: '/trending/movie/week' },
  { id: 'popular', title: 'Popular', endpoint: '/movie/popular' },
  { id: 'top_rated', title: 'Top Rated', endpoint: '/movie/top_rated' },
  { id: 'upcoming', title: 'Upcoming', endpoint: '/movie/upcoming' },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const fadeAnim = useState(new Animated.Value(1))[0];
  const dot1Anim = useRef(new Animated.Value(1)).current;
  const dot2Anim = useRef(new Animated.Value(1)).current;
  const dot3Anim = useRef(new Animated.Value(1)).current;
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  const { isDarkMode } = useTheme();
  
  const { data, loading, error } = useFetchMovies(selectedCategoryData?.endpoint || '/trending/movie/week');

  // Handle initial load
  useEffect(() => {
    if (data && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [data, isInitialLoad]);

  // Handle category transitions
  useEffect(() => {
    if (!isInitialLoad) {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        // Fade back in when data is ready
        if (!loading) {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      });
    }
  }, [selectedCategory, loading, isInitialLoad]);

  // Animate loading dots
  useEffect(() => {
    if (loading && !isInitialLoad) {
      const animateDots = () => {
        Animated.sequence([
          Animated.parallel([
            Animated.timing(dot1Anim, { toValue: 0.3, duration: 400, useNativeDriver: true }),
            Animated.timing(dot2Anim, { toValue: 0.3, duration: 400, delay: 100, useNativeDriver: true }),
            Animated.timing(dot3Anim, { toValue: 0.3, duration: 400, delay: 200, useNativeDriver: true }),
          ]),
          Animated.parallel([
            Animated.timing(dot1Anim, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(dot2Anim, { toValue: 1, duration: 400, delay: 100, useNativeDriver: true }),
            Animated.timing(dot3Anim, { toValue: 1, duration: 400, delay: 200, useNativeDriver: true }),
          ]),
        ]).start(() => {
          if (loading) animateDots();
        });
      };
      animateDots();
    } else {
      // Reset dots when not loading
      dot1Anim.setValue(1);
      dot2Anim.setValue(1);
      dot3Anim.setValue(1);
    }
  }, [loading, isInitialLoad]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const renderMovieItem = ({ item, index }: { item: Movie; index: number }) => (
    <MovieCard movie={item} index={index} />
  );

  const renderCategoryButton = (category: typeof categories[0]) => (
    <TouchableOpacity
      key={category.id}
      onPress={() => handleCategoryChange(category.id)}
      className={`px-4 py-2 rounded-full mr-3 ${
        selectedCategory === category.id ? 'bg-accent-secondary' : 'bg-secondary'
      }`}
      disabled={loading}
    >
      <Text
        className={`font-semibold ${
          selectedCategory === category.id ? 'text-text-primary' : 'text-text-secondary'
        }`}
      >
        {category.title}
      </Text>
    </TouchableOpacity>
  );

  // Show full loading spinner only on initial load
  if (isInitialLoad && loading) {
    return <LoadingSpinner />;
  }

  if (error && isInitialLoad) {
    return <ErrorView message={error} />;
  }

  return (
    <SafeAreaView className={`flex-1 bg-primary${isDarkMode ? ' dark' : ''}`}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-text-primary text-2xl font-bold">DavMovies</Text>
              <Text className="text-text-secondary text-sm">Just watch movies or something i cant be bothered</Text>
            </View>
            <Image source={icons.logo} className="w-10 h-10" />
          </View>

          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            {categories.map(renderCategoryButton)}
          </ScrollView>
        </View>

        {/* Movies Grid */}
        <Animated.View 
          className="px-4 pb-20"
          style={{ opacity: fadeAnim }}
        >
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-text-primary text-xl font-bold">
              {selectedCategoryData?.title} Movies
            </Text>
            {loading && !isInitialLoad && (
              <View className="flex-row items-center">
                <Animated.View 
                  className="w-2 h-2 bg-accent-primary rounded-full mr-1"
                  style={{ opacity: dot1Anim }}
                />
                <Animated.View 
                  className="w-2 h-2 bg-accent-primary rounded-full mr-1"
                  style={{ opacity: dot2Anim }}
                />
                <Animated.View 
                  className="w-2 h-2 bg-accent-primary rounded-full"
                  style={{ opacity: dot3Anim }}
                />
              </View>
            )}
          </View>
          
          {data?.results ? (
            <FlatList
              data={data.results}
              renderItem={renderMovieItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : !isInitialLoad && !loading && (
            <View className="flex-1 justify-center items-center py-20">
              <Text className="text-text-secondary text-lg text-center">
                No movies found
              </Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
