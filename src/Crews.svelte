<script>
	import {store} from './store.js';
	import Menu from "./Menu.svelte";

	let crewList = store.crews;

  let newCrew = false;
  let view = false;

  let crew;

  function editCrew(c) {
    newCrew = true;
    crew = c
  }

  function deleteCrew(c) {
    var index = crewList.findIndex(cr => cr.id === c.id)
    if (index !== -1) {
      crewList.splice(index, 1)
    }
    store.save(crewList)
    crewList = store.crews
  }

  function viewCrew(c) {
    view = true;
    crew = c
  }
</script>

<Menu/>
<ul>
  {#each crewList as eCrew}
    <li>
      <a href="#/crew/{eCrew.id}/edit"><img src="./edit.png" width=16 alt="Edit"/></a>
      <img on:click={() => deleteCrew(eCrew)} src="./remove.png" width=16 alt="Delete"/>
      <a href="#/crew/{eCrew.id}/view">{eCrew.name} ({eCrew.k} K)</a>
    </li>
  {/each}
</ul>

<style>
  ul {
    text-align: left;
  }
</style>