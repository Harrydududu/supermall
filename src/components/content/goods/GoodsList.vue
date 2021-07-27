<template>
  <div class="goods-list">
    <goods-list-item 
    v-for="item in goods" :key="item.title"
    :goodsItem="item">
    </goods-list-item>
  </div>
</template>

<script>

import GoodsListItem from './GoodsListItem.vue'

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    // 这里的goods是数组，里面的全是商品对象
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
 .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--color-background);
    padding: 2px;
  }
</style>