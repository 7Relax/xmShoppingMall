<template>
	<!-- 左边 w:373 h:530 -->
	<!-- 左边 w:375 h:264 x2 -->
	<!-- <view class="d-flex">
		<image :src="threeAdv.lBig.src" lazy-load  @tap="event(threeAdv.lBig)"
			style="width: 373upx; height: 530upx; border-right: 2upx solid #F5F5F5;"></image>
		<view class="d-flex flex-column">
			<image :src="threeAdv.rSmallTop.src" @tap="event(threeAdv.rSmallTop)" 
				style="width: 375upx; height: 264upx; border-bottom: 2upx solid #F5F5F5;"></image>
			<image :src="threeAdv.rSmallBottom.src" @tap="event(threeAdv.rSmallBottom)" 
				style="width: 375upx; height: 264upx;"></image>
		</view>
	</view> -->
	
	<view class="d-flex">
		<image :src="threeAdv[0].src" lazy-load
			style="width: 373upx; height: 530upx; border-right: 2upx solid #F5F5F5;"></image>
		<view class="d-flex flex-column">
			<image :src="threeAdv[1].src"
				style="width: 375upx; height: 264upx; border-bottom: 2upx solid #F5F5F5;"></image>
			<image :src="threeAdv[2].src"
				style="width: 375upx; height: 264upx;"></image>
		</view>
	</view>
	
	
</template>

<script>
	export default {
		props: {
			threeAdv: Object
		},
		methods: {
			event(obj) {
				console.log(obj);
			}
		}
	}
</script>

<style>
</style>
