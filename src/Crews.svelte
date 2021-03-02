<script>
  import Crew from './crews/Crew.svelte';
  import {store} from './store.js';
	import {crewBuilder} from './crewBuilder.js';

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
{#if !newCrew && !view}
	<button on:click={() => editCrew(crewBuilder.create("",0))}>Add Crew</button>
	<ul>
		{#each crewList as eCrew}
			<li>
				<img on:click={() => editCrew(eCrew)} src="./edit.png" width=16 alt="Edit"/>
				<img on:click={() => deleteCrew(eCrew)} src="./remove.png" width=16 alt="Delete"/>
				<a on:click={() => viewCrew(eCrew)} on:>{eCrew.name} ({eCrew.k} K)</a>
			</li>
		{/each}
	</ul>
{:else if newCrew && !view}
	<Crew crew={crew} bind:show={newCrew} edit={true}/>
{:else}
	<Crew crew={crew} bind:show={view} edit={false}/>
{/if}

<style>
  ul {
	  text-align: left;
  }
</style>