const { createApp, ref } = Vue

const playingTrack = ref('Choose a track to play.')
const trackList = ref(['Add a new track to the playlist.', 'Venom'])

createApp({
  setup() {
    return {
        playingTrack,
        trackList
    }
  }
}).mount('#app')

function addTrackByURL() {
    const url = document.getElementById('urlTrack')
    trackList.value.push(url.innerText)
}