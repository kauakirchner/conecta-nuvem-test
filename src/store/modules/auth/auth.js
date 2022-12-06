export default {
    namespaced: true,
    state() {
        return {
            isAuthenticated: false,
            users: [],
            oauthAcessToken: '',
        }
    },
    mutations: {
        setIsAuthenticated(state, value) {
            state.isAuthenticated = value;
        },

        setUsers(state, user) {
            state.users.push(user);
        },

        setOauthAcessToken(state, value) {
            state.oauthAcessToken = value;
        }
    }
}