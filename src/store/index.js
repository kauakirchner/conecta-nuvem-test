import { createStore } from "vuex";
import auth from "./modules/auth/auth.js";
import contacts from './modules/contacts/contacts.js';

export const store = createStore({
    modules: {
        auth,
        contacts,
    }
})