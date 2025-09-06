import "../global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { PortalHost } from "@rn-primitives/portal";
import { Appearance, Platform, Text, useColorScheme, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useCategoryStore from "@store/category.store";
import useMezmurStore from "@/store/mezmur.store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Audio service is initialized automatically

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const {isLoadingCategories, fetchCategories} = useCategoryStore();

  const {isLoadingMezmurs, fetchMezmurs} = useMezmurStore();

  const { setupAudioListeners } = useMezmurStore();

  useEffect(() => {
    // Initialize audio service and setup listeners
    setupAudioListeners();
    fetchCategories();
    fetchMezmurs(''); // fetch all mezmurs
  }, []);

  useEffect(() => {
    Appearance.setColorScheme("light");
    if (loaded && !isLoadingCategories && !isLoadingMezmurs) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoadingCategories, isLoadingMezmurs]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen
            name="mezmur-detail"
            options={{
              orientation: "portrait",
              presentation: "card",
              gestureEnabled: true,
              gestureDirection: "vertical",
              animationDuration: 400,
              headerShown: Platform.OS !== "ios",
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <PortalHost />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
