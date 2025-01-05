import { icons } from '@/constants';
import { formatDate, formatTime } from '@/Lib/utils';
import { Ride } from '@/types/type';
import { View, Text, Image } from 'react-native';

export default function RideCard({ ride: {
    destination_latitude,
    destination_longitude,
    driver,
    fare_price,
    origin_address,
    origin_latitude,
    origin_longitude,
    payment_status,
    ride_time,
    destination_address,
    created_at,
} }: { ride: Ride }) {
    return (
        <View className='flex flex-row items-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3 justify-center'>
            <View className='flex flex-col justify-center p-3'>
                <View className='flex flex-row items-center justify-between'>
                    <Image
                        source={{
                            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
                        }}
                        className='w-[80px] h-[90px] rounded-lg'
                    />
                    <View className='flex flex-col mx-5 gap-y-5'>
                        <View className='flex flex-row items-center gap-x-2'>
                            <Image
                                source={icons.to}
                                className='w-5 h-5'
                            />
                            <Text className='text-md font-Jakarta' numberOfLines={1}>{origin_address}</Text>
                        </View>
                        <View className='flex flex-row items-center gap-x-2'>
                            <Image
                                source={icons.point}
                                className='w-5 h-5'
                            />
                            <Text className='text-md font-Jakarta' numberOfLines={1}>{destination_address}</Text>
                        </View>
                    </View>
                </View>
                <View className='flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center'>
                    <View className='flex flex-row items-center justify-between w-full mb-5'>
                        <Text className='text-md font-JakartaMedium opacity-45'>Date &amp; Time</Text>
                        <Text className='text-md font-JakartaMedium'>
                            {`${formatDate(created_at)}, `}
                            {formatTime(ride_time)}
                        </Text>
                    </View>
                    <View className='flex flex-row items-center justify-between w-full mb-5'>
                        <Text className='text-md font-JakartaMedium opacity-45'>Driver</Text>
                        <Text className='text-md font-JakartaMedium'>{driver.first_name} {driver.last_name}</Text>
                    </View>
                    <View className='flex flex-row items-center justify-between w-full mb-5'>
                        <Text className='text-md font-JakartaMedium opacity-45'>Car Seats</Text>
                        <Text className='text-md font-JakartaMedium'>{driver.car_seats}</Text>
                    </View>
                    <View className='flex flex-row items-center justify-between w-full mb-5'>
                        <Text className='text-md font-JakartaMedium opacity-45'>Payment Status</Text>
                        <Text className={`capitalize text-md font-JakartaMedium ${payment_status === 'paid' ? 'text-green-500' : 'text-red-500'}`}>{payment_status}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}