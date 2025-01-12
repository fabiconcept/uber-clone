import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SignedIn, useAuth, useUser } from '@clerk/clerk-react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RideCard from '@/components/RideCard';
import { icons, images } from '@/constants';
import GoogleTextInput from '@/components/GoogleTextInput';
import Map from '@/components/Map';
import { useLocationStore } from '@/store';
import React from 'react';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useFetch } from '@/Lib/fetch';
import { Ride } from '@/types/type';

export default function Home() {
    const { user } = useUser();
    const { signOut } = useAuth();

    const { setUserLocation, setDestinationLocation } = useLocationStore();
    const [hasLocationPermission, setHasLocationPermission] = React.useState(false);

    const { data: recentRides, loading } = useFetch<Ride[]>(`/(api)/(ride)/${user?.id}`);

    React.useEffect(() => {
        const requestLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setHasLocationPermission(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync();
            const address = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                address: `${address[0].name}, ${address[0].region}`,
            });

            setHasLocationPermission(true);

        }
        requestLocation();
    }, []);

    const handleSignOut = () => {
        console.log('signing out');
        signOut();
        router.replace('/(auth)/sign-in');
    }

    const handleDestinationPress = (location: { latitude: number; longitude: number; address: string }) => {
        setDestinationLocation(location);
        router.push('/(root)/find-ride');
    }

    return (
        <SafeAreaView className='flex-1 bg-general-500 px-5'>
            <FlatList
                data={recentRides?.slice(0, 5)}
                renderItem={({ item }) => (
                    <RideCard ride={{
                        ...item,
                        user_email: "",
                        origin_longitude: Number(item.origin_longitude),
                        origin_latitude: Number(item.origin_latitude),
                        destination_longitude: Number(item.destination_longitude),
                        destination_latitude: Number(item.destination_latitude),
                        fare_price: Number(item.fare_price),
                    }} />
                )}
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{
                    paddingBottom: 100
                }}
                ListEmptyComponent={() => (
                    <View className='flex-1 items-center justify-center mt-10'>
                        {
                            loading ? (
                                <ActivityIndicator
                                    size='small'
                                    color='#000'
                                />
                            ) : (
                                <View className='mb-20'>
                                    <Image
                                        source={images.noResult}
                                        resizeMode='contain'
                                        className='w-40 h-40'
                                        alt='No recent rides found'
                                    />
                                    <Text className='text-sm'>No recent rides found</Text>
                                </View>
                            )
                        }
                    </View>
                )}
                ListHeaderComponent={() => (
                    <>
                        <View className='flex flex-row items-center justify-between my-5'>
                            <Text className='text-xl font-JakartaSemiBold'>Welcome, {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.emailAddresses[0].emailAddress.split('@')[0]}  👋</Text>
                            <TouchableOpacity
                                onPress={handleSignOut}
                                className='justify-center items-center w-10 h-10 rounded-full bg-white'
                            >
                                <Image
                                    source={icons.out}
                                    resizeMode='contain'
                                    className='w-4 h-4'
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Google Text Input */}
                        <GoogleTextInput
                            icon={icons.search}
                            containerStyle='bg-white shadow-md shadow-neutral-300'
                            handlePress={handleDestinationPress}
                        />

                        <>
                            <Text className='text-xl font-JakartaBold mt-5 mb-3'>Your current location</Text>
                            <View className='flex flex-row items-center bg-transparent h-[300px]'>
                                <Map />
                            </View>
                        </>
                        <Text className='text-xl font-JakartaBold mt-5 mb-3'>Recent Rides</Text>
                    </>
                )}
            />
        </SafeAreaView>
    )
}