<!-- 购物车页面，展示用户的物品 -->

<template>
	<view>
		<view class="cart-container" v-if="cart.length !== 0">
			<!-- 收货地址-->
			<my-address></my-address>
			<!-- 商品列表的标题 -->
			<view class="cart-title">
				<uni-icons type="shop" size="18"></uni-icons>
				<text class="cart-title-text">购物车</text>
			</view>

			<uni-swipe-action>
				<block v-for="(goods, i) in cart" :key="i">
					<!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
					<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
						<my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler"
							@num-change="numberChangeHandler"></my-goods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			<!-- 	<block v-for="(goods, i) in cart" :key="i">
			<my-goods :goods="goods" :show-radio="true" :show-num="true" @num-change="numberChangeHandler"
				@radio-change="radioChangeHandler"></my-goods>
		</block> -->
		</view>
		<!-- 空白购物车区域 -->
		<view v-else class="empty-cart">
			<image src="/static/cart_empty@2x.png" class="empty-img"></image>
			<text class="tip-text">空空如也~</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		onLoad,
		// onReachBottom
	} from '@dcloudio/uni-app'
	import {
		storeToRefs
	} from 'pinia'
	import useBadge from "../../hook/useBadge";

	import {
		useCounterStore
	} from '../../pinia/cart';


	const {
		updateGoodsState,
		removeGoodsById,
		// cart
	} = useCounterStore()

	// 使用storeToRefs 让cart具有响应式
	const {
		cart
	} = storeToRefs(useCounterStore())

	const {
		setBadge
	} = useBadge();
	const options = [{
		text: '删除', // 显示的文本内容
		style: {
			backgroundColor: '#EF1224' // 按钮的背景颜色
		}
	}]


	const radioChangeHandler = (obj: any) => {
		console.log('改变状态')
		// console.log(obj)
		// store.updateGoodsState(obj)
		updateGoodsState(obj)

	}

	const numberChangeHandler = (e: any) => {
		console.log('cart改变值', e)

		// store.updateGoodsState(e)
		updateGoodsState(e)
	}

	const swipeActionClickHandler = (e: any) => {

		console.log(e)
		removeGoodsById(e.goods_id)
		// cart.value = JSON.parse(uni?.getStorageSync('cart'))
		setBadge()

	}


	onLoad(() => {
		// console.log('count')
		// console.log(count)
		// console.log(setBadge)
		setBadge()


	})
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.empty-img {
			width: 90px;
			height: 90px;
		}

		.tip-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>
