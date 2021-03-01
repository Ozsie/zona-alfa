<script>
	import Crews from './Crews.svelte';
</script>

<main>
	<h1 class="no-print">Zona Alfa Crew Builder</h1>
	<Crews/>
	<div class="footer">
    <div>
      <a href="https://ospreypublishing.com/zona-alfa?___store=osprey_rst" title="Zona Alfa">Zona Alfa</a> © <a href="https://ospreypublishing.com/" title="Osprey Publishing">Osprey Publishing</a>
    </div>
    <div class="no-print">
      Resources:
      <a href="https://www.reddit.com/r/ZonaAlfa/" title="r/ZonaAlfa">r/ZonaAlfa</a> |
      <a href="https://boardgamegeek.com/boardgame/284981/zona-alfa-salvage-and-survival-exclusion-zone" title="Zona Alfa BGG">Zona Alfa BGG</a> |
      <a href="https://ospreypublishing.com/gaming-resources-owg#zonaalfa" title="Gaming Resources">Gaming Resources</a>
    </div>
    <div class="no-print">
      Icons made by <a href="https://creativemarket.com/eucalyp" title="Eucalyp">Eucalyp</a>, <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a>
      from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
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

	.footer {
	  font-size: 6pt;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>