<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in list" :index="index" :key="index" :item-info="item"></cart-list-item>
  </div>
</template>

<script>

import CartListItem from "./CartListItem.vue"

import { mapGetters } from "vuex"

export default {
  name: 'CartList',
  computed: {
    ...mapGetters({
      list: 'cartList'
    })
  },
  components: {
    CartListItem
  },
}
</script>

<style scoped>
/* .cart-list {
  
} */
</style>