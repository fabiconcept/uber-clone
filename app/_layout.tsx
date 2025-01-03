import "../global.css";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    SpaceMonoBold: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    SpaceMonoSemiBold: require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    SpaceMonoMedium: require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    SpaceMonoLight: require('../assets/fonts/PlusJakartaSans-Light.ttf'),
    SpaceMonoExtraBold: require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    SpaceMonoExtraLight: require('../assets/fonts/PlusJakartaSans-ExtraLight.ttf'),
    SpaceMonoBoldItalic: require('../assets/fonts/PlusJakartaSans-BoldItalic.ttf'),
    SpaceMonoItalic: require('../assets/fonts/PlusJakartaSans-Italic.ttf'),
    SpaceMonoMediumItalic: require('../assets/fonts/PlusJakartaSans-MediumItalic.ttf'),
    SpaceMonoSemiBoldItalic: require('../assets/fonts/PlusJakartaSans-SemiBoldItalic.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <StatusBar style="auto" />
    </Stack>
  );
}
