<template>
	<view>




		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goods" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box" v-if="goodsInfo.goods_name">

			<view class="price">￥{{goodsInfo.goods_price }}</view>

			<view class="goods-info-body">

				<view class="goods-name">{{goodsInfo.goods_name }}</view>

				<view class="favi">
					<!--使用uni-app自带图标 -->
					<!-- <uni-icons :type="starString" size="18" color="gray" @click="collection(starString)"></uni-icons> -->

					<!-- 使用自定义图标 -->
					<uni-icons v-if="showIcon" type="star" size="18" color="gray" @click="showIcon=!showIcon">
					</uni-icons>
					<span v-else class="iconfont icon-shoucang" @click="showIcon=!showIcon"></span>

					<text>收藏</text>
				</view>
			</view>

			<view class="yf">快递：免运费</view>
		</view>

		<!-- 商品详情信息 -->
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>


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
	let goods = ref([])
	let starString = ref('star')
	let showIcon = ref(true)

	function preview(i: any) {

		console.log(i)
		console.log(typeof i)
		// 调用 uni.previewImage() 方法预览图片
		uni.previewImage({
			// 预览时，默认显示图片的索引
			current: i,
			// 所有图片 url 地址的数组
			urls: goodsInfo.pics.map(x => x.pics_big)
			// urls: goods.value.map(x => x.pics_big),
		})
	}


	const getGoodsDetail = async (goods_id: string) => {
		console.log(1)
		const {
			data: res
		} = await (uni as any).$http.get('/api/public/v1/goods/detail', {
			goods_id
		})
		console.log(res)
		if (res.meta.status !== 200) return (uni as any).$showMsg()

		// 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
		// 将webp替换成jpg，解决ios手机webp图片不显示的问题
		res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ')
			.replace(/webp/g, 'jpg')

		goodsInfo = res.message


		// console.log(goodsInfo.pics)

		goods.value = goodsInfo.pics
		console.log(goods.value)
	}

	function collection(item: string) {
		console.log(item)
		if (item === 'star') {
			starString.value = 'star-filled'
		} else {
			starString.value = 'star'
		}


	}

	onLoad((option) => {
		console.log(option)
		// console.log(typeof options)
		// console.log(typeof options.goods_id)

		// const goods_id = options.goods_id
		// console.log(3)
		getGoodsDetail(option.goods_id)
	})
</script>

<style lang="scss">
	swiper {
		height: 700rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	// 商品信息区域的样式
	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				padding-right: 10px;
			}

			// 收藏区域
			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1.5px solid #efefef;
				color: gray;
			}
		}

		// 运费
		.yf {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}
</style>
