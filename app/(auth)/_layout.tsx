import { Stack } from 'expo-router'

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'default',
            }}
        >
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        </Stack>
    )
}