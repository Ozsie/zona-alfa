<script>
  import TextField from '../TextField.svelte'
  import RemoveButton from '../RemoveButton.svelte'
  import WeaponSelector from '../WeaponSelector.svelte'

  import {crewBuilder} from '../crewBuilder.js';

  import weapons from '../data/weapons.json'

  export let edit = false
  export let crew
  export let member
  export let print = false

  let rangedWeapons = weapons.filter(w => w.category !== "grenade").filter(w => w.range.max !== 0);
  let meleeWeapons = weapons.filter(w => w.category !== "grenade").filter(w => w.range.min === 0);
  let grenades = weapons.filter(w => w.category === "grenade");

  let selectedRangedWeapon = rangedWeapons[0].id;
  let selectedMeleeWeapon = meleeWeapons[0].id;
  let selectedGrenade = grenades[0].id;
</script>
<table>
  <tr>
    <th class="name">Weapon Type</th>
    <th>Range</th>
    <th>Firepower</th>
    <th class="damage">Damage</th>
  </tr>
  {#each member.weapons as weapon}
    <tr class="{print ? 'print' : 'fixed'}">
      <td class="list vcenter name">
        <RemoveButton bind:edit={edit} click={() => crew = crewBuilder.removeWeapon(weapon, member, crew)}/>
        <img src="{weapon.category}.png" alt={weapon.category} width="12px">
        <TextField bind:value={weapon.name} edit={edit}/>
      </td>
      <td class="vcenter">
        {#if weapon.range.min === 0 && !print}melee{:else}{weapon.range.min}{/if}
        {#if weapon.range.max > 0}-{weapon.range.max}{/if}
      </td>
      <td class="vcenter">{weapon.firepower.value}
        {#if weapon.firepower.per}/{weapon.firepower.per}{/if}
      </td>
      <td class="vcenter damage">
        {#if weapon.damage.template}{weapon.damage.template},{/if}{weapon.damage.value}
        {#if weapon.damage.per}/{weapon.damage.per}{/if}
        {#if weapon.rules.length > 0},{/if}
        {#each weapon.rules as rule, i}
          {rule}
          {#if i < weapon.rules.length - 1},{/if}
        {/each}
      </td>
    </tr>
  {/each}
  {#if member.weapons.length < 4}
    {#each Array(4 - member.weapons.length) as _, row}
      <tr class="{print ? 'print' : 'fixed'}">
        <td class="list vcenter name"></td>
        <td class="list vcenter"></td>
        <td class="list vcenter"></td>
        <td class="list vcenter damage"></td>
      </tr>
    {/each}
  {/if}
  {#if member.options.rangedWeapon > 0 && edit}
    <WeaponSelector label="Add ranged weapon" weaponSet="ranged" bind:selectedWeapon={selectedRangedWeapon}
                    click={() => crew = crewBuilder.addWeapon(selectedRangedWeapon, "rangedWeapon", member, crew)}/>
  {/if}
  {#if member.options.meleeWeapon > 0 && edit}
    <WeaponSelector label="Add melee weapon" weaponSet="melee" bind:selectedWeapon={selectedMeleeWeapon}
                    click={() => crew = crewBuilder.addWeapon(selectedMeleeWeapon, "meleeWeapon", member, crew)}/>
  {/if}
  {#if member.options.grenade > 0 && edit}
    <WeaponSelector label="Add grenade" weaponSet="grenades" bind:selectedWeapon={selectedGrenade}
                    click={() => crew = crewBuilder.addWeapon(selectedGrenade, "grenade", member, crew)}/>
  {/if}
</table>
<style>
  table {
    table-layout: fixed;
    width: 100%;
  }

  .name {
    width: 40%;
  }

  .damage {
    width: 40%;
  }

  .fixed {
    height: 36px;
  }

  .vcenter {
    vertical-align: middle;
  }

  .print {
    height: 18px;
  }
</style>