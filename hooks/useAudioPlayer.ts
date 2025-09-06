import { AudioSource, AudioStatus, useAudioPlayer as useExpoAudioPlayer } from 'expo-audio';
import { useState, useEffect } from 'react';

export const useAudioPlayer = (audioSource: AudioSource) => {
  const player = useExpoAudioPlayer(audioSource);
  const [playbackState, setPlaybackState] = useState({
    isPlaying: false,
    isLoading: false,
    duration: 0,
    position: 0,
  });

  useEffect(() => {
    const subscription = player.addListener('playbackStatusUpdate', (status: AudioStatus) => {
      setPlaybackState({
        isPlaying: status.playing,
        isLoading: status.isBuffering,
        duration: status.duration,
        position: status.currentTime,
      });
    });

    return () => subscription?.remove();
  }, [player]);

  return {
    player,
    playbackState,
    play: () => player.play(),
    pause: () => player.pause(),
    seekTo: (position: number) => player.seekTo(position),
  };
};
