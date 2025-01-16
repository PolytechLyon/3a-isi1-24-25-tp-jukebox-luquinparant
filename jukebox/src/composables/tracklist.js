import { ref } from 'vue'

export function useTracklist() {

    const trackList = ref([])
    const isPlayingTrack = ref(false)
    const trackPlayed = ref("")

    const addTrackByURL = () => {
        const url = document.getElementById('urlTrack')
        trackList.value.push(url.value);
        url.value = ""
    }

    const playTrack = (index) => {
        isPlayingTrack.value = true
        trackPlayed.value = trackList.value[index]
    }

    const deleteTrack = (index) => {
        trackList.value.splice(index, 1)
    }

    return { trackList, addTrackByURL, deleteTrack, isPlayingTrack, trackPlayed, playTrack }
}