import { createStore } from "vuex";
import auth from "./modules/auth/auth.js";

export const store = createStore({
    modules: {
        auth
    }
})