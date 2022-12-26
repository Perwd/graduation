<template>
	<view>
		<my-search @mySearchClick="goToSearch"> </my-search>
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll-view" :scroll-y="true" :style="{height:winHeight+ 'px'}">
				<block v-for="(item, index) in cateList" :key="index">
					<view :class="['left-scroll-view-item', active ===index  ? 'active' : '']"
						@click="activeChange(index)">
						{{item.cat_name}}
					</view>
				</block>

			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y :style="{height: winHeight + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
					<view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
					<!-- 动态渲染三级分类的列表数据 -->
					<view class="cate-lv3-list">

						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3"
							@click="gotoGoodsList(item3)">
							<!-- 将图片路径里面的dev替换成web -->
							<image :src="item3.cat_icon.replace('dev','web')"></image>

							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
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
	} from 'vue'
	import useBadge from "../../hook/useBadge";
	import useCart from "../../hook/useCart";

	import {
		onLoad,
		// onShow,
		// onPullDownRefresh,
		// onReachBottom,
	} from '@dcloudio/uni-app'

	const topPadding = ref('0')
	const winHeight = ref('0')
	const cateList = ref([])
	const cateLevel2 = ref([])
	const active = ref(0)
	const scrollTop = ref(0)
	const {
		setBadge
	} = useBadge();
	const {
		setCart
	} = useCart();



	const getHeight = () => {
		const statusBarHeight = uni.getSystemInfoSync().statusBarHeight

		const customHeight = wx.getMenuButtonBoundingClientRect()

		const navigationBarHeight = customHeight.height + (customHeight.top - statusBarHeight) * 2

		topPadding.value = `${navigationBarHeight.value + statusBarHeight.value}px`
	}

	const getCateList = async () => {
		await uni.$http.get('/api/public/v1/categories').then(res => {


			if (res.data.meta.status !== 200) return uni.$showMsg()
			cateList.value = res.data.message
			// console.log(cateList.value)

			// 为二级分类赋值
			cateLevel2.value = res.data.message[0].children
		})


	}

	function gotoGoodsList(item) {
		uni.navigateTo({
			url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
		})
	}

	function activeChange(index) {
		active.value = index
		cateLevel2.value = cateList.value[index].children

		// 让 scrollTop 的值在 0 与 1 之间切换
		scrollTop.value = scrollTop.value === 0 ? 1 : 0


	}


	function goToSearch(num) {
		uni.navigateTo({
			url: '/subpkg/search/search?st=' + num
		})

	}



	onLoad(() => {
		// 系统的信息
		const sysInfo = uni.getSystemInfoSync()
		// console.log(sysInfo)
		// 为窗口可用高度动态赋值，减去搜索框
		winHeight.value = sysInfo.windowHeight - 50


		getHeight()
		getCateList()
		setBadge()
		setCart()
	})
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				line-height: 60px;
				background-color: #f7f7f7;
				text-align: center;
				font-size: 12px;

				// 激活项的样式
				&.active {
					background-color: #ffffff;
					position: relative;

					// 渲染激活项左侧的红色指示边线
					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);

					}
				}
			}
		}
	}

	.cate-lv2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}

	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;

		.cate-lv3-item {
			width: 33.33%;
			margin-bottom: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 60px;
				height: 60px;
			}

			text {
				font-size: 12px;
			}
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
