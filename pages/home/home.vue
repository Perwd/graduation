<template>
  <view>
    <!-- indicator-dots设置小圆点 -->
    <!-- autoplay自动轮播，interval轮播时间，多少秒轮播一次， -->
    <!-- duration图片之间替换时间 -->
    <!-- circular自动衔接 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </navigator>

      </swiper-item>
    </swiper>
  </view>
  <view class="nav-list">
    <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">

      <image :src="item.image_src" class="nav-img"></image>

    </view>
  </view>
  <!-- 楼层区域 -->
  <view class="floor-list">
    <!-- 楼层 item 项 -->
    <view class="floor-item" v-for="(item, i) in floorList" :key="i">
      <!-- 楼层标题 -->
      <image :src="item.floor_title.image_src" class="floor-title"></image>
      <!-- 楼层图片区域 -->
      <view class="floor-img-box">
        <!-- 左侧大图片的盒子 -->
        <view class="left-img-box">
          <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
            mode="widthFix"></image>
        </view>
        <!-- 右侧 4 个小图片的盒子 -->
        <view class="right-img-box">
          <view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2">
            <image v-if="i2 !== 0" :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}">
            </image>
          </view>
        </view>
      </view>

    </view>
  </view>

</template>

<script setup>
  import {
    ref
  } from 'vue'
  import {
    onLoad,
    onShow
  } from '@dcloudio/uni-app'

  const swiperList = ref([])
  const navList = ref([])
  const floorList = ref([])

  const getSwiperList = async () => {
    const {
      data: res
    } = await uni.$http.get('/api/public/v1/home/swiperdata')
    // console.log(res)
    // 3.2 请求失败
    if (res.meta.status !== 200) return uni.$showMsg()
    // 3.3 请求成功，为 data 中的数据赋值

    swiperList.value = res.message
    // console.log(swiperList.value)
    // console.log(res.message)
  }
  const getNavList = async () => {
    const {
      data: res
    } = await uni.$http.get('/api/public/v1/home/catitems')
    // console.log(res)
    // 3.2 请求失败
    if (res.meta.status !== 200) return uni.$showMsg()
    // 3.3 请求成功，为 data 中的数据赋值
    navList.value = res.message

  }
  const getFloorList = async () => {
    const {
      data: res
    } = await uni.$http.get('/api/public/v1/home/floordata')
    // console.log(res)

    // 3.2 请求失败
    if (res.meta.status !== 200) return uni.$showMsg()

    // 3.3 请求成功，为 data 中的数据赋值
    floorList.value = res.message

  }
  onLoad(() => {
    // 业务逻辑
    // console.log(optios)
    getSwiperList()
    getNavList()
    getFloorList()
  })
</script>

<style lang="scss">
  .swiper-item {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    height: 330rpx;
    display: flex;
    justify-content: space-between;

    .nav-item,
    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  // .floor-list {
  //   .floor-item {
  //   }
  // }
  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
</style>
