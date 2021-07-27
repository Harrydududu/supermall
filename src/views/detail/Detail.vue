<template>
  <div class="detail-wrapper">
    <detail-nav :currentIndex='currentIndex' class="detail-nav"
    @titleItemClick='titleItemClick'></detail-nav>
    <scroll
      ref="detailscroll"
      class="content"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <!-- 下面这个组件有问题 -->
      <detail-goods-info
        ref="detailGoodsInfo"
        @imageLoad="detailRefresh"
        :detail-info="detailInfo"
      ></detail-goods-info>
      <detail-param-info ref="paramInfoTop" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"
      ref="commentInfoTop"></detail-comment-info>
      <goods-list ref="recommendTop" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart='addToCart'></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast></toast>
  </div>
</template>

<script>
// 子组件的引用
import DetailNav from "./childComps/DetailNav.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

// 网络请求的方法
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail.js";

// 引用公共组件
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop"
import Toast from "components/common/toast/Toast"

import { mapActions } from "vuex"

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // 这是导航组件的currentIndex
      currentIndex: 0,
      // 各个组件模块的偏移高度
      themeTopYs: [],
      // 这是<detail-goods-info/>的偏移高度
      // goodsInfoTop: 0,
      
      // 这是评论模块的便宜高度
      // commentInfoTop: 0,
      // 推荐模块的偏移高度
      // recommendTop: 0,
      // 这是回到顶部是否展示
      isShowBackTop: false,
      // 加入购物车的数据
      product: {}
    };
  },
  methods: {
    // 映射Actions的方法
    // ...mapActions([
    //   'addCart'
    // ]),
    ...mapActions({
      add: 'addCart'
    }),
    // detail-goods-info加载完就执行
    detailRefresh() {
      this.$refs.detailscroll.refresh();
      // console.log("加载完啦");
      // 获取各个组件的偏移高度
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.paramInfoTop.$el.offsetTop)
      this.themeTopYs.push(this.$refs.commentInfoTop.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommendTop.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs);
      // this.goodsInfoTop = this.$refs.detailGoodsInfo.$el.offsetTop;
      // this.commentInfoTop
      // console.log(this.goodsInfoTop);
      // console.log(this.goodsInfoTop);
    },
    // 监听滚动的高度，改变tab的状态
    contentScroll(position) {
      const positionY = -(position.y)
      // console.log('hi');
      // if(-(position.y) < this.themeTopYs[1]) {
      //   console.log('要触发拉');
      //   this.currentIndex = 0
      // }else if(-(position.y) >= this.themeTopYs[1] && -(position.y) < this.themeTopYs[2]) {
      //   // console.log('要触发拉');
      //   this.currentIndex = 1
      // }else if(-(position.y) >= this.themeTopYs[2] && -(position.y) < this.themeTopYs[3]) {
      //   // console.log('要触发拉');
      //   this.currentIndex = 2
      // }else if(-(position.y) >= this.themeTopYs[3]) {
      //   // console.log('要触发拉');
      //   this.currentIndex = 3
      // }
      // 以下是老师的方法
      let length = this.themeTopYs.length
      for(let i = 0; i < length-1; i++) {
        // 这个if是判断当前所在的位置
        if(this.currentIndex !== i && ((i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]))) {
          this.currentIndex = i
          console.log(i);
        }
      }
      this.isShowBackTop = -(position.y) > 1000
    },
    // 监听导航标题的点击
    titleItemClick(index) {
      this.currentIndex = index
      // this.$refs.detailscroll.scrollTo(0, 0, 300)
      if(!this.themeTopYs[2]){
        console.log('zdasdias');
      }
      this.$refs.detailscroll.scrollTo(0, -(this.themeTopYs[index]),300)
    },
    backClick() {
      this.$refs.detailscroll.scrollTo(0,0,300)
    },
    addToCart() {
      console.log('加入购物车成功');
      console.log(this.iid);
      this.product.iid = this.iid
      this.product.img = this.topImages[0]
      this.product.title = this.goods.title
      this.product.desc = this.goods.desc
      this.product.newPrice = this.goods.realPrice
      // this.$store.dispatch('addCart',this.product).then(res => {
      //   console.log(res);
      //   // toast(res)
      // })
      this.add(this.product).then(res => {
        this.$toast.show(res,2000)
      })
    }
  },
  created() {
    //  this.obj = this.$route.params
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then((res) => {
      // console.log(res);
      // this.goodsDetail = res
      // 这里做一些信息的处理
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 把商品信息整合
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 店铺信息的对象
      this.shopInfo = new Shop(data.shopInfo);

      // 商品详情数据
      this.detailInfo = data.detailInfo;

      // 商品参数数据
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 评论的数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
        // console.log(this.commentInfo);
      }
    });

    getRecommend().then((res) => {
      console.log(res);
      this.recommends = res.data.list;
      // console.log(this.recommends);
    });
  },
  mounted() {},
  // activated() {
  //   this.$refs.detailscroll.refresh()
  // },
  // mounted() {
  //   location.reload()
  //   console.log('刷新');
  // },
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast,
    Toast,
  },
};
</script>

<style scoped>
.detail-wrapper {
  position: relative;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  /* 可以使用这种方法来对组件进行布局 */
  position: absolute;
  /* height: 300px; */
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* 加了hidden可以使pc页面鼠标滚轮失效 */
  overflow: hidden;
}
</style>