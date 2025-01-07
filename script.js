const { createApp, ref } = Vue

createApp({
  setup() {
    const playingTrack = ref('Choose a track to play.')
    const trackList = ref(['Add a new track to the playlist.'])

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