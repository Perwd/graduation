// import { type } from 'os';
import { defineStore } from 'pinia';
import { TestType } from './store/type';

type Cart = {
	goods_id: string,
	goods_name: string,
	goods_price: number,
	goods_count: number,
	goods_small_logo: string,
	goods_state: string,
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
		state: (): StateType => {
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
				cart: [],
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
				console.log(this.type)
				console.log(this.name)
			},
			addToCart(goods: Cart) {
				// 根据提交的商品的Id，查询购物车中是否存在这件商品
				// 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
				// const findResult = this.cart.find((x :Object) => x.goods_id === goods.goods_id)
				const findResult = this.cart.find((x: Cart) => x.goods_id === goods.goods_id)

				if (!findResult) {
					// 如果购物车中没有这件商品，则直接 push
					this.cart.push(goods)

				} else {
					// 如果购物车中有这件商品，则只更新数量即可
					findResult.goods_count++
				}
			},
		}

	});
