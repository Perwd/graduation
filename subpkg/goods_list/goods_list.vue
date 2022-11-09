<template>
	<view>
		goods list
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
	} from '@dcloudio/uni-app'

	type ValueObject = {
		value ? : Number,
		query ? : String,
		cid ? : String,
		pageNum ? : Number,
		pageSize ? : Number,
	}
	// 通过接口定义对象所具有的属性，
	//通过接口声明对象后，所具有的属性值一目了然
	const cid2: ValueObject = Object.create(null);

	const cid = ref < String > ()
	const goodsList = ref([])
	const total = ref < Number > ()
	// const cid3 = ref < string > ('s')

	const queryObj: ValueObject = reactive({
		query: '',
		cid: '',
		pageNum: 1,
		pageSize: 10
	})


	const imgList = ref < string[] > ([]);


	// function getGoodsList() {
	// 	const {
	// 		data: res
	// 	} = await (uni as any).$http.get('/api/public/v1/goods/search', queryObj)
	// 	console.log(1)
	// 	console.log(res)
	// 	console.log(res.meta)
	// 	if (res.meta.status !== 200) return (uni as any).$showMsg()
	// 	// 为数据赋值
	// 	goodsList.value = res.message.goods
	// 	total.value = res.message.total

	// }

	const getGood = async () => {
		await (uni as any).$http.get('/api/public/v1/goods/search', queryObj.value).then((res: any) => {
			console.log(2)
			console.log(res)
			if (res.data.meta.status !== 200) return (uni as any).$showMsg()
			// 为数据赋值
			goodsList.value = res.data.message.goods
			total.value = res.data.message.total
		})
	}
	onLoad((option: any) => {
		console.log(1)
		console.log(option)
		cid.value = option.cid


		imgList.value = ['1']


		// queryObj.query = option.query || ''
		// queryObj.cid = option.cid || ''
		// console.log(queryObj)
		// getGoodsList()
		getGood()

	})
</script>

<style lang="scss">

</style>
