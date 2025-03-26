import { MMKV } from "react-native-mmkv";
import * as FileSystem from "expo-file-system";
import { getFullFilePath } from "./http-service";
export const storage = new MMKV();

// Helper functions
export const saveMezmur = (key: string, value: any) => {
  const mezmur = getMezmur(key);
  if (mezmur) {
    return;
  }
  storage.set(key, JSON.stringify(value));
};

export const saveMezmurFile = async (key: string, value: any): Promise<any> => {
  const mezmur = getMezmur(key);
  await downloadFile(
    getFullFilePath(value),
    value.audio_file_name
  );
  mezmur.isDownloaded = true;
  storage.set(key, JSON.stringify(mezmur));
  return new Promise((resolve) => resolve(mezmur));
};

export const getMezmur = (key: string) => {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
};

export const getAllLocalMezmurs = () => {
  const keys = storage.getAllKeys();
    // storage.clearAll(); 
  return keys.map((key) => getMezmur(key));
};

export const removeMezmur = (key: string) => storage.delete(key);

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
