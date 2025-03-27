import React from "react";
import { View } from "react-native";
import { PlayerProgressBar } from "@/components/PlayerProgressbar";
import PlayerControls from "@/components/PlayerControls";
import { PlayerVolumeBar } from "@/components/PlayerVolumeBar";

const MusicPlayer = () => {
  return (
    <View className="items-center pt-5 ">
      {/* Track Progress Slider */}
      <PlayerProgressBar style={{ width: "100%" }} />

      {/* Controls */}
      <PlayerControls />

      {/* Volume Control */}
      <PlayerVolumeBar style={{ marginTop: 30}} />
    </View>
  );
};

export default MusicPlayer;
