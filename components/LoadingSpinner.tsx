import { icons } from '@/constants/icons';
import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';

interface LoadingSpinnerProps {
  text?: string;
}

export default function LoadingSpinner({ text = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <View className="flex-1 bg-primary justify-center items-center">
      <View className="items-center">
        <Image source={icons.logo} className="w-16 h-16 mb-4" />
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-text-secondary mt-4 text-base">{text}</Text>
      </View>
    </View>
  );
} 