<template>
	<view class="animated fadeIn faster" style="background: #F5F5F5;">
		
		<!-- 提高用户体验 -->
		<loading-plus v-if="beforeReady" />
		
		<uni-nav-bar :right-text="isEdit ? '完成' : '编辑' " 
			title="购物车" fixed statusBar @clickRight=" isEdit = ! isEdit ">
		</uni-nav-bar>
		<!-- 购物车为空 -->
		<view class="py-5 d-flex a-center j-center bg-white" v-if="disableSelectAll">
			<view class="iconfont icon-gouwuche text-light-muted" style="font-size: 50rpx;"></view>
			<text class="text-light-muted mx-2">购物车什么都没有哦</text>
			<view class="px-2 py-1 border border-light-secondary rounded" hover-class="bg-light-secondary">
				逛一逛
			</view>
		</view>
		<!-- 购物车商品列表 -->
		<view class="bg-white px-2" v-else>
			<!-- 列表 -->
			<view class="d-flex a-center py-3 border-bottom border-light-secondary" v-for="(item, index) in list" :key="index">
				<!-- flex-shrink: 0 - 防止被挤压变形 -->
				<label class="radio d-flex a-center j-center flex-shrink" style="width: 80rpx; height: 80rpx;" @click="selectItem(index)">
					<radio color="#FD6801" :value="item.id" :checked="item.checked"></radio>
				</label>
				<image :src="item.cover" mode="widthFix" 
					style="width: 150rpx; height: 150rpx;"
					class="p-2 border border-light-secondary rounded flex-shrink">
				</image>
				<!-- flex-1 - 占满剩余空间（独占） -->
				<view class="flex-1 d-flex flex-column pl-2">
					<!-- 商品名 -->
					<view class="text-dark" style="font-size: 35rpx;">{{item.title}}</view>
					<!-- 规格属性 -->
					<view class="d-flex text-light-muted mb-1" v-if="isEdit" @tap.stop="doShowPopup(index)" :class="isEdit ? 'p-1 bg-light-secondary mb-2 a-center' : '' ">
						<text class="mr-1" v-for="(attr, attrIndex) in item.attrs" :key="attrIndex">{{attr.list[attr.selected].name}}</text>
						<view class="iconfont icon-bottom font ml-auto" v-if="isEdit"></view>
					</view>
					<view class="d-flex text-light-muted mb-1" v-else>
						<text class="mr-1" v-for="(attr, attrIndex) in item.attrs" :key="attrIndex">{{attr.list[attr.selected].name}}</text>
						<view class="iconfont icon-bottom font ml-auto" v-if="isEdit"></view>
					</view>
					
					<!-- 价格 -->
					<view class="mt-auto d-flex j-sb a-center">
						<price>{{item.pPrice}}</price>
						<!-- align-self: flex-end - 处于垂直方向的底部 -->
						<view class="a-self-end">
							<uni-number-box :min="item.minNum" :max="item.maxNum" :value="item.num"
								@change="changeNum($event, item, index)"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 为你推荐 -->
		<view class="text-center font-md font-weight main-text-color mt-5">为你推荐</view>
		<view class="position-relative d-flex j-center a-center text-secondary mb-3">
			<view class="px-3" style="background-color: #F5F5F5; z-index: 2;">买的人还买了</view>
			<view class="position-absolute" style="background-color: #DDDDDD; height: 2rpx; left: 0; right: 0;"></view>
		</view>
		<view class="row j-sb bg-white">
			<common-list v-for="(item, index) in hotList" :key="index" :item="item"></common-list>
		</view>
	
		<!-- 合计 -->
		<!-- 占位 -->
		<view style="height: 100rpx;"></view>
		<!-- align-items: stretch; - y轴方向填充满 -->
		<view class="d-flex a-center position-fixed left-0 right-0 bottom-0 border-top border-light-secondary a-stretch bg-white"
			style="height: 100rpx; z-index: 2000;"
		>
			<label class="radio d-flex a-center j-center flex-shrink" style="width: 120rpx;" @click="doSelectAll">
				<radio color="#FD6801" :checked="checkedAll" :disabled="disableSelectAll"></radio>
			</label>
			<template v-if=" !isEdit ">
				<view class="flex-1 d-flex a-center j-center font-md">
					合计 <price>{{totalPrice}}</price>
				</view>
				<view class="flex-1 d-flex a-center j-center main-bg-color text-white font-md"
					hover-class="main-bg-hover-color" @tap="orderConfirm">结算
				</view>
			</template>
			<template v-else>
				<view class="flex-1 d-flex a-center j-center font-md main-bg-color text-white">移入收藏</view>
				<view class="flex-1 d-flex a-center j-center bg-danger font-md text-white" 
					hover-class="main-bg-hover-color" @click="doDelProduct">删除</view>
			</template>
		</view>
		
		<!-- 属性筛选框 -->
		<common-popup :popupClass="popupShow" @hide="doHidePopup">
			<!-- 商品信息（275rpx）图片180*180 -->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="/static/images/demo/list/1.jpg" mode="widthFix" 
					style="width: 180rpx; height: 180rpx;" class="border rounded"></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">3369</price>
					<view class="d-block">
						<!-- 火焰红 64GB 标配 -->
						<text class="mr-1" v-for="(attr, attrIndex) in popupData.attrs" :key="attrIndex">{{attr.list[attr.selected].name}}</text>
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
		
	</view>
</template>

<script>
	import loading from "@/common/mixin/loading.js";
	import UniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue";
	import Price from "@/components/common/price.vue";
	import UniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue";
	import CommonPopup from "@/components/common/common-popup.vue";
	import Card from "@/components/common/card.vue";
	import ZcmRadioGroup from "@/components/common/radio-group.vue";
	import CommonList from "@/components/common/common-list.vue";
	import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
	export default {
		mixins: [loading],
		components: {
			UniNavBar,
			Price,
			UniNumberBox,
			CommonPopup,
			Card,
			ZcmRadioGroup,
			CommonList
		},
		data() {
			return {
				isEdit: false,
				hotList: [
					{
						cover: "/static/images/demo/list/4.jpg",
						title: "米家空调",
						desc: "1.5匹变频",
						pPrice: 1399,
						oPrice: 3699
					},{
						cover: "/static/images/demo/list/4.jpg",
						title: "米家空调2",
						desc: "1.5匹变频2",
						pPrice: 1399,
						oPrice: 3699
					}
				]
			}
		},
		computed: {
			...mapState({
				list: state => state.cart.list,
				popupShow: state => state.cart.popupShow
			}),
			...mapGetters([
				'checkedAll', 
				'totalPrice',
				'disableSelectAll',
				'popupData'
			])
		},
		methods: {
			...mapActions([
				'doSelectAll',
				'doDelProduct',
				'doShowPopup',
				'doHidePopup'
			]),
			...mapMutations([
				'selectItem'
			]),
			changeNum(e, item, index) {
				item.num = Number(e);
			},
			// 订单结算
			orderConfirm() {
				uni.navigateTo({
					url: '/pages/order-confirm/order-confirm'
				});
			}
		}
	}
</script>

<style>
</style>