<script>
  import TextField from '../TextField.svelte'

  import {crewBuilder} from '../crewBuilder.js';

  import factions from '../data/factions.json'

  export let edit = false
  export let print = false
  export let crew
</script>
<table class="pad">
  <tr>
    <th>Crew Name</th>
    <td>
      <TextField bind:value={crew.name} edit={edit}/>
    </td>
    <th>Faction</th>
    <td>
      {#if edit}
        <select bind:value={crew.faction.id} on:change={() => crew = crewBuilder.changeFaction(crew.faction.id, crew)}>
          {#each factions as faction}
            <option value={faction.id}>{faction.name}</option>
          {/each}
        </select>
      {:else}
        {crew.faction.name}
      {/if}
    </td>
    <th>Khrabrost'</th>
    <td>{crew.k}</td>
  </tr>
  <tr>
    <th colspan="3">Equipment</th>
    <th colspan="3">Artifacts</th>
  </tr>
  <tr class="list {print ? 'artifacts' :''}">
    <td colspan="3">
      {#each crew.faction.startingEquipment as equipment}
        <div>
          <span class="listHeader">{equipment.name}:</span> {equipment.description}
        </div>
      {/each}
    </td>
    <td colspan="3">
      <TextField type="textarea" bind:value={crew.artifacts} edit={edit}/>
    </td>
  </tr>
  <tr>
    <th class="wide" colspan="6">Notes</th>
  </tr>
  <tr class="list">
    <td class="wide {print ? 'notes' :''}" colspan="6">
      {#each crew.faction.discounts as {type, value, times}, i}
        <span>
          {value}% discount on {type}
          {#if times === -2}once every visit{:else if times > 0}on {times} occasions{/if} at The Stalls.
        </span>
        <br>
      {/each}
      <span>Allies: </span><span>{crew.faction.allies.join(',')}</span>
      <br>
      <span>Enemies: </span><span>{crew.faction.enemies.join(',')}</span>
      <TextField type="textarea" bind:value={crew.notes} edit={edit}/>
    </td>
  </tr>
</table>
<style>
  .pad {
    padding-left: 2px;
    padding-right: 2px;
  }

  .artifacts {
    height: 350px;
  }

  .notes {
    height: 550px;
  }

  table {
    table-layout: fixed;
    width: 100%;
  }
</style>