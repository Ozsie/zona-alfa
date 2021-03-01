<script>
  import TextField from '../TextField.svelte'
  import RemoveButton from '../RemoveButton.svelte'

	import {crewBuilder} from '../crewBuilder.js';

  import weapons from '../data/weapons.json'

  export let edit
  export let crew
  export let member

  let rangedWeapons = weapons.filter(w => w.category != "grenade").filter(w => w.range.max != 0);
  let meleeWeapons = weapons.filter(w => w.category != "grenade").filter(w => w.range.min == 0);
  let grenades = weapons.filter(w => w.category == "grenade");

	let selectedRangedWeapon;
	let selectedMeleeWeapon;
	let selectedGrenade;
</script>
<table>
<tr>
  <th>Weapon Type</th>
  <th>Range</th>
  <th>Firepower</th>
  <th>Damage</th>
</tr>
{#each member.weapons as weapon}
  <tr>
    <td>
      <RemoveButton bind:edit={edit} click={() => crew = crewBuilder.removeWeapon(weapon, member, crew)}/>
      <TextField bind:value={weapon.name} edit={edit}/>
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