<script setup lang="ts">
import XtzSwiper from '@/components/XtzSwiper.vue'
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBannerApi, getHomeCategoryAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem } from '@/types/home'
import { ref } from 'vue'
import categoryPanel from './components/CategoryPanel.vue'

const bannerList = ref<BannerItem[]>([])

const getHomeBannerData = async () => {
  const res = await getHomeBannerApi()
  console.log(res)
  bannerList.value = res.result
}

//获取前台分类数据
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
}

onLoad(() => {
  getHomeBannerData()
})
</script>

<template>
  <!--自定义导航栏-->
  <CustomNavbar />
  <!--轮播图-->
  <XtzSwiper :list="bannerList" />
  <!--分类面板-->
  <categoryPanel />
  <view class="index">index</view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
}
</style>
