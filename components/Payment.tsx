import { fetchAPI } from '@/Lib/fetch';
import CustomButton from './CustomButton';
import { useStripe } from '@stripe/stripe-react-native';
import { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { PaymentProps } from '@/types/type';
import { useLocationStore } from '@/store';
import { useAuth } from '@clerk/clerk-expo';
import ReactNativeModal from 'react-native-modal';
import { images } from '@/constants';
import { router } from 'expo-router';

export default function Payment({
    fullName,
    email,
    amount,
    driverId,
    rideTime,
}: PaymentProps) {
    const [success, setSuccess] = useState(false);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const {
        userAddress,
        userLatitude,
        userLongitude,
        destinationAddress,
        destinationLatitude,
        destinationLongitude
    } = useLocationStore();

    const { userId } = useAuth();

    const initializePaymentSheet = async () => {
        try {
            const { error } = await initPaymentSheet({
                merchantDisplayName: "Tutorial Ryde Inc.",
                intentConfiguration: {
                    mode: {
                        amount: parseInt(amount) * 100,
                        currencyCode: 'USD',
                    },
                    confirmHandler: async (paymentMethod, _, intentCreationCallback) => {
                        try {
                            const { paymentIntent, customer } = await fetchAPI("/(api)/(stripe)/create", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    name: fullName || email.split('@')[0],
                                    email: email,
                                    amount: amount,
                                    paymentMethodId: paymentMethod.id,
                                }),
                            });


                            if (paymentIntent.client_secret) {
                                const { result } = await fetchAPI("/(api)/(stripe)/pay", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        payment_method_id: paymentIntent.id,
                                        payment_intent_id: paymentIntent.id,
                                        customer_id: customer.id
                                    }),
                                });

                                if (result.client_secret) {
                                    await fetchAPI("/(api)/(ride)/create", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            origin_address: userAddress,
                                            destination_address: destinationAddress,
                                            origin_latitude: userLatitude,
                                            origin_longitude: userLongitude,
                                            destination_latitude: destinationLatitude,
                                            destination_longitude: destinationLongitude,
                                            ride_time: rideTime.toFixed(0),
                                            fare_price: parseInt(amount) * 100,
                                            payment_status: "paid",
                                            driver_id: driverId,
                                            user_id: userId
                                        }),
                                    });

                                    intentCreationCallback({
                                        clientSecret: result.client_secret,
                                    });
                                }
                            }
                        } catch (error) {
                            console.error('Payment confirmation error:', error);
                            return;
                        }
                    },
                },
                returnURL: 'myapp://book-ride',
            });

            if (error) {
                console.error('Payment sheet initialization error:', error);
                return;
            }

            const { error: presentError } = await presentPaymentSheet();

            if (presentError) {
                console.error('Payment presentation error:', presentError);
                return;
            }

            setSuccess(true);
        } catch (error) {
            console.error('Payment initialization error:', error);
        }
    };

    const openPaymentSheet = async () => {
        console.log('opening payment sheet');
        await initializePaymentSheet();
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(
                `Error Code ${error.code}`,
                error.message
            )
        } else {
            setSuccess(true);
        }

    }

    const handlePayment = async () => {
        try {
            await fetchAPI("/(api)/(ride)/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    origin_address: userAddress,
                    destination_address: destinationAddress,
                    origin_latitude: userLatitude,
                    origin_longitude: userLongitude,
                    destination_latitude: destinationLatitude,
                    destination_longitude: destinationLongitude,
                    ride_time: rideTime.toFixed(0),
                    fare_price: parseInt(amount) * 100,
                    payment_status: "paid",
                    driver_id: driverId,
                    user_id: userId
                }),
            });

            setSuccess(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <CustomButton
                title="Confirm Payment"
                className='my-10'
                onPress={handlePayment}
            />
            {success && (
                <ReactNativeModal
                    isVisible={success}
                    onBackdropPress={() => setSuccess(false)}
                >
                    <View className='flex flex-col justify-center items-center bg-white p-7 rounded-2xl'>
                        <Image
                            source={images.check}
                            className='w-28 h-28 mt-5'
                        />
                        <Text className='text-2xl text-center font-JakartaSemiBold font-bold mt-5'>Payment Successful</Text>
                        <Text className='text-md text-center text-general-200 font-JakartaRegular mt-3'>
                            Thank you for your booking, your reservation has been placed. PLease proceed with your trip.
                        </Text>
                        <CustomButton
                            title="Back Home"
                            className='my-5'
                            onPress={() => {
                                setSuccess(false);
                                router.replace('/(root)/(tabs)/home');
                            }}
                        />
                    </View>
                </ReactNativeModal>
            )}
        </>
    )
}