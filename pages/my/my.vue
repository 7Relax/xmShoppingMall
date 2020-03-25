<template>
	<view class="animated fadeIn faster">
		<!-- 提高用户体验 -->
		<loading-plus v-if="beforeReady" />
		<!-- 头部 -->
		<view class="position-relative d-flex a-center" style="height: 320rpx;">
			<!-- 背景图 -->
			<image src="/static/images/bg.jpg" style="width: 100%; height: 320rpx;"></image>
			<!-- 消息列表 -->
			<navigator url="/pages/msg-list/msg-list">
				<view class="iconfont icon-xiaoxi position-absolute text-white" 
					style="font-size: 50rpx; top: 75rpx; right: 20rpx; z-index: 100;">
				</view>
			</navigator>
			
			<view class="d-flex a-center position-absolute left-0 right-0" style="bottom: 50rpx;">
				<!-- 头像 -->
				<image src="/static/images/demo/demo6.jpg" style="width: 145rpx; height: 145rpx; border: 5rpx solid;" 
					class="rounded-circle border-light ml-4"></image>
				<!-- 昵称 -->
				<view class="ml-2 text-white font-md" @click="loginTest">测试昵称</view>
				<!-- 积分 -->
				<view class="d-flex j-center a-center a-self-end ml-auto px-2" 
					style="height: 70rpx; background: #FFD43F; color: #CC4A00; border-top-left-radius: 40rpx; border-bottom-left-radius: 40rpx;"
				>
					<view class="line-h iconfont icon-huangguan text-white mr-1"></view>
					<text>会员积分 1.99</text>
				</view>
			</view>
		</view>
		<!-- 图标分类 -->
		<card>
			<view slot="title" class="d-flex j-sb a-center">
				<text class="font-md font-weight">我的订单</text>
				<view class="text-secondary" @click="navigate('order')">
					全部订单<text class="iconfont icon-you font"></text>
				</view>
			</view>
			<view class="d-flex a-center">
				<view class="flex-1 d-flex flex-column j-center a-center py-3" 
					hover-class="bg-light-secondary" v-for="i in 4" :key="i"
				>
					<view class="iconfont icon-cpu font-lg line-h"></view>
					<view>待付款</view>
				</view>
			</view>
		</card>
		<divider />
		
		<view class="iconfont "></view>
		<!--  -->
		<uni-list-item title="小米会员" showExtraIcon leftIcon="icon-VIP" leftIconStyle="color: #BDBF2E;"></uni-list-item>
		<uni-list-item title="会员中心" showExtraIcon leftIcon="icon-huangguan" leftIconStyle="color: #FCBE2D;"></uni-list-item>
		<uni-list-item title="服务中心" showExtraIcon leftIcon="icon-service" leftIconStyle="color: #FA6C5E;"></uni-list-item>
		<uni-list-item title="小米之家" showExtraIcon leftIcon="icon-home" leftIconStyle="color: #FE8B42;"></uni-list-item>
		<uni-list-item title="更多功能" showExtraIcon leftIcon="icon-gengduo" leftIconStyle="color: #9ED45A;"></uni-list-item>
		<divider />
		<!-- <uni-list-item title="更多设置" showExtraIcon leftIcon="icon-icon_set_up" leftIconStyle="color: #808C98;" @click="navigate('user-set')"></uni-list-item> -->
		<!-- <uni-list-item title="更多设置" showExtraIcon leftIcon="icon-icon_set_up" leftIconStyle="color: #808C98;" @click="navigate('user-userInfo')"></uni-list-item> -->
		<uni-list-item title="更多设置" showExtraIcon leftIcon="icon-icon_set_up" leftIconStyle="color: #808C98;" @click="navigate('user-address-list')"></uni-list-item>
		
	</view>
</template>

<script>
	import loading from "@/common/mixin/loading.js";
	import Card from "@/components/common/card.vue"
	import UniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	export default {
		mixins: [loading],
		components: {
			Card,
			UniListItem
		},
		data() {
			return {
			}
		},
		methods: {
			navigate(path) {
				if (!path) { return; }
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				});
			},
			loginTest() {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		}
	}
</script>

<style>
</style>