<template>
    <router-view></router-view>
    <v-responsive>
        <Navbar :pageName="'Contacts'" />
        <div class="container-fluid p-4 table-container">
            <table class="table aling-middle">
                <thead>
                    <tr>
                        <th class="text-start text-white" scope="col">Domain</th>
                        <th class="text-start text-white" scope="col">Contacts</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-start text-white">{{ getUserEmail }}</td>
                        <td class="text-start text-white">
                            <ul class="contacts-list">
                                <li v-for="i in userContactsNames" :key="userContactsNames[i]" class="contact">
                                    {{ i }}
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </v-responsive>
</template>

<script>
    import Navbar from '../components/shared/Navbar.vue';
    import { mapState } from "vuex";
    import { getAcessToken, getAuthenticatedHeadersConfig } from '../helpers'

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
                const acessToken = getAcessToken();
                try {
                    const response = await fetch(`https://people.googleapis.com/v1/people/me/connections?key=${apiKey}&personFields=names,emailAddresses`, {
                        method: 'GET',
                        headers: {
                            ...getAuthenticatedHeadersConfig()
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
                formUsers: state => state.auth.formUsers,
            }),

            getUserName() {
                const displayName = this.users.map(user => user.displayName);
                return displayName;
            },

            getUserEmail() {
                const email = sessionStorage.getItem('userEmail')
                return email
            },
        },

        mounted() {
            this.getUserContacts();
        }
    }
</script>

<style scoped>
    .table-container {
        background-color: #3c3c3c;
        width: 500px;
        margin-top: 15px;
    }

    .contacts-list {
        list-style: none;
    }

    .contact {
        border-bottom: 1px solid #4c4c4c;
        margin-bottom: 6px;
    }

    @media (max-width: 530px) {
        .table-container {
            width: 400px;
        }
    }
   
</style>