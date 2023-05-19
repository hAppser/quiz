import { createApp } from "vue";
import { createVuetify } from "vuetify";
import { createPinia } from "pinia";

import App from "./App.vue";

import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});
const pinia = createPinia();

createApp(App).use(vuetify).use(pinia).mount("#app");
