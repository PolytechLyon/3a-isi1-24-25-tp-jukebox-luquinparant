import { ref, onMounted, onUnmounted, nextTick } from 'vue'

export function useTracklist() {

    const trackList = ref([])
    const isPlayingTrack = ref(false)
    const trackPlayed = ref(0)
    const progress = ref(0)
    const textPlayable = ref("Play")
    const audioRef = ref(null)

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
        progress.value = (audioRef.value.currentTime / audioRef.value.duration) * 100
    }

    const playPause = () => {
        if (textPlayable.value == "Pause") {
            textPlayable.value = "Play"
            audioRef.value.pause()
        }
        else {
            textPlayable.value = "Pause"
            audioRef.value.play()
        }
    }

    onMounted(() => document.addEventListener('timeupdate', updateProgress));
    onUnmounted(() => document.removeEventListener('timeupdate', updateProgress));

    return { trackList, addTrackByURL, deleteTrack, isPlayingTrack, trackPlayed, playTrack, progress, playPause, textPlayable, audioRef }
}