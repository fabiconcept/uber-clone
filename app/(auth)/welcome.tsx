import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Onboarding() {
    return (
        <View className='h-full flex-1 flex items-center justify-between bg-white'>
            <TouchableOpacity
                onPress={() => router.replace('/(auth)/sign-in')}
                className='w-full justify-end items-end p-5'
            >
                <Text className='text-black font-JakartaExtraBold text-md'>Skip</Text>
            </TouchableOpacity>
        </View>
    )
}
