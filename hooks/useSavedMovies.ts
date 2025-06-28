import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const SAVED_MOVIES_KEY = 'saved_movies';

export const useSavedMovies = () => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedMovies();
  }, []);

  const loadSavedMovies = async () => {
    try {
      const saved = await AsyncStorage.getItem(SAVED_MOVIES_KEY);
      if (saved) {
        setSavedMovies(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveMovie = async (movie: Movie) => {
    try {
      const isAlreadySaved = savedMovies.some(m => m.id === movie.id);
      if (isAlreadySaved) {
        return false; // Already saved
      }

      const newSavedMovies = [...savedMovies, movie];
      await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(newSavedMovies));
      setSavedMovies(newSavedMovies);
      return true;
    } catch (error) {
      console.error('Error saving movie:', error);
      return false;
    }
  };

  const removeMovie = async (movieId: number) => {
    try {
      const newSavedMovies = savedMovies.filter(m => m.id !== movieId);
      await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(newSavedMovies));
      setSavedMovies(newSavedMovies);
      return true;
    } catch (error) {
      console.error('Error removing movie:', error);
      return false;
    }
  };

  const isMovieSaved = (movieId: number) => {
    return savedMovies.some(m => m.id === movieId);
  };

  return {
    savedMovies,
    loading,
    saveMovie,
    removeMovie,
    isMovieSaved,
    refreshSavedMovies: loadSavedMovies,
  };
}; 