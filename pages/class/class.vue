<template>
	<view class="d-flex border-top border-light-secondary" style="height: 100%; box-sizing: border-box;">
		
		<loading :show="showLoading"></loading>
		
		<scroll-view id="leftScroll" scroll-y style="flex: 1; height: 100%;" class="border-right border-light-secondary" :scroll-top="leftScrollTop">
			<view class="border-bottom border-light-secondary py-1 left-scroll-item" v-for="(item, index) in cate" :key="index">
				<view class="font-md py-1 text-center text-muted"
					:class="activeIndex === index ? 'class-active' : '' "
					@tap="changeCate(index)">{{item.name}}</view>
			</view>
		</scroll-view>
		
		<scroll-view scroll-y style="flex: 3.5; height: 100%;" :scroll-top="rightScrollTop" scroll-with-animation="true" @scroll="onRightScroll">
			<view class="row right-scroll-item" v-for="(item, index) in list" :key="index">
				<view class="span24-8 text-center py-2" v-for="(item2, index2) in item.list" :key="index2">
					<image :src="item2.src" style="width: 120upx; height: 120upx;"></image>
					<text class="d-block">{{item2.name}}</text>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 默认显示加载动画
				showLoading: true,
				// 当前选中的类别
				activeIndex: 0,
				cate: [],
				list: [],
				leftDomsTop: [],
				leftScrollTop: 0,
				rightDomsTop: [],
				rightScrollTop: 0,
				cateItemHeight: 0,
			}
		},
		onLoad() {
			this.getData();
		},
		// onReady 对应 mounted，dom节点已经渲染出来了
		onReady() {
			// 左侧
			this.getEleInfo({
				all: 'left',
				size: true,
				rect: true
			}).then(data => {
				this.leftDomsTop = data.map(obj => {
					this.cateItemHeight = obj.height; // 拿到每一个节点的高度
					return obj.top;
				})
			})
			// 右侧
			this.getEleInfo({
				all: 'right',
				size: false,
				rect: true
			}).then(data => {
				this.rightDomsTop = data.map(obj => obj.top)
				console.log(this.rightDomsTop);
			})
		},
		watch: {
			async activeIndex(newValue, oldValue) {
				// 获取scroll-view的总高度 和 scroll-top信息
				let data = await this.getEleInfo({
					size: true,
					scrollOffset: true
				})
				let H = data.height;
				let ST = data.scrollTop;
				// 当前top值 + 每一个分类的高度
				let V = this.leftDomsTop[newValue] + this.cateItemHeight;
				// 下边
				if (V > (H+ST)) {
					return this.leftScrollTop = V - H;
				}
				// 上边
				if (ST > this.cateItemHeight) {
					this.leftScrollTop = this.leftDomsTop[newValue];
				}
			}
		},
		methods: {
			// 获取节点信息
			getEleInfo(obj = {}) {
				return new Promise((res, rej) => {
					let option = {
						size: obj.size ? true : false,                 // 接收宽高信息
						rect: obj.rect ? true : false,                 // 接收布局信息
						scrollOffset: obj.scrollOffset ? true : false  // 接收滚动情况
					}
					const query = uni.createSelectorQuery().in(this);
					let q = obj.all ? query.selectAll(`.${obj.all}-scroll-item`) : query.select('#leftScroll')
					q.fields(option, data => {
						// 获取成功，将data传回
						res(data);
					}).exec();
				})
			},
			getData() {
				for (var i=0; i<20; i++) {
					this.cate.push({
						name: "分类"+i
					})
					this.list.push({
						list: []
					})
				}
				for (let i=0; i<this.list.length; i++) {
					for (let j=0; j<4; j++) { // 模拟每个分类有4个商品
						this.list[i].list.push(
							{ src: "/static/images/demo/cate_03.png", name: `分类${i}-商品${j}` }
						)
					}
				}
				// 数据获取完毕后关闭加载动画
				this.$nextTick(() => {
					this.showLoading = false;
				})
			},
			// 点击左侧分类
			changeCate(index) {
				console.log("changeCate >> index ", index);
				this.activeIndex = index;
				// 右侧scroll-view滚动到相应区块
				this.rightScrollTop = this.rightDomsTop[index];
			},
			// 监听右侧滚动事件
			async onRightScroll(e) {
				// value是数组中的值，key是索引
				this.rightDomsTop.forEach((value, key) => {
					if (value < e.detail.scrollTop + 3) { // 如果value < 已滚动的距离，这里的 + 3 是为了解决bug
						this.activeIndex = key;
						return false;
					}
				})
			}
		}
	}
</script>

<style>
.class-active {
	border-left: 8upx solid #FD6801;
	color: #FD6801 !important;
}
</style>
