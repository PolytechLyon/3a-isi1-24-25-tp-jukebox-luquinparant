import {ref, onMounted, nextTick, onBeforeUnmount} from 'vue'

export function useTracklist() {

    const trackList = ref([])
    const isPlayingTrack = ref(false)
    const trackPlayed = ref(0)
    const progress = ref(0)
    const textPlayable = ref("Play")
    const audioRef = ref(null)
    const progressRef = ref(null)

    const addTrackByURL = () => {
        const url = document.getElementById('urlTrack')
        trackList.value.push(url.value);
        url.value = ""
    }

    const playTrack = (index) => {
        trackPlayed.value = index
        const regex = new RegExp('.*mp3');
        if (!regex.test(trackList.value[trackPlayed.value])) {
            // trackList.value[trackPlayed.value] = trackList.value[trackPlayed.value].strike()
            const liDoc = document.getElementById(trackList.value[trackPlayed.value])
            liDoc.innerHTML = trackList.value[trackPlayed.value].strike()
        } else {
            isPlayingTrack.value = true
            textPlayable.value = "Pause"
            audioRef.value.currentTime = 0
            nextTick(() => (audioRef.value.play()))
        }
    }

    const deleteTrack = (index) => {
        const delCurrent = index === trackPlayed.value
        trackList.value.splice(index, 1)
        if (trackList.value.length === 0) {
            isPlayingTrack.value = false;
        } else if (delCurrent) {
            changeTrack()
        }
    }

    const changeTrack = () => {
        const repeatMode = document.querySelector('input[name="Playback"]:checked').value;
        if (repeatMode === "REPEAT_LIST") {
            if (trackPlayed.value >= trackList.value.length - 1) {
                trackPlayed.value = 0
            } else {
                trackPlayed.value = (trackPlayed.value + 1)
            }
            const regex = new RegExp('.*mp3');
            while (!regex.test(trackList.value[trackPlayed.value])) {
                // trackList.value[trackPlayed.value] = trackList.value[trackPlayed.value].strike()
                const liDoc = document.getElementById(trackList.value[trackPlayed.value])
                liDoc.innerHTML = trackList.value[trackPlayed.value].strike()
                if (trackPlayed.value >= trackList.value.length - 1) {
                    trackPlayed.value = 0
                } else {
                    trackPlayed.value = (trackPlayed.value + 1)
                }
            }
            progress.value = 0
            nextTick(() => audioRef.value.play())
        } else if (repeatMode === "REPEAT_TRACK") {
            progress.value = 0
            nextTick(() => audioRef.value.play())
        } else {
            if (trackPlayed.value >= trackList.value.length - 1) {
                textPlayable.value = "Play"
            } else {
                trackPlayed.value = (trackPlayed.value + 1)
                progress.value = 0
                nextTick(() => audioRef.value.play())
            }
            const regex = new RegExp('.*mp3');
            while (!regex.test(trackList.value[trackPlayed.value])) {
                // trackList.value[trackPlayed.value] = trackList.value[trackPlayed.value].strike()
                const liDoc = document.getElementById(trackList.value[trackPlayed.value])
                liDoc.innerHTML = trackList.value[trackPlayed.value].strike()
                if (trackPlayed.value >= trackList.value.length - 1) {
                    textPlayable.value = "Play"
                } else {
                    trackPlayed.value = (trackPlayed.value + 1)
                    progress.value = 0
                    nextTick(() => audioRef.value.play())
                }
            }
        }
    }

    const updateProgress = () => {
        progress.value = audioRef.value.currentTime / audioRef.value.duration * 100
        if (progress.value === 100) {
            changeTrack()
        }
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

    // Function from Clément RENIERS and Simon PRIBYLSKI
    const putAudioAtCursorPosition = (event) => {
        const audio = audioRef.value
        const progressDoc = progressRef.value
        if (audio && progressDoc) {
            const { left, width } = progressDoc.getBoundingClientRect()
            const clickX = event.clientX - left
            const percentage = clickX / width
            audio.currentTime = audio.duration * percentage
        }
    };

    onMounted(() => {
        audioRef.value.addEventListener("timeupdate", updateProgress)
    })

    onBeforeUnmount(() => {
        audioRef.value.removeEventListener("timeupdate", updateProgress)
    })

    return { trackList, addTrackByURL, playTrack, deleteTrack, isPlayingTrack, trackPlayed, textPlayable, playPause, audioRef, progressRef, progress, putAudioAtCursorPosition }
}