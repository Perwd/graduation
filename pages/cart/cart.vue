<template>
	<view>
		<!-- 商品列表的标题 -->
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>

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
	import useBadge from "../../hook/useBadge";

	let goodsInfo = reactive < Object > ({})
	let goods = ref([])

	const {
		setBadge
	} = useBadge();


	onLoad((option) => {
		console.log(option)
		setBadge()
		// console.log(typeof options)

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
