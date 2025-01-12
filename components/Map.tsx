import { icons } from '@/constants';
import { useFetch } from '@/Lib/fetch';
import { calculateDriverTimes, calculateRegion, generateMarkersFromData } from '@/Lib/Map';
import { useDriverStore, useLocationStore } from '@/store';
import { MarkerData } from '@/types/type';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default function Map() {
    const { data: drivers, loading, error } = useFetch<MarkerData[]>('/(api)/driver');
    const {
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
    } = useLocationStore();
    const { setDrivers, selectedDriver } = useDriverStore();

    const [markers, setMarkers] = useState<MarkerData[]>([]);

    useEffect(() => {
        if (Array.isArray(drivers)) {
            if (!userLatitude || !userLongitude) {
                return;
            }

            const newMarkers = generateMarkersFromData({
                data: drivers.map((driver) => ({ ...driver, driver_id: Number(driver.id), rating: Number(driver.rating) })),
                userLatitude,
                userLongitude,
            });

            setMarkers(newMarkers);
        }
    }, [userLatitude, userLongitude, drivers]);

    useEffect(() => {
        if (markers.length > 0 && destinationLatitude && destinationLongitude) {
            calculateDriverTimes({
                markers,
                userLatitude,
                userLongitude,
                destinationLatitude,
                destinationLongitude,
            }).then((driversWithTimes) => {
                setDrivers(driversWithTimes as MarkerData[]);
            });
        }
    }, [markers, destinationLatitude, destinationLongitude]);

    if (loading || !userLatitude || !userLongitude) {
        return (
            <View className='flex justify-between items-center w-full'>
                <ActivityIndicator
                    size='small'
                    color='black'
                />
            </View>
        );
    }

    if (error) {
        return (
            <View className='flex justify-between items-center w-full'>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    const region = calculateRegion({
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude
    });

    return (
        <View
            className='bg-general-100 h-full w-full rounded-2xl overflow-hidden justify-center items-center'
        >
            <MapView
                provider={PROVIDER_DEFAULT}
                className='h-full w-full rounded-2xl'
                style={{ width: '100%', height: '100%' }}
                tintColor='black'
                mapType='standard'
                showsPointsOfInterest={false}
                initialRegion={region}
                showsUserLocation={true}
                userInterfaceStyle='light'
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        image={marker.id === selectedDriver ? icons.selectedMarker : icons.marker}
                    />
                ))}
                {destinationLatitude && destinationLongitude && (
                    <>
                        <Marker
                            key='destination'
                            coordinate={{
                                latitude: destinationLatitude,
                                longitude: destinationLongitude
                            }}
                            title='Destination'
                            image={icons.pin}
                        />
                        <MapViewDirections
                            origin={{
                                latitude: userLatitude,
                                longitude: userLongitude
                            }}
                            destination={{
                                latitude: destinationLatitude,
                                longitude: destinationLongitude
                            }}
                            apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
                            strokeWidth={5}
                            strokeColor='#0286ff'
                        />
                    </>
                )}
            </MapView>
        </View>
    )
}