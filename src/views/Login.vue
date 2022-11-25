<template>
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
                                @click="handleAuthenticationByForm">
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
</template>
  
  <script>
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { mapState } from "vuex";
    
    export default {
        name: 'Login',
        data() {
            return {
                formUser: {},
            }
        },

        methods: { 
            handleAuthenticationByForm() {
                this.$store.commit('auth/setFormUsers', this.formUser);
                this.$store.commit('auth/setIsAuthenticated', true);
                this.$toast.success(`Wellcome, ${this.formUser.name}`, {
                    position: "top"
                });
            },

            handleGoogleAuthentication() {

                const provider = new GoogleAuthProvider();
                provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
                const auth = getAuth();
                auth.languageCode = 'it';
    
                signInWithPopup(auth, provider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;
                    this.$store.commit('auth/setIsAuthenticated', true);
                    this.$store.commit('auth/setUsers', user);
                    this.$toast.success(`Wellcome, ${user.displayName}`, {
                        position: "top"
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
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