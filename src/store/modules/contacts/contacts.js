export default {
    namespaced: true,
    state() {
        return {
            userContacts: [],
        }
    },
    mutations: {
        setUserContacts(state, value) {
            state.userContacts.push(value);
        }
    }
}