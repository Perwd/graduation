<template>
	<!-- 最外层的容器 -->
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
		</label>

		<!-- 合计区域 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>

		<!-- 结算按钮 -->

		<view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
	</view>


</template>

<script setup lang="ts">
	import {
		ref,
		computed,
		// reactive
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";
	// import {
	// 	storeToRefs
	// } from 'pinia'
	import {
		useCounterStore
	} from '../../pinia/cart';

	import {
		userAddress
	} from '../../pinia/user';
	const {
		checkedCount,
		total,
		checkedGoodsAmount,
		updateAllGoodsState,
		updateRedirectInfo
	} = useCounterStore()
	const {
		addStr,
		token
	} = userAddress()

	let seconds = ref(3)
	let timer: any = null

	const isFullCheck = computed(() => {
		return total === checkedCount
	}, )


	const changeAllState = () => {
		// 修改购物车中所有商品的选中状态
		// !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
		updateAllGoodsState(!isFullCheck)
	}

	// 点击了结算按钮
	function settlement() {
		// 1. 先判断是否勾选了要结算的商品
		if (!checkedCount) return (uni as any).$showMsg('请选择要结算的商品！')

		// 2. 再判断用户是否选择了收货地址
		if (!addStr) return (uni as any).$showMsg('请选择收货地址！')

		// 3. 最后判断用户是否登录了
		// if (!token) return (uni as any).$showMsg('请先登录！')
		if (!token) return delayNavigate()
	}



	// 延迟导航到 my 页面
	function delayNavigate() {

		seconds.value = 3
		// 1. 将定时器的 Id 存储到 timer 中
		timer = setInterval(() => {
			seconds.value--

			// 2. 判断秒数是否 <= 0
			if (seconds.value <= 0) {
				// 2.1 清除定时器
				clearInterval(timer)
				timer = null

				// 2.2 跳转到 my 页面
				uni.switchTab({
					url: '/pages/my/my',
					// 页面跳转成功之后的回调函数
					success: () => {
						// 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
						updateRedirectInfo({
							// 跳转的方式
							openType: 'switchTab',
							// 从哪个页面跳转过去的
							from: '/pages/cart/cart'
						})
					}
				})

				// 2.3 终止后续代码的运行（当秒数为 0 时，不再展示 toast 提示消息）
				return
			}

			showTips(seconds.value)
		}, 1000)
	}


	// 展示倒计时的提示消息
	function showTips(n = 3) {

		uni.showToast({
			icon: 'none',
			title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
			// 为页面添加透明遮罩，防止点击穿透
			mask: true,
			duration: 1500
		})
	}




	onLoad(() => {
		// console.log(address)
	})
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		// 将背景色从 cyan 改为 white
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount {
			color: #c00000;
		}

		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}
</style>
