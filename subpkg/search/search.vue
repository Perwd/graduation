<template>
	<view class="search-box">

		<uni-search-bar @input="input" placeholder="自定1" :radius="100" cancelButton="none">


		</uni-search-bar>



	</view>

</template>

<script setup lang="ts">
	import {
		// ref,
		// reactive,
		// toRefs,
		// onBeforeMount,
		// onMounted,
		// onUpdated,
		// onBeforeUpdate,
		// onBeforeUnmount,
		// onUnmounted,
		// computed,
		// watch,
	} from "vue";
	import {
		onLoad,
		// onShow,
		// onPullDownRefresh,
		// onReachBottom,
	} from "@dcloudio/uni-app";

	const search = () => {
		console.log('s')
	}

	const input = (e) => {
		console.log(e)
	}
	onLoad((option) => {
		console.log(option)
	})
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.uni-searchbar {
		// width: 100px;
		// height: 100px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		position: relative;
		padding: 16rpx;
		/* 将默认的 #FFFFFF 改为 #C00000 */
		background-color: #c00000;
	}
</style>
