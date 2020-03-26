<template>
	<view>
		<divider />
		<card headTitle="申请售后的产品" cardStyle="background-color: #FFFFFF">
			<view class="d-flex a-center px-2 py-3">
				<image src="/static/images/demo/cate_03.png" style="width: 120rpx; height: 120rpx;"
					class="d-flex flex-shrink"></image>
				<view class="flex-1 d-flex flex-column ml-3">
					<view class="font-md">商品名称</view>
					<view class="font text-light-muted">维修服务：剩余125天</view>
				</view>
			</view>
		</card>
			
		<divider />
		<card headTitle="服务类型" bodyPadding cardStyle="background-color: #FFFFFF">
			<zcm-radio-group :label="label" />
		</card>
		
		<divider />
		<card headTitle="问题描述" bodyPadding cardStyle="background-color: #FFFFFF">
			<view class="position-relative">
				<textarea placeholder="请详细描述一下你遇到的问题" :maxlength="-1"
					style="width: 100%; height: 400rpx; box-sizing: border-box;" 
					class="p-2 rounded border border-light-secondary"
					v-model="content"/>
				<view class="position-absolute font" style="right: 5rpx; bottom: 5rpx;"
					:class="remain >= 0 ? 'text-light-muted' : 'text-danger' ">
					{{remain}}/{{maxLength}}
				</view>
			</view>
		</card>
		
		<view class="p-3">
			<view hover-class="main-bg-hover-color"
				class="rounded main-bg-color text-white text-center py-2 font-md">下一步
			</view>
		</view>
	</view>
</template>

<script>
	import card from "@/components/common/card.vue";
	import zcmRadioGroup from '@/components/common/radio-group.vue';
	export default {
		components: {
			card,
			zcmRadioGroup
		},
		data() {
			return {
				label: {
					selected: 0,
					list: [
						{ name: '维修' }
					]
				},
				content: '',
				maxLength: 200
			}
		},
		computed: {
			// 剩余
			remain() {
				return this.maxLength - this.content.length
			}
		},
		methods: {
			
		}
	}
</script>

<style>
page {
	background: #EEEEEE;
}
</style>