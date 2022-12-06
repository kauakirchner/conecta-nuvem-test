<template>
  <v-responsive>
    <router-view></router-view>
    <Navbar :pageName="'Contacts'" />
    <v-container>
        <v-table fixed-header max-heigth="100%" max-width="100%" theme="dark" class="contacts-table">
            <thead>
                <tr>
                    <th class="text-left">
                        Domain
                    </th>
                    <th class="text-left">
                        Contacts
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="container">
                    <div class="domain-container">
                        <td>{{ getUserEmail }}</td>
                    </div>
                    <div class="contacts-container">
                        <td v-for="i in userContactsNames" :key="userContactsNames[i]">
                            <li>{{ i }}</li>
                        </td>
                    </div>
                </tr>
            </tbody>
        </v-table>
    </v-container>
  </v-responsive>
</template>

<script>
    import Navbar from '../components/shared/Navbar.vue';
    import { mapState } from "vuex";

    export default {
        components: { Navbar },
        data() {
            return {
                userContactsNames: [],
            }
        },
        methods: { 
            async getUserContacts() {
                const apiKey = import.meta.env.VITE_APP_API_KEY;
                try {
                    const response = await fetch(`https://people.googleapis.com/v1/people/me/connections?key=${apiKey}&personFields=names`, {
                        method: 'GET',
                        headers: {
                            "authorization": `Bearer ${this.oauthAcessToken}`
                        },
                    })
                    if (response.status === 200) {
                        const data = await response.json();
                        const { connections } = data
                        const getNames = connections.map(user => user.names.map(user => user.displayName))
                        const names = getNames.reduce((list, sub) => list.concat(sub), [])
                        this.userContactsNames = names;
                    }

                } catch {
                    this.$toast.error("Error loading contacts", {
                        position: "top"
                    });
                }
            },
        },

        computed: {
            ...mapState({
                users: state => state.auth.users,
                isAuthenticated: state => state.auth.isAuthenticated,
                formUsers: state => state.auth.formUsers,
                oauthAcessToken: state => state.auth.oauthAcessToken,
            }),

            getUserName() {
                const displayName = this.users.map(user => user.displayName);
                return displayName;
            },

            getUserEmail() {
                const email = this.users.map(user => user.email);
                return email.join();
            },
        },

        mounted() {
            this.getUserContacts();
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        justify-content: space-between;
    }
    .contacts-table {
        margin: 0 auto;
        width: 600px;
    }

    .contacts-container {
        width: 300px;
    }

    .domain-container {
        border-right: 1px solid #3c3c3c;
        padding: 10px;
    }

    .contacts-container > td {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding: 12px;
    }

</style>