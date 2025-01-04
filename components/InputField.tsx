import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Platform, Keyboard, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { InputFieldProps } from '@/types/type';

export default function InputField({
    label,
    labelStyle,
    icon,
    secureTextEntry = false,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    ...props
}: InputFieldProps) {
    const [loaded] = useFonts({
        'JakartaSemiBold': require('@/assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <KeyboardAvoidingView behavior={
            Platform.OS === 'ios' ? 'padding' : 'height'
        }>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View className='my-2 w-full'>
                    <Text className={`text-lg font-semibold mb-3 ${labelStyle}`}>{label}</Text>
                    <View className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}>
                        {icon && <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />}
                        <TextInput
                            {...props}
                            secureTextEntry={secureTextEntry}
                            className={`rounded-full p-4 font-semibold text-[15px] flex-1 text-left ${inputStyle}`}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}