import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { Link, router } from 'expo-router';
import React from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import ReactNativeModal from 'react-native-modal';

export default function SignUp() {
    const { isLoaded, signUp, setActive } = useSignUp();

    const [showSuccessModal, setShowSuccessModal] = React.useState(false);

    const [form, setForm] = React.useState({
        email: '',
        password: '',
        name: '',
    });

    const [verification, setVerification] = React.useState({
        state: "default",
        code: '',
        error: ""
    });

    const onSignUpPress = async () => {
        if (!isLoaded) return

        // Start sign-up process using email and password provided
        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            setVerification((prev) => ({
                ...prev,
                state: "pending"
            }))
        } catch (err: any) {
            Alert.alert('Error', err.errors[0].longMessage)
        }
    }

    const onVerifyPress = async () => {
        if (!isLoaded) return;

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            })


            if (signUpAttempt.status === 'complete') {
                //  Todo create a database user
                await fetch('/(api)/user', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        clerkId: signUpAttempt.createdUserId
                    }),
                })

                await setActive({ session: signUpAttempt.createdSessionId });
                setVerification((prev) => ({
                    ...prev,
                    state: "success",
                }))
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2))
                setVerification((prev) => ({
                    ...prev,
                    state: "failed",
                    error: "Invalid verification code"
                }))
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setVerification((prev) => ({
                ...prev,
                state: "failed",
                error: err.errors[0].longMessage
            }))
        }
    }

    return (
        <ScrollView className='flex-1 bg-white'>
            <View className='flex-1 bg-white'>
                <View className='relative w-full h-[250px]'>
                    <Image
                        source={images.signUpCar}
                        className='z-0 w-full h-[250px]'
                    />
                    <Text className="text-2xl font-JakartaSemiBold text-black absolute bottom-5 left-5">Create Your Account</Text>
                </View>
                <View className='p-5'>
                    <InputField
                        label='Name'
                        placeholder='Enter your name'
                        labelStyle='text-black'
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(text) => setForm({ ...form, name: text })}
                    />
                    <InputField
                        label='Email'
                        placeholder='Enter your email'
                        labelStyle='text-black'
                        icon={icons.email}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        value={form.email}
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
                        title='Sign Up'
                        onPress={onSignUpPress}
                        className='mt-5'
                    />
                    <OAuth />

                    <Link href="/(auth)/sign-in" className='text-lg text-center text-general-200 mt-10'>
                        <Text>Already have an account? </Text>
                        <Text className='text-primary-500 font-semibold'>Sign In</Text>
                    </Link>
                </View>
                <ReactNativeModal
                    isVisible={showSuccessModal}
                >
                    <View className="min-h-[300px] bg-white px-7 py-9 rounded-2xl">
                        <Image
                            source={images.check}
                            className='w-40 h-40 mx-auto my-5'
                        />
                        <Text className='text-3xl font-bold text-center'>
                            Verified
                        </Text>
                        <Text className='text-base text-gray-400 font-Jakarta text-center'>
                            You&apos;ve successfully verified your account.
                        </Text>
                        <CustomButton
                            title='Browse Home'
                            onPress={() => {
                                setShowSuccessModal(false)
                                router.push('/(root)/(tabs)/home')
                            }}
                            className='mt-5'
                        />
                    </View>
                </ReactNativeModal>
                <ReactNativeModal
                    isVisible={verification.state === "pending"}
                    onModalHide={() => {
                        if (verification.state === "success") {
                            setShowSuccessModal(true)
                        }
                    }}
                >
                    <View className="min-h-[300px] bg-white px-7 py-9 rounded-2xl">
                        <Text className='text-2xl font-extrabold'>
                            Verification
                        </Text>
                        <Text className='font-Jakarta mb-5'>
                            We just sent a verification code to {form.email}.
                        </Text>

                        <InputField
                            label='Verification Code'
                            placeholder='123456'
                            labelStyle='text-black'
                            keyboardType='numeric'
                            icon={icons.lock}
                            value={verification.code}
                            onChangeText={(text) => setVerification((prev) => ({
                                ...prev,
                                code: text
                            }))}
                        />

                        {verification.error && (
                            <Text className='text-red-500 text-sm mt-1'>
                                {verification.error}
                            </Text>
                        )}

                        <CustomButton
                            title='Verify Email'
                            onPress={onVerifyPress}
                            bgVariant='success'
                            className='mt-5'
                        />
                    </View>
                </ReactNativeModal>
            </View>
        </ScrollView>
    )
}
