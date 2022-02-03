<script>
  import weapons from './data/weapons.json'

  export let label = "Add weapon"
  export let weaponSet = "all"
  export let selectedWeapon;
  export let click = () => {
  }

  let rangedWeapons = weapons.filter(w => w.category !== "grenade").filter(w => w.range.max !== 0);
  let meleeWeapons = weapons.filter(w => w.category !== "grenade").filter(w => w.range.min === 0);
  let grenades = weapons.filter(w => w.category === "grenade");

  let selectedSet = weapons

  switch (weaponSet) {
    case "ranged":
      selectedSet = rangedWeapons
      break
    case "melee":
      selectedSet = meleeWeapons
      break
    case "grenades":
      selectedSet = grenades
      break
  }
</script>
<tr class="list">
  <td class="wide" colspan="4">
    <label for="weapon">{label}</label>
    <select bind:value={selectedWeapon} id="weapon">
      {#each selectedSet as weapon}
        <option value="{weapon.id}">
          {weapon.types.join(" / ")}
        </option>
      {/each}
    </select>
    <button on:click={click}>Add</button>
  </td>
</tr>