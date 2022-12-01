<template>
	<view>

		<!-- 选择收货地址的盒子 -->
		<view v-if="JSON.stringify(address) === '{}'" class="address-choose-box">
			<button @click="chooseAddress" type="primary" size="mini" class="btnChooseAddress">请选择收货地址+</button>
		</view>

		<!-- 渲染收货信息的盒子 -->
		<view v-else class="address-info-box">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：<text>{{address.userName}}</text></view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：<text>{{address.telNumber}}</text></view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{addStr}}</view>
			</view>
		</view>

		<!-- 底部的边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>

</template>

<script setup lang="ts">
	import {
		ref,
		computed
		// reactive
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";
	// import {
	// 	storeToRefs
	// } from 'pinia'
	import {
		userAddress
	} from '../../pinia/user';
	const store = userAddress();
	// const {
	//   updateAddress
	// } = storeToRefs(store)

	type Ress = {
		provinceName: string,
		cityName: string,
		countyName: string,
		detailInfo: string,
	}

	let address: Ress
	const addStr = computed(() => {
		if (!address.provinceName) return ''

		// 拼接 省，市，区，详细地址 的字符串并返回给用户
		return address.provinceName + address.cityName + address.countyName + address.detailInfo

	})

	const chooseAddress = () => {
		console.log('选择地址')
		// 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
		//    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象

		// const res = uni.chooseAddress({})
		// // 2. 用户成功的选择了收货地址

		// const [err, succ] = await uni.chooseAddress({}).catch(err => err)

		uni.chooseAddress({
			success(res) {
				console.log(res)
				// if (res.errMsg === null && res.provinceName === 'chooseAddress:ok') {
				// 	// 为 data 里面的收货地址对象赋值
				// 	address.value = res
				// store.updateAddress(res)
				// }
			}
		})


	}


	onLoad(() => {
		console.log(address)
	})
</script>

<style lang="scss">
	// 底部边框线的样式
	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	// 选择收货地址的盒子
	.address-choose-box {
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	// 渲染收货信息的盒子
	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		// 第一行
		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;
				align-items: center;

				.phone {
					margin-right: 5px;
				}
			}
		}

		// 第二行
		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}
		}
	}
</style>
