<template>
    <header>
        <v-toolbar :title="pageName" :elevation="8" class="bg-blue">
           <span class="mr-8" v-show="getUserName">Hello, {{ getUserName }}</span>
        </v-toolbar>
    </header>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        props: {
            pageName: String
        },
        name: 'Navbar',
        computed: {
            ...mapState({
                users: state => state.auth.users,
                isAuthenticated: state => state.auth.isAuthenticated,
                formUsers: state => state.auth.formUsers
            }),

            getUserName() {
                const userName = sessionStorage.getItem('userName');
                return userName;
            },
        },
    }
</script>

<style>

</style>