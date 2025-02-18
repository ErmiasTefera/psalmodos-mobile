import { useLocalSearchParams } from "expo-router";

import { ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import MusicPlayer from "./components/player";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import listOfMezmurs from "~/assets/data";

export default function MezmurDetail() {
  const { id, title } = useLocalSearchParams();
  const navigation = useNavigation();
  const [mezmur, setMezmurDetail] = useState<any>({});

  useEffect(() => {
    if (title) {
      navigation.setOptions({ title });
    }
    if (id) {
      getMezmurDetail();
    }
  }, [id, title, navigation]);

  const getMezmurDetail = () => {
    listOfMezmurs.find((mezmur) => {
      if (mezmur.id === id) {
        setMezmurDetail(mezmur);
        return mezmur;
      }
    });
  };

  return (
    <View className="pt-4 h-full justify-between">
      <View className="flex justify-center items-center px-4 flex-1">
        <ScrollView className="px-4 pt-3 w-full">
          <Text className="text-xl">{mezmur?.lyrics}</Text>
        </ScrollView>
      </View>

      <View className="">
        <MusicPlayer />
      </View>
    </View>
  );
}
