export default {
    namespaced: true,
    state() {
        return {
            users: [],
        }
    },
    mutations: {
        setUsers(state, user) {
            state.users.push(user);
        },

        setOauthAcessToken(state, value) {
            sessionStorage.setItem('acessToken', value);
        }
    }
}