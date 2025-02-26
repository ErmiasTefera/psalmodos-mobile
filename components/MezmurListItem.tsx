import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";
import React, { useEffect } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Play, Pause } from "lucide-react-native";
import { Link } from "expo-router";
import { usePlaybackState } from "react-native-track-player";
import useCurrentTrack from "~/hooks/useTrackPlayerEvents";

export default function MezmurListItem({ item, togglePlay }) {
  const playBackState = usePlaybackState();
  const currentTrack = useCurrentTrack();

  const PlaybackIcon = () => {
    if (item.isLoading) {
      return <ActivityIndicator size='small' color="white" />;
    }
    if (item.isPlaying) {
      return <Pause color={"white"} />;
    }

    return <Play color={"white"} fill={"#333"} />;
  };

  return (
    <Card className="w-full mt-2">
      <CardContent className="flex flex-row gap-3 p-3 items-center w-full">
        <TouchableOpacity
          className={"bg-black rounded-full p-3"}
          onPress={() => togglePlay(item)}
        >
          <PlaybackIcon />
        </TouchableOpacity>

        <View className="flex flex-1">
          <Link
            href={{
              pathname: "/mezmur-detail",
              params: { id: item.id, title: item.title },
            }}
          >
            <View className="flex flex-row justify-between w-full items-center">
              <View className="flex gap-1">
                <Text className="font-bold">{item.title}</Text>
                <Text className="text-gray-500">
                  {item.artist || "Unknown"}
                </Text>
              </View>
              <Text className="text-gray-500">{item.duration}</Text>
            </View>
          </Link>
        </View>
      </CardContent>
    </Card>
  );
}
