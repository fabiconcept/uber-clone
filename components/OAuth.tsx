import { View, Text, Image } from 'react-native';
import CustomButton from './CustomButton';
import { icons } from '@/constants';

export default function OAuth() {
    const handleGoogleSignIn = async () => {

    }
    return (
        <View>
            <View className='flex flex-row items-center justify-center mt-4 gap-x-3'>
                <View className='flex-1 h-[1px] bg-general-100/50'></View>
                <Text className='text-lg'>Or</Text>
                <View className='flex-1 h-[1px] bg-general-100/50'></View>
            </View>
            <CustomButton
                title='Continue with Google'
                className='mt-5 w-full shadow-none'
                IconLeft={() => <Image
                    source={icons.google}
                    className='w-5 h-5 mx-2'
                    resizeMode='contain'
                />}
                bgVariant='outline'
                textVariant='primary'
                onPress={handleGoogleSignIn}
            />
        </View>
    )
}