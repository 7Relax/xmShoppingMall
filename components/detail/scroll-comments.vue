<template>
	<!-- 横向滚动评论 外层图片：w620 * h380，头像：w70 * h70，图片：h115 -->
	<view class="p-2">
		<scroll-view scroll-x class="scroll-row">
			<view class="scroll-row-item rounded bg-light-secondary mr-2 p-2"
				style="width: 620rpx; height: 380rpx;"
				v-for="(item, index) in comments" :key="index"
			>
				<view class="d-flex a-center mb-1">
					<image :src="item.userPic" mode="widthFix"
						style="width: 70rpx; height: 70rpx;" class="rounded-circle">
					</image>
					<view class="ml-2">
						<text class="font-md line-h">{{item.username}}</text>
						<text class="d-block font text-light-muted line-h">{{item.createTime | formatTime}}</text>
					</view>
					<view class="iconfont icon-dianzan font text-light-muted pl-1 ml-auto">{{item.praiseNum}}</view>
				</view>
				
				<text class="d-block font-md mb-2">{{item.context}}</text>
				
				<view class="row">
					<view class="span24-8 px-2" v-for="(item, i) in item.picList" :key="i">
						<image :src="item" mode="widthFix"
							style="height: 115rpx;" class="rounded">
						</image>
					</view>
				</view>
				
			</view>
		</scroll-view>
		
		<navigator url="/pages/detail-comment/detail-comment">
			<view class="d-flex j-center a-center py-2 mt-2 text-primary" hover-class="bg-light-secondary">
				更多评论<view class="iconfont icon-you font"></view>
			</view>
		</navigator>
		
	</view>
</template>

<script>
	import $T from '@/common/lib/time.js'
	export default {
		props: {
			comments: {
				type: Array
			}
		},
		filters: {
			formatTime(value) {
				return $T.gettime(value);
			}
		}
	}
</script>

<style>
</style>
