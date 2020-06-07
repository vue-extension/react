/**
 * @author Zou Jian <https://github.com/chsword>
 */
import React from "react";
import ReactDOM from "react-dom";

import Vue, { VNode, PluginFunction, CreateElement } from "vue";
import { Component, Prop } from "vue-property-decorator";
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
  //console.log("attributes", attributes);
  for (let i = 0, n = attributes.length; i < n; i++) {
    let name = attributes[i].nodeName;
    const value = attributes[i].nodeValue;

    name = name === "class" ? "className" : "class";
    obj[name] = value;
  }
  return obj;
}

function VNodeToReact(vNode: VNode): React.DOMElement<{}, Element> | string {
  if (typeof vNode.tag === "undefined") {
    // Trim
    return (vNode.text || "").replace(/^\s+|\s+$/g, "");
  }
  //console.log("1")
  if (vNode.tag.indexOf("vue-") === 0) {
    return "";
  }
  //console.log("2")
  // Attributes

  // children
  if (typeof vNode.children === "undefined") {

    return React.createElement(vNode.tag, { ...vNode.data?.attrs });
  }
  //console.log("3")
  return React.createElement(
    vNode.tag,
    getAttributes(vNode.elm),
    ...VNodesToChildren(vNode.children)
  );
}

function VNodesToChildren(
  vNodes: Record<string | number, VNode> | Array<VNode>
) {
  vNodes = vNodes || [];
  const children: Array<React.DOMElement<{}, Element> | string> = [];
  if (Array.isArray(vNodes)) {
    for (let i = 0; i < vNodes.length; i++) {
      const vNode = vNodes[i];
      //console.log("vn", vNode)
      const child = VNodeToReact(vNode);
      if (child) {
        children.push(child);
      }
    }
  } else {
    Object.keys(vNodes).forEach(function (i) {
      const vNode = vNodes[i as any];
      const child = VNodeToReact(vNode);
      if (child) {
        children.push(child);
      }
    });
  }
  return children;
}
function ReactToVue(name: string, reactComponent: any): any {
  @Component({ name: name })
  class ReactToVueComponent extends Vue {
    @Prop({ type: String }) mytest: string;
    props: any = {};
    component: any;
    children: any[] = [];
    public refresh() {
      //  console.log("props", this.props)
      const el = document.createElement("div");
      this.component = ReactDOM.render(
        React.createElement(
          reactComponent,
          this.props,
          ...this.children
        ),
        el//this.$el
      );
      //   this.$el.replaceChild();

      this.$el.parentElement?.replaceChild(el.childNodes[0], this.$el)
      // this.component = ReactDOM.render(
      //   React.createElement(
      //     reactComponent,
      //     this.props,
      //     ...this.children
      //   ),
      //   this.$el
      // );
    }
    mounted() {
      // Copy all attributes to props
      Object.assign(this.props, this.$attrs);
      // if (this.$vnode.data?.staticStyle) {
      //   Object.assign(this.props, { style: this.$vnode.data?.staticStyle });
      // }
      // if (this.$vnode.data?.style) {
      //   Object.assign(this.props, { style: this.$vnode.data?.style });
      // }
      // console.log("children: ", this.$props)
      // Object.keys(this.props).forEach((key) => {
      //   this.$props[key] = this.props[key]
      // });
      // Register Events and Handlers
      Object.keys((this as any)._events).forEach((event) => {
        event = eventAttribute(event);
        this.props[event] = (...args: any) =>
          this.$emit(event, ...args);
      });

      // Map default slot to children
      this.children = VNodesToChildren(this.$slots.default || []);

      // Render
      this.refresh();

      // Watch attrs and refresh
      Object.keys(this.$attrs).forEach((attrKey) => {
        this.$watch(
          () => this.$attrs[attrKey],
          (value: any) => {
            this.props[attrKey] = value;
            this.refresh();
          }
        );
      });
    }
    render(h: CreateElement) {
      //return h(document.createElement("div").tagName)
      return h("span", { attrs: undefined }, this.$slots.default);
    }
  }
  return ReactToVueComponent;
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
const install: PluginFunction<any> = function (vue: any, options: any) {
  vue.useReact = function (...args: any[]) {
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
