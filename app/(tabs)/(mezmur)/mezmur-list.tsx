import { FlatList, View } from "react-native";
import React, { useEffect } from "react";
import MezmurListItem from "~/components/MezmurListItem";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import listOfMezmurs from "~/assets/data";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useNavigationSearch } from "~/hooks/useNavigationSearch";

export default function MezmurList() {
  const { title } = useLocalSearchParams();
  const navigation = useNavigation();
  const [mezmurs, setMezmurs] = React.useState(listOfMezmurs);
  const playBackState = usePlaybackState();

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Search Mezmur",
    },
  });

  const setPlayerTracks = async () => {
    try {
      const tracks = await TrackPlayer.getQueue();
      mezmurs.forEach((mezmur, index) => {
        const track = {
          id: mezmur.id,
          url: mezmur.url,
          title: mezmur.title,
          artist: mezmur.artist,
        };
        // if the track is already in the queue skip adding it
        if (tracks.find((track, trackIndex) => trackIndex === index)) {
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
          mezmur.isPlaying =
            i === index && playBackState.state === State.Playing;
          mezmur.isLoading = i === index && (playBackState.state === State.Buffering || playBackState.state === State.Loading);
          return mezmur;
        });
      });
    });
  }, [playBackState]);

  return (
    <View className="flex-1">
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        data={mezmurs}
        renderItem={({ item }) => (
          <MezmurListItem item={item} togglePlay={togglePlay} key={item.id} />
        )}
      />

      <View style={{
        		position: 'absolute',
            left: 8,
            right: 8,
            bottom: 78,
      }}>
      </View>
    </View>
  );
}
