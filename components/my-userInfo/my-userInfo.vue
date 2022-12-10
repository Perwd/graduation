<template>
    <view>
        my-userinfo
    </view>
</template>

<script setup lang="ts">
    import {
        // ref,
        // reactive,
        // computed,
        // watch,
        // PropType
    } from 'vue'

    import {
        onShow
    } from '@dcloudio/uni-app'
    // type PropT = {
    // 	bColor: string,
    // 	raius: number | string
    // }

    type str = string | null

    const props = defineProps({
        bColor: {
            type: String,
            default: '#c00000'
        },
        raius: {
            type: Number,
            default: 18
        },
        list: new Array
    })


    const emit = defineEmits(['mySearchClick'])





    onShow(() => {
        console.log(props)
    })
</script>

<style lang="scss">

</style>
