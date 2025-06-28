import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        // Ensure stable navigation to prevent remounting
        animation: 'none'
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="movies/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
