<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
      :key="item" 
      class="tab-control-item"
      :class="{active:index === currentIndex}"
      @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab-control',
  props: {
    titles: {
      type: Array,
      default() { // 当默认值为数组和对象时default需要使用函数
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index,
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    height: 40px;
    line-height: 40px;
    width: 100%;
    background-color: #fff;
    text-align: center;
    justify-content: space-around;
    /* position: sticky; */
    z-index: 9;
    /* top: 44px; */
  }
  .tab-control-item {
    flex: 1;
    /* border: blue 1px solid; */
  }
  .active span{
    padding: 5px;
    border-bottom: solid 3px pink;

  }
</style>