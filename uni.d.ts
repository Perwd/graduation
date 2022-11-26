import Vue from 'vue'
// import { Store } from 'vuex'

declare module 'vue/types/vue' {
	interface Vue {
		// $store: Store,
		$http: any,
		uni: any,
		$axios: any, // 挂载的 vue 全局变量
		// $echarts: any
	}
}
