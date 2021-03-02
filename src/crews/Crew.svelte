<script>
  import TextField from '../TextField.svelte'
  import RemoveButton from '../RemoveButton.svelte'
  import CrewData from './CrewData.svelte'
  import Skills from '../skills/Skills.svelte'
  import Equipment from '../equipment/Equipment.svelte'
  import WeaponRows from '../weapons/WeaponRows.svelte'

	import {store} from '../store.js';
	import {crewBuilder} from '../crewBuilder.js';
	import {crewValidator} from '../crewValidator.js';

  import recruits from '../data/recruits.json'
  import factions from '../data/factions.json'

	export let crew
	export let show
	export let edit = false
	let compact = true

	crew = crewValidator.validateModel(crew)

	let nonLeaders = recruits.filter(r => r.name != "Leader");

	let selectedRecruit;

	function saveCrew() {
	  var index = store.crews.findIndex(c => c.id == crew.id)
	  if (index != -1) {
	    store.crews.splice(index, 1, crew)
	  } else {
	    store.crews.push(crew)
	  }
	  store.save(store.crews)
	}
</script>
<div class="no-print">
  <button on:click={() => edit = !edit}>{#if edit}Lock{:else}Edit{/if}</button>
  <button on:click={() => compact = !compact}>{#if compact}Full{:else}Compact{/if}</button>
  <button on:click={() => show = false}>Back</button>
</div>
<div>K:{crew.k}</div>
<CrewData bind:crew={crew} bind:edit={edit}/>
<div class="pagebreak"> </div>
<div class="grid-container">
  {#each crew.members as member}
    <div class="grid-item">
      <table>
        <tr class="no-print {edit ? "" : "hide"}">
          <td colspan="4">
            <RemoveButton bind:edit={edit} click={() => crew = crewBuilder.removeMember(member, crew)}/>
          </td>
        </tr>
        <tr>
          <th>Name</th>
          <td><TextField bind:value={member.name} edit={edit}/></td>
          <th>Faction</th>
          <td>{crew.faction.name}</td>
        </tr>
        <tr>
          <th>Wounds</th>
          <td>{member.wounds}</td>
          <th>Combat Experience</th>
          <td>{member.cost}</td>
        </tr>
        <tr>
          <th>Movement</th>
          <th>Combat Ability</th>
          <th>Armor</th>
          <th>Will</th>
        </tr>
        <tr>
          <td><TextField bind:value={member.movement} edit={edit} type="number" change={() => crew = crewBuilder.updateK(crew)}/></td>
          <td><TextField bind:value={member.combatAbility} edit={edit} type="number" change={() => crew = crewBuilder.updateK(crew)}/></td>
          <td>{member.armor}</td>
          <td><TextField bind:value={member.will} edit={edit} type="number" change={() => crew = crewBuilder.updateK(crew)}/></td>
        </tr>
      </table>
      <Skills bind:crew={crew} bind:member={member} bind:compact={compact} bind:edit={edit}/>
      <Equipment bind:crew={crew} bind:member={member} bind:compact={compact} bind:edit={edit}/>
      <WeaponRows bind:crew={crew} bind:member={member} bind:edit={edit}/>
      <table>
        <tr class="wide">
          <th>Notes</th>
        </tr>
        <tr class="list wide">
          <td class="wide fixed">
            <TextField type="textarea" bind:value={member.notes} edit={edit}/>
          </td>
        </tr>
      </table>
      <div class="pagebreak"> </div>
    </div>
  {/each}
</div>
{#if edit}
<div>
  <label for="recruit">Add recruit</label>
  <select bind:value={selectedRecruit} name="recruit">
    {#each nonLeaders as newRecruit}
      <option value="{newRecruit.id}">{newRecruit.name}</option>
    {/each}
  </select>
  <button on:click={() => crew = crewBuilder.addRecruit(selectedRecruit, crew)}>Add</button>
</div>
<button on:click={saveCrew}>Save</button>
{/if}
<div class="no-print">
  <button on:click={() => edit = !edit}>{#if edit}Lock{:else}Edit{/if}</button>
  <button on:click={() => show = false}>Back</button>
</div>
<style>
  .hide {
    display: none;
  }
</style>