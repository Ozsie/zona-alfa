<script>
  import recruits from './recruits.json'
  import skills from './skills.json'
  import equipment from './equipment.json'
  import weapons from './weapons.json'
  import factions from './factions.json'
	import {store} from './store.js';

	export let crew
	export let show

	let basicEquipment = equipment.filter(e => e.category == "basic");
	let rangedWeapons = weapons.filter(w => w.category != "grenade").filter(w => w.range.max != 0);
	let meleeWeapons = weapons.filter(w => w.category != "grenade").filter(w => w.range.min == 0);
	let grenades = weapons.filter(w => w.category == "grenade");
	let nonLeaders = recruits.filter(r => r.name != "Leader");

	let selectedSkill;
	let selectedEquipment;
	let selectedRangedWeapon;
	let selectedMeleeWeapon;
	let selectedGrenade;
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
<div>K:{crew.k}</div>
<table>
  <tr>
    <th>Crew Name</th>
    <td>{crew.name}</td>
    <th>Faction</th>
    <td>{crew.faction.name}</td>
  </tr>
  <tr>
    <th class="wide" colspan="4">Notes</th>
  </tr>
  <tr class="list">
    <td class="wide" colspan="4">
      {#each crew.faction.discounts as {type, value, times}}
        <div>
          {value}% discount on {type} {#if times == -2}once every visit{:else if times > 0}on {times} occasions{/if} at The Stalls.
        </div>
      {/each}
      {#each crew.faction.startingEquipment as equipment}
        <div>
          <span class="listHeader">{equipment.name}:</span> {equipment.description}
        </div>
      {/each}
    </td>
  </tr>
</table>
{#each crew.members as member}
  <table>
    <tr>
      <th>Name</th>
      <td>{member.name}</td>
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
      <td>{member.movement}</td>
      <td>{member.combatAbility}</td>
      <td>{member.armor}</td>
      <td>{member.will}</td>
    </tr>
    <tr>
      <th class="wide" colspan="4">Skills</th>
    </tr>
    <tr class="list">
      <td class="wide" colspan="4">
        {#each member.skills as skill}
          <div>
            <span class="listHeader">{skill.name}:</span> {skill.description}
          </div>
        {/each}
      </td>
    </tr>
    <tr>
      <th class="wide" colspan="4">Equipment</th>
    </tr>
    <tr class="list">
      <td class="wide" colspan="4">
        {#each member.equipment as equipment}
          <div>
            <span class="listHeader">{equipment.name}:</span> {equipment.description}
          </div>
        {/each}
      </td>
    </tr>
    <tr>
      <th>Weapon Type</th>
      <th>Range</th>
      <th>Firepower</th>
      <th>Damage</th>
    </tr>
    {#each member.weapons as weapon}
      <tr>
        <td>{weapon.name}</td>
        <td>{weapon.range.min} - {weapon.range.max}</td>
        <td>{weapon.firepower.value}{#if weapon.firepower.per}/{weapon.firepower.per}{/if}</td>
        <td>
          {#if weapon.damage.template}{weapon.damage.template}, {/if}{weapon.damage.value}{#if weapon.damage.per}/{weapon.damage.per}{/if}
          {#each weapon.rules as rule}{rule},{/each}
        </td>
      </tr>
    {/each}
  </table>
{/each}
<button on:click={() => show = false}>Back</button>

<style>
	th {
		background-color: lightblue;
	  border: 1px solid black;
	  width: 25%;
	}
	.wide {
	  width: 100%;
	}
	td {
	  border: 1px solid black;
	  width: 25%;
	}
	table {
	  border-collapse: collapse;
	  border: 1px solid black;
	  width: 90%;
	  font-size: 10pt;
	  margin-bottom: 10px;
	}
	tr.list {
	  text-align: left;
	}
	span.listHeader {
    font-weight: bold;
	}
	div {
	  padding-top: 5px;
	}
</style>