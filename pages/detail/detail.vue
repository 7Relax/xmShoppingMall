<template>
	<view>
		<!-- 商品详情大图 -->
		<swiper-image :swiperData="banners" height="750" preview /> 
		
		<!-- 基础详情 -->
		<base-info :detail="detail" :showPrice="showPrice"/>
		
		<!-- 滚动商品特性 w170 * h110 -->
		<scroll-attrs :baseAttrs="baseAttrs" />
		
		<!-- 属性选择 -->
		<view class="p-2">
			<view class="rounded border bg-light-secondary">
				<uni-list-item @click="show('attr')">
					<view class="d-flex">
						<text class="mr-2 text-muted">已选</text>
						<text>火焰红 64G 标配</text>
					</view>
				</uni-list-item>
				<uni-list-item @click="show('express')">
					<view class="d-flex">
						<text class="mr-2 text-muted">配送</text>
						<text class="mr-2">北京 东城区</text>
						<text class="main-text-color font">现配</text>
					</view>
				</uni-list-item>
				<uni-list-item extraWidth="5%" @click="show('service')">
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
		
		<!-- 横向滚动评论 外层图片：w620 * h380，头像：w70 * h70，图片：h115 -->
		<scroll-comments :comments="comments" />
		
		<!-- 商品详情 -->
		<view class="py-4">
			<uParse className="uParse" :content="context" @preview="preview" @navigate="navigate"/>
		</view>
		
		<!-- 热门推荐 -->
		<card headTitle="热门推荐" :headTitleWeight="false" :headBorderBottom="false">
			<view class="row j-sb">
				<common-list v-for="(item, index) in hotList" :key="index" :item="item"></common-list>
			</view>
		</card>
		
		<!-- 底部操作条 -->
		<bottom-btn @show="show('attr')" />
		
		<!-- 属性筛选框 -->
		<common-popup :popupClass="popup.attr" @hide="hide('attr')">
			<!-- 商品信息（275rpx）图片180*180 -->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="/static/images/demo/list/1.jpg" mode="widthFix" 
					style="width: 180rpx; height: 180rpx;" class="border rounded"></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">3369</price>
					<text class="d-block">
						火焰红 64GB 标配
					</text>
				</view>
			</view>
			
			<!-- 表单部分（660rpx） -->
			<scroll-view scroll-y class="w-100" style="height: 660rpx;">
				<card :headTitle="item.title" :headTitleWeight="false" :headBorderBottom="false"
					v-for="(item, index) in selects" :key="index"
				>
					<zcm-radio-group :label="item" :selected.sync="item.selected"></zcm-radio-group>
				</card>
				<!-- 购买数量 -->
				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<uni-number-box :min="1" :value="detail.num" @change="detail.num = $event"></uni-number-box>
				</view>
			</scroll-view>
			
			<!-- 按钮（100rpx） -->
			<view class="d-flex main-bg-color font-md a-center j-center text-white mt-2" hover-class="main-bg-hover-color"
				style="height: 100rpx; margin-left: -30rpx; margin-right: -30rpx;" @tap.stop="addCart"
			>
				加入购物车
			</view>
		</common-popup>
		
		<!-- 收货地址 -->
		<common-popup :popupClass="popup.express" @hide="hide('express')">
			<!-- 275 + 660 = 935, 935 - 100(标题) = 835 -->
			<view class="d-flex a-center j-center font-md border-bottom border-light-secondary" style="height: 100rpx;">收货地址</view>
			
			<!-- scroll-view -->
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<uni-list-item v-for="(item, index) in addressList" :key="index">
					<view class="iconfont icon-dingwei font-weight font-md">{{item.name}}</view>
					<view class="font text-light-muted">
						{{item.address}} {{item.detailAddr}}
					</view>
				</uni-list-item>
			</scroll-view>
			
			<!-- 按钮（100rpx） -->
			<view class="d-flex main-bg-color font-md a-center j-center text-white" hover-class="main-bg-hover-color"
				style="height: 100rpx; margin-left: -30rpx; margin-right: -30rpx;" @tap.stop="openCreateAddress"
			>
				选择新地址
			</view>
		</common-popup>
		
		<!-- 服务说明 -->
		<common-popup :popupClass="popup.service" @hide="hide('service')">
			<!-- 标题 -->
			<view class="d-flex a-center j-center font-md border-bottom border-light-secondary" 
				style="height: 100rpx;">服务说明</view>
			
			<!-- scroll-view -->
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<view class="py-1">
					<view class="d-flex a-center">
						<view class="iconfont icon-finish main-text-color mr-1"></view>
						小米自营
					</view>
					<text class="text-light-muted font pl-4">
						包邮包邮，今天包邮哦
					</text>
				</view>
			</scroll-view>
			
			<!-- 按钮（100rpx） -->
			<view class="d-flex main-bg-color font-md a-center j-center text-white" hover-class="main-bg-hover-color"
				style="height: 100rpx; margin-left: -30rpx; margin-right: -30rpx;" @tap.stop="hide('service')"
			>
				确定
			</view>
		</common-popup>
		
	</view>
</template>

