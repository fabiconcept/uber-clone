import { useLocationStore } from '@/store';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function findRide() {
    const {
        userAddress,
        destinationAddress,
        setUserLocation,
        setDestinationLocation
    } = useLocationStore();
    return (
        <SafeAreaView>
            <Text className='text-2xl'>
                You are here: {userAddress}
            </Text>
            <Text className='text-2xl'>
                You are going to: {destinationAddress}
            </Text>
        </SafeAreaView>
    )
}