import Crews from './Crews.svelte'
import Crew from './crews/Crew.svelte'
import PrintView from './crews/PrintView.svelte'
import Tables from './tables/Tables.svelte'
import Import from './Import.svelte'

export default {
  // Exact path
  '/': Crews,
  '/tables': Tables,
  '/crew/:crew/edit': Crew,
  '/crew/:crew/view': Crew,
  '/print/:crew': PrintView,
  '/import': Import
}