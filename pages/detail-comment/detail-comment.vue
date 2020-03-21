<template>
	<view>
		<view class="p-2">
			<view class="d-flex py-2 border-bottom border-light-secondary">
				<text class="text-muted">用户评价(123)</text>
				<text class="main-text-color ml-auto mr-1">98%</text>
				<text class="text-muted">满意</text>
			</view>
			<!-- flex-wrap 可以换行 -->
			<view class="d-flex flex-wrap pt-2" style="margin-right: -20rpx;">
				<view class="px-2 py border rounded mr-2 mb-2 cate-item" 
					v-for="(item, index) in cateList" :key="index"
					:class="cateIndex === index ? 'active' : '' "
					@tap="cateChagne(index)"
				>
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<divider />
		<!--  -->
		<view class="p-2 d-flex a-start border-bottom border-light-secondary">
			<!-- flex-shrink 头像不被挤压 -->
			<image src="/static/images/demo/demo6.jpg" mode="widthFix" 
				style="width: 90rpx; height: 90rpx;" class="rounded flex-shrink"></image>
			<!-- flex-1 是其占满右侧的剩余空间 -->
			<view class="pl-2 flex-1">
				<!-- 昵称 -->
				<view class="d-flex a-center j-center">
					<text class="font-md font-weight text-primary mr-auto">昵称</text>
					<view class="iconfont icon-service main-text-color">
						<text class="pl-1 font">超好</text>
					</view>
				</view>
				<!-- 评论内容 -->
				<view class="line-h-md font-md">
					非常好
				</view>
				<!-- 买家秀照片 -->
				<view class="row">
					<view class="span24-8 px pb">
						<image src="/static/images/demo/cate_08.png" mode="widthFix" style="height: 100rpx;"></image>
					</view>
				</view>
				<!-- 点赞数 & 评论数 -->
				<view class="d-flex a-center">
					<text class="text-light-muted mr-auto">2020-03-20</text>
					<view class="d-flex text-light-muted a-center mr-1">
						0 <text class="iconfont icon-dianzan text-muted ml"></text>
					</view>
					<view class="d-flex text-light-muted a-center">
						10 <text class="iconfont icon-pinglun text-muted ml"></text>
					</view>
				</view>
				<!-- 客服回复 -->
				<view class="bg-light-secondary rounded p-2 d-flex flex-wrap a-center mt-1">
					<view class="">
						<text class="main-text-color">官方回复：</text>
						<text>哈哈哈 good</text>
					</view>
					<view class="iconfont icon-dianzan text-light-muted line-h-md font ml-2">
						<text class="text-muted pl-2">赞客服 120</text>
					</view>
				</view>
			</view> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cateIndex: 0,
				cateList: [
					{ name: "全部" },
					{ name: "有图" },
					{ name: "非常喜欢" },
					{ name: "拍照好" },
					{ name: "手感很棒" },
					{ name: "效果好" },
					{ name: "性能很棒" }
				]
			}
		},
		methods: {
			cateChagne(index) {
				this.cateIndex = index;
			}
		}
	}
</script>

<style>
.cate-item {
	background: #FFEBEC;
	color: #7B6D6C;
	border-color: #F4E0E1;
}
/* 注意是同级 */
.cate-item.active {
	background: #FF6B01 !important;
	color: #FFFFFF !important;
	border-color: #DE7232 !important;
}
</style>