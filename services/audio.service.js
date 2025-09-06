// Note: expo-audio requires a development build
// The actual player will be created by components using the useAudioPlayer hook

class AudioService {
  constructor() {
    this.currentPlayer = null;
    this.currentTrack = null;
    this.isPlaying = false;
    this.isLoading = false;
    this.duration = 0;
    this.position = 0;
    this.volume = 1.0;
    this.listeners = [];
  }

  async loadTrack(track) {
    try {
      this.isLoading = true;
      this.notifyListeners('loading', { isLoading: true });

      // Store track info
      this.currentTrack = track;
      this.isLoading = false;
      this.notifyListeners('loaded', { track, isLoading: false });

      console.log('Track loaded:', track.title);

    } catch (error) {
      console.log('Error loading track:', error);
      this.isLoading = false;
      this.notifyListeners('error', { error, isLoading: false });
    }
  }

  async play() {
    try {
      if (this.currentPlayer) {
        await this.currentPlayer.play();
        this.isPlaying = true;
        this.notifyListeners('play', { isPlaying: true });
      }
    } catch (error) {
      console.log('Error playing track:', error);
      this.notifyListeners('error', { error });
    }
  }

  async pause() {
    try {
      if (this.currentPlayer) {
        await this.currentPlayer.pause();
        this.isPlaying = false;
        this.notifyListeners('pause', { isPlaying: false });
      }
    } catch (error) {
      console.log('Error pausing track:', error);
      this.notifyListeners('error', { error });
    }
  }

  async stop() {
    try {
      if (this.currentPlayer) {
        await this.currentPlayer.stop();
        this.isPlaying = false;
        this.position = 0;
        this.notifyListeners('stop', { isPlaying: false, position: 0 });
      }
    } catch (error) {
      console.log('Error stopping track:', error);
      this.notifyListeners('error', { error });
    }
  }

  async seekTo(position) {
    try {
      if (this.currentPlayer) {
        await this.currentPlayer.seekTo(position);
        this.position = position;
        this.notifyListeners('seek', { position });
      }
    } catch (error) {
      console.log('Error seeking track:', error);
      this.notifyListeners('error', { error });
    }
  }

  async setVolume(volume) {
    try {
      this.volume = volume;
      if (this.currentPlayer) {
        await this.currentPlayer.setVolume(volume);
        this.notifyListeners('volume', { volume });
      }
    } catch (error) {
      console.log('Error setting volume:', error);
      this.notifyListeners('error', { error });
    }
  }

  onPlaybackStatusUpdate(status) {
    this.duration = status.duration;
    this.position = status.currentTime;
    this.isPlaying = status.isPlaying;
    this.isLoading = status.isBuffering;

    this.notifyListeners('status', {
      duration: this.duration,
      position: this.position,
      isPlaying: this.isPlaying,
      isLoading: this.isLoading,
    });

    if (status.didJustFinish) {
      this.isPlaying = false;
      this.position = 0;
      this.notifyListeners('finished', {
        isPlaying: false,
        position: 0,
      });
    }
  }

  addListener(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  notifyListeners(event, data) {
    this.listeners.forEach(listener => {
      try {
        listener(event, data);
      } catch (error) {
        console.log('Error in listener:', error);
      }
    });
  }

  getCurrentTrack() {
    return this.currentTrack;
  }

  getPlaybackState() {
    return {
      isPlaying: this.isPlaying,
      isLoading: this.isLoading,
      duration: this.duration,
      position: this.position,
      volume: this.volume,
    };
  }

  async cleanup() {
    if (this.currentPlayer) {
      await this.currentPlayer.unload();
      this.currentPlayer = null;
    }
    this.currentTrack = null;
    this.isPlaying = false;
    this.isLoading = false;
    this.duration = 0;
    this.position = 0;
    this.listeners = [];
  }
}

// Create singleton instance
export const audioService = new AudioService();
