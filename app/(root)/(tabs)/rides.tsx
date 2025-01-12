import RideCard from '@/components/RideCard';
import { images } from '@/constants';
import { useFetch } from '@/Lib/fetch';
import { Ride } from '@/types/type';
import { useUser } from '@clerk/clerk-expo';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Rides() {
    const { user } = useUser();
    const { data: recentRides, loading } = useFetch<Ride[]>(`/(api)/(ride)/${user?.id}`);

    return (
        <SafeAreaView className='flex-1 bg-white justify-center px-5'>
            <FlatList
                data={recentRides}
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
                                <>
                                    <Image
                                        source={images.noResult}
                                        resizeMode='contain'
                                        className='w-40 h-40'
                                        alt='No recent rides found'
                                    />
                                    <Text className='text-sm'>No recent rides found</Text>
                                </>
                            )
                        }
                    </View>
                )}
                ListHeaderComponent={() => (
                    <>
                        <Text className='w-full text-2xl font-JakartaBold my-3'>All Rides</Text>
                    </>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})