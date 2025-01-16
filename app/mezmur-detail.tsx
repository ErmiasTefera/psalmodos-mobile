import { useLocalSearchParams } from 'expo-router';

import { View } from "react-native";
import { Text } from "~/components/ui/text";

export default function MezmurDetail() {
    const { id, title } = useLocalSearchParams();
    return <View className="p-8 h-full justify-between">
        
        <View className='flex justify-center items-center px-4'>
            <Text className="text-2xl font-bold"> {id}</Text>
        </View>
        
        <View className='bg-green-200 px-4'>
            <Text className="text-2xl font-bold"> {title}</Text>
        </View>
    </View>
}