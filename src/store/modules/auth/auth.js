export default {
    namespaced: true,
    state() {
        return {
            isAuthenticated: false,
            users: [],
            formUsers: []
        }
    },
    mutations: {
        setIsAuthenticated(state, value) {
            state.isAuthenticated = value;
        },

        setUsers(state, user) {
            state.users.push(user);
        },

        setFormUsers(state, user) {
            state.formUsers.push(user);
        }
    }
}