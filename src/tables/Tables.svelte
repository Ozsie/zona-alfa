<script>
  import hostiles from '../data/hostiles.json'
  import weapons from '../data/weapons.json'
  import salvage from '../data/salvage.json'
  import artifacts from '../data/artifacts.json'
  import Menu from "../Menu.svelte";

  let roll = (value) => {
    return hostiles.filter(h => {
      let spawns = h.spawn.filter(s => {
        return s.roll === value
      })
      return spawns.length > 0
    })
  }

  let findSpawn = (hostile, roll) => {
    return hostile.spawn.find(s => s.roll === roll)
  }

  let weapon = (id) => {
    let w = weapons.find(w => w.id === id)
    if (!w) {
      return id
    }
    return range(w) + " | " + firepower(w) + " | " + damage(w) + template(w) + rules(w)
  }

  let range = (w) => w.range.min + "-" + w.range.max
  let firepower = (w) => w.firepower.value + (w.firepower.per ? "/" : "") + w.firepower.per
  let damage = (w) => w.damage.value + (w.damage.per ? "/" : "") + w.damage.per
  let template = (w) => (w.damage.template ? ", " : "") + w.damage.template
  let rules = (w) => (w.rules.length > 0 ? " | " : "") + w.rules.join(",")
</script>
<Menu/>
<div>
  <h2>Hostiles</h2>
  <h3>Spawn</h3>
  <table class="fixedTable">
    <tr>
      <th class="roll">D6 Roll</th>
      <th class="threatLevel">Threat Level 1 Blue</th>
      <th class="threatLevel">Threat Level 2 Yellow</th>
      <th class="threatLevel">Threat Level 3 Red</th>
    </tr>
    {#each Array(6) as _, row}
      <tr>
        <td class="{row % 2 === 0 ? 'even' : ''}">{row + 1}</td>
        {#each roll(row + 1) as hostile}
          <td class="{row % 2 === 0 ? 'even' : ''} {findSpawn(hostile, row+1).anomaly ? 'anomaly' : ''}">
            {#if findSpawn(hostile, row + 1).anomaly}<span class="warning">&#9888;</span> {/if}
            {hostile.name} ({findSpawn(hostile, row + 1).count})
            {#if findSpawn(hostile, row + 1).anomaly} + <span class="listHeader">Anomaly</span>{/if}
          </td>
        {/each}
      </tr>
    {/each}
  </table>
  <h3>Stats</h3>
  <table class="fixedTable">
    <tr>
      <th class="hostile">Name</th>
      <th class="hostile">Actions</th>
      <th class="hostile">Move</th>
      <th class="hostile">Combat Ability</th>
      <th class="hostile">Armor</th>
      <th class="hostile">Will</th>
      <th class="hostile">Weapon<br>(Range | Firepower | Damage)</th>
    </tr>
    {#each hostiles as hostile, row}
      <tr>
        <td class="{row % 2 === 0 ? 'even' : ''}">{hostile.name}</td>
        <td class="{row % 2 === 0 ? 'even' : ''}">
          {#if hostile.actions}{hostile.actions}{:else}Threat Level{/if}
        </td>
        <td class="{row % 2 === 0 ? 'even' : ''}">{hostile.move}</td>
        <td class="{row % 2 === 0 ? 'even' : ''}">{hostile.combatAbility}</td>
        <td class="{row % 2 === 0 ? 'even' : ''}">{hostile.armor}</td>
        <td class="{row % 2 === 0 ? 'even' : ''}">{hostile.will}</td>
        <td class="{row % 2 === 0 ? 'even' : ''}">{weapon(hostile.weapon)}</td>
      </tr>
    {/each}
  </table>
  <h2>Loot</h2>
  <h3>Salvage</h3>
  <table class="fixedTable">
    <tr>
      <th class="roll">D6 Roll</th>
      <th class="threatLevel">Threat Level 1 Blue</th>
      <th class="threatLevel">Threat Level 2 Yellow</th>
      <th class="threatLevel">Threat Level 3 Red</th>
    </tr>
    {#each salvage as s, row}
      <tr>
        <td class="{row % 2 === 0 ? 'even' : ''}">{row + 1}</td>
        {#each Array(3) as _, tl}
          <td class="{row % 2 === 0 ? 'even' : ''}">
            {#if s[tl + 1].anomaly}<span class="warning">&#9888;</span> <span class="listHeader">Anomaly</span><br>{/if}
            Salvage worth {s[tl + 1].salvage}
            {#if s[tl + 1].rolls}
              {#each s[tl + 1].rolls as roll}
                <br>
                {roll.count} D6 roll on {roll.table} Equipment Table
              {/each}
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </table>
  <h3>Artifacts</h3>
  <table class="fixedTable">
    <tr>
      <th>D6 Roll</th>
      <th>Value</th>
      <th>Bonus</th>
    </tr>
    {#each artifacts as artifact, roll}
      <tr>
        <td class="{roll % 2 === 0 ? 'even' : ''}">{roll + 1}</td>
        <td class="{roll % 2 === 0 ? 'even' : ''}">{artifact.value}</td>
        <td class="{roll % 2 === 0 ? 'even' : ''}">{artifact.bonus}</td>
      </tr>
    {/each}
  </table>
</div>
<style>
  .fixedTable {
    table-layout: fixed;
  }

  .hostile {
    width: 20%;
  }

  .roll {
    width: 10%;
  }

  .threatLevel {
    width: 30%;
  }

  .even {
    background-color: #d0d0ff;
  }

  .warning {
    color: red;
  }
</style>