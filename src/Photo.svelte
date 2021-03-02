<script>
  import RemoveButton from './RemoveButton.svelte'

	import {crewBuilder} from './crewBuilder.js';

	export let edit = false
	export let crew
	export let member

	let  fileinput;
	const onFileSelected = (e) => {
	  console.log(e)
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      member.photo = e.target.result
    };
  }
</script>
{#if member.photo}
  <img src="{member.photo}" alt="{member.name}" height="128">
{:else}
  <img src="soldier.png" alt="{member.name}" height="128">
{/if}
<RemoveButton bind:edit={edit} click={() => crew = crewBuilder.removePhoto(member, crew)}/>
{#if edit}
  <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} width="16"/>
  <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
{/if}