import { Vue, Component as VueComponent, Prop } from "vue-property-decorator";
import { VueConstructor } from 'vue';
function chsword() {
    console.log("chsword(): 加载.");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("chsword", target, propertyKey, descriptor);
        return class extends Vue {
            name = 'HCReact';
        }
    }
}

@chsword()
abstract class Component {

}


export default {
    Component: Component
};