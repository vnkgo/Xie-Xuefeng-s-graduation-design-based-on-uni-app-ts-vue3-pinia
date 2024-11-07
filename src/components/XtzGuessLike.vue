<script setup lang="ts">
import { getHomeGoodsGuessLikeAPI } from '@/services/home'
import { onMounted, ref } from 'vue'
import type { GuessItem } from '@/types/home'
import type { PageParams } from '@/types/global'
//分页参数
//不用required会报错无法传参
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
}

const guessLikeList = ref<GuessItem[]>([])
//已结束标记
const pageFinish = ref(false)
//获取猜你喜欢数据
const getHomeGoodsGuessLikeData = async () => {
  //退出判断
  if (pageFinish.value === true) {
    return uni.showToast({
      title: '没有更多数据了',
      icon: 'none',
    })
  }
  const res = await getHomeGoodsGuessLikeAPI(pageParams)
  //guessLikeList.value = res.result.
  //数组的追加
  guessLikeList.value.push(...res.result.items)

  if (pageParams.page < res.result.pages) {
    //页码累 加
    pageParams.page++
  } else {
    //没有更多数据
    pageFinish.value = true
  }
}

// 组件加载完成
onMounted(() => {
  getHomeGoodsGuessLikeData()
})

//重置数据
const resetData = () => {
  pageParams.page = 1
  guessLikeList.value = []
  pageFinish.value = false
}

//暴露方法
defineExpose({
  resetData,
  getMore: getHomeGoodsGuessLikeData,
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">你会喜欢的</text>
  </view>
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessLikeList"
      :key="item.id"
      :url="`/pages/goods/goods?id=4007498`"
    >
      <image class="image" mode="aspectFill" :src="item.picture"> </image>
      <view class="name"> {{ item.name }} </view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text">{{ pageFinish ? '没有别的了' : '别吵我在加载' }} </view>
</template>

<style lang="scss">
:host {
  display: block;
}
/* 分类标题 */
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

/* 猜你喜欢 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }
  .image {
    width: 304rpx;
    height: 304rpx;
  }
  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }
  .small {
    font-size: 80%;
  }
}
// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
