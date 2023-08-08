<script>
  import RemoveButton from '../RemoveButton.svelte'

  import {crewBuilder} from '../crewBuilder.js';

  import equipment from '../data/equipment.json'
  import armors from '../data/armors.json'

  export let edit = false
  export let compact = true
  export let print = false
  export let crew
  export let member

  console.log(crew)

  let basicEquipment = equipment.filter(e => e.category === "basic")
  let selectedStartEquipment
  let selectedEquipment
  let selectedArmor
  let faction = crew.faction

  let resetSelectedStartEquipment = () => {
    if (crew.options.startingEquipment[0]) {
      selectedStartEquipment = crew.options.startingEquipment[0].id
    }
  }

  let selectStartingEquipment = () => {
    console.log("selectedStartEquipment: " + selectedStartEquipment)
    crew = crewBuilder.addStartingEquipment(selectedStartEquipment, member, crew)
    resetSelectedStartEquipment()
    console.log(selectedStartEquipment)
  }

  resetSelectedStartEquipment()

  $: if (crew.faction !== faction) resetSelectedStartEquipment()
</script>
<table>
  <tr class="wide">
    <th class="wide" colspan="4">Equipment</th>
  </tr>
  <tr class="list wide">
    <td class="wide equipment {print ? 'print' : 'fixedTall'}" colspan="4">
      {#each member.equipment as equipment}
        <div>
          <RemoveButton bind:edit={edit} click={() => crew = crewBuilder.removeEquipment(equipment, member, crew)}/>
          {#if compact && equipment.rules}
            <span class="listHeader">{equipment.name}:</span>
            {#if equipment.armor}Armor {equipment.armor}<br>{/if}
            {#each equipment.rules as rule, i}
              <span>{rule}</span>
              {#if i < equipment.rules.length - 1}
                <br>
              {/if}
            {/each}
          {:else if compact}
            <span class="listHeader">{equipment.name}:</span>
            {#each equipment.effects as effect, i}
              <span>{effect}</span>
              {#if i < equipment.effects.length - 1}
                <br>
              {/if}
            {/each}
          {:else}
            <span class="listHeader">{equipment.name}:</span> {equipment.description}
          {/if}
        </div>
      {/each}
      {#each member.startingEquipment as equipment}
        <div>
          <RemoveButton bind:edit={edit} click={() => crew = crewBuilder.removeStartingEquipment(equipment, member, crew)}/>
          {#if compact && equipment.rules}
            <span class="listHeader">{equipment.name}:</span>
            {#each equipment.rules as rule, i}
              <span>{rule}</span>
              {#if i < equipment.rules.length - 1}
                <br>
              {/if}
            {/each}
          {:else if compact}
            <span class="listHeader">{equipment.name}:</span>
            {#each equipment.effects as effect, i}
              <span>{effect}</span>
              {#if i < equipment.effects.length - 1}
                <br>
              {/if}
            {/each}
          {:else}
            <span class="listHeader">{equipment.name}:</span> {equipment.description}
          {/if}
        </div>
      {/each}

      {#if crew.options.startingEquipment.length > 0 && edit}
        <label for="startingEquipment">Add starting equipment</label>
        <select bind:value={selectedStartEquipment} id="startingEquipment">
          {#each crew.options.startingEquipment as newEquipment}
            <option value="{newEquipment.id}">{newEquipment.name}</option>
          {/each}
        </select>
        <button on:click={selectStartingEquipment}>Add</button>
      {/if}

      {#if member.options.basicEquipment > 0 && edit}
        <label for="basicEquipment">Add basic equipment</label>
        <select bind:value={selectedEquipment} id="basicEquipment">
          {#each basicEquipment as newEquipment}
            <option value="{newEquipment.id}">{newEquipment.name}</option>
          {/each}
        </select>
        <button on:click={() => crew = crewBuilder.addBasicEquipment(selectedEquipment, member, crew)}>Add</button>
      {/if}
      {#if member.options.armor === 1 && edit}
        <label for="armor">Add armor</label>
        <select bind:value={selectedArmor} id="armor">
          {#each armors as armor}
            <option value="{armor.id}">{armor.name}</option>
          {/each}
        </select>
        <button on:click={() => crew = crewBuilder.addArmor(selectedArmor, member, crew)}>Add</button>
      {/if}
    </td>
  </tr>
</table>
