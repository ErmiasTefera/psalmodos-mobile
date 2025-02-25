import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react-native";

import TrackPlayer, {
  usePlaybackState,
  State,
} from "react-native-track-player";
import mezmurs from "../../assets/data";
import { useNavigation } from "expo-router";
import useCurrentTrack from "~/hooks/useTrackPlayerEvents";

const FloatingTrackControl = () => {
  const mezmursCount = mezmurs.length;
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackTitle, setTrackTitle] = useState<string | undefined>();
  const [trackId, setTrackId] = useState<string | undefined>();

  const playBackState = usePlaybackState();

  const currentTrack = useCurrentTrack();

  const navigation = useNavigation();

  const setupPlayer = async () => {
    try {
      await getTrackData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setupPlayer();
  }, [navigation, currentTrack]);

  const getTrackData = async () => {
    let trackIndex = await TrackPlayer.getActiveTrackIndex();
    if (trackIndex == null) {
      return;
    }
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    if (trackObject === null || trackObject === undefined) {
      return;
    }
    setTrackId(trackObject.id);
    setTrackIndex(trackIndex);
    setTrackTitle(trackObject.title);
  };

  const togglePlayBack = async () => {
    const activeTrack = await TrackPlayer.getActiveTrack();
    if (activeTrack != null) {
      if (
        playBackState.state == State.Paused ||
        playBackState.state == State.Ready
      ) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const skipToNext = async () => {
    if (trackIndex < mezmursCount - 1) {
      await TrackPlayer.skipToNext();
      await getTrackData();
      TrackPlayer.play();
    }
  };

  const skipToPrevious = async () => {
    if (trackIndex > 0) {
      await TrackPlayer.skipToPrevious();
      await getTrackData();
      TrackPlayer.play();
    }
  };

  // Navigate to Track Details
  const goToTrackDetails = () => {
    navigation.navigate("mezmur-detail", { id: trackId, title: trackTitle });
  };

  if (currentTrack === null && playBackState.state === State.None) {
    return null;
  }
  return (
    <TouchableOpacity onPress={goToTrackDetails} activeOpacity={0.8}>
      <View className="flex-row items-center bg-white shadow-md rounded-xl p-4 w-full">
        {/* Music Icon using Lucide */}
        <View className="w-12 h-12 bg-gray-100 rounded-lg items-center justify-center">
          <Music size={24} color="gray" />
        </View>

        {/* Track Name */}
        <Text className="text-gray-800 text-lg ml-3 flex-1">{trackTitle}</Text>

        {/* Controls */}
        <View className="flex-row items-center gap-4">
          {/* Previous Button */}
          <TouchableOpacity onPress={skipToPrevious}>
            <SkipBack size={24} color={trackIndex > 0 ? "#333" : "gray"} />
          </TouchableOpacity>

          {/* Play/Pause Button */}
          <TouchableOpacity
            onPress={togglePlayBack}
            className="bg-gray-800 w-10 h-10 rounded-full items-center justify-center"
          >
            {playBackState.state === State.Playing ? (
              <Pause size={24} color="white" />
            ) : (
              <Play size={24} color="white" />
            )}
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity onPress={skipToNext}>
            <SkipForward
              size={24}
              color={trackIndex === mezmursCount - 1 ? "gray" : "#333"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FloatingTrackControl;
