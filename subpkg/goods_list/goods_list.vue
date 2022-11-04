<template>
	<view>
		goods list
	</view>

</template>

<script setup lang="ts">
	import {
		ref,
		// toRefs,
		// reactive
	} from 'vue'
	import {
		onLoad,
	} from '@dcloudio/uni-app'

	interface ValueObject {
		value ? : Number
	}
	// 通过接口定义对象所具有的属性，
	//通过接口声明对象后，所具有的属性值一目了然
	const cid2: ValueObject = Object.create(null);

	const cid = ref(String)
	const cid3 = ref < string > ('s')



	const imgList = ref < string[] > ([]);

	onLoad((option: any) => {
		console.log(option)
		cid.value = option.cid

		cid2.value = 2
		imgList.value = ['1']
		cid3.value = 'q'
	})
</script>

<style lang="scss">

</style>
