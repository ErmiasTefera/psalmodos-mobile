import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from "expo-file-system";
import { getFullFilePath } from "./http-service";

// Helper functions
export const saveMezmur = async (key: string, value: any) => {
  const mezmur = await getMezmur(key);
  if (mezmur) {
    return;
  }
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const saveMezmurFile = async (key: string, value: any): Promise<any> => {
  const mezmur = await getMezmur(key);
  await downloadFile(
    getFullFilePath(value),
    value.audio_file_name
  );
  mezmur.isDownloaded = true;
  await AsyncStorage.setItem(key, JSON.stringify(mezmur));
  return new Promise((resolve) => resolve(mezmur));
};

export const getMezmur = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const getAllLocalMezmurs = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const mezmurs = await Promise.all(
    keys.map(async (key) => await getMezmur(key))
  );
  return mezmurs.filter(mezmur => mezmur !== null);
};

export const removeMezmur = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export const downloadFile = async (url: string, filename: string) => {
  try {
    // Define the local file path
    const fileUri = `${FileSystem.documentDirectory}${filename}`;

    // Start downloading
    const { uri } = await FileSystem.downloadAsync(url, fileUri);
    return uri;
  } catch (error) {
    console.error("Download failed:", error);
    return null;
  }
};
