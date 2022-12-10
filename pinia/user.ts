import { defineStore } from 'pinia';

type Ress = {
    provinceName: string,
    cityName: string,
    countyName: string,
    detailInfo: string,
}

export const userAddress =
    // defineStore('cart', {  方式一
    defineStore({
        id: 'address',
        state: () => {
            return {
                // address: {} as Ress,
                address: uni.getStorageSync('address') && JSON.parse(uni.getStorageSync('address') || new Object()),
            };
        },
        actions: {
            updateAddress(address: Ress) {
                this.address = address
                this.saveToStorage()
            },
            saveToStorage() {
                console.log('数据同步存入本地')
                uni.setStorageSync('address', JSON.stringify(this.address || {}))
            },
        },
        getters: {
            addStr: () => {
                console.log('地址')
                return (this as any).address.provinceName + (this as any).address.cityName + (this as any).address.countyName + (this as any).address.detailInfo
            },
        },

    });
