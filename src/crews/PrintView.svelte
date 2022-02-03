<script>
    import TextField from '../TextField.svelte'
    import CrewData from './CrewData.svelte'
    import Skills from '../skills/Skills.svelte'
    import Equipment from '../equipment/Equipment.svelte'
    import WeaponRows from '../weapons/WeaponRows.svelte'
    import Photo from '../Photo.svelte'

    import {store} from '../store.js';
    import {crewBuilder} from '../crewBuilder.js';
    import {crewValidator} from '../crewValidator.js';

    import recruits from '../data/recruits.json'
    import {location, push} from "svelte-spa-router";

    export let params = {}

    let crew = params.crew === 'new' ? crewBuilder.create("",0) : store.crews.find(c => c.id === params.crew)
    let show
    let edit = false
    let compact = true
    let print = false

    crew = crewValidator.validateModel(crew)

    let nonLeaders = recruits.filter(r => r.name !== "Leader");

    let selectedRecruit;

    function saveCrew() {
        var index = store.crews.findIndex(c => c.id === crew.id)
        if (index !== -1) {
            store.crews.splice(index, 1, crew)
        } else {
            store.crews.push(crew)
        }
        store.save(store.crews)
    }
</script>
<div class="no-print">
  <button on:click={() => push('/crew/' + crew.id + '/edit')}>Back</button>
  <button on:click={() => window.print()}>Print</button>
</div>
<CrewData crew={crew} print="true"/>
<div class="pagebreak"> </div>
{#each crew.members as member, i}
  <div class="wrapper">
        <table>
          <tr>
            <td rowspan="8">
              <Photo edit={edit} member={member} crew={crew} height="96"/>
            </td>
            <th class="r">Name</th>
            <td class="l">{member.name}</td>
          </tr>
          <tr>
            <th class="r">Faction</th>
            <td class="l">{crew.faction.name}</td>
          </tr>
          <tr>
            <th class="r">Wounds</th>
            <td class="l">{member.wounds}</td>
          </tr>
          <tr>
            <th class="r">Combat XP</th>
            <td class="l">{member.cost}</td>
          </tr>
          <tr>
            <th class="r">Movement</th>
            <td class="l">{member.movement}</td>
          </tr>
          <tr>
            <th class="r">Combat Ability</th>
            <td class="l">{member.combatAbility}</td>
          </tr>
          <tr>
            <th class="r">Armor</th>
            <td class="l">{member.armor}</td>
          </tr>
          <tr>
            <th class="r">Will</th>
            <td class="l">{member.will}</td>
          </tr>
        </table>
        <Skills crew={crew} member={member}/>
        <Equipment crew={crew} member={member} print="true"/>
        <WeaponRows crew={crew} member={member} print="true"/>
        <table>
          <tr class="wide">
            <th>Notes</th>
          </tr>
          <tr class="list wide notes">
            <td class="wide">
              <TextField type="textarea" bind:value={member.notes} edit={edit}/>
            </td>
          </tr>
        </table>
  {#if (i+1) % 4 === 0}
    <div class="pagebreak"> </div>
  {/if}
  </div>
{/each}
<style>
    th.r {
        text-align: right;
        width: 20%;
        height: 10px;
    }
    td.l {
        text-align: left;
        width: 20%;
        padding-left: 10px;
        height: 10px;
    }
    td {
        height: 10px;
    }
    th {
        height: 10px;
    }
    table {
        font-size: 6pt;
    }
    .notes {
        height: 30px;
    }
  .wrapper {
      width: 49%;
      border: none;
      margin: 1px;
      padding: 1px;
      float: left;
  }
</style>