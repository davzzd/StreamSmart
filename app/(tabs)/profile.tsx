import { useSavedMovies } from '@/hooks/useSavedMovies';
import { useTheme } from '@/hooks/useTheme';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { savedMovies, removeMovie } = useSavedMovies();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleClearSavedMovies = () => {
    Alert.alert(
      '🗑️ Clear Saved Movies',
      'Are you sure you want to remove all saved movies? This action cannot be undone.',
      [
        { 
          text: 'Cancel', 
          style: 'cancel',
          onPress: () => console.log('Cancel Pressed')
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            for (const movie of savedMovies) {
              await removeMovie(movie.id);
            }
            // Show success notification
            Alert.alert(
              '✅ Success',
              'All saved movies have been removed.',
              [{ text: 'OK' }]
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleAboutApp = () => {
    Alert.alert(
      'ℹ️ About MovieApp',
      'MovieApp v1.0.0\n\nA beautiful movie streaming app built with React Native and Expo.\n\nFeatures:\n• Browse trending, popular, and top-rated movies\n• Search for your favorite movies\n• Save movies to watch later\n• Stream movies directly in the app\n• Beautiful and intuitive UI',
      [{ text: 'OK' }]
    );
  };

  const handleRateApp = () => {
    Alert.alert(
      '⭐ Rate MovieApp',
      'Enjoying the app? Please take a moment to rate it and share your feedback!',
      [
        { text: 'Maybe Later', style: 'cancel' },
        { text: 'Rate Now', onPress: () => console.log('Rate app pressed') }
      ]
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      '🔒 Privacy Policy',
      'Your privacy is important to us. We collect minimal data to provide you with the best movie streaming experience.',
      [{ text: 'OK' }]
    );
  };

  const renderMenuItem = (
    icon: string,
    title: string,
    subtitle?: string,
    onPress?: () => void,
    showSwitch?: boolean,
    switchValue?: boolean,
    onSwitchChange?: (value: boolean) => void
  ) => (
    <TouchableOpacity
      onPress={onPress}
      className="mb-3"
      disabled={showSwitch}
    >
      <BlurView intensity={20} tint="dark" className="rounded-2xl overflow-hidden">
        <View className="flex-row items-center justify-between p-4 border border-border-primary">
          <View className="flex-row items-center flex-1">
            <View className="w-10 h-10 bg-glass-primary rounded-full items-center justify-center mr-4">
              <Text className="text-text-primary text-lg">{icon}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-text-primary font-semibold text-base">{title}</Text>
              {subtitle && (
                <Text className="text-text-secondary text-sm mt-1">{subtitle}</Text>
              )}
            </View>
          </View>
          
          {showSwitch ? (
            <Switch
              value={switchValue}
              onValueChange={onSwitchChange}
              trackColor={{ false: 'rgba(255,255,255,0.2)', true: 'rgba(59,130,246,0.5)' }}
              thumbColor={switchValue ? '#3B82F6' : '#f4f3f4'}
            />
          ) : (
            <View className="w-6 h-6 bg-glass-primary rounded-full items-center justify-center">
              <Text className="text-text-primary text-xs">›</Text>
            </View>
          )}
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className={`flex-1 bg-primary${isDarkMode ? ' dark' : ''}`}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-6">
          <Text className="text-text-primary text-3xl font-bold mb-2">Profile</Text>
          <Text className="text-text-secondary text-base">Manage your preferences</Text>
        </View>

        {/* User Info Card */}
        <View className="px-4 mb-6">
          <BlurView intensity={30} tint="dark" className="rounded-3xl overflow-hidden border border-border-primary">
            <View className="p-6">
              <View className="flex-row items-center mb-6">
                <View className="w-20 h-20 bg-gradient-to-br from-accent-primary to-purple-600 rounded-full items-center justify-center mr-4">
                  <Text className="text-text-primary text-3xl font-bold">👤</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary text-xl font-bold mb-1">Movie Lover</Text>
                  <Text className="text-text-secondary text-sm">Premium Member</Text>
                  <View className="flex-row items-center mt-2">
                    <View className="w-2 h-2 bg-accent-success rounded-full mr-2"></View>
                    <Text className="text-accent-success-light text-xs">Active</Text>
                  </View>
                </View>
              </View>
              
              <View className="flex-row justify-between">
                <View className="items-center flex-1">
                  <Text className="text-text-primary text-2xl font-bold">{savedMovies.length}</Text>
                  <Text className="text-text-secondary text-sm">Saved Movies</Text>
                </View>
                <View className="w-px bg-glass-primary"></View>
                <View className="items-center flex-1">
                  <Text className="text-text-primary text-2xl font-bold">∞</Text>
                  <Text className="text-text-secondary text-sm">Movies Watched</Text>
                </View>
              </View>
            </View>
          </BlurView>
        </View>

        {/* Settings Section */}
        <View className="px-4 mb-6">
          <Text className="text-text-primary text-lg font-semibold mb-4 px-1">Settings</Text>
          
          {renderMenuItem(
            '💾',
            'Saved Movies',
            `${savedMovies.length} movies saved`,
            handleClearSavedMovies
          )}
          
          {renderMenuItem(
            '🔔',
            'Notifications',
            'Get notified about new releases',
            undefined,
            true,
            notificationsEnabled,
            setNotificationsEnabled
          )}
          
          {renderMenuItem(
            '🌙',
            'Dark Mode',
            'Use dark theme',
            undefined,
            true,
            isDarkMode,
            toggleDarkMode
          )}
        </View>

        {/* About Section */}
        <View className="px-4 mb-6">
          <Text className="text-text-primary text-lg font-semibold mb-4 px-1">About</Text>
          
          {renderMenuItem(
            'ℹ️',
            'About App',
            'Version 1.0.0',
            handleAboutApp
          )}
          
          {renderMenuItem(
            '⭐',
            'Rate App',
            'Share your feedback',
            handleRateApp
          )}
          
          {renderMenuItem(
            '🔒',
            'Privacy Policy',
            'Read our privacy policy',
            handlePrivacyPolicy
          )}
        </View>

        {/* App Info */}
        <View className="px-4 pb-20">
          <BlurView intensity={15} tint="dark" className="rounded-2xl overflow-hidden border border-border-secondary">
            <View className="p-4 items-center">
              <Text className="text-text-tertiary text-center text-sm mb-1">
                MovieApp v1.0.0
              </Text>
              <Text className="text-text-tertiary text-center text-xs">
                Powered by TMDB & Vidfast.pro
              </Text>
            </View>
          </BlurView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}