<template>
	<view>
		<view class="d-flex flex-column j-center a-center py-5 mb-3">
			<view class="iconfont icon-iconfontxuanzhong4 line-h-md" style="font-size: 160rpx; color: #09BB07;"></view>
			<view class="text-dark font-lg">支付成功</view>
		</view>
		<!-- 按钮 -->
		<view class="px-5">
			<view class="main-bg-color text-white fond-md w-100 py-2 rounded mt-3 text-center "
				hover-class="main-bg-hover-color" style="background: #09BB07;" @click="openOrder">查看订单
			</view>
			<view class="border fond-md w-100 py-2 rounded mt-3 text-center"
				hover-class="bg-light" @click="openIndex">返回首页
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			openIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			openOrder() {
				
			}
		}
	}
</script>

<style>
</style>