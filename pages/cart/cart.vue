<template>
	<view style="background: #F5F5F5;">
		<uni-nav-bar :right-text="isEdit ? '完成' : '编辑' " 
			title="购物车" fixed statusBar @clickRight=" isEdit = ! isEdit ">
		</uni-nav-bar>
		<!-- 购物车为空 -->
		<!-- <view class="py-5 d-flex a-center j-center bg-white border">
			<view class="iconfont icon-gouwuche text-light-muted" style="font-size: 50rpx;"></view>
			<text class="text-light-muted mx-2">购物车什么都没有哦</text>
			<view class="px-2 py-1 border border-light-secondary rounded" hover-class="bg-light-secondary">
				逛一逛
			</view>
		</view> -->
		<!-- 购物车商品列表 -->
		<view class="bg-white px-2">
			<!-- 列表 -->
			<view class="d-flex a-center py-3 border-bottom border-light-secondary" v-for="(item, index) in list" :key="index">
				<!-- flex-shrink: 0 - 防止被挤压变形 -->
				<label class="radio d-flex a-center j-center flex-shrink" style="width: 80rpx; height: 80rpx;">
					<radio :value="item.id" color="#FD6801"></radio>
				</label>
				<image :src="item.cover" mode="widthFix" 
					style="width: 150rpx; height: 150rpx;"
					class="p-2 border border-light-secondary rounded flex-shrink">
				</image>
				<!-- flex-1 - 占满剩余空间（独占） -->
				<view class="flex-1 d-flex flex-column pl-2">
					<view class="text-dark" style="font-size: 35rpx;">{{item.title}}</view>
					<view class="d-flex text-light-muted mb-1">
						<text class="mr-1" v-for="(attr, attrIndex) in item.attrs" :key="attrIndex">{{attr.list[attr.selected].name}}</text>
					</view>
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
	
		<!-- 合计 -->
		<!-- align-items: stretch; - y轴方向填充满 -->
		<view class="d-flex a-center position-fixed left-0 right-0 bottom-0 border-top border-light-secondary a-stretch"
			style="height: 100upx; z-index: 100;"
		>
			<label class="radio d-flex a-center j-center flex-shrink" style="width: 120rpx;">
				<radio value="1" color="#FD6801"></radio>
			</label>
			<view class="flex-1 d-flex a-center j-center font-md">
				合计 <price>366</price>
			</view>
			<view class="flex-1 d-flex a-center j-center main-bg-color text-white font-md" hover-class="main-bg-hover-color">
				结算
			</view>
		</view>
	</view>
</template>

<script>
	import UniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue";
	import Price from "@/components/common/price.vue";
	import UniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue";
	export default {
		components: {
			UniNavBar,
			Price,
			UniNumberBox
		},
		data() {
			return {
				isEdit: false,
				list: [
					{
						checked: false,
						id: '1',
						title: "商品标题111",
						cover: "/static/images/demo/list/1.jpg",
						// 当前的商品属性
						attrs: [
							{
								title: "颜色",
								selected: 0,
								list: [
									{ name: "火焰红" },
									{ name: "炭黑" },
									{ name: "冰川蓝" }
								]
							}, {
								title: "容量",
								selected: 1,
								list: [
									{ name: "64GB" },
									{ name: "128GB" }
								]
							}, {
								title: "套餐",
								selected: 2,
								list: [
									{ name: "标配" },
									{ name: "套餐一" },
									{ name: "套餐二" }
								]
							}
						],
						pPrice: 3699,
						num: 1, // 选中的数量
						minNum: 1,
						maxNum: 10
					}
				]
			}
		},
		onLoad() {
			console.log(JSON.stringify(this.$store.state))
			console.log(JSON.stringify(this.$store.state.cart))
		},
		methods: {
			changeNum(e, item, index) {
				item.num = Number(e);
			}
		}
	}
</script>

<style>
</style>