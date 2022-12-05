// import { type } from 'os';
import { defineStore } from 'pinia';
import { TestType } from './store/type';

type Cart = {
    goods_id: number,
    goods_name: string,
    goods_price: number,
    goods_count: number,
    goods_small_logo: string,
    goods_state: Boolean,
}
// 接口继承
// interface StateType extends TestType {
// 	cart: Cart[],
// 	count: number,
// 	type: string,
// 	// name:TestType ,
// 	// id: TestType,
// 	row?: object
// }

type StateType = TestType & {
    cart: Cart[],
    count: number,
    type: string,
    // name:TestType ,
    // id: TestType,
    row?: object
}

export const useCounterStore =
    // defineStore('cart', {  方式一
    defineStore({
        id: 'cart',
        state: () => {
            return {
                count: 0,
                type: 'wxxcx',
                name: 'wlr',
                id: "000000",
                row: {},
                // cart: new Array<Cart>(),
                cart: uni.getStorageSync('cart') && (JSON.parse(uni?.getStorageSync('cart')) || new Array<Cart>()),
                // cart: JSON.parse(uni.getStorageSync('cart') ) || new Array<Cart>(),
                // cart: JSON.parse(uni.getStorageSync('cart' || [])) || new Array<Cart>(),

            };
        },
        // 也可以这样定义
        // state: () => ({ count: 0 })
        actions: {
            increment() {
                this.count++;
            },
            // 2秒后更新状态
            updateUid(context: any, payload: any) {
                setTimeout(() => {
                    context.commit('updateUid', payload)
                }, 2000)
            },
            apiGetUid(context: any) {
                console.log('pinia', context)

                this.count++
                // console.log(this.count)
                // console.log(this.type)
                // console.log(this.name)
            },
            addToCart(goods: Cart) {
                console.log(goods)
                console.log('加入购物车')
                // let good = { ...goods, goods_state: true }
                const findResult = this.cart.find((x: Cart) => x.goods_id === goods.goods_id)
                console.log(1)
                console.log(findResult)
                if (!findResult) {
                    // 没有这件商品，则直接 push
                    this.cart.push(goods)

                } else {
                    // 有这件商品，增加
                    findResult.goods_count++
                    findResult.goods_state = true
                }


                console.log('触发cart')
                console.log(this.cart)
                this.saveToStorage()
            },
            // 将购物车中的数据持久化存储到本地
            saveToStorage() {
                console.log('数据同步存入本地')
                uni.setStorageSync('cart', JSON.stringify(this.cart))
            },
            // 更新购物车中商品的勾选状态
            updateGoodsState(goods: Cart) {
                console.log(5)
                // console.log(goods)

                // 根据 goods_id 查询购物车中对应商品的信息对象
                const findResult = this.cart.find((x: Cart) => x.goods_id === goods.goods_id)

                // 有对应的商品信息对象
                if (findResult) {

                    // console.log(findResult)
                    // 更新对应商品的勾选状态
                    findResult.goods_state = goods.goods_state
                    // 持久化存储到本地
                    this.saveToStorage()

                    // 课程中 this.commit('m_cart/saveToStorage')，就是调用方法saveToStorage
                }
            },
            removeGoodsById(goods_id: number) {
                this.cart = this.cart.filter((x: Cart) => x.goods_id !== goods_id)
                console.log('删除')
                this.saveToStorage()
            },
            // 更新所有商品的勾选状态
            updateAllGoodsState(newState: Boolean) {
                // 循环更新购物车中每件商品的勾选状态
                this.cart.forEach((x: Cart) => x.goods_state = newState)

                this.saveToStorage()
            }

        },
        getters: {
            total: (state: any) => {
                // console.log(state)
                let num = 0
                if ((state.cart).constructor === Array) {
                    state.cart.forEach((goods: any) => num += goods.goods_count)
                    return num
                }
            },
            // 勾选的商品的总数量
            checkedCount: () => {

                type It = {
                    goods_count: number
                }

                // 先使用 filter 方法，从购物车中过滤器已勾选的商品
                // 再使用 reduce 方法，将已勾选的商品总数量进行累加
                // reduce() 的返回值就是已勾选的商品的总数量
                return (this as any).cart.filter((x: any) => x.goods_state)
                    .reduce((total: number, item: It) => total += item.goods_count, 0)
            },
            // 已勾选的商品的总价
            checkedGoodsAmount: () => {
                // 先使用 filter 方法，从购物车中过滤器已勾选的商品
                // 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
                // reduce() 的返回值就是已勾选的商品的总价
                // 最后调用 toFixed(2) 方法，保留两位小数
                return (this as any).cart.filter((x: Cart) => x.goods_state)
                    .reduce((total: number, item: Cart) => total += item.goods_count * item.goods_price, 0)
                    .toFixed(2)
            }


        },


    });
