<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
// 公共组件的引用
import { Swiper, SwiperItem } from "components/common/swiper/swiperindex.js";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
       type: Array,
       default() {
         return []
       }
     }
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
}
.detail-swiper img{
  height: 300px;
}
</style>