<template>
  <div class="tsxHtml">
    111
    <HCReact></HCReact>
    222
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import React from "react";
import HCReact from "../../reactComponents/html";

@Component({ components: {  } })
export default class TsxHtml extends Vue {
  mounted(){
console.log("React",React.Component);
  }
}
</script>

<style lang="less"></style>
