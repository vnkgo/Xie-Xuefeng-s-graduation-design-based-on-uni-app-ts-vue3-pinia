<script setup lang="ts">
import XtzSwiper from '@/components/XtzSwiper.vue'
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBannerApi, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem } from '@/types/home'
import { ref } from 'vue'
import categoryPanel from './components/CategoryPanel.vue'
import type { CategoryItem, HotItem } from '@/types/home'
import XtzGuessLike from '@/components/XtzGuessLike.vue'
import HotPanel from './components/HotPanel.vue'
import type { XtzGuessInstance } from '@/types/component'

const bannerList = ref<BannerItem[]>([])

const getHomeBannerData = async () => {
  const res = await getHomeBannerApi()
  console.log(res)
  bannerList.value = res.result
}

const categoryList = ref<CategoryItem[]>([])
//获取前台分类数据
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}
onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
  getHomeHotData()
})

// 获取猜你喜欢实例
const guessRef = ref<XtzGuessInstance>()
// 滚动到底部
const onScrolltolower = () => {
  // console.log('触底了')
  guessRef.value?.getMore()
}
</script>

<template>
  <!--自定义导航栏-->
  <CustomNavbar />
  <!--滚动视图-->
  <scroll-view @scrolltolower="onScrolltolower" class="scroll-view" scroll-y>
    <!--轮播图-->
    <XtzSwiper :list="bannerList" />
    <!--分类面板-->
    <categoryPanel :list="categoryList" />
    <!--热门推荐-->
    <HotPanel :list="hotList" />
    <!--你会喜欢-->
    <XtzGuessLike ref="guessRef" />
    <view class="index"></view>
  </scroll-view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
scroll-view {
  flex: 1;
  height: 0;
}
</style>
