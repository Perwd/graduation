//useCounter.js
// import { computed } from "vue";
import { useCounterStore } from '../pinia/cart';
import { storeToRefs } from 'pinia'

export default function() {
  // const double = computed(() => Number(count) * 2)

  const store = useCounterStore();
  const {
    cart
  } = storeToRefs(store)

  function setCart() {
    console.log('cart')
    console.log(cart)
    console.log(cart.value)

    if (cart.value === '' || ((cart).constructor === Array && cart.length < 1)) {
      store.saveToStorage()
    }

  }
  return {
    setCart
  }
}