<script>
	import SwiperImage from "@/components/index/swiper-image.vue";
	import BaseInfo from "@/components/detail/base-info.vue";
	import ScrollAttrs from "@/components/detail/scroll-attrs.vue";
	import UniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue";
	import ScrollComments from "@/components/detail/scroll-comments.vue";
	import uParse from "@/components/uni-ui/uParse/src/wxParse.vue";
	import Card from "@/components/common/card.vue";
	import CommonList from "@/components/common/common-list.vue";
	import BottomBtn from "@/components/detail/bottom-btn.vue";
	import CommonPopup from "@/components/common/common-popup.vue";
	import Price from "@/components/common/price.vue";
	import ZcmRadioGroup from "@/components/common/radio-group.vue";
	import UniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue";
	import { mapState, mapMutations } from 'vuex';
	var htmlString = `
		<p>
			<img src="https://i8.mifile.cn/v1/a1/9c3e29dc-151f-75cb-b0a5-c423a5d13926.webp">
			<img src="https://i8.mifile.cn/v1/a1/f442b971-379f-5030-68aa-3b0accb8c2b9.webp">
			<img src="https://i8.mifile.cn/v1/a1/63b700b6-643e-ec18-fdf3-da66b4b4173f.webp">
			<img src="https://i8.mifile.cn/v1/a1/e9dbf276-193e-11c4-99a6-3097fde82350.webp">
			<img src="https://i8.mifile.cn/v1/a1/1249d3ee-2990-a2b4-28d9-f719c2417b1f.webp">
			<img src="https://i8.mifile.cn/v1/a1/97c79915-64b2-808c-53b4-4345652a179f.webp">
			<img src="https://i8.mifile.cn/v1/a1/cd0fbe1e-a1b3-a87a-f4a6-6fb08ec54931.webp">
		</p>
		    `
	export default {
		components: {
			SwiperImage,
			BaseInfo,
			ScrollAttrs,
			UniListItem,
			ScrollComments,
			uParse,
			Card,
			CommonList,
			BottomBtn,
			CommonPopup,
			Price,
			ZcmRadioGroup,
			UniNumberBox
		},
		// 监听页面返回事件
		onBackPress() {
			// 遍历对象里的key
			for (let key in this.popup) {
				if (this.popup[key] !== 'none') { // 说明模态框处理show状态
					this.hide(key);
					return true;
				}
			}
		},
		data() {
			return {
				selects: [],
				popup: {
					attr: 'none',
					express: 'none',
					service: 'none'
				},
				banners: [],
				detail: {
					id: '2008',
					title: '小米MIX3 6GB+12GB',
					cover: "/static/images/demo/list/4.jpg",
					desc: '磁动力滑盖全面屏 / 前后旗舰AI双摄 / 四曲面彩色陶瓷机身 / 高效10W无线充电',
					pPrice: 3299,
					num: 1,
					max: 100
				},
				baseAttrs: [],
				context: '',
				comments: [],
				hotList: []
			}
		},
		onLoad(e) {
			if (e.detail) {
				this.__init( JSON.parse(e.detail) );
			}
		},
		computed: {
			...mapState({
				addressList: state => state.address.list
			}),
			showPrice() {
				return this.detail.min_price || 0.00
			}
		},
		methods: {
			...mapMutations([
				'addCartFromDetail'
			]),
			// 初始化页面
			__init(data) {
				console.log(data.id);
				this.$H.get('/goods/'+data.id).then(res => {
					console.log(res);
					// 轮播图
					this.banners = res.goodsBanner.map(v => {
						return {
							src: v.url
						} 
					})
					// 初始化基本信息
					this.detail = res;
					// 修改页面标题
					uni.setNavigationBarTitle({
						title: res.title
					})
					// 滚动商品属性
					this.baseAttrs = res.goodsAttrs.map(v => {
						return	{
							icon: 'icon-cpu',
							name: v.name,
							desc: v.value
						}
					});
					// 热门评论
					this.comments = res.hotComments.map(v => {
						return {
							id: v.id, 
							userId: v.user_id,
							userPic: v.user.avatar,
							username: v.user.nickname,
							createTime: v.review_time,
							praiseNum: v.rating,
							context: v.review.data,
							picList: v.review.image
						}
					})
					// 商品详情
					this.context = res.content;
					// 热门推荐
					this.hotList = res.hotList.map(v => {
						return {
							cover: v.cover,
							title: v.title,
							desc: v.desc,
							pprice: v.min_price,
							oprice: v.min_oprice
						}
					})
					// 商品规格
					this.selects = res.goodsSkusCard.map(v => {
						let list = v.goodsSkusCardValue.map(obj => {
							return {
								id: obj.id,
								name: obj.value
							}
						})
						return {
							id: v.id,
							selected: 0,
							title: v.name,
							list: list
						}
					})
				});
			},
			// 加入购物车
			addCart() {
				// 组装数据（模拟）
				var product = this.detail;
				product['checked'] = false;
				product['attrs'] = this.selects;
				// 加入购物车
				this.addCartFromDetail(product);
				// 隐藏筛选框
				this.hide('attr');
				// 加入成功
				uni.showToast({
					title: '加入成功'
				});
			},
			// 打开新增地址页面
			openCreateAddress() {
				uni.navigateTo({
					url: '/pages/user-address-edit/user-address-edit'
				});
				// 关闭
				this.hide('express');
			},
			event() {
				console.log("点击了轮播图")
			},
			preview(src, e) {
				console.log("src: ", src);
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				uni.showModal({
					content: "点击的链接为：" + href,
					showCancel: false
				})
			},
			show(key) {
				this.popup[key] = "show";
			},
			hide(key) {
				console.log("hide ...")
				this.popup[key] = "hide";
				setTimeout( () => {
					this.popup[key] = "none";
				}, 200);
			}
		}
	}
</script>

<style>
.uParse p { padding: 0 !important; }
.uParse view { line-height: 0 !important; }
</style>