import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
const vuePages: string[] = ["tsx"];
const reactPages: string[] = ["tsxHtml"];

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];
vuePages.forEach(c => {
  routes.push({
    path: "/vue/" + c,
    name: "vue-" + c,
    component: () =>
      import(/* webpackChunkName: "vuepages" */ `../views/vue/${c}.vue`)
  });
});
reactPages.forEach(c => {
  routes.push({
    path: "/react/" + c,
    name: "react-" + c,
    component: () =>
      import(/* webpackChunkName: "reactpages" */ `../views/react/${c}.vue`)
  });
});
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
