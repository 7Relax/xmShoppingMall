<template>
	<view>
		<!-- #ifdef MP -->
		<!-- 自定义导航栏 -->
		<view class="d-flex a-center" style="height: 90rpx;">
			<!-- 左边 -->
			<view class="d-flex j-center a-center" style="width: 85rpx;">
				<text class="iconfont icon-xiaoxi"></text>
			</view>
			<!-- 中间 -->
			<view class="flex-1 bg-light rounded d-flex a-center text-light-muted" style="height: 65rpx;">
				<text class="iconfont icon-sousuo mx-2"></text>
				智能积木
			</view>
			<!-- 右边 -->
			<view class="d-flex j-center a-center" style="width: 85rpx;">
				<text class="iconfont icon-richscan_icon"></text>
			</view>
		</view>
		<!-- #endif -->
		
		<!-- 顶部选项卡 -->
		<!-- 注意scroll-into-view的值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素 -->
		<scroll-view scroll-x class="scroll-row border-bottom"
			style="height: 80rpx;" :scroll-into-view="scrollInfo" scroll-with-animation
		>
			<view v-for="(item, index) in tabBars" :key="index" class="scroll-row-item px-3" @click="changeTab(index)"
				style="height: 80rpx; line-height: 80rpx;"
				:class=" tabIndex === index ? 'main-text-color' : '' "
				:id="'tab'+index">
				<text class="font-md">{{item.name}}</text>
			</view>
		</scroll-view>
		
		<!-- swiper -->
		<!-- 注意：从onLoad文中获取的scrollHeight的单位是px -->
		<swiper :duration="150" :current="tabIndex" :style="'height: '+scrollHeight+'px;'" @change="onChangeTab">
			<swiper-item v-for="(item, index1) in newsItems" :key="index1" >
				<!-- swiper里面再加一个scroll-view 这样用户体验会比较好，注意scroll-view要给高度才能上下滚动 -->
				<scroll-view scroll-y="true" :style="'height: '+scrollHeight+'px;'" @scrolltolower="loadMore(index1)">
					
					<template v-if="item.data.length > 0">
						<block v-for="(dataObj, index2) in item.data" :key="index2">
							<!-- 轮播图组件 -->
							<swiper-image v-if=" dataObj.type == 'swiper' " :swiperData="dataObj.data" preview />
							
							<!-- 首页图标分类组件 -->
							<template v-else-if=" dataObj.type == 'indexnavs' ">
								<index-nav :indexNavs="dataObj.data"/>
								<divider/>
							</template>
							
							<!-- 三图广告 -->
							<template v-else-if=" dataObj.type == 'threeAdv' ">
								<three-adv :threeAdv="dataObj.data"/>
								<divider></divider>
							</template>
							
							<!-- 大图广告 -->
							<!-- <one-adv v-if="dataObj.type ==='oneAdv'" :item="dataObj.data" /> -->

							<!-- 公共列表 750 - 5 = 745, 745/2 = 372.5 -->
							<view class="row j-sb" v-else-if=" dataObj.type == 'list' ">
								<block v-for="(item, index3) in dataObj.data" :key="index3">
									<common-list :item="item"></common-list>
								</block>
							</view>
						</block>
						
						<!-- 上拉加载更多 -->
						<view class="d-flex a-center j-center text-light-muted font-md py-3">
							{{item.loadingText}}
						</view>
					</template>
					<!-- 加载中 -->
					<template v-else-if="item.firstLoad === 'before' || item.firstLoad === 'ing'">
						<view class="d-flex j-center a-center">
							<text class="text-light-muted font-md mt-5">加载中...</text>
						</view>
					</template>
					<!-- 空数据 -->
					<template v-else>
						<view class="d-flex j-center a-center pt-5">
							<text class="font-md text-light-muted">暂无数据</text>
						</view>
					</template>
					
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import swiperImage from "@/components/index/swiper-image.vue";
	import indexNav from "@/components/index/index-nav.vue";
	import threeAdv from "@/components/index/three-adv.vue";
	import oneAdv from "@/components/index/one-adv.vue";
	import card from "@/components/common/card.vue";
	import commonList from "@/components/common/common-list.vue";
	export default {
		components: {
			swiperImage,
			indexNav,
			threeAdv,
			oneAdv,
			card,
			commonList
		},
		data() {
			return {
				scrollInfo: "",
				scrollHeight: 500,
				tabIndex: 0,
				tabBars: [],
				newsItems: [],
				dataObj: {},
			}
		},
		onLoad() {
			// 获取可视区域高度
			uni.getSystemInfo({
				success: (res) => {
					// 默认不是小程序端
					let navbarH = 0;
					
					/* 如果是 小程序 端 */
					// #ifdef MP
					navbarH = uni.upx2px(90);
					// #endif
					
					// 注意res.windowHeight拿到的值是px
					this.scrollHeight = res.windowHeight - uni.upx2px(82) - navbarH;
				}
			})
			// 初始化
			this.__init();
		},
		methods: {
			async __init() {
				console.log("index >> __init ...");
				this.$H.get('/index_category/data').then(data => {
					console.log(data);
					// 初始化tabBars
					this.tabBars = data.category;
					// 初始化页面
					this.newsItems = this.setNewsItems(data);
				});
			},
			// 初始化首页
			setNewsItems(e) {
				let arr = [];
				// 拿到tabBars的长度，根据长度生成页面
				for (var i=0; i<this.tabBars.length; i++) {
					// 设置首屏已经加载完成
					let firstLoad = i === 0 ? 'after' : 'before';
					// 模板
					let itemObj = {
						// 1.上拉加载更多 2.加载中... 3.没有更多了
						loadingText: '上拉加载更多',
						// 首次加载：before加载前，after加载后，ing加载中
						firstLoad: firstLoad,
						data: [] ,// 当前页面所有数据
					}; 
					// 首屏初始化数据
					if (this.tabBars[i].template === 'index') {
						itemObj.data = e.data;
					}
					arr.push(itemObj);
				}
				console.log("arr = ", arr);
				return arr;
			},
			// 监听滑动列表
			onChangeTab(e) {
				this.changeTab(e.detail.current);
			},
			// 切换选项卡
			changeTab(index) {
				// tabIndex：切换前的，index：准备要切换的
				if (this.tabIndex === index) {
					// 防止重复点击
					return;
				}
				// 记录索引值
				this.tabIndex = index;
				// 联动
				this.scrollInfo = "tab"+index;
				// 判断是否首次加载数据
				if (this.newsItems[index].firstLoad === 'after') {
					return;
				}
				// 加载数据
				this.loadData();
			},
			// 加载数据/刷新数据
			async loadData(callback = false) {
				// 拿到当前索引（申明变量e接收是为了防止用户滑动太快）
				let e = this.tabIndex;
				let obj = this.newsItems[e];
				// 拿到当前分类id
				let id = this.tabBars[e].id;
				// 拿到当前分类的分页数page
				let page = Math.ceil(obj.data.length / 5) + 1;
				console.log("id = ",id, ", page =",page);
				// 请求中
				if (page === 1) {
					obj.firstLoad = 'ing';
				}
				// 请求数据
				let data = await this.$H.get('/index_category/'+id+'/data/'+page);
				console.log(data);
				// 请求完
				if (page === 1) {
					obj.firstLoad = 'after';
				}
				// 成功
				if (data) {
					// 赋值
					obj.data = [...obj.data, ...data];
					// 没有更多了
					obj.loadingText = data.length < 5 ? '没有更多了' : '上拉加载更多';
				} else {
					// data出错
					obj.loadingText = '上拉加载更多';
				}
				// 执行回调
				if (typeof callback == 'function') {
					// 执行回调函数
					callback();
				}
			},
			// 上拉加载更多
			loadMore(index) {
				// 是否处于可加载状态 
				let obj = this.newsItems[index];
				if (obj.loadingText !== "上拉加载更多") {
					return;
				}
				obj.loadingText = "加载中...";
				// 加载数据
				this.loadData(() => {
					uni.showToast({ title: '加载成功', icon: 'none' });
				});
			},
		}
	}
</script>

<style>
</style>