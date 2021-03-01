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
    <tr class="fixed">
      <td class="list vcenter">
        <RemoveButton bind:edit={edit} click={() => crew = crewBuilder.removeWeapon(weapon, member, crew)}/>
        <img src="{weapon.category}.png" alt={weapon.category} width="12px">
        <TextField bind:value={weapon.name} edit={edit}/>
      </td>
      <td class="vcenter">{#if weapon.range.min == 0}melee{:else}{weapon.range.min}{/if} - {weapon.range.max}</td>
      <td class="vcenter">{weapon.firepower.value}{#if weapon.firepower.per}/{weapon.firepower.per}{/if}</td>
      <td class="vcenter">
        {#if weapon.damage.template}{weapon.damage.template}, {/if}{weapon.damage.value}{#if weapon.damage.per}/{weapon.damage.per}{/if}{#if weapon.rules.length > 0}, {/if}
        {#each weapon.rules as rule, i}
          {rule}{#if i < weapon.rules.length - 1}, {/if}
        {/each}
      </td>
    </tr>
  {/each}
  {#if member.weapons.length < 4}
    {#each Array(4 - member.weapons.length) as _, row}
      <tr class="fixed">
        <td class="list vcenter"></td>
        <td class="list vcenter"></td>
        <td class="list vcenter"></td>
        <td class="list vcenter"></td>
      </tr>
    {/each}
  {/if}
  {#if member.options.rangedWeapon > 0 && edit}
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

  {#if member.options.meleeWeapon > 0 && edit}
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

  {#if member.options.grenade > 0 && edit}
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
<style>
  tr.fixed {
    height: 36px;
  }
  td.vcenter {
    vertical-align: middle;
  }
</style>