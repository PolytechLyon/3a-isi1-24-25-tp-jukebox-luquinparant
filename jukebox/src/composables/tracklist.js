import { ref, onMounted, onUnmounted, nextTick } from 'vue'

export function useTracklist() {

    const trackList = ref([])
    const isPlayingTrack = ref(false)
    const trackPlayed = ref(0)
    const textPlayable = ref("Play")
    const audioRef = ref(null)
    const progressRef = ref(null)

    const addTrackByURL = () => {
        const url = document.getElementById('urlTrack')
        trackList.value.push(url.value);
        url.value = ""
    }

    const playTrack = (index) => {
        isPlayingTrack.value = true
        trackPlayed.value = index
        textPlayable.value = "Pause"
        audioRef.value.play()
    }

    const deleteTrack = (index) => {
        trackList.value.splice(index, 1)
    }

    const updateProgress = () => {
        progressRef.value.value = (100 * audioRef.value.currentTime) / audioRef.value.duration
    }

    const playPause = () => {
        if (textPlayable.value === "Pause") {
            textPlayable.value = "Play"
            audioRef.value.pause()
        }
        else {
            textPlayable.value = "Pause"
            audioRef.value.play()
        }
    }

    onMounted(() => audioRef.value.addEventListener('timeupdate', updateProgress));
    onUnmounted(() => audioRef.value.removeEventListener('timeupdate', updateProgress));

    return { trackList, addTrackByURL, deleteTrack, isPlayingTrack, trackPlayed, playTrack, playPause, textPlayable, audioRef, progressRef }
}