<script>
import recruits from './recruits.json'
</script>

<ul>
	{#each recruits as recruit}
		<li>
			{recruit.name}: {recruit.cost}
		</li>
	{/each}
</ul>