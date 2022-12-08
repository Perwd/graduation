import { defineStore } from 'pinia';


// type Cart = {
// 	goods_id: number,
// 	goods_name: string,
// 	goods_price: number,
// 	goods_count: number,
// 	goods_small_logo: string,
// 	goods_state: Boolean,
// }


// type StateType = {
// 	cart: Cart[],
// 	count: number,
// 	type: string,
// 	// name:TestType ,
// 	// id: TestType,
// 	row?: object
// }
type Ress = {
	provinceName: string,
	cityName: string,
	countyName: string,
	detailInfo: string,
}

export const userAddress =
	// defineStore('cart', {  方式一
	defineStore({
		id: 'address',
		state: () => {
			return {
				// address: {} as Ress,
				address: uni.getStorageSync('address') && JSON.parse(uni.getStorageSync('address') || new Object()),
			};
		},
		actions: {
			updateAddress(address: Ress) {
				this.address = address
			},
			// addToCart(goods: Cart) {

			// 	const findResult = this.cart.find((x: Cart) => x.goods_id === goods.goods_id)

			// 	if (!findResult) {
			// 		this.cart.push(goods)
			// 	} else {
			// 		// 有这件商品，增加
			// 		findResult.goods_count++
			// 	}

			// 	console.log('触发cart')
			// 	this.saveToStorage()
			// },
			// // 将购物车中的数据持久化存储到本地
			// saveToStorage() {
			// 	console.log('数据同步存入本地')
			// 	uni.setStorageSync('cart', JSON.stringify(this.cart || []))
			// },
			// // 更新购物车中商品的勾选状态
			// updateGoodsState(goods: Cart) {

			// 	// 根据 goods_id 查询购物车中对应商品的信息对象
			// 	const findResult = this.cart.find((x: Cart) => x.goods_id === goods.goods_id)

			// 	// 有对应的商品信息对象
			// 	if (findResult) {
			// 		// console.log(findResult)
			// 		// 更新对应商品的勾选状态
			// 		findResult.goods_state = goods.goods_state
			// 		// 持久化存储到本地
			// 		this.saveToStorage()

			// 		// 课程中 this.commit('m_cart/saveToStorage')，就是调用方法saveToStorage
			// 	}
			// },
			// removeGoodsById(goods_id: number) {
			// 	this.cart = this.cart.filter((x: Cart) => x.goods_id !== goods_id)
			// 	// 持久化存储到本地
			// 	this.saveToStorage()
			// }
		},
		getters: {
			// total: (state: any) => {
			// 	console.log(state)
			// 	let num = 0
			// 	if ((state.cart).constructor === Array) {
			// 		state.cart.forEach((goods: any) => num += goods.goods_count)
			// 		return num
			// 	}
			// },
		},

	});
