<template>
	<view>
		<view class="d-flex flex-column py-5 my-3 j-center a-center">
			<image src="/static/images/demo/cate_02.png" mode="widthFix" style="width: 150rpx; height: 150rpx;"></image>
			<view class="text-light-muted font-md">
				xxx商城 1.0.0
			</view>
		</view>
		
		<view class="bg-white">
			<uni-list-item title="版本更新" showArrow />
			<uni-list-item title="版本更新" showArrow />
			<uni-list-item title="版本更新" showArrow />
			<uni-list-item title="版本更新" showArrow />
		</view>
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page {
		background-color: #EEEEEE;
	}
</style>