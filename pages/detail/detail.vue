<template>
	<view>
		<!-- 商品详情大图 -->
		<swiper-image :swiperData="banners" height="750" preview />
		
		<!-- 基础详情 -->
		<base-info :detail="detail" />
		
		<!-- 滚动商品特性 w170 * h110 -->
		<scroll-attrs :baseAttrs="baseAttrs"/>
		
		<!-- 属性选择 -->
		<view class="p-2">
			<view class="rounded border bg-light-secondary">
				<uni-list-item>
					<view class="d-flex">
						<text class="mr-2 text-muted">已选</text>
						<text>火焰红 64G 标配</text>
					</view>
				</uni-list-item>
				<uni-list-item>
					<view class="d-flex">
						<text class="mr-2 text-muted">配送</text>
						<text class="mr-2">北京 东城区</text>
						<text class="main-text-color font">现配</text>
					</view>
				</uni-list-item>
				<uni-list-item extraWidth="5%">
					<view class="d-flex a-center">
						<view class="d-flex text-muted font a-center">
							<view class="iconfont icon-finish main-text-color mr-2"></view>
							小米自营
						</view>
						<view class="d-flex text-muted font a-center">
							<view class="iconfont icon-finish main-text-color mx-2"></view>
							小米发货
						</view>
						<view class="d-flex text-muted font a-center">
							<view class="iconfont icon-finish main-text-color mx-2"></view>
							七天无理由退货
						</view>
					</view>
				</uni-list-item>
			</view>
		</view>
		
		<!-- 横向滚动评论 -->
		
		<!-- 商品详情 -->
	</view>
</template>

<script>
	import SwiperImage from "@/components/index/swiper-image.vue";
	import BaseInfo from "@/components/detail/base-info.vue";
	import ScrollAttrs from "@/components/detail/scroll-attrs.vue";
	import UniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue";
	export default {
		components: {
			SwiperImage,
			BaseInfo,
			ScrollAttrs,
			UniListItem
		},
		data() {
			return {
				banners: [
					{ src: '/static/images/demo/demo11.jpg'},
					{ src: '/static/images/demo/demo12.jpg'}
				],
				detail: {
					title: '小米MIX3 6GB+12GB',
					desc: '磁动力滑盖全面屏 / 前后旗舰AI双摄 / 四曲面彩色陶瓷机身 / 高效10W无线充电',
					pprice: 3299
				},
				baseAttrs: [
					{icon: 'icon-cpu', name: 'CPU1', desc: '绞龙845八核'},
					{icon: 'icon-cpu', name: 'CPU2', desc: '绞龙845八核'},
					{icon: 'icon-cpu', name: 'CPU3', desc: '绞龙845八核'},
					{icon: 'icon-cpu', name: 'CPU4', desc: '绞龙845八核'},
					{icon: 'icon-cpu', name: 'CPU5', desc: '绞龙845八核'},
					{icon: 'icon-cpu', name: 'CPU6', desc: '绞龙845八核'},
					{icon: 'icon-cpu', name: 'CPU7', desc: '绞龙845八核'}
				]
			}
		},
		methods: {
			event() {
				console.log("点击了轮播图")
			}
		}
	}
</script>

<style>

</style>
