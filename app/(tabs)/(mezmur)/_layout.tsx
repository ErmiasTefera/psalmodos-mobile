import { Stack } from "expo-router";
export default function MezmurScreenLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
      <Stack.Screen name="mezmur-list" options={{ title: "Mezmurs" }} />
    </Stack>
  );
}
