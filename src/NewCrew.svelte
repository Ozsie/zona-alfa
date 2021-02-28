<script>
  import recruits from './recruits.json'
  import skills from './skills.json'
  import equipment from './equipment.json'
  import weapons from './weapons.json'
  import factions from './factions.json'
	import {store} from './store.js';

	import {crewBuilder} from './crewBuilder.js';

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
    <td><input bind:value={crew.name}></td>
    <th>Faction</th>
    <td>
      <select bind:value={crew.faction.id} on:change={() => crew = crewBuilder.changeFaction(crew.faction.id, crew)}>
        {#each factions as faction}
          <option value={faction.id}>{faction.name}</option>
        {/each}
      </select>
    </td>
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
      <td><input bind:value={member.name}></td>
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
      <td><input type=number bind:value={member.movement} on:change={() => crew = crewBuilder.updateK(crew)}></td>
      <td><input type=number bind:value={member.combatAbility} on:change={() => crew = crewBuilder.updateK(crew)}></td>
      <td>{member.armor}</td>
      <td><input type=number bind:value={member.will} on:change={() => crew = crewBuilder.updateK(crew)}></td>
    </tr>
    <tr>
      <th class="wide" colspan="4">Skills</th>
    </tr>
    <tr class="list">
      <td class="wide" colspan="4">
        {#each member.skills as skill}
          <div>
            {#if skill.name != "Leader"}
              <img alt="Remove" src="./remove.png" width=12 on:click={() => crew = crewBuilder.removeSkill(equipment, member, crew)}/>
            {/if}
            <span class="listHeader">{skill.name}:</span> {skill.description}
          </div>
        {/each}
        {#if member.options.skill > 0}
          <label for="skills">Add skill</label>
          <select bind:value={selectedSkill} name="skills">
            {#each skills as newSkill}
              {#if !crewBuilder.hasSkill(newSkill.id, member)}
                <option value="{newSkill.id}">{newSkill.name}</option>
              {/if}
            {/each}
          </select>
          <button on:click={() => crew = crewBuilder.addSkill(selectedSkill, member, crew)}>Add</button>
        {/if}
      </td>
    </tr>
    <tr>
      <th class="wide" colspan="4">Equipment</th>
    </tr>
    <tr class="list">
      <td class="wide" colspan="4">
        {#each member.equipment as equipment}
          <div>
            {#if !equipment.armor}
              <img alt="Remove" src="./remove.png" width=12 on:click={() => crew = crewBuilder.removeEquipment(equipment, member, crew)}/>
            {/if}
            <span class="listHeader">{equipment.name}:</span> {equipment.description}
          </div>
        {/each}

        {#if member.options.basicEquipment > 0}
          <label for="basicEquipment">Add basic equipment</label>
          <select bind:value={selectedEquipment} name="basicEquipment">
            {#each basicEquipment as newEquipment}
              <option value="{newEquipment.id}">{newEquipment.name}</option>
            {/each}
          </select>
          <button on:click={() => crew = crewBuilder.addBasicEquipment(selectedEquipment, member, crew)}>Add</button>
        {/if}
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
        <td>
          <img alt="Remove" src="./remove.png" width=12 on:click={() => crew = crewBuilder.removeWeapon(weapon, member, crew)}/>
          <input bind:value={weapon.name}/>
        </td>
        <td>{weapon.range.min} - {weapon.range.max}</td>
        <td>{weapon.firepower.value}{#if weapon.firepower.per}/{weapon.firepower.per}{/if}</td>
        <td>
          {#if weapon.damage.template}{weapon.damage.template}, {/if}{weapon.damage.value}{#if weapon.damage.per}/{weapon.damage.per}{/if}
          {#each weapon.rules as rule}{rule},{/each}
        </td>
      </tr>
    {/each}
    {#if member.options.rangedWeapon > 0}
      <tr class="list">
        <td class="wide" colspan="4">
          <label for="rangedWeapon">Add ranged weapon</label>
          <select bind:value={selectedRangedWeapon} name="rangedWeapon">
            {#each rangedWeapons as newRangedWeapon}
              <option value="{newRangedWeapon.id}">
                {newRangedWeapon.types.join(" / ")}
              </option>
            {/each}
          </select>
          <button on:click={() => crew = crewBuilder.addRangedWeapon(selectedRangedWeapon, member, crew)}>Add</button>
        </td>
      </tr>
    {/if}

    {#if member.options.meleeWeapon > 0}
      <tr class="list">
        <td class="wide" colspan="4">
          <label for="meleeWeapon">Add melee weapon</label>
          <select bind:value={selectedMeleeWeapon} name="meleeWeapon">
            {#each meleeWeapons as newMeleeWeapon}
              <option value="{newMeleeWeapon.id}">
                {newMeleeWeapon.types.join(" / ")}
              </option>
            {/each}
          </select>
          <button on:click={() => crew = crewBuilder.addMeleeWeapon(selectedMeleeWeapon, member, crew)}>Add</button>
        </td>
      </tr>
    {/if}

    {#if member.options.grenade > 0}
      <tr class="list">
        <td class="wide" colspan="4">
          <label for="grenade">Add grenade</label>
          <select bind:value={selectedGrenade} name="grenade">
            {#each grenades as newGrenade}
              <option value="{newGrenade.id}">
                {newGrenade.types.join(" / ")}
              </option>
            {/each}
          </select>
          <button on:click={() => crew = crewBuilder.addGrenade(selectedGrenade, member, crew)}>Add</button>
        </td>
      </tr>
    {/if}
  </table>
{/each}

<div>
  <label for="recruit">Add recruit</label>
  <select bind:value={selectedRecruit} name="recruit">
    {#each nonLeaders as newRecruit}
      <option value="{newRecruit.id}">{newRecruit.name}</option>
    {/each}
  </select>
  <button on:click={() => crew = crewBuilder.addRecruit(selectedRecruit, crew)}>Add</button>
</div>
<button on:click={() => console.log(crew)}>LOG</button>
<button on:click={saveCrew}>Save</button>
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
	label {
	  padding-top: 5px;
	  font-weight: bold;
	}
	input {
	  width: 80%;
	}
	select {
	  width: 50%;
	}
	div {
	  padding-top: 5px;
	}
</style>