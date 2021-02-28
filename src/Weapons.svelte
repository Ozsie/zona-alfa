<script>
import weapons from './weapons.json'
</script>

<ul>
	{#each weapons as weapon}
		<li>
			{weapon.category}: {#each weapon.types as type} {type}, {/each}
		</li>
	{/each}
</ul>