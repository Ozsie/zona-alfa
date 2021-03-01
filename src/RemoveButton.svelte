<script>
  export let edit
  export let click = () => {}
</script>
{#if edit}
<img alt="Remove" src="./remove.png" width=12 on:click={click}/>
{/if}