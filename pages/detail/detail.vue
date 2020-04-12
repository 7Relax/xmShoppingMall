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
				<!-- detail.sku_type 为 0 代表单规格，1 代表多规格 -->
				<uni-list-item @click="show('attr')" v-if="detail.sku_type === 1">
					<view class="d-flex">
						<text class="mr-2 text-muted">已选</text>
						<text>{{checkedSkus}}</text>
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
		<view class="py-1">
			<uParse className="uParse" :content="context" @preview="preview" @navigate="navigate"/>
		</view>
		
		<!-- 热门推荐 -->
		<card headTitle="热门推荐" :headTitleWeight="false" :headBorderBottom="false">
			<view class="row j-sb">
				<common-list v-for="(item, index) in hotList" 
					:key="index" :item="item" type="redirectTo"></common-list>
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
					<price priceSize="font-lg" unitSize="font">{{showPrice}}</price>
					<text class="d-block">
						{{checkedSkus}}
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
					<uni-number-box :min="1" :max="maxStock" :value="detail.num" @change="detail.num = $event"></uni-number-box>
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
	import swiperImage from "@/components/index/swiper-image.vue";
	import baseInfo from "@/components/detail/base-info.vue";
	import scrollAttrs from "@/components/detail/scroll-attrs.vue";
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue";
	import scrollComments from "@/components/detail/scroll-comments.vue";
	import uParse from "@/components/uni-ui/uParse/src/wxParse.vue";
	import card from "@/components/common/card.vue";
	import commonList from "@/components/common/common-list.vue";
	import bottomBtn from "@/components/detail/bottom-btn.vue";
	import commonPopup from "@/components/common/common-popup.vue";
	import price from "@/components/common/price.vue";
	import zcmRadioGroup from "@/components/common/radio-group.vue";
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue";
	import { mapState, mapMutations } from 'vuex';
	export default {
		components: {
			swiperImage,
			baseInfo,
			scrollAttrs,
			uniListItem,
			scrollComments,
			uParse,
			card,
			commonList,
			bottomBtn,
			commonPopup,
			price,
			zcmRadioGroup,
			uniNumberBox
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
				detail: {},
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
			// 选中的skus，如：'黄色,套餐一'
			checkedSkus() {
				let arr = this.selects.map(v => {
					return v.list[v.selected].name
				})
				return arr.join(',')
			},
			// 选中的skus的索引
			checkedSkusIndex() {
				if (!Array.isArray(this.detail.goodsSkus)) {
					// this.detail.goodsSkus 还不是数组的时候（刚进入详情页）
					return -1
				}
				let index = this.detail.goodsSkus.findIndex(item => {
					return item.skusText === this.checkedSkus
				})
				return index
			},
			// 显示价格
			showPrice() {
				if (this.checkedSkusIndex < 0) {
					return this.detail.min_price || 0.00
				}
				return this.detail.goodsSkus[this.checkedSkusIndex].pprice
			},
			// 最大库存
			maxStock() {
				if (this.detail.sku_type === 0) {
					// sku_type = 0 代表单规格
					return this.detail.stock
				}
				if (!Array.isArray(this.detail.goodsSkus)) {
					return 0
				}
				return this.detail.goodsSkus[this.checkedSkusIndex].stock
			}
		},
		methods: {
			...mapMutations([
				'addCartFromDetail'
			]),
			// 初始化页面
			__init(data) {
				// 根据商品id获取商品信息
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
					
					// 多规格
					if (this.detail.sku_type === 1) {
						// 商品规格（选项部分）
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
						// 商品规格（匹配价格）
						let stoc = 3;
						this.detail.goodsSkus.forEach(item => {
							let arr = [];
							for (let key in item.skus) {
								arr.push(item.skus[key].value)
							}
							// 转成以逗号分割的字符串
							item.skusText = arr.join(',');
							// 模拟数据（由于后台返回的stock都为0）
							item.stock += stoc;
							stoc += 2;
						})
						console.log(JSON.stringify(this.detail.goodsSkus));
					}
					
				});
			},
			// 加入购物车
			addCart() {
				// 没有库存
				if (this.maxStock === 0) {
					return;
				}
				// shop_id：如果是多规格传：sku_id，单规格：商品id
				this.$H.post('/cart', {
					shop_id: this.detail.sku_type === 0 ? this.detail.id : this.detail.goodsSkus[this.checkedSkusIndex].id,
					skus_type: this.detail.sku_type,
					num: this.detail.num
				}, {
					token: true
				}). then(res => {
					// 成功后，就有一条数据添加到数据库的购物车表里了，如果购物车table里已经有这个商品，则改变商品数量
					console.log(res);
					// 通知购物车列表更新数据
					uni.$emit('updateCart');
					// 隐藏筛选框
					this.hide('attr');
					// 加入成功
					uni.showToast({
						title: '加入成功'
					});
				})
				// ------------------ test -------------------
				// 组装数据（模拟）
				// var product = this.detail;
				// product['checked'] = false;
				// product['attrs'] = this.selects;
				// // 加入购物车
				// this.addCartFromDetail(product);
				// // 隐藏筛选框
				// this.hide('attr');
				// // 加入成功
				// uni.showToast({
				// 	title: '加入成功'
				// });
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