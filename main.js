import {
	$http
} from '@escook/request-miniprogram'



uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://www.uinav.com'

// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...',
	})

	// 判断请求的是否为有权限的 API 接口
	if (options.url.indexOf('/my/') !== -1) {
		// 为请求头添加身份认证字段
		options.header = {
			// 字段的值可以直接从 pinia 中进行获取
			Authorization: token,
		}
	}
}

// 请求完成之后做一些事情
$http.afterRequest = function() {
	uni.hideLoading()
}
uni.$showMsg = function(title = '请求失败', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

// 引入文件不能放在vue后面,否则不会显示
import './static/iconfont.css'

// import store from './store/store.js'
import {
	userAddress
} from './pinia/user.js'
import {
	storeToRefs
} from 'pinia'

const {
	token
} = storeToRefs(userAddress())

// #ifndef VUE3
import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
	// store, //在uni-app框架中是不正确的
	...App,
})
app.$mount()
// #endif





// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import * as Pinia from 'pinia';

export function createApp() {
	const app = createSSRApp(App)
	// app.use(store)
	app.use(Pinia.createPinia());
	return {
		app,
		Pinia
	}
}
// #endif
