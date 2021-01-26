require('./bootstrap');

// import "./interceptors";

import Vue from "vue";

// bootstrap vue
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);

import App from "./App.vue";
import store from "./store/store";
import router from "./router/index";

const app = new Vue({
  el: "#app",
  store,
  router,
  beforeCreate() {
    // this.$store.dispatch("AuthenticationStore/authenticateByToken");
  },
  render: (h) => h(App),
});

