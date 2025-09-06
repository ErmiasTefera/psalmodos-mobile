import { memo } from "react";
import { Text, View, ViewProps } from "react-native";
import Slider from "@react-native-community/slider";
import { usePlaybackState } from "@/hooks/useTrackPlayerEvents";
import { audioService } from "@/services/audio.service";
import { formatTime } from "~/helpers/miscellaneous";

export const PlayerProgressBar = memo(({ style }: ViewProps) => {
  const playbackState = usePlaybackState();

  return (
    <View style={style}>
      {/* Track Progress Slider */}
      <Slider
        style={{ width: "100%", height: 20 }}
        minimumValue={0}
        maximumValue={playbackState.duration}
        value={playbackState.position}
        minimumTrackTintColor="#333"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#333"
        tapToSeek={true}
        onValueChange={async (value) => await audioService.seekTo(value)}
        onSlidingComplete={async (value) => await audioService.seekTo(value)}
      />
      {/* Time Indicators */}
      <View className="flex-row justify-between w-full mt-1">
        <Text className="text-gray-700 text-sm">
          {formatTime(playbackState.position)}
        </Text>
        <Text className="text-gray-700 text-sm">{`-${formatTime(
          playbackState.duration - playbackState.position
        )}`}</Text>
      </View>
    </View>
  );
});
