import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import {
  SkipBack,
  Play,
  Pause,
  SkipForward,
} from "lucide-react-native";

const MusicPlayer = () => {
  const [trackProgress, setTrackProgress] = useState(177);
  const trackDuration = 280; // Example: 3 minutes (180 seconds)
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => setIsPlaying(!isPlaying);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying) {
      interval = setInterval(() => {
        setTrackProgress((prev) => {
          if (prev < trackDuration) {
            return prev + 1;
          } else {
            clearInterval(interval!);
            return prev;
          }
        });
      }, 1000);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval!);
  }, [isPlaying]);

  return (
    <View className="items-center bg-white p-5 rounded-lg shadow-md">
      {/* Track Progress Slider */}
      <Slider
        style={{ width: "100%", height: 20 }}
        minimumValue={0}
        maximumValue={trackDuration}
        value={trackProgress}
        minimumTrackTintColor="#333"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#333"
        onValueChange={(value) => setTrackProgress(value)}
      />
      {/* Time Indicators */}
      <View className="flex-row justify-between w-full mt-1">
        <Text className="text-gray-700 text-sm">
          {formatTime(trackProgress)}
        </Text>
        <Text className="text-gray-700 text-sm">{`-${formatTime(
          trackDuration - trackProgress
        )}`}</Text>
      </View>
      {/* Controls */}
      <View className="flex-row items-center justify-between w-1/2">
        <TouchableOpacity>
          <SkipBack size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-800 w-16 h-16 rounded-full items-center justify-center"
          onPress={togglePlayPause}
        >
          {isPlaying ? (
            <Pause size={32} color="white" />
          ) : (
            <Play size={32} color="white" />
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <SkipForward size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Helper function to format time
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export default MusicPlayer;
