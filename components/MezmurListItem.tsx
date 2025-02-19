import { View } from "react-native";
import { Text } from "~/components/ui/text";
import React from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Play, Pause } from "lucide-react-native";
import { Link } from "expo-router";
import { usePlaybackState } from "react-native-track-player";

export default function MezmurListItem({ item, togglePlay }) {
  return (
    <Card className="w-full mt-2">
      <CardContent className="flex flex-row gap-3 p-3 items-center w-full">
        <View className="flex flex-row gap-3 items-center">
          {item.isPlaying ? (
            <View
              className="border bg-black border-black rounded-full p-3 items-center"
              onTouchEnd={() => togglePlay(item)}
            >
              <Pause color={"white"} />
            </View>
          ) : (
            <View
              className="border border-black bg-black rounded-full p-3 items-center"
              onTouchEnd={() => togglePlay(item)}
            >
              <Play color={"white"} fill={'#333'} />
            </View>
          )}
        </View>

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
              <Text className="text-gray-500">{item.artist || 'Unknown'}</Text>
            </View>
            <Text className="text-gray-500">{item.duration}</Text>
          </View>
        </Link>
        </View>

      </CardContent>
    </Card>
  );
}
