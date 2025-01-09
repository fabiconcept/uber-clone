import { GoogleInputProps } from '@/types/type';
import { View, Text, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { icons } from '@/constants';

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY

export default function GoogleTextInput({
    icon,
    initialLocation,
    containerStyle,
    textInputBackgroundColor,
    handlePress,
}: GoogleInputProps) {
    return (
        <View
            className={`flex flex-row items-center justify-center relative z-50 rounded-xl mb-5 ${containerStyle}`}
        >
            <GooglePlacesAutocomplete
                placeholder={"Where are you going?"}
                fetchDetails={true}
                debounce={500}
                query={{
                    key: googlePlacesApiKey,
                    language: 'en',
                }}
                renderLeftButton={() => (
                    <View className='justify-center items-center w-6 h-6'>
                        <Image
                            source={icon || icons.search}
                            className='w-6 h-6 mx-2'
                            resizeMode='contain'
                        />
                    </View>
                )}
                textInputProps={{
                    placeholderTextColor: 'gray',
                    placeholder: initialLocation ?? "Where are you going?",
                }}
                styles={{
                    textInput: {
                        backgroundColor: textInputBackgroundColor || "white",
                        borderRadius: 200,
                        fontSize: 16,
                        color: 'black',
                        fontWeight: '600',
                        marginTop: 5,
                        width: '100%',
                    },
                    textInputContainer: {
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 20,
                        position: 'relative',
                        shadowColor: '#d4d4d4',
                    },
                    listView: {
                        backgroundColor: 'white',
                        position: 'relative',
                        width: '100%',
                        top: 0,
                        marginTop: 10,
                        borderRadius: 10,
                        shadowColor: '#d4d4d4',
                        zIndex: 99,
                    },
                }}
                onPress={(data, details = null) => {
                    handlePress({
                        latitude: details?.geometry.location.lat!,
                        longitude: details?.geometry.location.lng!,
                        address: data.description
                    });
                }}
                onFail={(error) => console.error(error)}
            />
        </View>
    )
}