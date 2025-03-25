import React, { useState } from "react";
import { useTrackPlayerEvents, Event, Track } from "react-native-track-player";
import { TrackObject } from "~/models/common.model";

export const useCurrentTrack = () => {
  const [currentTrack, setCurrentTrack] = useState<TrackObject | null>(null);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event: any) => {
    setCurrentTrack({
      ...event.track,
      id: event.track.id,
    });
  });

  return currentTrack;
};