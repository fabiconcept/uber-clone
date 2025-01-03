import { ButtonProps } from '@/types/type';
import { View, Text, TouchableOpacity } from 'react-native'

const getBgVariantStyle = (variant: ButtonProps['bgVariant']) => {
    switch (variant) {
        case 'secondary':
            return 'bg-gray-500';
        case 'danger':
            return 'bg-red-500';
        case 'outline':
            return 'bg-transparent border-neutral-500 border-[0.5px]';
        case 'success':
            return 'bg-green-500';
        default:
            return 'bg-[#0286FF]';
    }
}

const getTextVariantStyle = (variant: ButtonProps['textVariant']) => {
    switch (variant) {
        case 'primary':
            return 'text-white';
        case 'secondary':
            return 'text-gray-100';
        case 'danger':
            return 'text-red-100';
        case 'success':
            return 'text-green-100';
        default:
            return 'text-[#0286FF]';
    }
}

export default function CustomButton({
    onPress,
    title,
    bgVariant = 'primary',
    textVariant = 'default',
    IconLeft,
    IconRight,
    className,
    ...props
}: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`w-full p-3 rounded-full flex flex-row items-center justify-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
            {...props}
        >
            {IconLeft && <IconLeft />}
            <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>{title}</Text>
            {IconRight && <IconRight />}
        </TouchableOpacity>
    )
}