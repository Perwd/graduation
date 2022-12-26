<template>
	<view class="search-box">

		<uni-search-bar @input="input" focus placeholder="自定1" :radius="100" cancelButton="none">


		</uni-search-bar>

		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="data.searchResults.length!==0">
			<view class="sugg-item" v-for="(item, i) in data.searchResults" :key="i"
				@click="gotoDetail(item.goods_id as number)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>

		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clear"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">

				<uni-tag @click="gotoGoodsList(item)" inverted :text="item" v-for="(item, i) in historys" :key="i">1
				</uni-tag>
			</view>
		</view>


	</view>

</template>

<script setup lang="ts">
	import {
		ref,
		reactive,
		// toRefs,
		// onBeforeMount,
		// onMounted,
		// onUpdated,
		// onBeforeUpdate,
		// onBeforeUnmount,
		// onUnmounted,
		computed,
		// watch,
		nextTick
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";

	type Data2 = {
		timeout ? : any,
		searchResults: [{
			goods_id ? : number,
			goods_name ? : string,
		}]
	}

	const str = ref('')

	const historyList = ref < String[] > (['a', 'app', 'apple'])


	const historys = computed(() => {
		return [...historyList.value].reverse()
	})

	const data = reactive < Data2 > ({
		timeout: null,
		searchResults: [{
			goods_id: 0
		}]
	});

	const input = (e: string) => {
		clearTimeout(data.timeout) //清除定时器
		data.timeout = setTimeout(() => {
			// console.log(e)
			str.value = e

			getSearchList()
		}, 500);
	}






	const getSearchList = async () => {
		if (str.value === '') return data.searchResults = [{}]
		// 发起请求，获取搜索建议列表
		const {
			data: res
		} = await (uni as any).$http.get('/api/public/v1/goods/qsearch', {
			query: str.value
		})
		if (res.meta.status !== 200) return (uni as any).$showMsg()
		data.searchResults = res.message
		// console.log(data.searchResults)

		saveSearchHistory()
	}


	function gotoDetail(goods_id: Number) {
		// console.log(goods_id)
		uni.navigateTo({
			// 指定详情页面的 URL 地址，并传递 goods_id 参数
			url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
		})

	}

	function gotoGoodsList(item: object) {
		// console.log(item)
		uni.navigateTo({
			// 指定详情页面的 URL 地址，并传递 goods_id 参数
			url: '/subpkg/goods_list/goods_list?goods_id=' + item
		})

	}

	// 保存搜索关键词为历史记录 
	function saveSearchHistory() {
		// this.historyList.push(this.kw)

		// 1. 将 Array 数组转化为 Set 对象
		const set = new Set(historyList.value)
		// 2. 调用 Set 对象的 delete 方法，移除对应的元素
		set.delete(str.value)
		// 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
		set.add(str.value)
		// 4. 将 Set 对象转化为 Array 数组
		historyList.value = Array.from(set)
		// console.log(historyList.value)
		uni.setStorageSync('str', JSON.stringify(historyList.value))
	}


	function clear() {
		historyList.value = []

		uni.setStorageSync('str', '')
	}


	// 异步使用
	onLoad(async () => {

		await nextTick()
		// console.log(historyList.value)
		historyList.value = [JSON.stringify(uni.getStorageSync('str'))] || []

		// console.log(historyList.value)
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

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-name {
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 文本溢出后，使用 ... 代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {

				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
</style>
