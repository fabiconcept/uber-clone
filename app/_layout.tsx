import "../global.css";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Fragment, useEffect } from 'react';
import 'react-native-reanimated';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Jakarta: require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    JakartaBold: require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    JakartaSemiBold: require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    JakartaMedium: require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    JakartaLight: require('../assets/fonts/PlusJakartaSans-Light.ttf'),
    JakartaExtraBold: require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    JakartaExtraLight: require('../assets/fonts/PlusJakartaSans-ExtraLight.ttf'),
    JakartaBoldItalic: require('../assets/fonts/PlusJakartaSans-BoldItalic.ttf'),
    JakartaItalic: require('../assets/fonts/PlusJakartaSans-Italic.ttf'),
    JakartaMediumItalic: require('../assets/fonts/PlusJakartaSans-MediumItalic.ttf'),
    JakartaSemiBoldItalic: require('../assets/fonts/PlusJakartaSans-SemiBoldItalic.ttf'),
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
    <Fragment>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
    </Fragment>
  );
}
