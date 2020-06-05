<template>
  <div class="tsxHtml">
    111
    <TweenOne :animation="{ x: 100 }">demo</TweenOne>222
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import React from "react";
import TweenOne from "rc-tween-one";
Vue.useReact("TweenOne", TweenOne);
@Component({ components: {} })
export default class TsxHtml extends Vue {
  mounted() {
    console.log("React", TweenOne);
  }
}
</script>

<style lang="less"></style>
