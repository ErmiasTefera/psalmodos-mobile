import { FlatList, View, Text } from "react-native";
import React, { useEffect } from "react";
import MezmurListItem from "~/components/MezmurListItem";
import TrackPlayer, {
  State,
  Track,
  usePlaybackState,
} from "react-native-track-player";
import FloatingTrackControl from "./components/floating-track-control";
import listOfMezmurs from "~/assets/data";
import { useLocalSearchParams, useNavigation } from "expo-router";

export default function MezmurList() {
  const { title } = useLocalSearchParams();
  const navigation = useNavigation();
  const [mezmurs, setMezmurs] = React.useState(listOfMezmurs);
  const playBackState = usePlaybackState();

  const setPlayerTracks = async () => {
    try {
      const tracks = await TrackPlayer.getQueue();
      mezmurs.forEach((mezmur) => {
        const track = {
          id: mezmur.id,
          url: mezmur.url,
          title: mezmur.title,
          artist: mezmur.artist,
        };
        // if the track is already in the queue skip adding it
        if (tracks.find((t) => t.id === mezmur.id)) {
          return;
        }
        // add the track to the queue
        TrackPlayer.add(track);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const togglePlay = async (item: any) => {
    const currentItemIndex = mezmurs.findIndex(
      (mezmur) => mezmur.id === item.id
    );
    const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();

    if (currentTrackIndex === currentItemIndex) {
      if (playBackState.state === State.Playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    } else {
      await TrackPlayer.skip(currentItemIndex);
      await TrackPlayer.play();
    }

    setMezmurs((prevMezmurs) =>
      prevMezmurs.map((mezmur) => {
        // if the mezmur is the one we want to toggle
        if (mezmur.id === item.id) {
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

  useEffect(() => {
    TrackPlayer.getActiveTrackIndex().then((index) => {
      setMezmurs((prevMezmurs) => {
        return prevMezmurs.map((mezmur, i) => {
          if (i === index) {
            mezmur.isPlaying = playBackState.state === State.Playing;
          }
          return mezmur;
        });
      });
    });
  }, [playBackState]);

  return (
    <View className="p-3 h-full justify-between">
      <FlatList
        data={mezmurs}
        renderItem={({ item }) => (
          <MezmurListItem item={item} togglePlay={togglePlay} key={item.id} />
        )}
      />

      <View className="">
        <FloatingTrackControl />
      </View>
    </View>
  );
}
