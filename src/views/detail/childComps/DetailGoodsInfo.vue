<template>
  <div v-if="Object.keys(detailInfo).length !== 0 && detailInfo.detailImage[0].list !== null"
       class="goods-info1">
    <div class="info-desc1 clear-fix">
      <div class="start1"></div>
      <div class="desc1">{{ detailInfo.desc }}</div>
      <div class="end1"></div>
    </div>
    <div class="info-key1">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list1">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imgLoad" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    };
  },
  methods: {
    imgLoad() {
      // 判断, 所有的图片都加载完了, 那么进行一次回调就可以了.
      if (++this.counter === this.imagesLength) {
        this.$emit("imageLoad");
        // console.log("---------")
      }
    },
  },
  watch: {
    detailInfo() {
      // 获取图片的个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    }
  }
}
</script>

<style scoped>
.goods-info1 {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc1 {
  padding: 0 15px;
}

.info-desc1 .start1,
.info-desc1 .end1 {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc1 .start1 {
  float: left;
}

.info-desc1 .end1 {
  float: right;
}

.info-desc1 .start1::before,
.info-desc1 .end1::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc1 .end1::after {
  right: 0;
}

.info-desc1 .desc1 {
  padding: 15px 0;
  font-size: 14px;
}

.info-key1 {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info-list1 img {
  width: 100%;
  /* height: 400px; */
}
</style>