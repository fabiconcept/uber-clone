import { DriverStore, LocationStore, MarkerData } from "@/types/type";
import { create } from "zustand";

export const useLocationStore = create<LocationStore>((set) => ({
    userAddress: null,
    userLatitude: null,
    userLongitude: null,
    destinationAddress: null,
    destinationLatitude: null,
    destinationLongitude: null,
    setUserLocation: (location: { address: string; latitude: number; longitude: number }) => set({ userAddress: location.address, userLatitude: location.latitude, userLongitude: location.longitude }),
    setDestinationLocation: (location: { address: string; latitude: number; longitude: number }) => set({ destinationAddress: location.address, destinationLatitude: location.latitude, destinationLongitude: location.longitude }),
}));

export const useDriverStore = create<DriverStore>((set) => ({
    drivers: [] as MarkerData[],
    selectedDriver: null,
    setSelectedDriver: (driverId: number) => set({ selectedDriver: driverId }),
    clearSelectedDriver: () => set({ selectedDriver: null }),
    setDrivers: (drivers: MarkerData[]) => set({ drivers }),
}));

