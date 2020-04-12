<template>
	<view>
		<!-- 底部操作条 -->
		<!-- 占位 -->
		<view style="height: 100rpx;"></view>
		<view class="d-flex a-stretch bg-white position-fixed left-0 bottom-0 right-0 border-top border-light-secondary"
			style="height: 100rpx; z-index: 100;"
		>
			<view class="flex-1 d-flex flex-column a-center j-center line-h-md" hover-class="bg-light-secondary">
				<view class="iconfont icon-xihuan text-muted line-h-md"></view>收藏
			</view>
			
			<view class="flex-1 d-flex flex-column a-center j-center line-h-md position-relative"
				hover-class="bg-light-secondary" @tap="toCart">
				<view class="iconfont icon-gouwuche text-muted line-h-md"></view>
				<view class="position-absolute" style="left: 100rpx; top: 0;" v-if="cartCount !== '0'">
					<uni-badge :text="cartCount" type="error" size="small"/>
				</view>
				购物车
			</view>
			<view class="d-flex a-center j-center font-md main-bg-color text-white"
				style="flex: 2.5" hover-class="main-bg-hover-color" @tap="$emit('show')"
			>
				加入购物车
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '../uni-ui/uni-badge/uni-badge.vue';
	import { mapGetters } from 'vuex';
	export default {
		components: {
			uniBadge
		},
		methods: {
			toCart() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			}
		},
		computed: {
			...mapGetters([
				'cartCount'
			])
		}
	}
</script>

<style>
</style>