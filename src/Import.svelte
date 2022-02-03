<script>
    import {store} from './store.js';
    import {push} from 'svelte-spa-router'
    let str
    let crew

    let importCrew = () => {
        crew = store.importCrew(str)
        if (crew) {
            push('/crew/' + crew.id + '/edit')
        }
    }
</script>
<div>
  <span>Paste either crew json or crew hash (export string).</span>
  <input bind:value={str}>
  <button on:click={importCrew(str)}>Import</button>
</div>