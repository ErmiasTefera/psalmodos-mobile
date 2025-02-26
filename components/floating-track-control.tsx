import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Music } from "lucide-react-native";

import TrackPlayer, {
  usePlaybackState,
  State,
} from "react-native-track-player";
import mezmurs from "~/assets/data";
import { useNavigation } from "expo-router";
import useCurrentTrack from "~/hooks/useTrackPlayerEvents";
import PlayerControls from "~/components/PlayerControls";

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
    <TouchableOpacity onPress={goToTrackDetails} activeOpacity={0.8}
    style={{
      position: 'absolute',
      left: 8,
      right: 8,
      bottom: 88,
    }}>
      <View className="flex-row items-center bg-gray-200 shadow-md rounded-xl p-4 w-full">
        {/* Music Icon using Lucide */}
        <View className="w-12 h-12 bg-gray-100 rounded-lg items-center justify-center">
          <Music size={24} color="gray" />
        </View>
        
        {/* Track Name */}
        <Text className="text-gray-800 text-lg ml-3 flex-1">{trackTitle}</Text>

        {/* Controls */}
        <PlayerControls iconSize={24} playButtonClass="w-10 h-10" containerClass="gap-4" loaderSize="small"/>
      </View>
    </TouchableOpacity>
  );
};

export default FloatingTrackControl;
