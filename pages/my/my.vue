<template>
    <view>
        my
    </view>
</template>

<script setup lang="ts">
    import {
        // ref,
        // reactive,
        // toRefs,
        // reactive
    } from 'vue'
    import {
        onLoad,
        // onReachBottom
    } from '@dcloudio/uni-app'

    import useBadge from "../../hook/useBadge";

    const {
        setBadge
    } = useBadge();

    onLoad(() => {
        // console.log(option)
        setBadge()
        // console.log(typeof options)

    })
</script>

<style lang="scss">

</style>
