import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css';
import { registerFirebase } from './services/firebase/register';
import { router } from './routes/index.js'

registerFirebase()
const vuetify = createVuetify({
  components,
  directives,
})
const app = createApp(App);
app.use(vuetify);
app.use(VueToast);
app.use(router)
app.mount("#app");


