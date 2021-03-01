<script>
  export let value
  export let edit
  export let type = "text"
  export let change = () => {}
  export let rows = 5
</script>
{#if edit}
  {#if type == "text"}
    <input bind:value={value} on:change={change}>
  {:else if type == "number" }
    <input type="number" bind:value={value} on:change={change}>
  {:else if type == "textarea" }
    <textarea bind:value={value} on:change={change} rows={rows}></textarea>
  {/if}
{:else}
  <span>{value}</span>
{/if}

<style>
	input {
	  width: 80%;
	}
	textarea {
	  width: 100%;
	}
</style>