import { create } from "zustand";
import { Mezmur } from "@/models/mezmur.model";
import { getFullFilePath, getMezmursByCategory } from "@/services/http-service";
import {
  getAllLocalMezmurs,
  getMezmur,
  removeMezmur,
  saveMezmur,
  saveMezmurFile,
} from "@/services/storage.service";
import { audioService } from "@/services/audio.service";
import * as FileSystem from "expo-file-system";

type MezmurStore = {
  isLoadingMezmurs: boolean;
  mezmurList: Mezmur[];
  error: any;
  currentMezmur: Mezmur | null;
  currentCategoryMezmurs: Mezmur[];
  fetchMezmurs: (categoryId: string) => void;
  setCurrentMezmur: (mezmur: Mezmur) => void;
  togglePlayState: (item: any) => void;
  handlePlaybackStateChange: (
    playbackState: any,
    index: number | undefined
  ) => void;
  filterMezmursByCategory: (categoryId: string) => void;
  saveMezmur: (key: string, value: any) => void;
  getMezmur: (key: string) => any;
  fetchLocalMezmurs: () => void;
  fetchDownloadedMezmurs: () => void;
  removeMezmur: (key: string) => void;
  saveMezmurFile: (key: string, value: any) => Promise<any>;
  savedMezmurs: Mezmur[];
  downloadedMezmurs: Mezmur[];
  setupAudioListeners: () => void;
};

const useMezmurStore = create<MezmurStore>()((set) => ({
  isLoadingMezmurs: true,
  mezmurList: [],
  error: null,
  currentMezmur: null,
  currentCategoryMezmurs: [],
  fetchMezmurs: async (categoryId: string) => {
    const localMezmurs = await getAllLocalMezmurs();
    let mezmurs = [];
    const { data, error } = await getMezmursByCategory(categoryId);
    if (error) {
      // show error message
      set({ error });
      console.log(error); 
      // if there is an error fetching mezmurs, use the local mezmurs
      mezmurs = localMezmurs;
    } else {
      data.forEach((mezmur) => {
        const localMezmur = localMezmurs.find( (localMezmur) => localMezmur.id === mezmur.id );
        if (localMezmur) {
          mezmur.isDownloaded = localMezmur.isDownloaded ? localMezmur.isDownloaded : false;
        }
      });
      mezmurs = data;
    }

    // Update to handle async saveMezmur
    await Promise.all(mezmurs.map((mezmur) => saveMezmur(mezmur.id, mezmur)));

    set({
      mezmurList: mezmurs,
      isLoadingMezmurs: false,
      currentCategoryMezmurs: mezmurs,
    });

    setupAudioListeners();
  },
  setCurrentMezmur: (mezmur: Mezmur) => {
    set({ currentMezmur: mezmur });
  },
  togglePlayState: (item: any) => {
    set((state) => {
      return {
        currentCategoryMezmurs: state.currentCategoryMezmurs.map((mezmur) => {
          // if the mezmur is the one we want to toggle
          if (mezmur.id === item.id) {
            mezmur.isPlaying = !mezmur.isPlaying;
          } else {
            // if the mezmur is not the one we want to toggle
            mezmur.isPlaying = false;
          }
          return mezmur;
        }),
        currentMezmur: item,
      };
    });
  },
  handlePlaybackStateChange: (
    playbackState: any,
    index: number = -1
  ) => {
    set((state) => {
      return {
        mezmurList: state.mezmurList.map((mezmur, i) => {
          mezmur.isPlaying =
            i === index && playbackState.isPlaying;
          mezmur.isLoading =
            i === index &&
            (playbackState.isBuffering ||
              playbackState.isLoading);
          return mezmur;
        }),
      };
    });
  },
  filterMezmursByCategory: (categoryId: string = "") => {
    set((state) => {
      return {
        currentCategoryMezmurs:
          categoryId === ""
            ? state.mezmurList
            : state.mezmurList.filter(
                (mezmur) => mezmur.category_id === categoryId
              ),
      };
    });
  },
  saveMezmur: async (key: string, value: any) => {
    await saveMezmur(key, value);
    const mezmurs = await getAllLocalMezmurs();
    set({ savedMezmurs: mezmurs });
  },
  getMezmur: async (key: string) => {
    return await getMezmur(key);
  },
  removeMezmur: async (key: string) => {
    await removeMezmur(key);
    const mezmurs = await getAllLocalMezmurs();
    set({ mezmurList: mezmurs });
  },
  fetchLocalMezmurs: () => {
    const mezmurs = getAllLocalMezmurs();
    set({ savedMezmurs: mezmurs });
  },
  fetchDownloadedMezmurs: () => {
    const mezmurs = getAllLocalMezmurs();
    set({ downloadedMezmurs: prepareDownloadedMezmurs(mezmurs) });
  },
  saveMezmurFile: async (key: string, value: any): Promise<any> => {
    const result = await saveMezmurFile(key, value);
    if (result) {
      const mezmurs = await getAllLocalMezmurs();
      set({
        savedMezmurs: mezmurs,
        downloadedMezmurs: prepareDownloadedMezmurs(mezmurs),
      });
    }
    return result;
  },
  savedMezmurs: [],
  downloadedMezmurs: [],
  setupAudioListeners: () => {
    audioService.addListener((event, data) => {
      if (event === 'playback-status-update') {
        // Handle playback status updates
        console.log('Playback status:', data);
      }
    });
  },
}));

const prepareDownloadedMezmurs = (mezmurs: Mezmur[]) => {
  return mezmurs
    .filter((mezmur) => mezmur.isDownloaded)
    .map((mezmur) => {
      mezmur.audio_file_path = `${FileSystem.documentDirectory}${mezmur.audio_file_name}`;
      return mezmur;
    });
};


export default useMezmurStore;
