import Login from '../views/Login.vue'
import Contacts from '../views/Contacts.vue'
import { processRouteAuthentication } from '../helpers'

export const routes = [
    { path: '/', component: Login, meta: {title: 'SuperOrgContact - Login'} },
    { path: '/contacts', component: Contacts, meta: {title: 'SuperOrgContact - Login'},
        ...processRouteAuthentication()
    },
]

