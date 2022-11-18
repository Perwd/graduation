// 1. 导入 Vue 和 Vuex
// import Vue from 'vue'
// import { createSSRApp } from 'vue'
// import * as Vue from 'vue'
// import Vuex from 'vuex'

import {
	createStore
} from "vuex";

// // 2. 将 Vuex 安装为 Vue 的插件
// Vue.use(Vuex)

// // 3. 创建 Store 的实例对象
// const store = new Vuex.Store({
// 	// TODO：挂载 store 模块
// 	modules: {},

// })

// // 4. 向外共享 Store 的实例对象
// export default store

export default createStore({
	state: {
		type: 'wxxcx',
		name: 'wlr',
		id: "000000"
	},
	mutations: {
		// 定义mutations，用于修改状态(同步)
		updateUid(state, payload) {
			state.uid = payload
		}
	},
	actions: {
		// 定义actions，用于修改状态(异步)
		// 2秒后更新状态
		updateUid(context, payload) {
			setTimeout(() => {
				context.commit('updateUid', payload)
			}, 2000)
		},
		apiGetUid(context) {
			console.log('vuex', context)

			state.
		}

	},
	getters: {
		// 定义一个getters
		formatUid(state) {
			return state
		}
	},
	modules: {}
});
