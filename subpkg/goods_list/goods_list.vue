<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">

				<my-goods :goods="goods"></my-goods>
			</view>
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
		onReachBottom,
		onPullDownRefresh
	} from '@dcloudio/uni-app'

	type ValueObject = {
		value ? : number,
		query ? : string,
		cid ? : string,
		pageNum: number,
		pageSize: number,
	}
	// 通过接口定义对象所具有的属性，
	//通过接口声明对象后，所具有的属性值一目了然
	// const cid2: ValueObject = Object.create(null);

	const cid = ref < String > ()
	const goodsList = ref < any > ([])
	const total = ref < number > (0)
	// const cid3 = ref < string > ('s')

	const queryObj: ValueObject = reactive({
		query: '',
		cid: '',
		pageNum: 1,
		pageSize: 10
	})


	const imgList = ref < string[] > ([]);

	// 节流
	const isLoad = ref < boolean > (false);



	const gotoDetail = (item: any) => {
		console.log(item)
		uni.navigateTo({
			url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
		})
	}

	const getGood = async (cb ? : Function) => {

		cb && cb()
		isLoad.value = false
		await (uni as any).$http.get('/api/public/v1/goods/search', queryObj.value).then((res: any) => {
			// console.log(2)
			// console.log(res)
			if (res.data.meta.status !== 200) return (uni as any).$showMsg()
			// 为数据赋值
			// console.log(res.data.message.goods)
			goodsList.value = [...goodsList.value, ...res.data.message.goods]
			total.value = res.data.message.total
			isLoad.value = true
		})
	}
	onLoad((option: any) => {
		// console.log(1)
		// console.log(option)
		cid.value = option.cid


		imgList.value = ['1']


		// queryObj.query = option.query || ''
		// queryObj.cid = option.cid || ''
		// console.log(queryObj)
		// getGoodsList()
		getGood()

	})

	onReachBottom(() => {
		// console.log('触发')

		if (queryObj.pageNum * queryObj.pageSize >= total.value) {
			return (uni as any).$showMsg('数据加载完毕，已是最后一页')
		}

		if (isLoad.value) {
			getGood()
			queryObj.pageNum += 1
		}
	})
	onPullDownRefresh(() => {

		queryObj.pageNum = 1
		total.value = 0
		isLoad.value = false

		goodsList.value = []

		getGood(() => uni.stopPullDownRefresh())
	})
</script>

<style lang="scss">


</style>
