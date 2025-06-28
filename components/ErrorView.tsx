import { icons } from '@/constants/icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <View className="flex-1 bg-primary justify-center items-center px-4">
      <Image source={icons.logo} className="w-16 h-16 mb-4" />
      <Text className="text-accent-error text-lg font-semibold text-center mb-4">
        Oops! Something went wrong
      </Text>
      <Text className="text-text-secondary text-base text-center mb-6">
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="bg-accent-secondary px-6 py-3 rounded-full"
        >
          <Text className="text-text-primary font-semibold">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
} 