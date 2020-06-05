declare module "vue/types/vue" {
  interface VueConstructor {
    useReact: Function;
    component: any;
  }
}
