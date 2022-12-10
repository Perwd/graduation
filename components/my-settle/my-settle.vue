<template>
    <!-- 最外层的容器 -->
    <view class="my-settle-container">
        <!-- 全选区域 -->
        <label class="radio" @click="changeAllState">
            <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
        </label>

        <!-- 合计区域 -->
        <view class="amount-box">
            合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
        </view>

        <!-- 结算按钮 -->

        <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
    </view>


</template>

<script setup lang="ts">
    import {
        // ref,
        computed,
        // reactive
    } from "vue";
    import {
        onLoad
    } from "@dcloudio/uni-app";
    // import {
    // 	storeToRefs
    // } from 'pinia'
    import {
        useCounterStore
    } from '../../pinia/cart';

    import {
        userAddress
    } from '../../pinia/user';
    const {
        checkedCount,
        total,
        checkedGoodsAmount,
        updateAllGoodsState,
    } = useCounterStore()
    const {
        addStr
    } = userAddress()

    let token = ''

    const isFullCheck = computed(() => {
        return total === checkedCount
    }, )


    const changeAllState = () => {
        // 修改购物车中所有商品的选中状态
        // !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
        updateAllGoodsState(!isFullCheck)
    }

    // 点击了结算按钮
    function settlement() {
        // 1. 先判断是否勾选了要结算的商品
        if (!checkedCount) return (uni as any).$showMsg('请选择要结算的商品！')

        // 2. 再判断用户是否选择了收货地址
        if (!addStr) return (uni as any).$showMsg('请选择收货地址！')

        // 3. 最后判断用户是否登录了
        if (!token) return (uni as any).$showMsg('请先登录！')
    }



    onLoad(() => {
        // console.log(address)
    })
</script>

<style lang="scss">
    .my-settle-container {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        // 将背景色从 cyan 改为 white
        background-color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 5px;
        font-size: 14px;

        .radio {
            display: flex;
            align-items: center;
        }

        .amount {
            color: #c00000;
        }

        .btn-settle {
            height: 50px;
            min-width: 100px;
            background-color: #c00000;
            color: white;
            line-height: 50px;
            text-align: center;
            padding: 0 10px;
        }
    }
</style>
