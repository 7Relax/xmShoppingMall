<template>
	<view>
		<view class="d-flex flex-column">
			<view class="p-2 border-bottom">
				<text class="text-dark font-md font-weight">{{item.title}}</text>
			</view>
			<view>
				<image :src="item.cover" style="width: 750rpx; height: 300rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object
		},
		data() {
			return {
				item1: {
					title: '每日精选1',
					cover: '/static/images/demo/demo8.jpg'
				}
			}
		}
	}
</script>

<style>
</style>