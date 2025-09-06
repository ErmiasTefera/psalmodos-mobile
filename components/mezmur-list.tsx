import { FlatList, View } from "react-native";
import React, { useEffect } from "react";
import MezmurListItem from "@/components/MezmurListItem";
import { audioService } from "@/services/audio.service";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import useMezmurStore from "@/store/mezmur.store";
import useCategoryStore from "@/store/category.store";



export default function MezmurList() {
  const { title, id } = useLocalSearchParams();
  const navigation = useNavigation();

  const {
    handlePlaybackStateChange,
    filterMezmursByCategory,
    currentCategoryMezmurs,
    mezmurList,
  } = useMezmurStore();
  const { selectedCategory } = useCategoryStore();

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Search Mezmur",
    },
  });

  useEffect(() => {
    filterMezmursByCategory("");
  }, []);

  useEffect(() => {
    if (title) {
      navigation.setOptions({ title: title });
    }
  }, [title, navigation]);

  useEffect(() => {
    // Remove TrackPlayer.getActiveTrackIndex() since we're using audioService now
    // The playback state is handled directly by audioService
    const currentTrack = audioService.getCurrentTrack();
    if (currentTrack) {
      const index = currentCategoryMezmurs.findIndex(m => m.id === currentTrack.id);
      const playBackState = audioService.getPlaybackState();
      handlePlaybackStateChange(playBackState, index);
    }
  }, [currentCategoryMezmurs, handlePlaybackStateChange]);

  return (
    <View className="flex-1 p-2">
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        data={currentCategoryMezmurs}
        renderItem={({ item }) => <MezmurListItem item={item} key={item.id} showDownload={true} />}
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
