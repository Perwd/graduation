<template>
	<view class="my-container">
		<!-- 用户未登录时，显示登录组件 -->
		<my-login v-if="!token"></my-login>

		<!-- 用户登录后，显示用户信息组件 -->
		<my-userinfo v-else></my-userinfo>
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
		userAddress
	} from "../../pinia/user";

	const {
		setBadge
	} = useBadge();


	const {
		token
	} = storeToRefs(userAddress())

	onLoad(() => {
		console.log(token)
		setBadge()


	})
</script>

<style lang="scss">
	page,
	.my-container {
		height: 100%;
	}
</style>
