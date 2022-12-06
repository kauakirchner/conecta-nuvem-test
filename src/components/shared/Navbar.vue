<template>
    <header>
        <v-toolbar :title="pageName" :elevation="8" class="bg-blue">
           <span class="mr-8" v-if="isAuthenticated">{{ getUserName ?? getUserFormName }}</span>
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
                const userName = this.users.map(user => user.displayName);
                return `Hello, ${userName}`;
            },

            getUserFormName() {
                const userName = this.formUsers.map(user => user.name);
                return `Hello, ${userName}`;
            }
        }
    }
</script>

<style>

</style>