import TrackPlayer, { PlaybackState, State } from "react-native-track-player";
import { create } from "zustand";
import { Mezmur } from "~/models/mezmur.model";
import { getFullFilePath, getMezmursByCategory } from "~/services/http-service";
import {
  getAllLocalMezmurs,
  getMezmur,
  removeMezmur,
  saveMezmur,
  saveMezmurFile,
} from "~/services/storage.service";
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
    playbackState: PlaybackState | any,
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
};

const useMezmurStore = create<MezmurStore>()((set) => ({
  isLoadingMezmurs: true,
  mezmurList: [],
  error: null,
  currentMezmur: null,
  currentCategoryMezmurs: [],
  fetchMezmurs: async (categoryId: string) => {
    const localMezmurs = getAllLocalMezmurs();
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
          console.log("Local mezmur found", localMezmur); 
          mezmur.isDownloaded = localMezmur.isDownloaded ? localMezmur.isDownloaded : false;
        }
      });
      mezmurs = data;
      console.log("Fetched mezmurs", mezmurs);
    }

    mezmurs.forEach((mezmur) => {
      saveMezmur(mezmur.id, mezmur);
    });

    set({
      mezmurList: mezmurs,
      isLoadingMezmurs: false,
      currentCategoryMezmurs: mezmurs,
    });

    setTracksQueue(mezmurs);
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
    playbackState: PlaybackState | any,
    index: number = -1
  ) => {
    set((state) => {
      return {
        mezmurList: state.mezmurList.map((mezmur, i) => {
          mezmur.isPlaying =
            i === index && playbackState.state === State.Playing;
          mezmur.isLoading =
            i === index &&
            (playbackState.state === State.Buffering ||
              playbackState.state === State.Loading);
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
  saveMezmur: (key: string, value: any) => {
    saveMezmur(key, value);
    const mezmurs = getAllLocalMezmurs();
    set({ savedMezmurs: mezmurs });
  },
  getMezmur: (key: string) => {
    return getMezmur(key);
  },
  removeMezmur: (key: string) => removeMezmur(key),
  fetchLocalMezmurs: () => {
    const mezmurs = getAllLocalMezmurs();
    set({ savedMezmurs: mezmurs });
  },
  fetchDownloadedMezmurs: () => {
    const mezmurs = getAllLocalMezmurs();
    set({ downloadedMezmurs: prepareDownloadedMezmurs(mezmurs) });
  },
  saveMezmurFile: async (key: string, value: any): Promise<any> => {
    const result = saveMezmurFile(key, value);
    result.then(() => {
      const mezmurs = getAllLocalMezmurs();
      set({
        savedMezmurs: mezmurs,
        downloadedMezmurs: prepareDownloadedMezmurs(mezmurs),
      });
    });
    return result;
  },
  savedMezmurs: [],
  downloadedMezmurs: [],
}));

const prepareDownloadedMezmurs = (mezmurs: Mezmur[]) => {
  return mezmurs
    .filter((mezmur) => mezmur.isDownloaded)
    .map((mezmur) => {
      mezmur.audio_file_path = `${FileSystem.documentDirectory}${mezmur.audio_file_name}`;
      return mezmur;
    });
};

const setTracksQueue = async (mezmurs: Mezmur[]) => {
  try {
    const tracks = await TrackPlayer.getQueue();

    mezmurs.forEach((mezmur, index) => {
      const trackInfo = {
        id: mezmur.id,
        url: getFullFilePath(mezmur),
        title: mezmur.title,
        artist: mezmur.artist,
      };
      
      /**
       if the track is already in the queue skip adding it
      */
     const existingTrack = tracks.find((track) => track.id === mezmur.id);
      if (existingTrack) {
        return;
      }
      console.log("Adding track to queue", trackInfo);
      // add the track to the queue
      TrackPlayer.add(trackInfo);
    });
  } catch (error) {
    console.log(error);
  }
};

export default useMezmurStore;
