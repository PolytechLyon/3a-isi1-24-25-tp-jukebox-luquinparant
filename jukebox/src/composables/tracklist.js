import { ref } from 'vue'

export function useTracklist() {

    const tracklist = ref([])

    const addTrackByURL = () => {
        const url = document.getElementById('urlTrack')
        tracklist.value.push(url.value);
        url.value = ""
    }

    const deleteTrack = (index) => {
        console.log(index)
        tracklist.value.splice(index, 1)
    }

    return { tracklist, addTrackByURL, deleteTrack }
}