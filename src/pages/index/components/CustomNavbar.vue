<script setup lang="ts">
//获取屏幕边界到安全区域的距离
const { safeAreaInsets } = uni.getSystemInfoSync()
console.log(safeAreaInsets)
</script>

<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <!-- logo文字 -->
    <view class="logo">
      <image class="logo-image" src="@/static/images/logo.png"></image>
      <text class="logo-text">实惠 · 方便 · 快捷</text>
    </view>
    <!-- 搜索条 -->
    <view class="search">
      <text class="icon-search">搜点什么</text>
      <text class="icon-scan"></text>
    </view>
  </view>
</template>

<style lang="scss">
/* 自定义导航条 */
.navbar {
  background-image: linear-gradient(to right, #ff7e5f, #feb47b);
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  .logo {
    display: flex;
    align-items: center;
    height: 64rpx;
    padding-left: 30rpx;
    padding-top: 20rpx;
    .logo-image {
      width: 166rpx;
      height: 39rpx;
      filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3));
    }
    .logo-text {
      flex: 1;
      line-height: 28rpx;
      color: #fff;
      margin: 2rpx 0 0 20rpx;
      padding-left: 20rpx;
      border-left: 1rpx solid rgba(255, 255, 255, 0.6);
      font-size: 26rpx;
      text-shadow: 2px 2px rgba(0, 0, 0, 0.3);
    }
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10rpx 0 26rpx;
    height: 64rpx;
    margin: 16rpx 20rpx;
    color: #333;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    .icon-search {
      &::before {
        margin-right: 10rpx;
      }
    }
    .icon-scan {
      font-size: 30rpx;
      padding: 15rpx;
      color: #ff7e5f;
    }
  }
}
</style>
