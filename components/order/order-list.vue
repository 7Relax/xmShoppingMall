<template>
	<view class="bg-white mb-1" @click.stop="openDetail">
		<!-- <divider /> --> 
		<!-- 头部 -->
		<view class="d-flex a-center p-2 border-bottom border-light-secondary">
			<text class="text-light-muted">{{item.createTime}}</text>
			<text class="main-text-color ml-auto">{{item.status}}</text>
		</view>
		<!-- 身体 -->
		<view class="px-2">
			<block v-for="(order, orderIndex) in item.order_items" :key="orderIndex">
				<order-list-item :item="order" :index="orderIndex"/>
			</block>
		</view>
		<!-- 底部 -->
		<view class="py-3 px-2 d-flex flex-column a-end">
			<view class="text-dark mb-1">共{{item.totalNum}}件商品，合计：￥{{item.totalPrice}}</view>
			<view class="d-flex">
				<view class="rounded border border-light-secondary px-2 py-1 text-secondary"
					hover-class="bg-light-secondary" @click.stop="openAfterSale">申请售后</view>
				<view class="rounded border border-light-secondary px-2 py-1 text-secondary ml-2"
					hover-class="bg-light-secondary" @click.stop="openLogistics">查看物流</view>
				<view class="rounded border border-light-secondary px-2 py-1 text-secondary ml-2"
					hover-class="bg-light-secondary">确认收货</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import orderListItem from "@/components/order/order-list-item.vue"
	export default {
		components: {
			orderListItem
		},
		props: {
			item: Object,
			index: Number
		},
		methods: {
			openDetail() {
				uni.navigateTo({
					url: '/pages/order-detail/order-detail'
				});
			},
			openLogistics() {
				uni.navigateTo({
					url: '/pages/logistics-detail/logistics-detail'
				})
			},
			openAfterSale() {
				uni.navigateTo({
					url: '/pages/after-sale/after-sale'
				});
			}
		}
	}
</script>

<style>
</style>