<template>
	<view>
		<view class="p-2">
			<view class="mb-2 p-2 bg-white rounded" hover-class="bg-light-secondary"
				v-for="(item, index) in list" :key="index" @click="open(item)"
			>
				<view class="text-dark fond-md">{{item.title}}</view>
				<view class="fond text-light-muted">{{item.desc}}</view>
				<view class="font text-light-muted">{{item.createTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						title: 'uni-app第三季仿微信app正式上线啦',
						desc: '开启纯nvue原生渲染，大大提高性能',
						createTime: '9月份'
					},
					{
						title: 'uni-app第三季仿微信app正式上线啦',
						desc: '开启纯nvue原生渲染，大大提高性能',
						createTime: '9月份'
					},
					{
						title: 'uni-app第三季仿微信app正式上线啦',
						desc: '开启纯nvue原生渲染，大大提高性能',
						createTime: '9月份'
					}
				]
			}
		},
		methods: {
			open(item) {
				uni.navigateTo({
					url: '/pages/msg-detail/msg-detail?detail='+JSON.stringify(item)
				});
			}
		}
	}
</script>

<style>
page {
	background-color: #EEEEEE;
}
</style>