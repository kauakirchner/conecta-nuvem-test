<template>
    <v-responsive>
        <Navbar :pageName="'Login'" />
        <v-container class="container">
            <v-sheet class="" rounded>
                <v-card 
                    class="mx-auto px-6 py-8 mt-8 pl-3" 
                    loading="blue" 
                    rounded="blue"
                    max-width="500" 
                    theme="dark">
                    <v-row class="pl-3">
                        <v-card-title>Super Org Contact</v-card-title>
                        <v-card-text>Seja Bem vindo ao Super Org Contact! Clique no botão abaixo para fazer login e começar a utilizar nossos serviços.</v-card-text>
                    </v-row>
                        <v-row class="pl-7">
                            <v-btn
                                color="blue"
                                size="large"
                                class="sign-in-btn mt-2"
                                @click="handleGoogleAuthentication">
                                Sign In
                            </v-btn>
                        </v-row>
                </v-card>
            </v-sheet>
        </v-container>
    </v-responsive>
</template>
  
<script>
    import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
    import { mapState } from "vuex";
    import Navbar from '../components/shared/Navbar.vue';
    
    export default {
        name: 'Login',
        components: {
            Navbar
        },

        data() {
            return {
                formUser: {}
            }
        },

        methods: { 
            handleGoogleAuthentication() {
                const provider = new GoogleAuthProvider();
                const auth = getAuth();
                provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
                provider.addScope('https://www.googleapis.com/auth/contacts');
                auth.languageCode = 'pt';
                
                signInWithPopup(auth, provider)
                .then(result => {
                    const userOauthAcesstoken = result._tokenResponse.oauthAccessToken;
                    const { user } = result;
                    const { email } = user;
                    const { displayName } = user;
                    sessionStorage.setItem('userName', displayName);
                    sessionStorage.setItem('userEmail', email);

                    this.$store.commit('auth/setOauthAcessToken', userOauthAcesstoken);
                    this.$store.commit('auth/setIsAuthenticated', true);
                    this.$store.commit('auth/setUsers', user);
                    
                    this.$toast.info(`Welcome, ${user.displayName}`, {
                        position: "top"
                    });
                    this.$router.push('/contacts');
                })
                .catch((error) => {
                    const { code } = error;
                    const { message } = error;
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    this.$toast.error("failed to perform login!", {
                        position: "top"
                    })
                });
            }
        },

        computed: {
            ...mapState({
                users: state => state.auth.users,
                isAuthenticated: state => state.auth.isAuthenticated,
                formUsers: state => state.auth.formUsers
            })
        }
    }
</script>
  
<style scoped>

    .google-btn {
        width: 30%
    }
    .sign-in-btn {
        width: 60%;
    }

</style>