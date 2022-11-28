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


		<!-- 商品导航组件 -->
		<view class="goods_nav">
			<!-- fill 控制右侧按钮的样式 -->
			<!-- options 左侧按钮的配置项 -->
			<!-- buttonGroup 右侧按钮的配置项 -->
			<!-- click 左侧按钮的点击事件处理函数 -->
			<!-- buttonClick 右侧按钮的点击事件处理函数 -->

			<uni-goods-nav :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>


	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		reactive,
		watch
		// toRefs,
		// reactive
	} from 'vue'
	import {
		onLoad,
		// onReachBottom
	} from '@dcloudio/uni-app'
	import {
		storeToRefs
	} from 'pinia'
	// import {
	// 	useStore,
	// 	mapState
	// } from 'vuex'

	// import {
	// 	useCounterStore
	// } from '../../store/pinia.js';
	import {
		useCounterStore
	} from '../../pinia/cart';
	// import { Cart } from '../../pinia/store/type';
	type GoodsType = {
		goods_id: string,
		goods_name: string,
		goods_price: number,
		goods_count: number,
		goods_small_logo: string,
		goods_state: Boolean,
	}

	type Goods = {
		goods_id: string,
		goods_name: string,
		pics: [{
			pics_big: string
		}],
		goods_price: number,
		goods_count: number | null,
		pics_big ? : string,
		goods_small_logo: string,
		goods_state ? : Boolean,
		goods_introduce ? : string | []
	}

	let goodsInfo = reactive < Goods > ({
		goods_id: '',
		goods_name: '',
		pics: [{
			pics_big: ''
		}],
		goods_price: 0,
		goods_count: null,
		goods_small_logo: '',
	})


	let goods = ref < [Goods] > ()
	let starString = ref('star')
	let showIcon = ref(true)

	// const store = useStore()
	// const cart=useCounterStore();
	const store = useCounterStore();
	const {
		count,
		name,
		total
	} = storeToRefs(store)

	watch(total, (newValue, oldValue) => {
		console.log('total', newValue)
		console.log('total', oldValue)
		// console.log('options', options)
		// 找到购物车按钮的配置对象存在
		const findResult = options.find((x) => x.text === '购物车')

		if (findResult) {
			findResult.info = newValue
		}
	}, {
		deep: true,
		// immediate: true
	})

	const options = reactive(
		[{
			icon: 'shop',
			text: '店铺'
		}, {
			icon: 'cart',
			text: '购物车',
			// 右上角的信息
			// info: null,
			info: 0,
		}, ])

	const buttonGroup = [{
			text: '加入购物车',
			// 配置按钮颜色
			backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
			color: '#fff'
		},
		{
			text: '立即购买',
			backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
			color: '#fff'
		}
	]

	function preview(i: any) {

		// console.log(i)
		// console.log(typeof i)
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
		// console.log(1)
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
		// console.log(goods.value)
		// console.log(goodsInfo.goods_introduce)
	}

	function collection(item: string) {
		// console.log(item)
		if (item === 'star') {
			starString.value = 'star-filled'
		} else {
			starString.value = 'star'
		}


	}


	// 左侧按钮的点击事件处理函数
	function onClick(e: any) {
		// console.log(typeof e)
		if (e.content.text === '购物车') {
			// 切换到购物车页面
			uni.switchTab({
				url: '/pages/cart/cart'
			})
			console.log('去购物车')
		}
	}

	function buttonClick(e: any) {
		// console.log(e)

		if (e.content.text === '加入购物车') {
			const goods: GoodsType = {
				goods_id: goodsInfo.goods_id, // 商品的Id
				goods_name: goodsInfo.goods_name, // 商品的名称
				goods_price: goodsInfo.goods_price, // 商品的价格
				goods_count: 1, // 商品的数量
				goods_small_logo: goodsInfo.goods_small_logo, // 商品的图片
				goods_state: true // 商品的勾选状态
			}

			// const goods: GoodsType = {
			// 	...goodsInfo,
			// 	goods_count: 1, // 商品的数量
			// 	goods_state: true // 商品的勾选状态
			// }

			// pinia的 addToCart 方法
			store.addToCart(goods)

		}
	}

	function getCartNum() {
		let arr = JSON.parse(uni.getStorageSync('cart'))
		// uni.getStorageSync('cart') 是个对象
		// console.log(typeof uni.getStorageSync('cart'))
		console.log('get')

		// console.log(arr)
		let num = arr.reduce((total: number, currentValue: any, index: number) => {
			console.log('g')
			console.log(currentValue)
			console.log(index)
			console.log(total)
			return currentValue.goods_count
		}, 0)
		console.log(num)

		return num
	}



	onLoad((option) => {

		// console.log(option)

		console.log(3)
		// console.log(store)
		getGoodsDetail(option.goods_id as string)



		// if (store.state.id === "000000") {
		// 	store.dispatch("apiGetUid")
		// }

		options[1].info = getCartNum()
		// console.log(uni.getStorageSync('cart'))
		// console.log(options)
		// console.log(options[1].info)


		// pinia仓库的三种触发方式
		count.value++;
		// console.log(name)
		// console.log(name.value)
		// console.log('count：', count.value)
		// // 可以手动触发
		// cart.$patch({
		// 	count: cart.count + 1
		// });
		// // 或者使用 actions
		// cart.count.increment();

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


	.goods-detail-container {
		// 给页面外层的容器，添加 50px 的内padding，
		// 防止页面内容被底部的商品导航组件遮盖
		padding-bottom: 50px;
	}

	.goods_nav {
		// 为商品导航组件添加固定定位
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
