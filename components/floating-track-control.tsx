import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Music } from "lucide-react-native";

import { audioService } from "@/services/audio.service";
import { useNavigation } from "expo-router";
import { useCurrentTrack } from "~/hooks/useTrackPlayerEvents";
import PlayerControls from "~/components/PlayerControls";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FloatingTrackControl = () => {
  const [trackTitle, setTrackTitle] = useState<string | undefined>();
  const [trackId, setTrackId] = useState<string | undefined>();

  const currentTrack = useCurrentTrack();

  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();

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
    const currentTrack = audioService.getCurrentTrack();
    if (currentTrack) {
      setTrackId(currentTrack.id);
      setTrackTitle(currentTrack.title);
    }
  };

  // Navigate to Track Details
  const goToTrackDetails = () => {
    navigation.navigate('mezmur-detail', { id: trackId, title: trackTitle });
  };

  return (
    <TouchableOpacity onPress={goToTrackDetails} activeOpacity={0.8}
    style={{
      position: 'absolute',
      left: 8,
      right: 8,
      bottom: bottom + 60,
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
