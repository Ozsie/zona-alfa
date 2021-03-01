<script>
  import TextField from '../TextField.svelte'
  import RemoveButton from '../RemoveButton.svelte'

	import {crewBuilder} from '../crewBuilder.js';

  import equipment from '../data/equipment.json'

  export let edit
  export let compact = true
  export let crew
  export let member

	let basicEquipment = equipment.filter(e => e.category == "basic");
	let selectedEquipment;
</script>
<table>
  <tr class="wide">
    <th class="wide" colspan="4">Equipment</th>
  </tr>
  <tr class="list wide">
    <td class="wide equipment fixedTall" colspan="4">
      {#each member.equipment as equipment}
        <div>
          {#if !equipment.armor}
            <RemoveButton bind:edit={edit} click={() => crew = crewBuilder.removeEquipment(equipment, member, crew)}/>
          {/if}
          {#if compact && equipment.rules}
            <span class="listHeader">{equipment.name}:</span> {#if equipment.armor}Armor {equipment.armor}<br>{/if}
            {#each equipment.rules as rule, i}
              <span>{rule} </span>
              {#if i < equipment.rules.length - 1}
                <br>
              {/if}
            {/each}
          {:else}
            <span class="listHeader">{equipment.name}:</span> {equipment.description}
          {/if}
        </div>
      {/each}

      {#if member.options.basicEquipment > 0 && edit}
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
</table>