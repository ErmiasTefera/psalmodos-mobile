import { FlatList, View } from "react-native";
import React, { useEffect } from "react";
import MezmurListItem from "~/components/MezmurListItem";
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useNavigationSearch } from "~/hooks/useNavigationSearch";
import useMezmurStore from "~/store/mezmur.store";
import { useNavigationState } from "@react-navigation/native";
import useCategoryStore from "~/store/category.store";

export default function MezmurList() {
  const { title, id } = useLocalSearchParams();
  const navigation = useNavigation();
  const playBackState = usePlaybackState();
  const state = useNavigationState((state) => state);

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
    const currentRoute = state.routes[state.index]?.name;
    if (currentRoute === "playlist") {
      // get all mezmurs
      filterMezmursByCategory("");
    } else {
      // filter by current category
      filterMezmursByCategory(selectedCategory?.id || "");
    }
  }, [state]);

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
    <View className="flex-1">
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        data={currentCategoryMezmurs}
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
