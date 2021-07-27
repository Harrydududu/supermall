<template>
<!-- 因为导航栏可能是有多个的，所以不设置id了，设置class -->
  <div class="nav-bar">
    <!-- 给插槽设计样式，直接在插槽外层套一个div，然后每个插槽都是具名插槽 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  }
  .left, .right {
    width: 60px;
  }
  .center {
    flex: 1;
  }
</style>