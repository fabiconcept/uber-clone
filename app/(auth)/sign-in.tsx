import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

export default function SignIn() {
    const [form, setForm] = React.useState({
        email: '',
        password: '',
    });

    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()


    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) return

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            })

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }, [isLoaded, form.email, form.password]);

    return (
        <ScrollView className='flex-1 bg-white'>
            <View className='flex-1 bg-white'>
                <View className='relative w-full h-[250px]'>
                    <Image
                        source={images.signUpCar}
                        className='z-0 w-full h-[250px]'
                    />
                    <Text className="text-2xl font-JakartaSemiBold text-black absolute bottom-5 left-5">Welcome</Text>
                </View>
                <View className='p-5'>
                    <InputField
                        label='Email'
                        placeholder='Enter your email'
                        labelStyle='text-black'
                        icon={icons.email}
                        value={form.email}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={(text) => setForm({ ...form, email: text })}
                    />
                    <InputField
                        label='Password'
                        placeholder='Enter your password'
                        labelStyle='text-black'
                        icon={icons.lock}
                        secureTextEntry={true}
                        value={form.password}
                        onChangeText={(text) => setForm({ ...form, password: text })}
                    />

                    <CustomButton
                        title='Sign In'
                        onPress={onSignInPress}
                        className='mt-5'
                    />

                    <OAuth />

                    <Link href="/(auth)/sign-up" className='text-lg text-center text-general-200 mt-10'>
                        <Text>Don&apos;t have an account? </Text>
                        <Text className='text-primary-500 font-semibold'>Sign Up</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    )
}
