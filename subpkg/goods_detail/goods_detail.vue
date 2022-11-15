<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goodsInfo.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>

	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		reactive,
		// toRefs,
		// reactive
	} from 'vue'
	import {
		onLoad,
		// onReachBottom
	} from '@dcloudio/uni-app'

	let goodsInfo = reactive < Object > ({})
	let goodsInfo2 = reactive < string > ('')

	const preview = (i) => {
		console.log(typeof i)
		// 调用 uni.previewImage() 方法预览图片
		uni.previewImage({
			// 预览时，默认显示图片的索引
			current: i,
			// 所有图片 url 地址的数组
			urls: goodsInfo.pics.map(x => x.pics_big)
		})
	}
	const getGoodsDetail = async (goods_id: string) => {

		const {
			data: res
		} = await (uni as any).$http.get('/api/public/v1/goods/detail', {
			goods_id
		})
		if (res.meta.status !== 200) return (uni as any).$showMsg()


		goodsInfo = res.message

		console.log(goodsInfo)
		console.log(goodsInfo.pics)


	}


	onLoad((options: any) => {
		// console.log(options)
		// console.log(typeof options)
		// console.log(typeof options.goods_id)

		const goods_id = options.goods_id

		getGoodsDetail(goods_id)
	})
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
