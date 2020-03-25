<template>
	<view style="background: #F5F5F5; height: 100%;" class="d-flex flex-column">
		<!-- 选择卡 -->
		<view class="bg-white d-flex a-center fond-md text-muted border-top border-bottom border-light-secondary" style="z-index: 2;">
			<view class="flex-1 d-flex j-center a-center py-2" v-for="(item, index) in tabBar" :key="index" 
				:class="tabIndex === index ? 'tabActive' : '' " @tap="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		
		<!-- 选择卡内容 -->
		<scroll-view scroll-y class="flex-1">
			<block v-for="(tab, tabI) in tabBar" :key="tabI">
				<view class="position-relative p-1" v-show="tabIndex === tabI" style="min-height: 440rpx;">
					<template v-if="tab.list.length > 0">
						<view class="p-3">
							<coupon v-for="(item, index) in tab.list" :key="index" :item="item" :index="index"></coupon>
						</view>
					</template>
					<template v-else>
						<!-- 无 -->
						<no-thing :icon="tab.no_thing" :msg="tab.msg"></no-thing>
					</template>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import noThing from "@/components/common/no-thing.vue";
	import coupon from "@/components/common/coupon.vue";
	export default {
		components: {
			noThing,
			coupon
		},
		data() {
			return {
				tabIndex: 0,
				tabBar: [
					{
						name: '可用', 
						no_thing: 'no_pay' ,
						msg: '您还没有可用的优惠券',
						list: [
							{
								title: '第三季仿微信立减100元',
								startTime: '2019-10-21',
								endTime: '2019-12-31',
								price: '100',
								desc: '满300元使用',
								status: true,   // 失效:false / 未失效:true
								disabled: false // 可用/不可用
							},
							{
								title: '第四季仿微信立减100元',
								startTime: '2019-10-21',
								endTime: '2019-12-31',
								price: '200',
								desc: '满400元使用',
								status: true,
								disabled: true
							},
							{
								title: '第五季仿微信立减100元',
								startTime: '2019-10-21',
								endTime: '2019-12-31',
								price: '300',
								desc: '满500元使用',
								status: true,
								disabled: true
							}
						]
					},
					{
						name: '已失效', 
						no_thing: 'no_pay' ,
						msg: '无失效优惠券',
						list: [
							{
								title: '第三季仿微信立减100元',
								startTime: '2019-10-21',
								endTime: '2019-12-31',
								price: '100',
								desc: '满300元使用',
								status: false,
								disabled: false
							},
							{
								title: '第四季仿微信立减100元',
								startTime: '2019-10-21',
								endTime: '2019-12-31',
								price: '200',
								desc: '满400元使用',
								status: false,
								disabled: false
							}
						]
					},
				],
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