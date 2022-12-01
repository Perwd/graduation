<template>
	<view class="goods-item">
		<!-- 商品左侧图片区域 -->
		<view class="goods-item-left">
			<radio @click="radioClickHandler" :checked="goods.goods_state" v-if="showRadio" color="#C00000"></radio>
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
			<!-- 商品标题 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">￥{{tofixed(goods.goods_price)}}</view>
				<!-- 商品数量 -->
				<uni-number-box v-if="showNum" @change="numChangeHandler" :value="goods.goods_count" :min="0" :step="1">
				</uni-number-box>
			</view>

		</view>


	</view>
</template>

<script setup lang="ts">
	import {
		// PropType
	} from 'vue'

	// import type { PropType } from 'vue'
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
		goods_id ? : number,
		goods_state ? : Boolean,
	}

	// const props: Goodes = defineProps({
	// 	goods: {
	// 		type: Object,
	// 		default: () => {}
	// 	},
	// 	// 是否展示图片左侧的 radio
	// 	showRadio: {
	// 		type: Boolean,
	// 		default: false,
	// 	},
	// })
	const props = defineProps({
		goods: {
			type: Object,
			default: () => {}
		},
		// 是否展示图片左侧的 radio
		showRadio: {
			type: Boolean,
			default: false,
		},
		showNum: {
			type: Boolean,
			default: false,
		}
	})
	// const props = defineProps({
	// 	goods: {
	// 		type: Object as PropType<Goodes2>, 
	// 		default: () => {}
	// 	},
	// 	// 是否展示图片左侧的 radio
	// 	showRadio: {
	// 		type: Boolean,
	// 		default: false,
	// 	},
	// })

	// emit定义的方式
	const emit = defineEmits(['mySearchClick', 'radio-change', 'num-change'])
	// const emit = defineEmits < {
	// 	(e: 'mySearchClick'): void,
	// 	(e: 'radio-change', goods_id: number, goods_state: boolean): void
	// } > ()

	const defaultPic: string =
		'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'

	type GoodsPrice = number | string

	function tofixed(num: GoodsPrice) {
		// console.log(num)


		return Number(num).toFixed(2) === '0.00' ? '20.0' : Number(num).toFixed(2)
	}

	function radioClickHandler() {

		// console.log(props)
		// console.log(props.goods)


		let sendData = {
			goods_id: props.goods.goods_id,
			goods_state: !props.goods.goods_state,
		}
		console.log(sendData)
		console.log(!props.goods.goods_state)
		// 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
		// 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数


		emit('radio-change', {
			goods_id: props.goods.goods_id,
			goods_state: !props.goods.goods_state,
		})


	}


	function numChangeHandler(val: number) {
		// 改变数字为0时，弹出删除确认框，未做

		// console.log('改变值')
		emit('num-change', {
			goods_id: props.goods.goods_id,
			// 商品的最新数量
			goods_count: val
		})
	}
	onLoad(() => {
		// console.log(
	})
</script>

<style lang="scss">
	.goods-item {
		// 让 goods-item 项占满整个屏幕的宽度
		width: 750rpx;
		// 设置盒模型为 border-box
		box-sizing: border-box;
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
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>
