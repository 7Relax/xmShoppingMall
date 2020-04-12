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
					<!-- <view class="font">{{addrInfo.address}} {{addrInfo.detailAddr}}</view> -->
					<view class="font">
						{{addrInfo.province}}{{addrInfo.city}}{{addrInfo.district}} {{addrInfo.address}}
					</view>
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
					<!-- /static/images/demo/demo6.jpg -->
					<image :src="item.cover" v-for="(item, index) in productList" :key="index"
						style="width: 100rpx; height: 100rpx;" class="rounded mr-2"></image>
				</view>
				<view slot="rightContent">共 {{productList.length}} 件</view>
			</uni-list-item>
			
			<uni-list-item title="商品总价" :showArrow="false">
				<view slot="rightContent">
					<price color="text-dark">{{price}}</price>
				</view>
			</uni-list-item>
			
			<uni-list-item title="运费" :showArrow="false">
				<view slot="rightContent">包邮</view>
			</uni-list-item>
			
			<navigator url="/pages/order-coupon/order-coupon">
				<uni-list-item title="优惠券">
					<view slot="rightContent" class="text-light-muted" >无可用</view>
				</uni-list-item>
			</navigator>
			
			<uni-list-item :showArrow="false">
				<view class="main-text-color">小计</view>
				<view slot="rightContent">
					<price>{{price}}</price>
				</view>
			</uni-list-item>
			<divider />
			
			<uni-list-item title="发票" @click="openOrderInvoice">
				<view slot="rightContent">电子发票-个人</view>
			</uni-list-item>
		</view>
	
		<view class="d-flex j-end a-center position-fixed left-0 right-0 bottom-0 border-top border-light-secondary bg-white p-2 fond-md">
			<text>合计：</text>
			<price>{{price}}</price>
			<view class="px-5 py-1 text-white fond-md ml-2" 
				:class="loading ? 'bg-secondary' : 'main-bg-color'"
				style="border-radius: 50rpx;" hover-class="main-bg-hover-color"
				@click="openPayment">{{loading ? '加载中' : '去支付'}}</view>
		</view>
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue";
	import price from "@/components/common/price.vue";
	import { mapGetters, mapState } from "vuex"
	export default {
		components: {
			uniListItem,
			price
		},
		data() {
			return {
				addrInfo: false,
				items: [],
				loading: false,
				order_id: 0
			}
		},
		computed: {
			...mapState({
				list: state => state.cart.list
			}),
			...mapGetters(['defaultAddr', 'totalPrice']),
			// 即将下单的商品列表
			productList() {
				return this.items.map(id => {
					console.log(id);
					return this.list.find(v => v.id === id);
				})
			},
			// 最终价格
			price() {
				// 是否包邮
				// 是否选择优惠券
				// 是否有立减
				// ... toFixed(2) 保留2位小数
				return (this.totalPrice).toFixed(2);
			}
		},
		onLoad(e) {
			console.log(e);
			if ( !e.detail ) {
				uni.showToast({
					title: '请选择要下单的商品',
					icon: 'none'
				})
				return uni.navigateBack({
					delta: 1
				})
			}
			this.items = JSON.parse(e.detail); 
			
			// 判断是否有默认地址
			if (this.defaultAddr.length > 0) {
				this.addrInfo = this.defaultAddr[0]
			}
			// 开启监听选择收货地址事件
			uni.$on('choiceAddr', (res) => {
				this.addrInfo = res;
			})
			// TODO 计算当前价格有多少张可用优惠券 ...
		},
		onUnload() {
			// 关闭监听收货地址事件
			uni.$on('choiceAddr', (e) => {
				console.log("关闭监听收货地址事件"); // --- test
			})
		},
		onShow() {
			// 如果已经提交过订单了，重定向到订单详情页
			if (this.order_id > 0) {
				uni.redirectTo({
					url: '/pages/order-detail/order-detail?id=' + this.order_id
				})
			}
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
			},
			openPayment() {
				// 防止用户重复下单
				if (this.loading) {
					return;
				}
				// 判断是否选择收货地址
				if ( !this.addrInfo ) {
					return uni.showToast({
						'title': '请选择收货地址',
						'icon': 'none'
					})
				}
				let options = {
					user_addresses_id: this.addrInfo, // 收货地址id
					items: this.items.join(',')       // 购物车商品id，多个商品用逗号隔开
					// coupon_user_id: '' // 优惠券id，可选参数
				}
				// 设置loading，防止用户重复下单
				this.loading = true;
				this.$H.post('/order', {
					options 
				}, {
					token: true
				}).then(res => {
					this.loading = false;
					// 订单生成成功后跳转到支付页面
					console.log(res);
					uni.navigateTo({
						url: '/pages/payment/payment?detail=' + JSON.stringify({
							id: res.id,
							price: res.total_price 
						})
					});
					// 保存订单id
					this.order_id = res.id;
					// 通知购物车更新数据
					this.$emit('updateCart')
				}).catch(err => {
					this.loading = false;
					console.log(err);
					uni.showToast({
						'title': '创建订单失败',
						'icon': 'none'
					})
				})
				// --- test
				uni.navigateTo({
					url: '/pages/payment/payment'
				});
			}
		}
	}
</script>

<style>
</style>