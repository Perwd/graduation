import { defineStore } from 'pinia';

type Ress = {
	provinceName: string,
	cityName: string,
	countyName: string,
	detailInfo: string,
	userName: string,
	telNumber: string
}

type Router = {
	from?: string,
	openType?: string
}


export const userAddress =
	// defineStore('cart', {  方式一
	defineStore({
		id: 'address',
		state: () => {
			return {
				// address: {} as Ress,
				address: JSON.parse(uni?.getStorageSync('address')) || new Object(),
				// 登录成功之后的 token 字符串
				token: uni.getStorageSync('token') || '',
				// 用户的基本信息
				userinfo: JSON.parse(uni?.getStorageSync('userinfo')) || new Object(),
				// 用户登陆信息存储，用于重定向
				redirectInfo: {} as Router
			};
		},
		actions: {
			updateAddress(address: Ress | {}) {
				this.address = address
				// console.log(this.address)
				this.saveToStorage()
			},
			saveToStorage() {
				console.log('地址存入本地')
				uni.setStorageSync('address', JSON.stringify(this.address))
				// console.log(this.address)
				// console.log(this.addStr)
			},
			updateUserInfo(userinfo: string) {
				this.userinfo = userinfo

				this.saveUserInfoToStorage()
			},
			saveUserInfoToStorage() {
				console.log('用户信息存入本地')
				uni.setStorageSync('userinfo', JSON.stringify(this.userinfo))
			},
			updateToken(token: string) {
				this.token = token

				this.saveTokenToStorage()
			},
			saveTokenToStorage() {
				uni.setStorageSync('token', this.token)
			},
			// 更新重定向的信息对象
			updateRedirectInfo(info: Router | {}) {
				this.redirectInfo = info
			}
		},
		getters: {
			addStr: (state: any) => {
				console.log('地址')

				// console.log(uni.getStorageSync('address'))

				if (uni.getStorageSync('address')) {
					return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
				}
			},
			addStr2(): String {
				console.log('地址2')

				return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
			},
		},

	});
