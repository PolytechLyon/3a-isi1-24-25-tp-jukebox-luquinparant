const { createApp, ref } = Vue

createApp({
  setup() {
    const playingTrack = ref('Choose a track to play.')
    const trackList = ref(['Add a new track to the playlist.', 'Venom'])
    return {
        playingTrack,
        trackList
    }
  }
}).mount('#app')