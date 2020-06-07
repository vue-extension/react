<template>
  <div class="tsxHtml">
    111
    <TweenOne :animation="{ x: 100 }" style="color:red">demo</TweenOne>
    222
    <TweenOne
      :animation="{ blur: '10px', sepia: '100%', duration: 2000 }"
      :style="{ filter: 'blur(30px)' }"
    >
      <img
        width="500"
        src="https://t.alipayobjects.com/images/T1CFtgXb0jXXXXXXXX.jpg"
        alt="img"
      />
    </TweenOne>
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
