import Crews from './Crews.svelte'
import Crew from './crews/Crew.svelte'
import PrintView from './crews/PrintView.svelte'
import {wrap} from 'svelte-spa-router/wrap'
export default {
    // Exact path
    '/': Crews,
    '/crew/:crew/edit': wrap({
        // Note that this is a function that returns the import
        asyncComponent: () => import('./crews/Crew.svelte')
    }),
    '/crew/:crew/view': wrap({
        // Note that this is a function that returns the import
        asyncComponent: () => import('./crews/Crew.svelte')
    }),
    '/print/:crew': PrintView
}