<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="allCheckClick"
      />
      <span>全选</span>
    </div>
    <div class="price">合计: {{ totalPrice }}</div>
    <div class="right" @click="cartBuy">去结算({{ totalCount }})</div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";
export default {
  components: { CheckButton },
  name: "CartBottomBar",
  // data() {
  // return {
  //   test: 0,
  // };
  // },
  computed: {
    totalPrice() {
      // 格式￥的话用这个parseInt(item.price.substring(1))
      return this.$store.state.cartList
        .filter((item) => {
          // this.test += 1;
          console.log("计算了一次");
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.newPrice * item.count;
        }, 0)
        .toFixed(2);
    },
    ...mapGetters(["totalCount", "cartList"]),
    isSelectAll() {
      if (this.cartList.length === 0) {
        // this.test = 0;
        return false;
      }
      return this.cartList.every((item) => {
        // this.test = 0;
        return item.checked;
      });
    },
  },
  activated() {
    this.$forceUpdate();
    // this.test += 1;
  },
  // mounted() {
  //   this.bus.$on("event-name", () => {
  //     //根据参数来进行路由跳转
  //     this.test = 0
  //   });
  //},
  methods: {
    allCheckClick() {
      // if (this.isSelectAll) {
      //   this.cartList.forEach(item => item.checked = false)
      // } else {
      //   this.cartList.forEach(item => item.checked = true)
      // }
      // this.cartList.forEach(item => item.checked = !this.isSelectAll)
      console.log(this.isSelectAll);
      console.log(typeof this.cartList[0].newPrice);
      console.log(this.totalPrice);
      console.log(this.cartList.length);
      console.log(this.cartList[0].checked);
      console.log(this.isSelectAll);
      this.$store.commit("allCheckClick", this.isSelectAll);
      // 这是利用bus总线，给CartListItem组件发送一个数据强制刷新的事件
      this.$bus.$emit('allClickRefresh')
      // this.test += 1;
      this.$forceUpdate();
      // if (this.isSelectAll) {
      //   this.cartList.forEach((item) => {
      //     item.checked = false;
      //     console.log(item.checked);
      //   });
      // } else {
      //   this.cartList.forEach((item) => {
      //     item.checked = true;
      //     console.log(item.checked);
      //   });
      // }
      // this.cartList.push('a')
      // this.cartList.pop()
    },
    cartBuy() {
      if (this.totalCount === 0) {
        this.$toast.show("先选择商品");
      } else {
        this.$emit("cartBuy");
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  font-size: 14px;
  line-height: 40px;
}
.check-content {
  height: 20px;
  display: flex;
  width: 80px;
}
.check-content span {
  padding-left: 40px;
}
.check-button {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 10px;
  height: 20px;
  width: 20px;
}
.price {
  flex: 1;
}
.right {
  text-align: center;
  background-color: var(--color-high-text);
  width: 100px;
  color: #fff;
}
</style>