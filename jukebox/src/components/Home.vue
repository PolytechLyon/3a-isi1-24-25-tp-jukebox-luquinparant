<script setup>
import { ref } from 'vue'
    
    import {useTracklist} from "@/composables/tracklist.js";

    const { trackList, addTrackByURL, playTrack, deleteTrack, isPlayingTrack, trackPlayed } = useTracklist()

</script>

<template>
    <h1>Jukebox</h1>
    <section>
        <h2>Player</h2>
        <div v-if="!isPlayingTrack">
            <p>Choose a track to play.</p>
        </div>
        <div v-else>
            <p>Playing: {{ trackPlayed }}</p>
            <audio>
                <source src="" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        </div>
        <fieldset>
            <legend>Playback Mode</legend>
            <input name="Playback" id="repeatList" type="radio" value="REPEAT_LIST" checked>
            <label for="repeatList">Repeat List</label>
            <input name="Playback" id="repeatTrack" type="radio" value="REPEAT_TRACK">
            <label for="repeatTrack">Repeat Track</label>
            <input name="Playback" id="doNotRepeat" type="radio" value="DO_NOT_REPEAT">
            <label for="doNotRepeat">Don&apos;t Repeat</label>
        </fieldset>
    </section>
    <section>
        <h2>Playlist</h2>
        <ul>
            <li v-for="track in trackList" :key="track">
                <span>{{ track }}</span>
                <button role="button" @click="playTrack(trackList.indexOf(track))">Play</button>
                <button role="button" @click="deleteTrack(trackList.indexOf(track))">Delete</button>
            </li>
        </ul>
    </section>
    <section>
        <h2>New Track</h2>
        <div>
            <label for="addTrackSelector">Add Track</label>
            <select id="addTrackSelector">
                <option value="url">By URL</option>
                <option value="upload">Via file upload</option>
            </select>
            <input placeholder="Provide URL" type="text" id="urlTrack">
            <button @click="addTrackByURL()">Add by URL</button>
        </div>
    </section>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
