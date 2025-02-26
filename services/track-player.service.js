import TrackPlayer, { Event } from 'react-native-track-player'

export const RNTPService = async () => {
 TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play())
 TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause())
 TrackPlayer.addEventListener(Event.PlaybackError, (error) => {
console.log('An error occurred while playing the current track:', error)
 })
}