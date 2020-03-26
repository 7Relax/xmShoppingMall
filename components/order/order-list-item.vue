<template>
	<view class="border-bottom d-flex a-center py-2 border-light-secondary" @click.stop="open">
		<image :src="item.cover" mode="widthFix" 
			style="width: 150rpx; height: 150rpx;" class="rounded mx-2 flex-shrink"></image>
		<view class="flex-1">
			<view class="d-flex a-center">
				<text class="font-md text-dark">{{item.title}}</text>
				<text class="font-md text-light-muted ml-auto">￥{{item.price}}</text>
			</view>
			<view class="d-flex a-center">
				<text class="font text-light-muted">{{item.attrs}}</text>
				<text class="font text-light-muted ml-auto">x {{item.num}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		methods: {
			open() {
				uni.navigateTo({
					url: '/pages/detail/detail'
				});
			}
		}
	}
</script>

<style>
</style>
