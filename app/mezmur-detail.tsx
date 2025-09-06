import { useLocalSearchParams, useNavigation } from "expo-router";

import { ScrollView, View, StyleSheet, Platform } from "react-native";
import { Text } from "@/components/ui/text";
import MusicPlayer from "../components/player";
import { useEffect, useState } from "react";
import { audioService } from "@/services/audio.service";
import { useCurrentTrack } from "@/hooks/useTrackPlayerEvents";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fontSize, screenPadding } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import useMezmurStore from "@/store/mezmur.store";

export default function MezmurDetailScreen() {
  const { id, title } = useLocalSearchParams();
  const navigation = useNavigation();
  const [mezmur, setMezmurDetail] = useState<any>({});
  const currentTrack = useCurrentTrack();
  const { top } = useSafeAreaInsets();
  const { currentCategoryMezmurs } = useMezmurStore();

  useEffect(() => {
    if (id) {
      getMezmurDetail();
    }
    navigation.setOptions({ title: title });
  }, [id, title]);

  useEffect(() => {
    const currentTrack = audioService.getCurrentTrack();
    if (currentTrack) {
      const mezmur = currentCategoryMezmurs.find(m => m.id === currentTrack.id);
      if (mezmur) {
        setMezmurDetail(mezmur);
      }
    }
  }, [currentTrack, currentCategoryMezmurs]);

  const getMezmurDetail = () => {
    currentCategoryMezmurs.find((mezmur) => {
      if (mezmur.id === id) {
        setMezmurDetail(mezmur);
        return mezmur;
      }
    });
  };

  const setCurrentMezmur = async () => {
    if (mezmur) {
      const currentTrack = audioService.getCurrentTrack();
      // if the current track is not the same as the current item
      if (!currentTrack || currentTrack.id !== mezmur.id) {
        await audioService.loadTrack({
          id: mezmur.id,
          url: mezmur.audio_file_path,
          title: mezmur.title,
          artist: mezmur.artist,
        });
        await audioService.play();
      }
    }
  };

  useEffect(() => {
    setCurrentMezmur();
  }, [mezmur]);

  return (
    <View className="flex-1">
      <View style={styles.overlayContainer}>
        {Platform.OS === "ios" && <DismissPlayerSymbol />}
        <View
          className="flex-1"
          style={Platform.OS === "ios" ? { marginTop: top + 20, marginBottom: top } : {}}
        >
          {Platform.OS === "ios" && <Text className="text-gray-800 text-2xl underline">{mezmur?.title}</Text>}
 
          <View className="flex-1 border-1">
          <ScrollView>
            <Text className="text-xl">{mezmur?.lyrics}</Text>
          </ScrollView>
          </View>
          <MusicPlayer />
        </View>
      </View>
    </View>
  );
}

const DismissPlayerSymbol = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        top: top + 8,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View
        accessible={false}
        style={{
          width: 50,
          height: 8,
          borderRadius: 8,
          backgroundColor: "#000",
          opacity: 0.7,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: "rgb(255, 255, 255)",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    color: "white",
  },
  artworkImageContainer: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 11.0,
    flexDirection: "row",
    justifyContent: "center",
    height: "45%",
  },
  artworkImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: 22,
    fontWeight: "700",
  },
  trackArtistText: {
    ...defaultStyles.text,
    fontSize: fontSize.base,
    opacity: 0.8,
    maxWidth: "90%",
  },
  panelContainer: {
    flex: 1,
    // backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 8,
    // paddingHorizontal: 16,
    paddingLeft: 8,
    marginBottom: 16,
  },
  closeButton: {
    // marginTop: 16,
    // backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingRight: 8,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
