import React, { useState, useEffect } from "react";
import { audioService } from "@/services/audio.service";
import { TrackObject } from "@/models/common.model";

export const useCurrentTrack = () => {
  const [currentTrack, setCurrentTrack] = useState<TrackObject | null>(null);

  useEffect(() => {
    const unsubscribe = audioService.addListener((event, data) => {
      if (event === 'loaded' || event === 'status') {
        setCurrentTrack(audioService.getCurrentTrack());
      }
    });

    return unsubscribe;
  }, []);

  return currentTrack;
};

export const usePlaybackState = () => {
  const [playbackState, setPlaybackState] = useState(audioService.getPlaybackState());

  useEffect(() => {
    const unsubscribe = audioService.addListener((event, data) => {
      if (event === 'status' || event === 'play' || event === 'pause') {
        setPlaybackState(audioService.getPlaybackState());
      }
    });

    return unsubscribe;
  }, []);

  return playbackState;
};