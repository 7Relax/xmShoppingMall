<template>
	<view>
		<view class="d-flex flex-column j-center a-center py-5 my-3">
			<text class="font-md text-light-muted mb-1">支付金额</text>
			<price priceSize="font-lg" unitSize="font-md">{{detail.price}}</price>
		</view>
		<view class="px-5">
			<!-- 选择支付方式 -->
			<radio-group @change="change">
				<label v-for="(item, index) in options">
					<uni-list-item showExtraIcon :leftIcon="item.icon" 
						:title="item.title" :note="item.note" leftIconStyle="font-size: 60rpx;">
						<radio :value="item.value" slot="right" :checked="payType === item.value" color="#FD6801"/>
					</uni-list-item>
				</label>
				<!-- <label >
					<uni-list-item showExtraIcon leftIcon="icon-weixinzhifu" 
						title="微信支付" leftIconStyle="font-size: 60rpx; color: #09BB07;">
						<radio value="2" slot="right" color="#FD6801"/>
					</uni-list-item>
				</label> -->
			</radio-group>
			<!-- 按钮 -->
			<view class="text-white fond-md w-100 py-2 rounded mt-3 text-center"
				:class="loading ? 'bg-secondary' : 'main-bg-color'"
				hover-class="main-bg-hover-color" @click="submit">
				{{loading ? '支付中...': '确认支付'}}
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
				loading: false,
				detail: {
					id: 0,
					price: 0
				},
				payType: 'alipay', 
				options: [
					{
						title: '支付宝支付',
						note: '推荐使用支付宝支付',
						icon: 'icon-zhifubao text-primary',
						value: 'alipay'
					},
					{
						title: '微信支付',
						note: '',
						icon: 'icon-weixinzhifu',
						value: 'wxpay'
					}
				]
			}
		},
		onLoad(e) {
			console.log(e.detail);
			if ( !e.detail ) {
				return uni.showToast({
					title: '支付失败',
					icon: 'none'
				})
			}
			this.detail = JSON.parse(e.detail); 
		},
		methods: {
			// 切换支付方式
			change(e) {
				console.log(e.detail.value);
				this.payType = e.detail.value;
			},
			// 提交支付
			submit() {
				// 防止重复支付
				if (this.loading) {
					return;
				}
				this.loading = true;
				this.$H.get('/payment/'+this.detail.id+'/'+this.payType, {}, {
					token: true,
					native: true
				}).then(res => {
					console.log(res);
					// 去支付
					uni.requestPayment({
					    provider: this.payType,
					    orderInfo: res.data, //微信、支付宝订单数据（后端配置的参数）
					    success: (res) => {
							// 支付成功
					        console.log('success:' + JSON.stringify(res));
							// 这里用重定向的原因：按返回键后不会返回到选择支持方式页面（防止重复支付问题），而是返回到提交订单页order-confirm
							uni.redirectTo({
								url: '/pages/pay-result/pay-result'
							})
					    },
					    fail: (err) => {
							// 支付失败
					        console.log('fail:' + JSON.stringify(err));
							uni.showModal({
								title: '提示',
								content: '支付失败'
							})
					    },
						complete: () => {
							this.loading = false; 
						}
					});
				}).catch(err => {
					console.log(err);
					this.loading = false;
					uni.showToast({
						title: '支付失败',
						icon: 'none'
					})
				})
				// --- test
				uni.navigateTo({
					url: '/pages/pay-result/pay-result'
				});
			}
		}
	}
</script>

<style>
</style>