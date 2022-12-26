// import { computed } from "vue";
import { useCounterStore } from '../pinia/cart';
import { storeToRefs } from 'pinia'

export default function() {

	const store = useCounterStore();
	const {
		cart
	} = storeToRefs(store)

	function setCart() {
		// console.log('cart')
		// console.log(cart.value)

		if (cart.value === '' || ((cart).constructor === Array && cart.length < 1)) {
			store.saveToStorage()
		}

	}
	return {
		setCart
	}
}
