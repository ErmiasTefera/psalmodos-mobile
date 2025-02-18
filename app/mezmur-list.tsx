import { FlatList, View, Text } from "react-native";
import React, { useEffect } from "react";
import MezmurListItem from "~/components/MezmurListItem";
import TrackPlayer from "react-native-track-player";
import FloatingTrackControl from "./components/floating-track-control";
import listOfMezmurs from "~/assets/data";
import { useLocalSearchParams, useNavigation } from "expo-router";

export default function MezmurList() {
  const { title } = useLocalSearchParams();
  const navigation = useNavigation();
  const [mezmurs, setMezmurs] = React.useState(listOfMezmurs);

  const setPlayerTracks = async () => {
    try {
      const mezmurTracks = mezmurs.map((mezmur) => ({
        id: mezmur.id,
        url: mezmur.url,
        title: mezmur.title,
        artist: mezmur.artist,
      }));
      await TrackPlayer.add(mezmurTracks);
    } catch (error) {
      console.log(error);
    }
  };

  const togglePlay = (id: string) => {
    setMezmurs((prevMezmurs) =>
      prevMezmurs.map((mezmur) => {
        // if the mezmur is the one we want to toggle
        if (mezmur.id === id) {
          mezmur.isPlaying = !mezmur.isPlaying;
        } else {
          // if the mezmur is not the one we want to toggle
          mezmur.isPlaying = false;
        }

        return mezmur;
      })
    );
  };

  useEffect(() => {
    setPlayerTracks();
  }, []);


  useEffect(() => {
    if (title) {
      navigation.setOptions({ title: title });
    }
  }, [title, navigation]);

  return (
    <View className="p-3 h-full justify-between">
      <FlatList
        data={mezmurs}
        renderItem={({ item }) => (
          <MezmurListItem item={item} togglePlay={togglePlay} />
        )}
      />

      <View className="">
        <FloatingTrackControl />
      </View>
    </View>
  );
}
