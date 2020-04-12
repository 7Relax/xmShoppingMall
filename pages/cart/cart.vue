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
					<view class="d-flex text-light-muted mb-1" v-if="isEdit && item.skus_type === 1" @tap.stop="showPopup(index, item)"
						:class="isEdit ? 'p-1 bg-light-secondary mb-2 a-center' : '' ">
						<!-- 为了减轻后台压力，这里的skusText是后台直接处理好的规格，如：黄色、标配
							 这样就不需要向后台请求大量的规格数据，只有当用户在购物车列表想要去编辑商品的时候才向后台请求规格数据（一般用户已经在商品详情页选好了，一般不会在购物车列表里改） -->
						<!-- {{item.skusText}} -->
						
						<!-- 下面就是拿全部的规格数据 -->
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
		<sku-popup></sku-popup>
		
	</view>
</template>

<script>
	import loading from "@/common/mixin/loading.js";
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue";
	import price from "@/components/common/price.vue";
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue";
	import commonList from "@/components/common/common-list.vue";
	import skuPopup from "@/components/cart/sku-popup.vue";
	import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
	export default {
		mixins: [loading],
		components: {
			uniNavBar,
			price,
			uniNumberBox,
			commonList,
			skuPopup
		},
		data() {
			return {
				isEdit: false,
				hotList: [
					// {
					// 	cover: "/static/images/demo/list/4.jpg",
					// 	title: "米家空调",
					// 	desc: "1.5匹变频",
					// 	pprice: 1399,
					// 	oprice: 3699
					// },{
					// 	cover: "/static/images/demo/list/4.jpg",
					// 	title: "米家空调2",
					// 	desc: "1.5匹变频2",
					// 	pprice: 1399,
					// 	oprice: 3699
					// }
				]
			}
		},
		onLoad() {
			this.getData();
		},
		beforeDestroy() {
			// TODO 已不在cart.vue中监听了
			uni.$off('updateCart');
		},
		onPullDownRefresh() {
			// 一旦触发下拉刷新就会执行getData
			this.getData();
		},
		computed: {
			...mapState({
				list: state => state.cart.list,
				selectedList: state => state.cart.selectedList
			}),
			...mapGetters([
				'checkedAll', 
				'totalPrice',
				'disableSelectAll'
			])
		},
		methods: {
			...mapActions([
				'doSelectAll',
				'doDelProduct',
				'doShowPopup',
				'updateCartList'
			]),
			...mapMutations([
				'selectItem',
				'initCartList'
			]),
			// 获取数据
			getData() {
				// 刷新购物车列表
				this.updateCartList().then(res => {
					console.log(res);
					// 停止下拉刷新
					uni.stopPullDownRefresh();
				}).catch(err => {
					uni.stopPullDownRefresh(); 
				})
				// 获取热门推荐
				this.$H.get('/goods/hotlist').then(res => {
					this.hotList = res.map(v => {
						return {
							id: v.id, 
							cover: v.cover,
							title: v.title,
							desc: v.desc,
							pprice: v.min_price,
							oprice: v.min_oprice
						}
					})
				})
			},
			changeNum(e, item, index) {
				// 判断此时购物车商品的选中数量num 是否等于即将改变后的数量，相等则表示是刚进入页面，不是用户改变的
				if (item.num === e) { console.log("item.num === e"); return; }
				uni.showLoading({
					title: '加载中...'
				})
				// 同步数据库
				this.$H.post('/cart/updatenumber/'+item.id, {
					num: e
				}, {
					token: true
				}).then(res => {
					console.log(res);
					// 成功后再修改视图
					item.num = Number(e);
					// 隐藏loading
					uni.hideLoading(); 
				})
			},
			// 点击规格
			showPopup(index, item) {
				// 获取购物车商品SKU
				this.$H.get('/cart/'+item.id+'/sku', {}, {
					token: true
				}).then(res => {
					// 拿到数据后，则初始化sku-popup
					console.log(res);
					this.doShowPopup({
						index,
						data: res
					});
				})
			},
			// 订单结算
			orderConfirm() {
				if (this.selectedList.length < 0) {
					return uni.showToast({
						 'title': '请选择要结算的商品',
						 'icon': 'none'
					})
				}
				uni.navigateTo({
					url: '/pages/order-confirm/order-confirm?detail=' + JSON.stringify(this.selectedList)
				});
			}
		}
	}
</script>

<style>
</style>