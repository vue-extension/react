import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
import VueReact from "../../src/index";

Vue.use(VueReact);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
