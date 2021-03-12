<template>
  <div class="activity">
    <p>十一大促，快来抽奖</p>
    <wheel-surf
      v-bind="paramObj"
      @success="success"
      @error="error"
    ></wheel-surf>
  </div>
</template>
<script>
import jsModule from "./index";
export default jsModule;
</script>
<style lang="scss">
@import "./index.scss";
</style>