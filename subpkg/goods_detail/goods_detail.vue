<template>
	<view>
		detail
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		// reactive,
		// toRefs,
		// reactive
	} from 'vue'
	import {
		onLoad,
		// onReachBottom
	} from '@dcloudio/uni-app'

	const goodsInfo = ref < Object > ({})

	const getGoodsDetail = async (goods_id: string) => {

		const {
			data: res
		} = await (uni as any).$http.get('/api/public/v1/goods/detail', {
			goods_id
		})
		if (res.meta.status !== 200) return (uni as any).$showMsg()

		goodsInfo.value = res.message
		// console.log(1)
		// console.log(goodsInfo.value)
	}


	onLoad((options: any) => {
		// console.log(options)
		// console.log(typeof options)
		// console.log(typeof options.goods_id)

		const goods_id = options.goods_id

		getGoodsDetail(goods_id)
	})
</script>

<style lang="scss">

</style>
