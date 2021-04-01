<script>
  import TextField from '../TextField.svelte'
  import RemoveButton from '../RemoveButton.svelte'
  import CrewData from './CrewData.svelte'
  import Skills from '../skills/Skills.svelte'
  import Equipment from '../equipment/Equipment.svelte'
  import WeaponRows from '../weapons/WeaponRows.svelte'
  import Photo from '../Photo.svelte'

	import {store} from '../store.js';
	import {crewBuilder} from '../crewBuilder.js';
	import {crewValidator} from '../crewValidator.js';
  import {location, push, replace} from 'svelte-spa-router'

  import recruits from '../data/recruits.json'

  export let params = {}

	let crew = params.crew === 'new' ? crewBuilder.create("",0) : store.crews.find(c => c.id === params.crew)
	let show
  let edit = $location.endsWith('edit')
	let compact = true

	crew = crewValidator.validateModel(crew)

	let nonLeaders = recruits.filter(r => r.name !== "Leader")

	let selectedRecruit
  let exportString

	function saveCrew() {
	  let index = store.crews.findIndex(c => c.id === crew.id)
	  if (index !== -1) {
	    store.crews.splice(index, 1, crew)
	  } else {
	    store.crews.push(crew)
	  }
	  store.save(store.crews)
    replace('/crew/' + crew.id + '/edit')
	}

  function updateStat(stat, member) {
      crew = crewBuilder.updateK(crew)
      member = crewValidator.validateMember(member)
      crew = crewValidator.validateStat(stat, member, crew)
  }

  function copyExport() {
      let copyText = document.querySelector("#exportArea");
      copyText.select();
      document.execCommand("copy");
  }
</script>
<div class="no-print">
  <button on:click={() => replace('/crew/' + crew.id + '/' + (edit ? 'view' : 'edit'))}>{#if edit}Lock{:else}Edit{/if}</button>
  <button on:click={() => compact = !compact}>{#if compact}Full{:else}Compact{/if}</button>
  <button on:click={() => push('/print/' + crew.id)}>Print View</button>
  <button on:click={() => exportString = store.exportCrew(crew.id)}>Export</button>
</div>
{#if edit}
  <div>
    <label for="recruit">Add recruit</label>
    <select bind:value={selectedRecruit} id="recruit">
      {#each nonLeaders as newRecruit}
        <option value="{newRecruit.id}">{newRecruit.name}</option>
      {/each}
    </select>
    <button on:click={() => crew = crewBuilder.addRecruit(selectedRecruit, crew)}>Add</button>
  </div>
  <button on:click={saveCrew}>Save</button>
{/if}
{#if exportString}
  <div class="export">
    <span>Crew Export: </span>
    <br>
    <textarea class="expString" id="exportArea">{exportString}</textarea>
    <button on:click={() => copyExport()}>Copy</button>
    <button on:click={() => exportString = undefined}>Hide</button>
    <br>
    <span>Copy above string and store it somewhere.</span>
  </div>
{/if}
<CrewData bind:crew={crew} bind:edit={edit}/>
<div class="pagebreak"> </div>
<div class="grid-container">
  {#each crew.members as member}
    <div class="grid-item">
      <table>
        <tr class="no-print {edit ? '' : 'hide'}">
          <td colspan="3">
            <RemoveButton bind:edit={edit} click={() => crew = crewBuilder.removeMember(member, crew)}/>
          </td>
        </tr>
        <tr>
          <td rowspan="8">
            <Photo bind:edit={edit} bind:member={member} bind:crew={crew}/>
          </td>
          <th class="r">Name</th>
          <td class="l"><TextField bind:value={member.name} edit={edit}/></td>
        </tr>
        <tr>
          <th class="r">Faction</th>
          <td class="l">{crew.faction.name}</td>
        </tr>
        <tr>
          <th class="r">Wounds</th>
          <td class="l"><TextField bind:value={member.wounds} edit={edit} type="number" change={() => updateStat("wounds", member)}/></td>
        </tr>
        <tr>
          <th class="r">Combat XP</th>
          <td class="l"><TextField bind:value={member.cost} edit={edit} type="number" change={() => updateStat("cost", member)}/> {#if !compact}({member.experience}){/if}</td>
        </tr>
        <tr>
          <th class="r">Movement</th>
          <td class="l"><TextField bind:value={member.movement} edit={edit} type="number" change={() => updateStat("movement", member)}/></td>
        </tr>
        <tr>
          <th class="r">Combat Ability</th>
          <td class="l"><TextField bind:value={member.combatAbility} edit={edit} type="number" change={() => updateStat("combatAbility", member)}/></td>
        </tr>
        <tr>
          <th class="r">Armor</th>
          <td class="l">{member.armor}</td>
        </tr>
        <tr>
          <th class="r">Will</th>
          <td class="l"><TextField bind:value={member.will} edit={edit} type="number" change={() => updateStat("will", member)}/></td>
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
    <select bind:value={selectedRecruit} id="recruit">
      {#each nonLeaders as newRecruit}
        <option value="{newRecruit.id}">{newRecruit.name}</option>
      {/each}
    </select>
    <button on:click={() => crew = crewBuilder.addRecruit(selectedRecruit, crew)}>Add</button>
  </div>
  <button on:click={saveCrew}>Save</button>
{/if}
<style>
  th.r {
    text-align: right;
    width: 20%;
  }
  td.l {
    text-align: left;
    width: 20%;
    padding-left: 10px;
  }
  .hide {
    display: none;
  }
  .export {
    width: 50%;
    margin: 0 auto;
  }
  .expString {
    word-wrap:break-word;
    width: 100%;
    height: 100px;
  }
</style>