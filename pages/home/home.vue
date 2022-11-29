<template>
	<view>
		<view class="search-box">
			<my-search @mySearchClick="goToSearch"></my-search>
		</view>
		<view>
			<!-- indicator-dots设置小圆点 -->
			<!-- autoplay自动轮播，interval轮播时间，多少秒轮播一次， -->
			<!-- duration图片之间替换时间 -->
			<!-- circular自动衔接 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<!-- 循环渲染轮播图的 item 项 -->
				<swiper-item v-for="(item, i) in swiperList" :key="i">
					<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
						<!-- 动态绑定图片的 src 属性 -->
						<image :src="item.image_src"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<!-- 楼层 item 项 -->
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片区域 -->

				<view class="floor-img-box">
					<!-- 左侧大图片的盒子 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{ width: item.product_list[0].image_width + 'rpx' }" mode="widthFix"></image>
					</navigator>
					<!-- 右侧 4 个小图片的盒子 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2"
							:url="item2.url">
							<image v-if="i2 !== 0" :src="item2.image_src" mode="widthFix"
								:style="{ width: item2.image_width + 'rpx' }">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		// reactive
	} from "vue";
	// import {
	// 	$ref
	// } from 'vue/macros'
	import {
		onLoad
	} from "@dcloudio/uni-app";

	import useBadge from "../../hook/useBadge";


	type Item = {
		name: string
	}


	type FList = {
		floor_title: {
			image_src: string
		},
		product_list: [{
			image_src: string,
			url: string,
			image_width: number,
			navigator_url: string,
		}]
	}

	//解决方法定义一个any类型
	const uniAPP: any = uni


	const swiperList = ref([{
		image_src: '',
		goods_id: '',
	}]);
	const navList = ref([{
		image_src: '',
		name: '',
	}]);

	const floorList = ref < [FList] > ();
	const {
		setBadge,
		double,
		count
	} = useBadge();



	const getSwiperList = async () => {
		const {
			data: res
		} = await uniAPP.$http.get("/api/public/v1/home/swiperdata");
		// console.log(res)

		if (res.meta.status !== 200) return uniAPP.$showMsg();

		swiperList.value = res.message
	};

	const getNavList = async () => {
		const {
			data: res
		} = await uniAPP.$http.get("/api/public/v1/home/catitems");
		// console.log(res)

		if (res.meta.status !== 200) return uniAPP.$showMsg();

		navList.value = res.message;
	};
	const getFloorList = async () => {
		const {
			data: res
		} = await uniAPP.$http.get("/api/public/v1/home/floordata");
		// console.log(res)

		if (res.meta.status !== 200) return uniAPP.$showMsg();

		// 处理 URL 地址
		res.message.forEach((floor: FList) => {
			floor.product_list.forEach((prod) => {
				prod.url =
					"/subpkg/goods_list/goods_list?" + prod.navigator_url.split("?")[1];
			});
		});
		floorList.value = res.message;
		// console.log(floorList.value)
	};

	const navClickHandler = (item: Item) => {
		// console.log(item)
		if (item.name === "分类") {
			uni.switchTab({
				url: "/pages/cate/cate",
			});
		}
	};

	function goToSearch() {
		uni.navigateTo({
			url: "/subpkg/search/search",
		});
	}

	onLoad(() => {
		// console.log(optios)

		getSwiperList();
		getNavList();
		getFloorList();
		setBadge()
		// console.log(count);
		// console.log(double);
		// console.log(setBadge);

	});
</script>

<style lang="scss">
	.swiper-item {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		height: 330rpx;
		display: flex;
		justify-content: space-between;

		.nav-item,
		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	}

	.search-box {
		// 设置定位效果为“吸顶”
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
