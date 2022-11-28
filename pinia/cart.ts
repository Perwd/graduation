// import { type } from 'os';
import { defineStore } from 'pinia';
import { TestType } from './store/type';

type Cart = {
	goods_id: string,
	goods_name: string,
	goods_price: number,
	goods_count: number,
	goods_small_logo: string,
	goods_state: Boolean,
}
// 接口继承
// interface StateType extends TestType {
// 	cart: Cart[],
// 	count: number,
// 	type: string,
// 	// name:TestType ,
// 	// id: TestType,
// 	row?: object
// }

type StateType = TestType & {
	cart: Cart[],
	count: number,
	type: string,
	// name:TestType ,
	// id: TestType,
	row?: object
}

export const useCounterStore =
	// defineStore('cart', {  方式一
	defineStore({
		id: 'cart',
		state: () => {
			return {
				count: 0,
				type: 'wxxcx',
				name: 'wlr',
				id: "000000",
				row: {},
				// 购物车的数组，用来存储购物车中每个商品的信息对象
				// 每个商品的信息对象，都包含如下 6 个属性：
				// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
				// cart: new Array<Cart>(),
				cart: JSON.parse(uni.getStorageSync('cart') || new Array<Cart>()),
			};
		},
		// 也可以这样定义
		// state: () => ({ count: 0 })
		actions: {
			increment() {
				this.count++;
			},
			// 2秒后更新状态
			updateUid(context: any, payload: any) {
				setTimeout(() => {
					context.commit('updateUid', payload)
				}, 2000)
			},
			apiGetUid(context: any) {
				console.log('vuex', context)

				this.count++
				console.log(this.count)
				// console.log(this.type)
				// console.log(this.name)
			},
			addToCart(goods: Cart) {

				const findResult = this.cart.find((x: Cart) => x.goods_id === goods.goods_id)

				if (!findResult) {
					// 没有这件商品，则直接 push
					this.cart.push(goods)

				} else {
					// 有这件商品，增加
					findResult.goods_count++
				}


				console.log('触发cart')
				console.log(this.cart)
				this.saveToStorage()
			},
			// 将购物车中的数据持久化存储到本地
			saveToStorage() {
				console.log('数据同步存入本地')
				uni.setStorageSync('cart', JSON.stringify(this.cart))
			},
			// 更新购物车中商品的勾选状态
			updateGoodsState(goods: any) {
				// 根据 goods_id 查询购物车中对应商品的信息对象
				const findResult = this.cart.find((x: Cart) => x.goods_id === goods.goods_id)

				// 有对应的商品信息对象
				if (findResult) {
					// 更新对应商品的勾选状态
					findResult.goods_state = goods.goods_state
					// 持久化存储到本地
					this.saveToStorage()

					// 课程中 this.commit('m_cart/saveToStorage')，就是调用方法saveToStorage
				}
			}


		},
		getters: {
			total: (state) => {
				let num = 0
				state.cart.forEach(goods => num += goods.goods_count)
				return num as number
			},
		},

	});
