import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";
import React, { useEffect } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Play, Pause } from "lucide-react-native";
import { Link } from "expo-router";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import { formatDuration } from "~/lib/utils";
import useMezmurStore from "~/store/mezmur.store";
import { useCurrentTrack } from "~/hooks/useTrackPlayerEvents";
import Feather from "@expo/vector-icons/Feather";

export default function MezmurListItem({
  item,
  showDownload,
}: {
  item: any;
  showDownload?: boolean;
}) {
  const playBackState = usePlaybackState();
  const currentTrack = useCurrentTrack();
  const { mezmurList, togglePlayState, saveMezmurFile } = useMezmurStore();
  const [downloadState, setDownloadState] = React.useState({
    isDownloading: false,
    isDownloaded: false,
  });

  const PlaybackIcon = () => {
    if (currentTrack && currentTrack.id === item.id) {
      if (
        playBackState.state === State.Buffering ||
        playBackState.state === State.Loading
      ) {
        return <ActivityIndicator size="small" color="white" />;
      }
      if (playBackState.state === State.Playing) {
        return <Pause color={"white"} />;
      }
    }
    return <Play color={"white"} fill={"#333"} />;
  };

  const handleTogglePlay = async () => {
    const currentItemIndex = mezmurList.findIndex(
      (mezmur) => mezmur.id === item.id
    );
    const currentTrack = await TrackPlayer.getActiveTrack();

    if (item.id === currentTrack?.id) {
      if (playBackState.state === State.Playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    } else {
      await TrackPlayer.skip(currentItemIndex);
      await TrackPlayer.play();
    }

    togglePlayState(item);
  };

  const handleDownload = () => {
    setDownloadState({ isDownloading: true, isDownloaded: false });
    saveMezmurFile(item.id, item)
      .then(() => {
        setDownloadState({ isDownloading: false, isDownloaded: true });
      })
      .catch(() => {
        setDownloadState({ isDownloading: false, isDownloaded: false });
      });
  };

  return (
    <Card className="w-full mt-2">
      <CardContent className="flex flex-row gap-3 p-3 items-center w-full">
        <TouchableOpacity
          className={"bg-black rounded-full p-3"}
          onPress={() => handleTogglePlay()}
        >
          <PlaybackIcon />
        </TouchableOpacity>

        <View className="flex flex-1">
          <View className="flex flex-row justify-between w-full items-center">
            <Link
              className="flex-1"
              href={{
                pathname: "/mezmur-detail",
                params: { id: item.id, title: item.title },
              }}
            >
              <View className="flex gap-1">
                <Text className="font-bold">{item.title}</Text>
                <Text className="text-gray-500">
                  {formatDuration(item.duration)}
                </Text>
              </View>
            </Link>
            {showDownload && !item.isDownloaded && (
              <TouchableOpacity onPress={() => handleDownload()}>
                {!downloadState.isDownloaded && !downloadState.isDownloading && <Feather name="download-cloud" size={22} color="gray" />}
                {downloadState.isDownloading && <ActivityIndicator size="small" color="gray" />}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
