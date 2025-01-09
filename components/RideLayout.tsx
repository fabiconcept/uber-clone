import { View, Text, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { icons } from '@/constants';
import Map from './Map';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';

export default function RideLayout({ children, title, snapPoints }: { children: React.ReactNode, title: string, snapPoints?: string[] }) {
    const bottomSheetRef = React.useRef<BottomSheet>(null);

    return (
        <GestureHandlerRootView className='flex-1 bg-white'>
            <View className='flex-1 flex-col h-screen bg-blue-500'>
                <View className='flex flex-row absolute z-10 top-16 items-center justify-center px-5'>
                    <TouchableOpacity
                        onPress={() => router.back()}
                    >
                        <View className='w-10 h-10 items-center justify-center rounded-full bg-white'>
                            <Image
                                source={icons.backArrow}
                                className='w-6 h-6'
                                resizeMode='contain'
                            />
                        </View>
                    </TouchableOpacity>
                    <Text className='text-xl font-JakartaSemiBold ml-5'>{title || "Go Back"}</Text>
                </View>
                <Map />
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints || ['40%', '85%']}
                    index={0}
                    keyboardBehavior='interactive'
                >
                    <BottomSheetView
                        className={"flex-1 p-5"}
                    >
                        {children}
                    </BottomSheetView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView >
    )
}