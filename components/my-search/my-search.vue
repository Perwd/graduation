<template>
	<view class="my-search-container " :style="`background-color: ${bColor};`" @click="clickMySearch()">
		<view class="my-search-box" :style="{'border-radius':raius +'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
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
		// PropType
	} from 'vue'

	import {
		// onLoad,
		onShow,
		// onPullDownRefresh,
		// onReachBottom,
	} from '@dcloudio/uni-app'
	type PropT = {
		bColor: string,
		raius: number | string
	}
	// const raius = ref < Number > (0)
	// const props:PropType = defineProps({
	type str = string | null

	const props = defineProps({
		bColor: {
			type: String,
			default: '#c00000'
		},
		raius: {
			type: Number,
			default: 18
		},
		list: new Array
	})


	const emit = defineEmits(['mySearchClick'])


	// defineExpose({
	// 	clickMySearch,
	// })


	function clickMySearch() {
		emit("mySearchClick", '2')
		// console.log(name)
		console.log('点击')

	}

	onShow(() => {
		console.log(props)
	})
</script>

<style lang="scss">
	.my-search-container {
		// background-color: color;
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	.my-search-box {
		height: 36px;
		background-color: #ffffff;
		// border-radius: 15px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.placeholder {
			font-size: 15px;
			margin-left: 5px;
		}
	}
</style>
