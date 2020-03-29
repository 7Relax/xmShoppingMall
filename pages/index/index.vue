<template>
	<view>
		<!-- 顶部选项卡 -->
		<!-- 注意scroll-into-view的值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素 -->
		<scroll-view scroll-x class="scroll-row border-bottom" style="height: 80rpx;" :scroll-into-view="scrollInfo" scroll-with-animation>
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
			<swiper-item v-for="(item, index1) in dataItems" :key="index1" >
				<!-- swiper里面再加一个scroll-view 这样用户体验会比较好，注意scroll-view要给高度才能上下滚动 -->
				<scroll-view scroll-y="true" :style="'height: '+scrollHeight+'px;'" @scrolltolower="loadMore(index1)">
					<!-- block -->
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
					<view class="d-flex a-center j-center text-light-muted font-md py-3">{{item.loadText}}</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	let demo1 = {
		style: 'C', // C套带tabBar，根据tabBar头部选项卡所对应的数据来渲染页面
		tabBars: [
			{ name: "推荐" },
			{ name: "手机" },
			{ name: "智能" },
			{ name: "电视" },
			{ name: "笔记本" },
			{ name: "家电" },
			{ name: "历史" },
			{ name: "本地" }
		],
		dataItems: [
			// tab第一页数据
			{
				list: [
					{
						type: 'swiper', // type是具体的功能所需要的数据
						data: [
							{ src: "../../static/images/demo/demo4.jpg" },
							{ src: "../../static/images/demo/demo4.jpg" },
							{ src: "../../static/images/demo/demo4.jpg" }
						]
					},
					{
						type: 'indexNavs',
						data: [
							{ src: "/static/images/indexnav/1.png", text: "新品发布" },
							{ src: "/static/images/indexnav/2.gif", text: "小米众筹" },
							{ src: "/static/images/indexnav/3.gif", text: "以旧换新" },
							{ src: "/static/images/indexnav/4.gif", text: "1分拼团" },
							{ src: "/static/images/indexnav/5.gif", text: "超值特卖" },
							{ src: "/static/images/indexnav/6.gif", text: "小米秒杀" },
							{ src: "/static/images/indexnav/7.gif", text: "真心想要" },
							{ src: "/static/images/indexnav/8.gif", text: "电视热卖" },
							{ src: "/static/images/indexnav/9.gif", text: "家电热卖" },
							{ src: "/static/images/indexnav/10.gif", text: "米粉卡" }
						]
					},
					{
						type: 'threeAdv',
						data: {
							lBig: { src: "/static/images/demo/demo1.jpg" },
							rSmallTop: { src: "/static/images/demo/demo2.jpg" },
							rSmallBottom: { src: "/static/images/demo/demo2.jpg" }
						}
					},
					{
						type: 'commonList',
						data: [
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
								title: "米家空调3",
								desc: "1.5匹变频3",
								pPrice: 1399,
								oPrice: 3699
							},{
								cover: "/static/images/demo/list/4.jpg",
								title: "米家空调4",
								desc: "1.5匹变频4",
								pPrice: 1399,
								oPrice: 3699
							}
						]
					}
				]
			},
		]
	};
	let demo2 = {
		style: 'C', // C套带tabBar，根据tabBar头部选项卡所对应的数据来渲染页面
		name: 'C套商城样式',
		tabBars: [
			{ name: "推荐" },
			{ name: "体育" },
			{ name: "热点" },
			{ name: "财经" },
			{ name: "娱乐" },
			{ name: "军事" },
			{ name: "历史" },
			{ name: "本地" }
		],
		dataItems: [
			{
				list: [
					{
						type: 'swiper', // type是具体的模块需要的数据
						data: [
							{ src: "../../static/images/demo/demo4.jpg" },
							{ src: "../../static/images/demo/demo4.jpg" },
							{ src: "../../static/images/demo/demo4.jpg" }
						]
					},
					{
						type: 'indexNavs',
						data: [
							{ src: "/static/images/indexnav/1.png", text: "新品发布" },
							{ src: "/static/images/indexnav/2.gif", text: "小米众筹" },
							{ src: "/static/images/indexnav/3.gif", text: "以旧换新" },
							{ src: "/static/images/indexnav/4.gif", text: "1分拼团" }
						]
					},
					{
						type: 'threeAdv',
						data: {
							lBig: { src: "/static/images/demo/demo1.jpg" },
							rSmallTop: { src: "/static/images/demo/demo2.jpg" },
							rSmallBottom: { src: "/static/images/demo/demo2.jpg" }
						}
					},
					{
						type: 'commonList',
						data: [
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
				]
			}
		]
	}
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
				dataItems: [],
				dataObj: {},
			}
		},
		created() {
			// 获取可视区域高度
			uni.getSystemInfo({
				success: (res) => {
					// 注意res.windowHeight拿到的值是px
					this.scrollHeight = res.windowHeight - uni.upx2px(82);
				}
			})
			// 初始化
			this.__init();
		},
		methods: {
			async __init() {
				console.log("index >> __init ...");
				// 同步
				let [error, result] = await uni.request({
					url: 'http://ceshi3.dishait.cn/api/index_category/data',
					method: 'GET'
				})
				// 报错
				if (error) {
					return uni.showToast({
						title: error.errMsg,
						icon: 'none'
					});
				}
				// 失败
				if (result.statusCode !== 200) {
					return uni.showToast({
						title: result.data.msg,
						icon: 'none'
					});
				}
				let data = result.data.data;
				console.log(data);
				// 初始化tabBars
				this.tabBars = data.category;
				// 初始化页面
				this.dataItems = this.setDataItems(data);
			},
			// 初始化首页
			setDataItems(e) {
				let arr = [];
				// 拿到tabBars的长度，根据长度生成页面
				for (var i=0; i<this.tabBars.length; i++) {
					let itemObj = {
						refreshShow: 'hide',
						refreshText: '下拉可刷新',
						loadingShow: 'hide',
						data: [] // 当前页面所有数据
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
				// console.log("changeTab >> tabIndex = ", this.tabIndex);
				// console.log("changeTab >> index = ", index);
				if (this.tabIndex === index) {
					// 防止重复点击
					return;
				}
				// 记录索引值
				this.tabIndex = index;
				// 联动
				this.scrollInfo = "tab"+index;
				// 加载数据
				this.loadData();
			},
			// 加载数据
			loadData() {
				// 根据当前索引请求后台
				demo2.dataItems[0].loadText = "上拉加载更多";
				this.dataObj.dataItems[this.tabIndex] = demo2.dataItems[0];
			},
			// 上拉加载更多
			loadMore(index) {
				console.log("loadMore >> index = ", index)
				// 是否处于可加载状态
				let obj = this.dataObj.dataItems[index];
				console.log("loadMore >> loadText = ", obj.loadText)
				if (obj.loadText !== "上拉加载更多") {
					return;
				}
				obj.loadText = "加载中...";
				setTimeout(() => {
					// 模拟500ms后拿到数据，扩展运算符：之前的数据 + 新获取到的数据
					obj.list = [
						...obj.list,
						...demo2.dataItems[0].list
					];
					// 恢复状态
					obj.loadText = "上拉加载更多";
				}, 500);
			},
		}
	}
</script>

<style>
</style>