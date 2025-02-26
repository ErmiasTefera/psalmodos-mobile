import { memo } from "react";
import { Text, View, ViewProps } from "react-native";
import Slider from "@react-native-community/slider";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { formatTime } from "~/helpers/miscellaneous";

export const PlayerProgressBar = memo(({ style }: ViewProps) => {
  const trackProgress = useProgress(0);

  return (
    <View style={style}>
      {/* Track Progress Slider */}
      <Slider
        style={{ width: "100%", height: 20 }}
        minimumValue={0}
        maximumValue={trackProgress.duration}
        value={trackProgress.position}
        minimumTrackTintColor="#333"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#333"
        tapToSeek={true}
        onValueChange={async (value) => await TrackPlayer.seekTo(value)}
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
    </View>
  );
});
