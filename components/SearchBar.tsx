import { icons } from '@/constants/icons';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <View className="flex-row items-center bg-secondary rounded-full px-4 py-3 mb-4">
      <Image source={icons.search} className="w-5 h-5 mr-3" tintColor="#A8B5DB" />
      <TextInput
        value={query}
        onChangeText={handleSearch}
        placeholder="Search movies..."
        placeholderTextColor="#A8B5DB"
        className="flex-1 text-text-primary text-base"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={clearSearch} className="ml-2">
          <Text className="text-text-secondary text-lg">×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
} 