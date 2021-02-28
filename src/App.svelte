<script>
	export let name;
	import Weapons from './Weapons.svelte';
	import Recruits from './Recruits.svelte';
	import Crews from './Crews.svelte';
</script>

<main>
	<h1>Zona Alfa</h1>
	<Crews/>
	<div>
    Favicon made by <a href="https://creativemarket.com/eucalyp" title="Eucalyp">Eucalyp</a>
    from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>