import { fetchAPI } from '@/Lib/fetch';
import CustomButton from './CustomButton';
import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { PaymentProps } from '@/types/type';

export default function Payment({
    fullName,
    email,
    amount,
    driverId,
    rideTime,
}: PaymentProps) {
    const [success, setSuccess] = useState(false);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const initializePaymentSheet = async () => {
        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            intentConfiguration: {
                mode: {
                    amount: 1099,
                    currencyCode: 'USD',
                },
                confirmHandler: confirmHandler
            }
        });
        if (error) {
            // handle error
        }
    };

    const confirmHandler = async (paymentMethod, _, intentCreationCallback) => {

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

            }
        }

        if (error) {
            // Make a request to your own server.
            const response = await fetch(`${API_URL}/create-intent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            // Call the `intentCreationCallback` with your server response's client secret or error
            const { client_secret, error } = await response.json();
            if (client_secret) {
                intentCreationCallback({ clientSecret: client_secret });
            } else {
                intentCreationCallback({ error });
            }
        }

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

        return (
            <>
                <CustomButton
                    title="Confirm Payment"
                    className='my-10'
                    onPress={openPaymentSheet}
                />
            </>
        )
    }