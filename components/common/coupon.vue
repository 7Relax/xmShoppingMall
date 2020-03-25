<template>
	<view class="bg-white rounded border border-light-secondary d-flex a-center mb-3">
		<view class="flex-1 px-3 d-flex flex-column j-center">
			<view class="font-md" :class="item.disabled || !item.status ? 'text-light-muted' : '' ">{{item.title}}</view>
			<view class="text-light-muted font">{{item.startTime}} ~ {{item.endTime}}</view>
		</view>
		<view class="text-white d-flex flex-column j-center a-center" 
			:hover-class="item.disabled || !item.status ? '' : 'main-bg-hover-color' " style="width: 220rpx; height: 200rpx;"
			:class="item.disabled || !item.status ? 'bg-secondary' : 'main-bg-color' ">
			<view class="line-h-md" style="font-size: 40rpx;">{{item.price}}<text class="font">元</text></view>
			<view class="font">{{item.desc}}</view>
			<view class="rounded bg-white w-50 mt-1 d-flex j-center a-center" style="height: 38rpx;"
				:class="item.disabled || !item.status ? 'text-secondary' : 'main-text-color' ">
					{{item.status ? '去使用' : '已失效'}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		}
	}
</script>

<style>
</style>