<script>
	import NewCrew from './NewCrew.svelte';
	import ViewCrew from './ViewCrew.svelte';
	import {store} from './store.js';
	import {crewBuilder} from './crewBuilder.js';

	var crewList = store.crews

	var newCrew = false;
	var view = false;

  let crew;
	function editCrew(c) {
    newCrew = true;
    crew = c
  }

  function deleteCrew(c) {
    var index = crewList.findIndex(cr => cr.id == c.id)
    if (index != -1) {
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
			<span on:click={() => viewCrew(eCrew)}>{eCrew.name} ({eCrew.k} K)</span>
		</li>
	{/each}
</ul>
{:else if newCrew && !view}
<NewCrew crew={crew} bind:show={newCrew}/>
{:else}
<ViewCrew crew={crew} bind:show={view}/>
{/if}

<style>
  ul {
	  text-align: left;
  }
</style>