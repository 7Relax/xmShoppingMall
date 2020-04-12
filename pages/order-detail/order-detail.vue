<template>
	<view>
		<view class="main-bg-color text-white p-4 d-flex j-sb a-end" style="height: 300rpx;">
			<view class="mb-3">
				<view class="font-lg">卖家已发货</view>
				<view class="font">还差7天10时自动确认</view>
			</view>
			<view class="iconfont icon-daishouhuo line-h mb-3" style="font-size: 100rpx;"></view>
		</view>
		
		<view class="p-3">
			<view class="text-light-muted font-md">
				<text class="font-lg text-dark mr-2">西文</text>
				<text class="">159****3720</text>
			</view>
			<view class="text-light-muted font-md">
				广东省 广州市 东圃镇 开心公寓
			</view>
		</view>
		<divider />
		
		<view class="px-2">
			<block v-for="(item, index) in order_items" :key="index">
				<order-list-item :item="item" :index="index"/>
			</block>
		</view>
		<divider />
		
		<uni-list-item>
			<text class="text-light-muted font-md">商品总价</text>
			<view slot="right" class="text-light-muted font-md">￥102.01</view>
		</uni-list-item>
		
		<uni-list-item>
			<text class="text-light-muted font-md">快递</text>
			<view slot="right" class="text-light-muted font-md">￥10.00</view>
		</uni-list-item>
		
		<uni-list-item>
			<text class="text-light-muted font-md">优惠券</text>
			<view slot="right" class="text-light-muted font-md">-￥20.00</view>
		</uni-list-item>
		
		<uni-list-item>
			<text class="main-text-color font-md">实际付款</text>
			<view slot="right" class="main-text-color font-md">
				<price>110.00</price>
			</view>
		</uni-list-item>
		<divider />
		
		<card headTitle="订单信息" :headBorderBottom="false">
			<uni-list-item title="订单编号">
				<view slot="right" class="text-light-muted font-md">SG89757</view>
			</uni-list-item>
		</card>
		
		
	</view>
</template>

<script>
	import orderListItem from "@/components/order/order-list-item.vue";
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue";
	import card from "@/components/common/card.vue";
	import price from "@/components/common/price.vue";
	export default {
		components: {
			orderListItem,
			uniListItem,
			card,
			price
		},
		data() {
			return {
				id: 0,
				createTime: "2020-03-20 16:20",
				status: "已发货",
				order_items: [
					{ cover: "/static/images/demo/demo6.jpg", title: "小米7", price: "999.00", attrs: "金色 标配", num: 1},
					{ cover: "/static/images/demo/demo6.jpg", title: "小米8", price: "1999.00", attrs: "金色 标配", num: 1},
					{ cover: "/static/images/demo/demo6.jpg", title: "小米9", price: "2999.00", attrs: "金色 标配", num: 1},
				],
				totalNum: 3,
				totalPrice: 3999.00
			}
		},
		onLoad(e) {
			if (!e.id) {
				uni.showToast({
					title: '订单不存在',
					icon: 'none'
				})
				return uni.navigateBack({
					delta: 1
				})
			}
			this.id = e.id;
			// 获取订单详情
			this.getData();
		},
		methods: {
			getData() {
				this.$H.get('/order/'+this.id, {}, { 
					token: true
				}).then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style>
</style>