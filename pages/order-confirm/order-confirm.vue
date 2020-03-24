<template>
	<view style="background-color: #F5F5F5;">
		<!-- 选择地址 -->
		<view class="main-bg-color text-white d-flex a-center px-3" style="height: 250rpx;"
			hover-class="main-bg-hover-color" @click="openAddressList"
		>
			<!-- 左 -->
			<view>
				<template v-if="addrInfo">
					<view class="font-weight d-flex a-center">
						<view class="mr-1 font-lg">{{addrInfo.name}} {{addrInfo.phone}}</view>
						<view class="border border-white rounded px-1 font" v-if="addrInfo.isDefault">默认</view>
					</view>
					<view class="font">{{addrInfo.address}} {{addrInfo.detailAddr}}</view>
				</template>
				<template v-else>
					<view class="font-weight d-flex a-center font-lg">
						请选择收货地址
					</view>
				</template>
			</view>
			<!-- 右 -->
			<view class="iconfont icon-you ml-auto"></view>
		</view>
		
		<view class="bg-white" style="border-top-left-radius: 30rpx; border-top-right-radius: 30rpx; margin-top: -30rpx;">
			<uni-list-item>
				<view class="d-flex a-center">
					<image src="/static/images/demo/demo6.jpg" style="width: 100rpx; height: 100rpx;" class="rounded mr-2"></image>
					<image src="/static/images/demo/demo6.jpg" style="width: 100rpx; height: 100rpx;" class="rounded mr-2"></image>
					<image src="/static/images/demo/demo6.jpg" style="width: 100rpx; height: 100rpx;" class="rounded mr-2"></image>
				</view>
				<view slot="rightContent">共3件</view>
			</uni-list-item>
			
			<uni-list-item title="商品总价" :showArrow="false">
				<view slot="rightContent">
					<price color="text-dark">66.00</price>
				</view>
			</uni-list-item>
			
			<uni-list-item title="运费" :showArrow="false">
				<view slot="rightContent">包邮</view>
			</uni-list-item>
			
			<uni-list-item title="优惠券">
				<view slot="rightContent" class="text-light-muted">无可用</view>
			</uni-list-item>
			
			<uni-list-item :showArrow="false">
				<view class="main-text-color">小计</view>
				<view slot="rightContent">
					<price>128.00</price>
				</view>
			</uni-list-item>
			<divider />
			
			<uni-list-item title="发票" @click="openOrderInvoice">
				<view slot="rightContent">电子发票-个人</view>
			</uni-list-item>
		</view>
	
		<view class="d-flex j-end a-center position-fixed left-0 right-0 bottom-0 border-top border-light-secondary bg-white p-2 fond-md">
			<text>合计：</text>
			<price>1399.00</price>
			<view class="px-2 py-1 main-bg-color text-white fond-md ml-2" style="border-radius: 50rpx;" hover-class="main-bg-hover-color">去支付</view>
		</view>
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue";
	import price from "@/components/common/price.vue";
	import { mapGetters } from "vuex"
	export default {
		components: {
			uniListItem,
			price
		},
		data() {
			return {
				addrInfo: false
			}
		},
		computed: {
			...mapGetters(['defaultAddr'])
		},
		onLoad() {
			// 判断是否有默认地址
			if (this.defaultAddr.length > 0) {
				this.addrInfo = this.defaultAddr[0]
			}
			// 开启监听选择收货地址事件
			uni.$on('choiceAddr', (res) => {
				this.addrInfo = res;
			})
		},
		onUnload() {
			// 关闭监听收货地址事件
			uni.$on('choiceAddr', (e) => {
				console.log("关闭监听收货地址事件"); // --- test
			})
		},
		methods: {
			openAddressList() {
				uni.navigateTo({
					url: '/pages/user-address-list/user-address-list?type=choice'
				});
			},
			openOrderInvoice() {
				uni.navigateTo({
					url: '/pages/order-invoice/order-invoice'
				})
			}
		}
	}
</script>

<style>
</style>