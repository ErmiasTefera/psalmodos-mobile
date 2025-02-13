import { useLocalSearchParams } from "expo-router";

import { ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import MusicPlayer from "./components/player";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export default function MezmurDetail() {
  const { id, title } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    if (title) {
        navigation.setOptions({ title });
    }
  }, [title, navigation]);

  return (
    <View className="pt-4 h-full justify-between">
      <View className="flex justify-center items-center px-4 flex-1">
        <ScrollView className="px-4 pt-3 w-full">
          <Text className="text-xl">
            እሴብሕ ጸጋኪ ኦ እግዝእትየ ማርያም{"\n"}
            ዕጽ ልምልምት ወፍሬ ጥዕምት /3/{"\n"}
            ሐረገወይን /3/ አንቲ ማርያም{"\n"}
            አጸደ ወይን /3/ አንቲ ማርያም{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ ፊደለ ወትወልዲ ወንጌለ{"\n"}
            ወታገምሪ መስቀለ{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ ሰማየ ወትወልዲ ፀሐየ{"\n"}
            ወታገምሪ አዶናየ{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ መሶበ ወትወልዲ ኮከበ{"\n"}
            ወታጸግቢ ርኁበ{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ መቅደሰ ወትልዲ ንጉሠ{"\n"}
            ወታገምሪ መንፈስ ቅዱሰ{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ ታቦተ ወትወልዲ ጽላተ{"\n"}
            ወታገምሪ መለኮተ{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ ደመና ወትወልዲ ኀብሰተ መና{"\n"}
            ወታገምሪ ጥዒና{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ ገራኅተ ወትፈርዪ ሰዊተ{"\n"}
            ወታጸድቂ ነፍሳተ{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ ስኒነ ወትወልዲ መድኅነ{"\n"}
            ወትፌውሲ ድውያነ{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ ምሥራቀ ወትወልዲ መብረቀ{"\n"}
            ወታለብሲ ዕሩቀ{"\n"}
            አዝ--------------//{"\n"}
            ለአብ መርዓቱ ለወልድ ወላዲቱ{"\n"}
            ለመንፈስ ቅዱስ ጽርሐ ቤቱ{"\n"}
            እሴብሕ ጸጋኪ ኦ እግዝእትየ ማርያም{"\n"}
            ዕጽ ልምልምት ወፍሬ ጥዕምት /3/{"\n"}
            ሐረገወይን /3/ አንቲ ማርያም{"\n"}
            አጸደ ወይን /3/ አንቲ ማርያም{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ ፊደለ ወትወልዲ ወንጌለ{"\n"}
            ወታገምሪ መስቀለ{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ ሰማየ ወትወልዲ ፀሐየ{"\n"}
            ወታገምሪ አዶናየ{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ መሶበ ወትወልዲ ኮከበ{"\n"}
            ወታጸግቢ ርኁበ{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ መቅደሰ ወትልዲ ንጉሠ{"\n"}
            ወታገምሪ መንፈስ ቅዱሰ{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ ታቦተ ወትወልዲ ጽላተ{"\n"}
            ወታገምሪ መለኮተ{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ ደመና ወትወልዲ ኀብሰተ መና{"\n"}
            ወታገምሪ ጥዒና{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ ገራኅተ ወትፈርዪ ሰዊተ{"\n"}
            ወታጸድቂ ነፍሳተ{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ ስኒነ ወትወልዲ መድኅነ{"\n"}
            ወትፌውሲ ድውያነ{"\n"}
            አዝ--------------//{"\n"}
            ትመስሊ ምሥራቀ ወትወልዲ መብረቀ{"\n"}
            ወታለብሲ ዕሩቀ{"\n"}
            አዝ--------------//{"\n"}
            ለአብ መርዓቱ ለወልድ ወላዲቱ{"\n"}
            ለመንፈስ ቅዱስ ጽርሐ ቤቱ{"\n"}
          </Text>
        </ScrollView>
      </View>

      <View className="">
        <MusicPlayer />
      </View>
    </View>
  );
}
