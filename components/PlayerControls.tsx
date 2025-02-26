import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  SkipBack,
  Play,
  Pause,
  SkipForward,
} from "lucide-react-native";
import TrackPlayer, {
  usePlaybackState,
  State,
} from "react-native-track-player";
import mezmurs from "~/assets/data";

const PlayerControls = ({iconSize = 32, playButtonClass = 'w-16 h-16', containerClass = 'justify-between w-1/2', loaderSize="large"}) => {
  const mezmursCount = mezmurs.length;
  const [trackIndex, setTrackIndex] = useState(0);
  const playBackState = usePlaybackState();

  const setupPlayer = async () => {
    try {
      await getTrackData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setupPlayer();
  }, []);

  const getTrackData = async () => {
    let currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
    if (currentTrackIndex == null) {
      return;
    }
    let trackObject = await TrackPlayer.getTrack(currentTrackIndex);
    if (trackObject === null || trackObject === undefined) {
      return;
    }
    setTrackIndex(currentTrackIndex);
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

  const PlaybackIcon = () => {
    if (playBackState.state === State.Playing) {
      return <Pause size={iconSize} color="white" />;
    } else if (playBackState.state === State.Paused) {
      return <Play size={iconSize} color="white" />;
    } else {
      return <ActivityIndicator size={loaderSize} color="white" />;
    }
  };

  return (
    <View className={"flex-row items-center " + containerClass}>
      <TouchableOpacity onPress={() => skipToPrevious()}>
        <SkipBack size={iconSize} color={trackIndex > 0 ? "#333" : "gray"} />
      </TouchableOpacity>
      <TouchableOpacity
        className={"bg-gray-800 rounded-full items-center justify-center " + playButtonClass}
        onPress={() => togglePlayBack()}
      >
        <PlaybackIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => skipToNext()}>
        <SkipForward
          size={iconSize}
          color={trackIndex === mezmursCount - 1 ? "gray" : "#333"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PlayerControls;
