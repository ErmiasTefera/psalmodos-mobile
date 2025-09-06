import { useCallback, useEffect, useState } from 'react'
import { audioService } from '@/services/audio.service'

export const useTrackPlayerVolume = () => {
	const [volume, setVolume] = useState<number | undefined>(undefined)

	const getVolume = useCallback(async () => {
		const currentVolume = audioService.getPlaybackState().volume
		setVolume(currentVolume)
	}, [])

	const updateVolume = useCallback(async (newVolume: number) => {
		if (newVolume < 0 || newVolume > 1) return

		setVolume(newVolume)

		await audioService.setVolume(newVolume)
	}, [])

	useEffect(() => {
		getVolume()
	}, [getVolume])

	return { volume, updateVolume }
}
