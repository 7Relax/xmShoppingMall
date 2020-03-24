<template>
	<view style="background: #F5F5F5;">
		<!-- 选择卡 -->
		<view class="bg-white d-flex a-center fond-md text-muted border-top border-bottom border-light-secondary">
			<view class="flex-1 d-flex j-center a-center py-2" v-for="(item, index) in tabBar" :key="index" 
				:class="tabIndex === index ? 'tabActive' : '' " @tap="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		
		<!-- 订单列表 -->
		<block v-for="(tab, tabI) in tabBar" :key="tabI">
			<view class="position-relative p-1" v-show="tabIndex === tabI" style="min-height: 440rpx;">
				<template v-if="tab.list.length > 0">
					<!-- 订单 -->
					<block v-for="(item, index) in tab.list" :key="index">
						<order-list :item="item" :index="index"></order-list>
					</block>
				</template>
				<template v-else>
					<!-- 无 -->
					<no-thing :icon="tab.no_thing" :msg="tab.msg"></no-thing>
				</template>
			</view>
		</block>
		
		<!-- 为你推荐 -->
		<view class="text-center font-md font-weight main-text-color mt-5">为你推荐</view>
		<view class="position-relative d-flex j-center a-center text-secondary mb-3">
			<view class="px-3" style="background-color: #F5F5F5; z-index: 2;">买的人还买了</view>
			<view class="position-absolute" style="background-color: #DDDDDD; height: 2rpx; left: 0; right: 0;"></view>
		</view>
		<view class="row j-sb bg-white">
			<common-list v-for="(item, index) in hotList" :key="index" :item="item"></common-list>
		</view>
	</view>
</template>

<script>
	import CommonList from "@/components/common/common-list.vue"
	import NoThing from "@/components/common/no-thing.vue"
	import OrderList from "@/components/order/order-list.vue"
	export default {
		components: {
			CommonList,
			NoThing,
			OrderList
		},
		data() {
			return {
				tabIndex: 0, 
				tabBar: [
					{
						name: '全部', 
						no_thing: 'no_pay' ,
						msg: '您还没有订单',
						list: [
							{
								createTime: "2020-03-20 16:20",
								status: "已发货",
								order_items: [
									{ cover: "/static/images/demo/demo6.jpg", title: "小米8", price: "1999.00", attrs: "金色 标配", num: 1}
								],
								totalNum: 3,
								totalPrice: 3999.00
							},
							{
								createTime: "2020-03-20 16:20",
								status: "已发货",
								order_items: [
									{ cover: "/static/images/demo/demo6.jpg", title: "小米8", price: "1999.00", attrs: "金色 标配", num: 1}
								],
								totalNum: 3,
								totalPrice: 3999.00
							}
						]
					},
					{ name: '待付款', no_thing: 'no_pay', msg: '您还没有待付款订单', list: [] },
					{ name: '待收货', no_thing: 'no_receiving', msg: '您还没有待收货订单', list: [] },
					{ name: '待评价', no_thing: 'no_comment', msg: '您还没有待评价订单', list: [] }
				],
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
					},{
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
					},{
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
		methods: {
			changeTab(index) {
				this.tabIndex = index;
			}
		}
	}
</script>

<style>
.tabActive {
	border-bottom: 5rpx solid #FD6801;
	color: #FD6801;
	margin-bottom: -5rpx;
}
</style>
