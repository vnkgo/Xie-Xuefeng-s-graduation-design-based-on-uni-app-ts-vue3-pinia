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
import PageSkeleton from './components/PageSkeleton.vue'

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
//是否加载中
const isLoading = ref(false)

onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])

  //加载完全部节目,关闭加载动画
  isLoading.value = false
})
//这里分页最好再加个节流，防止加载过程中用户再次上拉触底再次发送请求

// 获取猜你喜欢实例
const guessRef = ref<XtzGuessInstance>()
// 滚动到底部
const onScrolltolower = () => {
  // console.log('触底了')
  guessRef.value?.getMore()
}
// 是否触发下拉刷新
const isTriggered = ref(false)

//自定义下拉刷新被触发
const openfresherrefresh = async () => {
  isTriggered.value = true
  guessRef.value?.resetData()
  //同时发送三个请求,并行请求
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value?.getMore(),
  ])
  //关闭加载动画
  isTriggered.value = false
}
</script>

<template>
  <!--自定义导航栏-->
  <CustomNavbar />
  <!--滚动视图-->
  <scroll-view
    refresher-enabled="true"
    @refresherrefresh="openfresherrefresh"
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrolltolower"
    class="scroll-view"
    scroll-y
  >
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!--轮播图-->
      <XtzSwiper :list="bannerList" />
      <!--分类面板-->
      <categoryPanel :list="categoryList" />
      <!--热门推荐-->
      <HotPanel :list="hotList" />
      <!--你会喜欢-->
      <XtzGuessLike ref="guessRef" />
      <view class="index"></view>
    </template>
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
