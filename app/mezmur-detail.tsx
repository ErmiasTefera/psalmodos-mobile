import { useLocalSearchParams } from "expo-router";

import { ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import MusicPlayer from "./components/player";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import listOfMezmurs from "~/assets/data";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import useCurrentTrack from "~/hooks/useTrackPlayerEvents";

export default function MezmurDetail() {
  const { id, title } = useLocalSearchParams();
  const navigation = useNavigation();
  const [mezmur, setMezmurDetail] = useState<any>({});
  const playBackState = usePlaybackState();
  const currentTrack = useCurrentTrack();

  useEffect(() => {
    if (title) {
      navigation.setOptions({ title });
    }
    if (id) {
      getMezmurDetail();
    }
  }, [id, title, navigation]);

  useEffect(() => {
    TrackPlayer.getActiveTrackIndex().then((trackIndex) => {
      listOfMezmurs.find((mezmur, mezmurItemIndex) => {
        if (mezmurItemIndex === trackIndex) {
          setMezmurDetail(mezmur);
          navigation.setOptions({ title: mezmur.title });
          return mezmur;
        }
      });
    });
  }, [currentTrack]);

  const getMezmurDetail = async () => {
    listOfMezmurs.find((mezmur, mezmurItemIndex) => {
      if (mezmur.id === id) {
        setMezmurDetail(mezmur);
        return mezmur;
      }
    });
  };

  const setCurrentMezmur = async () => {
    if (mezmur) {
      const currentItemIndex = listOfMezmurs.findIndex(
        (item) => item.id === mezmur.id
      );
      // if the current track is not the same as the current item
      const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
      if (currentTrackIndex !== currentItemIndex) {
        await TrackPlayer.skip(currentItemIndex);
        await TrackPlayer.play();
      }
    }
  };

  useEffect(() => {
    setCurrentMezmur();
  }, [mezmur]);

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
