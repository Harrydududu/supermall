<template>
  <div class="detail-nav">
    <!-- 这个nav-bar已经封装好了 -->
    <nav-bar>
      <div class="back" slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" :key="index" class="title-item" 
        :class="{activity:currentIndex==index}"
        @click='titleItemClick(index)'>
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
// 这些是公共组件
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNav",
  components: {
    NavBar,
  },
  props: {
    currentIndex: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      
    };
  },
  methods: {
    titleItemClick(index) {
      // this.currentIndex = index
      this.$emit('titleItemClick',index)
    },
    backClick() {
      this.$router.back()
    },
    
  }
};
</script>

<style scoped>
.title {
  display: flex;
  /* color: red; */
}
.title .title-item {
  font-size: 14px;
  flex: 1;
}
.activity {
  color: var(--color-high-text)
}
.back img {
  width: 35%;
  vertical-align: middle;
}
</style>