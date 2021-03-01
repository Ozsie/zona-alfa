<script>
  import TextField from '../TextField.svelte'
  import RemoveButton from '../RemoveButton.svelte'

	import {crewBuilder} from '../crewBuilder.js';

  import skills from '../data/skills.json'

  export let edit
  export let crew
  export let member
  export let compact

	let selectedSkill;
</script>
<table>
  <tr class="wide">
    <th>Skills</th>
  </tr>
  <tr class="list wide">
    <td class="wide fixed">
      {#each member.skills as skill}
        <div>
          {#if skill.name != "Leader"}
            <RemoveButton bind:edit={edit} click={() => crew = crewBuilder.removeSkill(skill, member, crew)}/>
          {/if}
          <span class="listHeader">{skill.name}:</span>
          {#if compact }
            {#each skill.effects as effect, i}
              <span>{effect} </span>
              {#if i != skill.effects.length - 1}
                <br>
              {/if}
            {/each}
          {:else}
            {skill.description}
          {/if}
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
</table>