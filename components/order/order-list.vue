<template>
	<view class="bg-white mb-1">
		<!-- <divider /> --> 
		<!-- 头部 -->
		<view class="d-flex a-center p-2 border-bottom border-light-secondary">
			<text class="text-light-muted">{{item.createTime}}</text>
			<text class="main-text-color ml-auto">{{item.status}}</text>
		</view>
		<!-- 身体 -->
		<view class="px-2">
			<view class="border-bottom d-flex a-center py-2 border-light-secondary" v-for="(order, orderIndex) in item.order_items" :key="orderIndex">
				<image :src="order.cover" mode="widthFix" 
					style="width: 150rpx; height: 150rpx;" class="rounded mx-2 flex-shrink"></image>
				<view class="flex-1">
					<view class="d-flex a-center">
						<text class="font-md text-dark">{{order.title}}</text>
						<text class="font-md text-light-muted ml-auto">￥{{order.price}}</text>
					</view>
					<view class="d-flex a-center">
						<text class="font text-light-muted">{{order.attrs}}</text>
						<text class="font text-light-muted ml-auto">x {{order.num}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="d-flex a-center py-1 px-2">	
			<text class="text-dark ml-auto">共{{item.totalNum}}件商品，合计：￥{{item.totalPrice}}</text>
		</view>
		<view class="d-flex j-end a-center py-1 px-2">
			<view class="rounded border border-light-secondary px-2 text-secondary" 
				hover-class="bg-light-secondary">查看物流</view>
			<view class="rounded border border-light-secondary px-2 text-secondary ml-2"
				hover-class="bg-light-secondary">确认收货</view>
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