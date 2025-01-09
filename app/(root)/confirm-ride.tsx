import CustomButton from '@/components/CustomButton';
import DriverCard from '@/components/DriverCard';
import RideLayout from '@/components/RideLayout';
import { useDriverStore, useLocationStore } from '@/store';
import { router } from 'expo-router';
import { View, Text, FlatList } from 'react-native';

export default function confirmRide() {
    const {
        drivers,
        selectedDriver,
        setSelectedDriver
    } = useDriverStore();
    return (
        <RideLayout
            title={`Choose a Driver`}
            snapPoints={["65%", '85%']}
        >
            <FlatList
                data={drivers}
                renderItem={({ item }) => (
                    <DriverCard
                        item={item}
                        selected={selectedDriver!}
                        setSelected={() => setSelectedDriver(Number(item.id))}
                    />
                )}
                ListFooterComponent={() => (
                    <View className='mx-5 mt-10'>
                        <CustomButton
                            title="Select Ride"
                            onPress={() => router.push("/(root)/book-ride")}
                        />
                    </View>
                )}
            />
        </RideLayout>
    )
}