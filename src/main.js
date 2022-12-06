import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import { registerFirebase } from './services/firebase/register';
import { router } from './routes/index.js';
import { store } from './store';
import App from './App.vue';

import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

registerFirebase();
const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(vuetify);
app.use(VueToast);
app.use(router);
app.use(store);

app.mount("#app");


