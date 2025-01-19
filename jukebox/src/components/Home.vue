<script setup>
    import {useJukebox} from "@/composables/jukebox.js";
    const { trackList, addTrackByURL, addTrackByFile, playTrack, deleteTrack, isPlayingTrack, trackPlayed, textPlayable, playPause, audioRef, progressRef, progress, putAudioAtCursorPosition, selected} = useJukebox()
</script>

<template>
    <h1>Jukebox</h1>
    <section>
        <h2>Player</h2>
        <div v-if="!isPlayingTrack">
            <p>Choose a track to play.</p>
        </div>
        <div v-else>
            <p>Playing: {{ trackList[trackPlayed] }}</p>
            <button @click="playPause">{{ textPlayable }}</button>
            <div>
                <progress :value="progress" max="100" @click="putAudioAtCursorPosition" ref="progressRef"></progress>

            </div>
        </div>
        <audio :src="trackList[trackPlayed]" ref="audioRef">
        </audio>
        <fieldset>
            <legend>Playback Mode</legend>
            <input name="Playback" id="repeatList" type="radio" value="REPEAT_LIST" checked>
            <label for="repeatList">Repeat List</label>
            &thinsp;
            <input name="Playback" id="repeatTrack" type="radio" value="REPEAT_TRACK">
            <label for="repeatTrack">Repeat Track</label>
            &thinsp;
            <input name="Playback" id="doNotRepeat" type="radio" value="DO_NOT_REPEAT">
            <label for="doNotRepeat">Don&apos;t Repeat</label>
        </fieldset>
    </section>
    <section>
        <h2>Playlist</h2>
        <ul>
            <li v-for="track in trackList" :key="track" :id="track">
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
            <select v-model="selected" id="addTrackSelector">
              <option value="url">By URL</option>
              <option value="upload">Via file upload</option>
            </select>
            <template v-if="selected === 'url'">
              <input placeholder="Provide URL" type="text" id="urlTrack">
              <button @click="addTrackByURL()">Add by URL</button>
            </template>
            <template v-else>
              <input type="file" id="fileTrack">
              <button @click="addTrackByFile()">Add by file</button>
            </template>
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
