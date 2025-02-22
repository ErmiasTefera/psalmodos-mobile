import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { SkipBack, Play, Pause, SkipForward } from "lucide-react-native";
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  State,
} from "react-native-track-player";
import mezmurs from "../../assets/data";

const MusicPlayer = () => {
  const mezmursCount = mezmurs.length;
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackTitle, setTrackTitle] = useState<string | undefined>();
  const [trackArtist, setTrackArtist] = useState<string | undefined>();

  const trackProgress = useProgress();
  const playBackState = usePlaybackState();

  const setupPlayer = async () => {
    try {
      await getTrackData();
      await TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setupPlayer();
  }, []);

  const getTrackData = async () => {
    let trackIndex = await TrackPlayer.getActiveTrackIndex();
    if (trackIndex == null) {
      return;
    }
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    if (trackObject === null || trackObject === undefined) {
      return;
    }
    setTrackIndex(trackIndex);
    setTrackTitle(trackObject.title);
    setTrackArtist(trackObject.artist);
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
      getTrackData();
    }
  };

  const skipToPrevious = async () => {
    if (trackIndex > 0) {
      await TrackPlayer.skipToPrevious();
      getTrackData();
    }
  };

  return (
    <View className="items-center bg-white p-5 rounded-lg shadow-md">
      {/* Track Progress Slider */}
      <Slider
        style={{ width: "100%", height: 20 }}
        minimumValue={0}
        maximumValue={trackProgress.duration}
        value={trackProgress.position}
        minimumTrackTintColor="#333"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#333"
        onSlidingComplete={async (value) => await TrackPlayer.seekTo(value)}
      />
      {/* Time Indicators */}
      <View className="flex-row justify-between w-full mt-1">
        <Text className="text-gray-700 text-sm">
          {formatTime(trackProgress.position)}
        </Text>
        <Text className="text-gray-700 text-sm">{`-${formatTime(
          trackProgress.duration - trackProgress.position
        )}`}</Text>
      </View>
      {/* Controls */}
      <View className="flex-row items-center justify-between w-1/2">
        <TouchableOpacity onPress={() => skipToPrevious()}>
          <SkipBack size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-800 w-16 h-16 rounded-full items-center justify-center"
          onPress={() => togglePlayBack()}
        >
          {playBackState.state === State.Playing ? (
            <Pause size={32} color="white" />
          ) : (
            <Play size={32} color="white" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => skipToNext()}>
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
