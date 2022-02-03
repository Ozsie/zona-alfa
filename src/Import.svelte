<script>
  import {store} from './store.js';
  import {push} from 'svelte-spa-router'
  import Menu from "./Menu.svelte";

  let str
  let crew

  let importCrew = () => {
    crew = store.importCrew(str)
    if (crew) {
      push('/crew/' + crew.id + '/edit')
    }
  }
</script>
<Menu/>
<div>
  <span>Paste either crew json or crew hash (export string).</span>
  <input bind:value={str}>
  <button on:click={importCrew(str)}>Import</button>
</div>