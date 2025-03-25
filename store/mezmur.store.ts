import TrackPlayer, { PlaybackState, State } from "react-native-track-player";
import { create } from "zustand";
import { Mezmur } from "~/models/mezmur.model";
import { getFullFilePath, getMezmursByCategory } from "~/services/http-service";

type MezmurStore = {
  isLoadingMezmurs: boolean;
  mezmurList: Mezmur[];
  error: any;
  currentMezmur: Mezmur | null;
  currentCategoryMezmurs: Mezmur[];
  fetchMezmurs: (categoryId: string) => void;
  setCurrentMezmur: (mezmur: Mezmur) => void;
  togglePlayState: (item: any) => void;
  handlePlaybackStateChange: (playbackState: PlaybackState | any, index: number | undefined) => void;
  filterMezmursByCategory: (categoryId: string) => void;
};

const useMezmurStore = create<MezmurStore>()((set) => ({
  isLoadingMezmurs: true,
  mezmurList: [],
  error: null,
  currentMezmur: null,
  currentCategoryMezmurs: [],
  fetchMezmurs: async (categoryId: string) => {
    const { data, error } = await getMezmursByCategory(categoryId);
    if (error) {
      set({ error, isLoadingMezmurs: false });
      return;
    }

    set({
      mezmurList: data,
      isLoadingMezmurs: false,
      currentCategoryMezmurs: data,
    });

        try {
          const tracks = await TrackPlayer.getQueue();
          data.forEach((mezmur, index) => {
            const track = {
              id: mezmur.id,
              url: getFullFilePath(mezmur.audio_file_path),
              title: mezmur.title,
              artist: mezmur.artist,
            };
            // if the track is already in the queue skip adding it
            if (tracks.find((track, trackIndex) => trackIndex === index)) {
              return;
            }
            // add the track to the queue
            TrackPlayer.add(track);
          });
        } catch (error) {
          console.log(error);
        }
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
      }
    });
  },
  handlePlaybackStateChange: (playbackState: PlaybackState | any, index: number  = -1) => {
    set((state) => {
      return {
        mezmurList: state.mezmurList.map((mezmur, i) => {
          mezmur.isPlaying =
            i === index && playbackState.state === State.Playing;
          mezmur.isLoading = i === index && (playbackState.state === State.Buffering || playbackState.state === State.Loading);
          return mezmur;
        })
      }
    });
  },
  filterMezmursByCategory: (categoryId: string = '') => {
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
}));

export default useMezmurStore;
