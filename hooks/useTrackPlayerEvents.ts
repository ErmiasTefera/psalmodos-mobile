import React, { useState } from "react";
import { useTrackPlayerEvents, Event, Track } from "react-native-track-player";

const useCurrentTrack = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event: { index: number, track: Track}) => {
    setCurrentTrack(event.track);
  });

  return currentTrack;
};

export default useCurrentTrack;
