<script>
	import Weapons from './Weapons.svelte';
	import Recruits from './Recruits.svelte';
	import Crews from './Crews.svelte';
</script>

<main>
	<h1 class="no-print">Zona Alfa Crew Builder</h1>
	<Crews/>
	<div class="no-print">
    Icons made by <a href="https://creativemarket.com/eucalyp" title="Eucalyp">Eucalyp</a>, <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a>
    from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 10px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	@media print {
    .no-print, .no-print * {
      display: none !important;
    }
  }
</style>