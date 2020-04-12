<template>
	<view>
		<divider />
		<uni-list-item title="头像">
			<block slot="right">
				<image src="/static/images/demo/demo6.jpg" class="rounded-circle border border-light-secondary" 
					style="width: 90rpx; height: 90rpx;"></image>
			</block>
		</uni-list-item>
		<uni-list-item title="姓名">
			<block slot="right">Seven</block>
		</uni-list-item>
		<uni-list-item title="性别"></uni-list-item>
		<uni-list-item title="生日"></uni-list-item>
		<divider />
		<uni-list-item title="修改密码"></uni-list-item>
		<uni-list-item title="密保手机"></uni-list-item>
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>