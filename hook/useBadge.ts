//useCounter.js
import { computed } from "vue";
import { useCounterStore } from '../pinia/cart';
import { storeToRefs } from 'pinia'

export default function() {
	const double = computed(() => Number(count) * 2)

	const store = useCounterStore();
	const {
		count,
		total
	} = storeToRefs(store)

	function setBadge() {
		// console.log('total')
		// console.log(total.value)

		if (typeof total.value === 'number' && total.value !== 0) {

			// 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
			uni.setTabBarBadge({
				index: 2, // 索引
				// 注意：text 的值必须是字符串，不能是数字
				text: `${total.value}`
			})
		}

	}
	return {
		count,
		double,
		setBadge
	}
}
