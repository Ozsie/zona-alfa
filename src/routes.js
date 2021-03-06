import Crews from './Crews.svelte'
import Crew from './crews/Crew.svelte'
import PrintView from './crews/PrintView.svelte'
import {wrap} from 'svelte-spa-router/wrap'
import Tables from './tables/Tables.svelte'
export default {
    // Exact path
    '/': Crews,
    '/tables': Tables,
    '/crew/:crew/edit': Crew,
    '/crew/:crew/view': Crew,
    '/print/:crew': PrintView
}