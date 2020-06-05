import Vue, { PluginFunction } from "vue";
declare function ReactToVue(name: string, Component: any): import("vue/types/vue").ExtendedVue<Vue, {
    props: {};
    component: {};
    children: never[];
}, {
    refresh(): void;
}, unknown, Record<"$el" | "$options" | "$parent" | "$root" | "$children" | "$refs" | "$slots" | "$scopedSlots" | "$isServer" | "$data" | "$props" | "$ssrContext" | "$vnode" | "$attrs" | "$listeners" | "$mount" | "$forceUpdate" | "$destroy" | "$set" | "$delete" | "$watch" | "$on" | "$once" | "$off" | "$emit" | "$nextTick" | "$createElement", any>>;
declare function AsVue(...args: any[]): import("vue/types/vue").ExtendedVue<Vue, {
    props: {};
    component: {};
    children: never[];
}, {
    refresh(): void;
}, unknown, Record<"$el" | "$options" | "$parent" | "$root" | "$children" | "$refs" | "$slots" | "$scopedSlots" | "$isServer" | "$data" | "$props" | "$ssrContext" | "$vnode" | "$attrs" | "$listeners" | "$mount" | "$forceUpdate" | "$destroy" | "$set" | "$delete" | "$watch" | "$on" | "$once" | "$off" | "$emit" | "$nextTick" | "$createElement", any>>;
declare const _default: {
    install: PluginFunction<any>;
    ReactToVue: typeof ReactToVue;
    AsVue: typeof AsVue;
};
export default _default;
