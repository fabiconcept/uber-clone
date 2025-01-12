import "../global.css";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { LogBox } from "react-native";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/Lib/Auth";
import { StripeProvider } from '@stripe/stripe-react-native';

LogBox.ignoreLogs([
  "Clerk:",
]);

// Prevent the splash screen from auto-hiding before asset loading is complete.
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
const stripePublishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }

  if (!stripePublishableKey) {
    throw new Error(
      'Missing Stripe Key. Please set EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY in your .env',
    )
  } else {
    console.log(stripePublishableKey)
  }

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
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <StripeProvider publishableKey={stripePublishableKey}>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </StripeProvider>
        <StatusBar style="dark" />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
