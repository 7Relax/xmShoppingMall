<template>
	<view>
		<view class="d-flex flex-column j-center a-center py-5 my-3">
			<text class="font-md text-light-muted mb-1">支付金额</text>
			<price priceSize="font-lg" unitSize="font-md">168.00</price>
		</view>
		<view class="px-5">
			<label>
				<uni-list-item showExtraIcon leftIcon="icon-zhifubao text-primary" 
					title="支付宝支付" note="推荐使用支付宝支付" leftIconStyle="font-size: 60rpx;">
					<radio value="1" slot="right" color="#FD6801"/>
				</uni-list-item>
			</label>
			<label >
				<uni-list-item showExtraIcon leftIcon="icon-weixinzhifu" 
					title="微信支付" leftIconStyle="font-size: 60rpx; color: #09BB07;">
					<radio value="2" slot="right" color="#FD6801"/>
				</uni-list-item>
			</label>
			<!-- 按钮 -->
			<view class="main-bg-color text-white fond-md w-100 py-2 rounded mt-3 text-center"
				hover-class="main-bg-hover-color" @click="submit">
				确认支付
			</view>
		</view>
	</view>
</template>

<script>
	import price from "@/components/common/price.vue";
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue";
	export default {
		components: {
			price,
			uniListItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			submit() {
				uni.navigateTo({
					url: '/pages/pay-result/pay-result'
				});
			}
		}
	}
</script>

<style>
</style>