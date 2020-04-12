<template>
	<common-popup :popupClass="popupShow" @hide="doHidePopup">
		<!-- 商品信息（275rpx）图片180*180 -->
		<view class="d-flex a-center" style="height: 275rpx;">
			<image src="/static/images/demo/list/1.jpg" mode="widthFix" 
				style="width: 180rpx; height: 180rpx;" class="border rounded"></image>
			<view class="pl-2">
				<price priceSize="font-lg" unitSize="font">3369</price>
				<view class="d-block">
					<!-- 火焰红 64GB 标配 -->
					<text class="mr-1" v-for="(attr, attrIndex) in popupData.attrs" 
						:key="attrIndex">{{attr.list[attr.selected].name}}</text>
				</view>
			</view>
		</view>
		
		<!-- 表单部分（660rpx） -->
		<scroll-view scroll-y class="w-100" style="height: 660rpx;">
			<card :headTitle="item.title" :headTitleWeight="false" :headBorderBottom="false"
				v-for="(item, index) in popupData.attrs" :key="index"
			>
				<zcm-radio-group :label="item" :selected.sync="item.selected"></zcm-radio-group>
			</card>
			<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
				<text>购买数量</text>
				<uni-number-box :min="1" :value="popupData.num" @change="popupData.num = $event"></uni-number-box>
			</view>
		</scroll-view>
		
		<!-- 按钮（100rpx） -->
		<view class="d-flex main-bg-color font-md a-center j-center text-white mt-2" hover-class="main-bg-hover-color"
			style="height: 100rpx; margin-left: -30rpx; margin-right: -30rpx;" @tap.stop="doHidePopup"
		>
			确定
		</view>
	</common-popup>
</template>

<script>
	import commonPopup from '@/components/common/common-popup.vue';
	import price from '@/components/common/price.vue';
	import zcmRadioGroup from "@/components/common/radio-group.vue";
	import card from "@/components/common/card.vue";
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue";
	import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
	export default {
		components: {
			commonPopup,
			price,
			zcmRadioGroup,
			card,
			uniNumberBox 
		},
		computed: {
			...mapState({
				popupShow: state => state.cart.popupShow, 
				popupData: state => state.cart.popupData // 页面上数据就要根据popupDta动态渲染了
			}),
			...mapGetters([
				// 'popupData'
			])
		},
		methods: {
			...mapActions([
				'doHidePopup'
			])
		}
	}
</script>

<style>
</style>