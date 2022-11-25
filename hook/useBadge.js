//useCounter.js
import {
	// ref,
	computed
} from "vue";
import {
	useCounterStore
} from '../../pinia/cart';
import {
	storeToRefs
} from 'pinia'

export default function() {
	const double = computed(() => count * 2)

	const store = useCounterStore();
	const {
		count,
		total
	} = storeToRefs(store)

	function setBadge() {
		console.log(total)
		console.log(total.value)
		// 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
		uni.setTabBarBadge({
			index: 2, // 索引
			text: total + '' // 注意：text 的值必须是字符串，不能是数字
		})
	}
	return {
		count,
		double,
		setBadge
	}
}
