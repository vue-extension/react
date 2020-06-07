import { PluginFunction } from "vue";
declare function ReactToVue(name: string, reactComponent: any): any;
declare function AsVue(...args: any[]): any;
declare const _default: {
    install: PluginFunction<any>;
    ReactToVue: typeof ReactToVue;
    AsVue: typeof AsVue;
};
export default _default;
