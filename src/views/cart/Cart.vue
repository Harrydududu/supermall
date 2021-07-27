<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 内容 -->
    <scroll
      ref="scroll"
      class="cart-content"
      :probe-type="0"
      >
      <cart-list>
        
      </cart-list>
      <!-- <button @click="fresh">刷新</button> -->
    </scroll>
    <cart-bottom-bar class="bottom-bar"></cart-bottom-bar>
  </div>
</template>

<script type="text/javascript">
// 公共组件
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll"

// 子组件
import CartList from "./childComps/CartList.vue"
import CartBottomBar from "./childComps/CartBottomBar.vue"


import { mapGetters } from "vuex"

export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar
  },
  computed: {
    // 使用mapGetters的两种语法
    // 第一种
    // ...mapGetters(['cartList','cartListLength'])
    // 第二种
    ...mapGetters({
      length: 'cartListLength',
      list: 'cartList'
    })
  },
  activated() {
    // 每次进入购物车页面都刷新scroll获取新高度，这样才能滚动
    this.$refs.scroll.refresh()
    // this.$forceUpdate();
    // console.log('刷新啦');
  },
  // methods: {
  //   fresh() {
  //     this.$refs.scroll.refresh()
  //     console.log("刷新啦");
  //   }
  // }
};
</script>

<style scoped>
.cart {
  position: relative;
  height: 100vh;
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.cart-content {
  /* 可以使用这种方法来对组件进行布局 */
  position: absolute;
  /* height: 300px; */
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
  /* 加了hidden可以使pc页面鼠标滚轮失效 */
  overflow: hidden;
}

/* 底部汇总的布局 */
.bottom-bar {
  /* position: absolute;
  left: 0;
  right: 0;
  bottom: 49px; */
}
</style>