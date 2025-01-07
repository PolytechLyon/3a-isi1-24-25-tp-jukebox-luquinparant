const { createApp, ref } = Vue

createApp({
  setup() {
    const playingTrack = ref('Choose a track to play.')
    const trackList = ref([])

    function addTrackByURL() {
        const url = document.getElementById('urlTrack')
        trackList.value.push(url.value)
        url.value = ""
    }

    return {
        playingTrack,
        trackList,
        addTrackByURL
    }
  }
}).mount('#app')