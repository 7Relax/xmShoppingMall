<template>
	<view style="width: 372.5upx;" @click="detail">
		<image :src="item.cover" lazy-load mode="widthFix"></image>
		<view class="p-2 pt-1">
			<view class="font-md">{{item.title}}</view>
			<text class="d-block font text-light-muted">{{item.desc}}</text>
			<view class="d-flex my-1">
				<!-- 价格 -->
				<price>{{item.pprice}}</price>
				<!-- 原价 -->
				<view class="font-sm text-light-muted line-through ml-1 a-self-end line-h">￥{{item.oprice}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Price from "@/components/common/price.vue";
	export default {
		components: {
			Price
		},
		props: {
			item: Object
		},
		methods: {
			detail() {
				uni.navigateTo({
					url: '/pages/detail/detail'
				});
			}
		}
	}
</script>

<style>
</style>
