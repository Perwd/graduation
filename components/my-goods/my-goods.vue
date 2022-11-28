<template>
	<view class="goods-item">
		<!-- 商品左侧图片区域 -->
		<view class="goods-item-left">
			<radio @click="radioClickHandler" :checked="goods.goods_state" color="#C00000" v-if="showRadio"></radio>
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
			<!-- 商品标题 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">￥{{tofixed(goods.goods_price)}}</view>
			</view>
		</view>


	</view>
</template>

<script setup lang="ts">
	import {
		// PropType
	} from 'vue'
	import {
		onLoad,
		// onReachBottom
	} from '@dcloudio/uni-app'
	type Goodes = {
		goods_price ? : string,
		goods_name ? : string,
		goods_small_logo ? : string,
		// goods_id ? : string,
		// goods_state ? : Boolean,
		showRadio ? : Boolean,
		goods: Goodes2
	}
	type Goodes2 = {
		goods_id ? : string,
		goods_state ? : Boolean,
	}

	// const props = defineProps({
	// 	goods: {
	// 		type: object as PropType < Goodes > ,
	// 		default: () => {}
	// 	}
	// })
	const props: Goodes = defineProps({
		goods: {
			type: Object,
			default: () => {}
		},
		// 是否展示图片左侧的 radio
		showRadio: {
			type: Boolean,
			default: false,
		},
	})

	const emit = defineEmits(['mySearchClick', 'radio-change'])


	const defaultPic: string =
		'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'

	type GoodsPrice = number | string

	function tofixed(num: GoodsPrice) {
		// console.log(num)
		return Number(num).toFixed(2)
	}

	function radioClickHandler() {
		// 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
		// 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
		emit('radio-change', {
			// 商品的 Id
			goods_id: props.goods.goods_id,
			// 商品最新的勾选状态
			goods_state: !props.goods.goods_state
		})
	}

	onLoad(() => {
		// console.log(


	})
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>
