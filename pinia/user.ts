import { defineStore } from 'pinia';

type Ress = {
    provinceName: string,
    cityName: string,
    countyName: string,
    detailInfo: string,
    userName: string,
    telNumber: string
}

export const userAddress =
    // defineStore('cart', {  方式一
    defineStore({
        id: 'address',
        state: () => {
            return {
                // address: {} as Ress,
                address: JSON.parse(uni.getStorageSync('address') || new Object()),
                // 登录成功之后的 token 字符串
                token: '',
            };
        },
        actions: {
            updateAddress(address: Ress) {
                this.address = address
                console.log(this.address)
                this.saveToStorage()
            },
            saveToStorage() {
                console.log('数据同步存入本地')
                uni.setStorageSync('address', JSON.stringify(this.address))
                console.log(this.address)
                console.log(this.addStr)

            },
        },
        getters: {
            addStr: (state: any) => {
                console.log('地址')
                console.log(this)

                console.log(uni.getStorageSync('address'))
                if (uni.getStorageSync('address')) {
                    return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
                }
            },
            addStr2(): String {
                console.log('地址')
                console.log(this)

                console.log(uni.getStorageSync('address'))
                if (uni.getStorageSync('address')) {
                    //   return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
                }
                return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
            },
        },

    });
