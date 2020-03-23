<template>
	<view>
		<card :headTitle="item.label" bodyStyle="background: #FFFFFF" v-for="(item, index) in list" :key="index">
			<uni-list-item v-for="(val, listIndex) in item.value" :key="listIndex" 
				:title="val.title" @click="navigate(val.path)">
			</uni-list-item>
		</card>
		<view class="p-3">
			<button type="default" class="bg-white">退出登录</button>
		</view>
	</view>
</template>

<script>
	import Card from "@/components/common/card.vue"
	import UniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	export default {
		components: {
			Card,
			UniListItem
		},
		data() {
			return {
				list: [
					{
						label: '帐号管理',
						value: [
							{ title: '个人资料', path: '' },
							{ title: '收货地址', path: '' }
						]
					},
					{
						label: '关于',
						value: [
							{ title: '关于商城', path: '' },
							{ title: '意见反馈', path: '' },
							{ title: '协议规则', path: '' },
							{ title: '资质证件', path: '' },
							{ title: '用户协议', path: '' },
							{ title: '隐私政策', path: '' }
						]
					}
				]
			}
		},
		methods: {
			navigate(path) {
				if (!path) { return; }
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				});
			}
		}
	}
</script>

<style>
page {
	background: #EEEEEE;
}
</style>