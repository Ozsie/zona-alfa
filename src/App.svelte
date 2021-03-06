<script>
  import Router from 'svelte-spa-router'
  import routes from './routes'
</script>

<main>
	<h1 class="no-print">Zona Alfa Crew Builder</h1>
  <a href="#/crew/new/edit">New Crew</a> | <a href="#/tables">Tables</a>
  <Router {routes} />
	<div class="footer">
    <div>
      <a href="https://ospreypublishing.com/zona-alfa?___store=osprey_rst" title="Zona Alfa" target="_blank">Zona Alfa</a> © <a href="https://ospreypublishing.com/" title="Osprey Publishing" target="_blank">Osprey Publishing</a>
    </div>
    <div class="no-print">
      Resources:
      <a href="https://www.reddit.com/r/ZonaAlfa/" title="r/ZonaAlfa" target="_blank">r/ZonaAlfa</a> |
      <a href="https://boardgamegeek.com/boardgame/284981/zona-alfa-salvage-and-survival-exclusion-zone" title="Zona Alfa BGG" target="_blank">Zona Alfa BGG</a> |
      <a href="https://ospreypublishing.com/gaming-resources-owg#zonaalfa" title="Gaming Resources" target="_blank">Gaming Resources</a>
    </div>
    <div class="no-print">
      Icons made by
      <a href="https://creativemarket.com/eucalyp" title="Eucalyp" target="_blank">Eucalyp</a>,
      <a href="https://www.flaticon.com/authors/becris" title="Becris" target="_blank">Becris</a>,
      <a href="https://www.freepik.com" title="Freepik" target="_blank">Freepik</a>
      <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect" target="_blank">Pixel perfect</a>
      from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank">www.flaticon.com</a>
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