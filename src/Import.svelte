<script>
    import {store} from './store.js';
    import {push} from 'svelte-spa-router'
    let str
    let crew

    let importCrew = () => {
        crew = store.importCrew(str)
        if (crew) {
            push('/print/' + crew.id)
        }
    }
</script>
<div>
  <span>Paste either crew json or crew hash (export string).</span>
  <input bind:value={str}>
  <button on:click={store.importCrew(str)}>Import</button>
</div>