import {
	defineStore
} from 'pinia';

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
			}
		},
	});
