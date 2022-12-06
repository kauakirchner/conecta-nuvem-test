<template>
    <v-responsive>
        <Navbar :pageName="'Login'" />
        <v-container class="container">
            <v-sheet class="" rounded>
                <v-card class="mx-auto px-6 py-8 mt-8" max-width="344" theme="dark">
                        <v-text-field
                            v-model="formUser.name"
                            class="mb-2"
                            clearable
                            label="Name"
                            type="text"
                        />

                        {{formUser.name }}

                        <v-text-field
                            v-model="formUser.email"
                            class="mb-2"
                            clearable
                            label="Email"
                            hint="Please, Enter with your Gmail account"
                            placeholder="email@gmail.com"
                            type="email"
                        />
    
                        <v-text-field
                            v-model="formUser.password"
                            clearable
                            hint="Your password must be at least 8 characteres"
                            label="Password"
                            type="password"
                        />
    
                        <v-text-field
                            v-model="formUser.confirmedPassword"
                            clearable
                            label="Confirm your password"
                            type="password"
                        />
                        <v-row class="pl-3">
                            <v-btn
                                color="blue"
                                size="large"
                                type="submit"
                                variant="elevated"
                                class="sign-in-btn"
                                @click="handleGoogleAuthentication">
                                Sign In
                            </v-btn>
                            <v-btn
                                color="white"
                                size="large"
                                type="button"
                                variant="elevated" 
                                class="ml-5 google-btn"
                                @click="handleGoogleAuthentication">
                                <em class="fa-brands fa-google"></em>
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
                    const { user } = result;
                    const userOauthAcesstoken = result._tokenResponse.oauthAccessToken;
                    this.$store.commit('auth/setOauthAcessToken', userOauthAcesstoken);
                    this.$store.commit('auth/setIsAuthenticated', true);
                    this.$store.commit('auth/setUsers', user);
                    this.$toast.success(`Welcome, ${user.displayName}`, {
                        position: "top"
                    });
                    this.$router.push('/contacts')
                })
                .catch((error) => {
                    const { code } = error;
                    const { message } = error;
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    this.$toast.error("Falha ao executar login!", {
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