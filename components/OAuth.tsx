import { View, Text, Image, Alert } from 'react-native';
import CustomButton from './CustomButton';
import { icons } from '@/constants';
import { useOAuth } from '@clerk/clerk-expo';
import React from 'react';
import { GoogleOAuth } from '@/Lib/Auth';
import { router } from 'expo-router';

export default function OAuth() {
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

    const onPress = React.useCallback(async () => {
        try {
            const result = await GoogleOAuth(startOAuthFlow);

            if (result.code === "session_exists") {
                Alert.alert("Session Exists", "Redirecting to Home Page");
                router.push("/(root)/(tabs)/home");
            }

            if (result.code === "success") {
                Alert.alert("Success", "Redirecting to Home Page");
                router.push("/(root)/(tabs)/home");
            }
        } catch (err) {
            console.error(err);
        }
    }, [])
    return (
        <View>
            <View className='flex flex-row items-center justify-center mt-4 gap-x-3'>
                <View className='flex-1 h-[1px] bg-general-100/50'></View>
                <Text className='text-lg'>Or</Text>
                <View className='flex-1 h-[1px] bg-general-100/50'></View>
            </View>
            <CustomButton
                title='Continue with Google'
                className='mt-5 w-full shadow-none'
                IconLeft={() => <Image
                    source={icons.google}
                    className='w-5 h-5 mx-2'
                    resizeMode='contain'
                />}
                bgVariant='outline'
                textVariant='primary'
                onPress={onPress}
            />
        </View>
    )
}