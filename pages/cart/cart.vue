<!-- 购物车页面，展示用户的物品 -->

<template>
	<view>
		<!-- 商品列表的标题 -->
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<block v-for="(goods, i) in cart" :key="i">
			<my-goods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler(goods)"></my-goods>
		</block>

	</view>
</template>

<script setup lang="ts">
	import {
		// ref,
		// reactive,
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
	import useBadge from "../../hook/useBadge";
	import {
		useCounterStore
	} from '../../pinia/cart';

	// let goodsInfo = reactive < Object > ({})
	// let goods = ref([])
	const store = useCounterStore()
	const {
		cart
	} = storeToRefs(store)

	const {
		setBadge
	} = useBadge();

	const radioChangeHandler = (e: any) => {
		console.log(e)
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
</style>
