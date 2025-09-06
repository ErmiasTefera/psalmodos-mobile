import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  SkipBack,
  Play,
  Pause,
  SkipForward,
} from "lucide-react-native";
import { usePlaybackState } from "@/hooks/useTrackPlayerEvents";
import { audioService } from "@/services/audio.service";
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

  const togglePlayBack = async () => {
    const currentTrack = audioService.getCurrentTrack();
    if (currentTrack != null) {
      if (playBackState.isPlaying) {
        await audioService.pause();
      } else {
        await audioService.play();
      }
    }
  };

  const skipToNext = async () => {
    // For now, we'll implement basic next/previous functionality
    // You can enhance this with a proper queue system later
    console.log('Skip to next - implement queue system');
  };

  const skipToPrevious = async () => {
    // For now, we'll implement basic next/previous functionality
    // You can enhance this with a proper queue system later
    console.log('Skip to previous - implement queue system');
  };

  const PlaybackIcon = () => {
    if (playBackState.isLoading) {
      return <ActivityIndicator size='small' color="white" />;
    }
    if (playBackState.isPlaying) {
      return <Pause color={"white"} />;
    }
    return <Play color={"white"} fill={"#333"} />;
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
