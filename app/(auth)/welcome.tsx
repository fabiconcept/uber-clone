import CustomButton from '@/components/CustomButton';
import { onboarding } from '@/constants';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

export default function Onboarding() {
    const swiperRef = React.useRef<Swiper>(null);

    const [activeIndex, setActiveIndex] = React.useState(0);

    const isLastSlide = activeIndex === onboarding.length - 1;

    return (
        <SafeAreaView className='h-full flex-1 flex items-center justify-between bg-white'>
            <TouchableOpacity
                onPress={() => router.replace('/(auth)/sign-up')}
                className='w-full flex justify-end items-end p-5'
            >
                <Text className='text-black font-bold text-md'>Skip</Text>
            </TouchableOpacity>
            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View className='w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full' />}
                activeDot={<View className='w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full' />}
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {onboarding.map((item, index) => (
                    <View key={index} className='flex items-center justify-center p-5'>
                        <Image
                            source={item.image}
                            className='w-full h-[300px]'
                            resizeMode='contain'
                        />
                        <View className='flex flex-row items-center justify-center w-full mt-10'>
                            <Text className='text-black text-3xl font-bold mx-10 text-center'>{item.title}</Text>
                        </View>
                        <Text className='text-[#858585] font-JakartaSemiBold text-lg mx-10 text-center mt-3'>{item.description}</Text>
                    </View>
                ))}
            </Swiper>
            <CustomButton
                title={isLastSlide ? 'Get Started' : 'Next'}
                className='w-11/12 mt-10'
                onPress={() => {
                    if (isLastSlide) {
                        router.replace('/(auth)/sign-up');
                    } else {
                        swiperRef.current?.scrollBy(1, false);
                    }
                }}
            />
        </SafeAreaView>
    )
}
