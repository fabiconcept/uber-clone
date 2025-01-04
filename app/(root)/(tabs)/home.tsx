import { StyleSheet, Text, View } from 'react-native';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { Link } from 'expo-router';

export default function Home() {
    const { user } = useUser();

    return (
        <View>
            <SignedIn>
                <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
            </SignedIn>
            <SignedOut>
                <Link href="/(auth)/sign-in">
                    <Text>Sign in</Text>
                </Link>
                <Link href="/(auth)/sign-up">
                    <Text>Sign up</Text>
                </Link>
            </SignedOut>
        </View>
    )
}

const styles = StyleSheet.create({})