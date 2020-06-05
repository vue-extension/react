/**
 * fork from <https://github.com/alkin/vue-react>
 * @author Zou Jian <https://github.com/chsword>
 */
import React from "react";
import ReactDOM from "react-dom";
import Vue, { VNode, PluginFunction } from "vue";
import { Component as VueComponent, Prop } from "vue-property-decorator";
import { VueConstructor } from "vue/types/vue";
function eventAttribute(event: string) {
  return event.indexOf("on") === 0
    ? event
    : "on" + event.charAt(0).toUpperCase() + event.slice(1);
}

function getAttributes(el: Element | Node | undefined) {
  const obj: Record<string, any> = {};
  if (!el) return obj;
  const attributes = (el as any).attributes;
  console.log("attributes", attributes);
  for (let i = 0, n = attributes.length; i < n; i++) {
    let name = attributes[i].nodeName;
    const value = attributes[i].nodeValue;

    name = name === "class" ? "className" : "class";
    obj[name] = value;
  }
  return obj;
}

function VNodeToReact(VNode: VNode): React.DOMElement<{}, Element> | string {
  if (typeof VNode.tag === "undefined") {
    // Trim
    return (VNode.text || "").replace(/^\s+|\s+$/g, "");
  }

  if (VNode.tag.indexOf("vue-") === 0) {
    return "";
  }

  // Attributes

  // children
  if (typeof VNode.children === "undefined") {
    return React.createElement(VNode.tag, {});
  }

  return React.createElement(
    VNode.tag,
    getAttributes(VNode.elm),
    ...VNodesToChildren(VNode.children)
  );
}

function VNodesToChildren(
  VNodes: Record<string | number, VNode> | Array<VNode>
) {
  VNodes = VNodes || [];
  const children: Array<React.DOMElement<{}, Element> | string> = [];
  if (Array.isArray(VNodes)) {
    for (let i = 0; i < VNodes.length; i++) {
      const VNode = VNodes[i];
      const child = VNodeToReact(VNode);
      if (child) {
        children.push(child);
      }
    }
  } else {
    Object.keys(VNodes).forEach(function(i) {
      const VNode = VNodes[i as any];
      const child = VNodeToReact(VNode);
      if (child) {
        children.push(child);
      }
    });
  }
  return children;
}
function ReactToVue(name: string, Component: any) {
  return Vue.extend({
    // name: name,
    data() {
      return {
        props: {},
        component: {},
        children: [],
      };
    },
    methods: {
      refresh() {
        console.log("Component", Component);
        (this as any).component = ReactDOM.render(
          React.createElement(
            Component,
            (this as any).props,
            ...(this as any).children
          ),
          this.$el
        );
      },
    },
    render(createElement: any) {
      return createElement("div", this.$slots.default);
    },
    mounted() {
      // Copy all attributes to props
      Object.assign((this as any).props, this.$attrs);

      // Register Events and Handlers
      Object.keys((this as any)._events).forEach((event) => {
        event = eventAttribute(event);
        (this as any).props[event] = (...args: any) =>
          this.$emit(event, ...args);
      });

      // Map default slot to children
      (this as any).children = VNodesToChildren(this.$slots.default || []);

      // Render
      (this as any).refresh();

      // Watch attrs and refresh
      Object.keys(this.$attrs).forEach((prop) => {
        this.$watch(
          () => this.$attrs[prop],
          (value: any) => {
            (this as any).props[prop] = value;
            (this as any).refresh();
          }
        );
      });
    },
  });
}
function AsVue(...args: any[]) {
  const arg = parserComponentArgs(args);
  return ReactToVue(arg.name, arg.component);
}
function parserComponentArgs(args: any[]) {
  let name: string;
  let component: any;

  if (args.length === 1) {
    component = args[0];
    name = component.name;
  } else {
    component = args[1];
    name = args[0] || component.name;
  }
  return { name, component };
}
const install: PluginFunction<any> = function(vue: any, options: any) {
  vue.useReact = function(...args: any[]) {
    const arg = parserComponentArgs(args);
    const component = ReactToVue(arg.name, arg.component);
    vue.component(arg.name, component);
  };
};
export default {
  install,
  ReactToVue,
  AsVue,
};
