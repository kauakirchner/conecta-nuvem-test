<template>
    <div class="login-container">
      <router-view></router-view>
      <v-btn @click="googleAuthentication">Login</v-btn>
    </div>
  </template>
  
  <script>
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  
  export default {
      name: 'Login',
      data() {
          return {
  
          }
      },
      methods: {
          googleAuthentication() {
              const provider = new GoogleAuthProvider();
              provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
              const auth = getAuth();
              auth.languageCode = 'it';
  
              signInWithPopup(auth, provider)
                  .then((result) => {
                      const credential = GoogleAuthProvider.credentialFromResult(result);
                      const token = credential.accessToken;
                      const user = result.user;
                      this.$toast.info(`Bem vindo, ${user.displayName}`, {
                          position: "top"
                      })
                  })
                  .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      const email = error.customData.email;
                      console.log(errorCode,errorMessage,email)
                      const credential = GoogleAuthProvider.credentialFromError(error);
                  
                  });
          }
      } 
  }
  </script>
  
  <style>
  
  </style>