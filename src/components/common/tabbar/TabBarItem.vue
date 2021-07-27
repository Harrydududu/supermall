<template>
    <div class="tab-bar-item" @click="itemClick">
      <!-- 这里使用具名插槽 -->
      <slot v-if="!isActive" name="item-icon"></slot>
      <slot v-else name="item-icon-active"></slot>
      <!-- 这个嵌套的div为了能使活跃的文字变颜色，而不被slot替换掉 -->
      <div :style="activeStyle">
        <slot name="item-text"></slot>
      </div>
      
        <!-- <img src="../../assets/img/tabbar/首页.svg" alt="">
        <div>首页</div> -->
    </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      // return this.$route.path == this.path 这个方法也可以，下面的是老师的方法
      return this.$route.path.indexOf(this.path) != -1
    },
    activeStyle() {
      return this.isActive? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch(err=>err) // 加了这个catch双击也不会出错了
      // console.log('itemClick');
    }
  }
}
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 13px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

/* 这个不要了，因为js的动态绑定不能绑定到css里 */
/* .active {
  color: red;
} */
</style>