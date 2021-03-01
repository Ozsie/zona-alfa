<script>
  export let value
  export let edit
  export let type = "text"
  export let change = () => {}
</script>
{#if edit}
  {#if type == "text"}
    <input bind:value={value} on:change={change}>
  {:else if type == "number" }
    <input type="number" bind:value={value} on:change={change}>
  {/if}
{:else}
  {value}
{/if}

<style>
	input {
	  width: 80%;
	}
</style>