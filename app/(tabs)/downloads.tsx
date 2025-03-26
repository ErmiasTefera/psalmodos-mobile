import { FlatList, Text, View } from "react-native";
import React, { useEffect } from "react";
import MezmurListItem from "~/components/MezmurListItem";
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useNavigationSearch } from "~/hooks/useNavigationSearch";
import useMezmurStore from "~/store/mezmur.store";
import { useNavigationState } from "@react-navigation/native";

export default function DownloadsScreen() {
  const { title, id } = useLocalSearchParams();
  const navigation = useNavigation();
  const playBackState = usePlaybackState();
  const state = useNavigationState((state) => state);

  const {
    handlePlaybackStateChange,
    downloadedMezmurs,
    fetchDownloadedMezmurs
  } = useMezmurStore();

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Search Mezmur",
    },
  });

  useEffect(() => {
    fetchDownloadedMezmurs();
  }, []);

  useEffect(() => {
    if (title) {
      navigation.setOptions({ title: title });
    }
  }, [title, navigation]);

  useEffect(() => {
    TrackPlayer.getActiveTrackIndex().then((index) => {
      handlePlaybackStateChange(playBackState, index);
    });
  }, [playBackState]);

  return (
    <View className="flex-1 p-2">
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        data={downloadedMezmurs}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center pt-14">
            <Text className="text-center">
              You have not downloaded any mezmurs yet
            </Text>
          </View>
        )}
        renderItem={({ item }) => <MezmurListItem item={item} key={item.id} />}
      />

      <View
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          bottom: 78,
        }}
      ></View>
    </View>
  );
}
