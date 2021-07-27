<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
        @tabClick="tabClick"
        :titles="['流行', '新款', '精选']"
        ref="tabcontrol1"
        class="tab-fixed"
        v-show="isTabShow"
      ></tab-control>
    <!-- 用scroll的时候记得设置高度，还有传入probe-type的值，记得加:传递，这样是数字，不加是字符串 -->
    <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll='contentScroll'
    :pull-up-load='true'
    @pullingUp='loadMore'>
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        @tabClick="tabClick"
        :titles="['流行', '新款', '精选']"
        ref="tabcontrol2"
      ></tab-control>

      <!-- ul>li{列表$}*10 -->

      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 这里记得加.native，组件原生根元素点击 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 对引用的东西进行分类

// 这些都是子组件
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";


// 这些是公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop"

// 这些是方法
import { getHomeMutidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils.js"

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabShow: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      // 记得return
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getHomeMutidata()
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")
  },
  mounted() {
    // 在这里弄个refresh的防抖
    const refresh = debounce(this.$refs.scroll.refresh,300)
    // 在这里监听图片加载完的事件
    // 但是$bus并不是自带的东西，要在原型添加这个$bus，把一个new Vue实例赋给它，那他就有$emit的方法了
    this.$bus.$on('itemImageLoad',() => {
      refresh()
    })

    
  },
  destroyed() {
    console.log('Home destroy');
  },
  activated() {
    // console.log('Home activated');
    // 回到之前离开Home的位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // 记得做刷新
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 在离开Home组件的时候记录当前Home滚动的位置
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY);
    // console.log('Home deactivated');

    // 取消监听imageLoad的方法，回来这个页面的时候再监听
  },
  methods: {
    // 网络请求方法
    getHomeMutidata() {
      getHomeMutidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        console.log(res);
        this.goods[type].list.push(...res.data.list); // es6的语法：解构，将res.data.list数组里的元素一个个放进去
        // 如果不这样做，res.data.list会被当成数组的一个元素放进去
        this.goods[type].page = page;
      });
    },

    // 事件监听方法

    // 这个是计算tabcontrol应该固定的位置
    swiperImageLoad() {
      // 计算出tabcontrol应该固定的位置
      // console.log(this.$refs.tabcontrol.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
      // console.log(this.tabOffsetTop);
    },

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabcontrol1.currentIndex = index
      this.$refs.tabcontrol2.currentIndex = index
    },
    // 这个是回到顶部的事件
    backClick() {
      console.log('backTop');
      this.$refs.scroll.scrollTo(0,0)
    },

    // 这个是决定backTop要不要显示
    // 还有监听tabcontrol要不要固定
    contentScroll(position) {
      // console.log(position.y);
      this.isShowBackTop = -(position.y) > 1000
      // 决定tabcontrol是否吸顶 (position:fixed)
      this.isTabShow = -(position.y) > this.tabOffsetTop
    },

    // 这个是加载更多的事件
    loadMore() {
      console.log('加载更多');
      this.getHomeGoods(this.currentType)
      // 这里做完后记得给scroll.finishPullUp
      this.$refs.scroll.finishPullUp()
    },
  },
};
</script>

<style scoped>
.home {
  /* padding-top: 44px; */
  /* vh为视口的高度宽度的单位 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */
  /* z-index: 9; */
}
.content {
  /* 可以使用这种方法来对组件进行布局 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* 加了hidden可以使pc页面鼠标滚轮失效 */
  overflow: hidden;  
}
.tab-fixed {
  position: relative;
  /* top: 0px; */
  z-index: 9;
}
/* .content {
  height: calc(100% - 52px);
  overflow: hidden;
} */
</style>