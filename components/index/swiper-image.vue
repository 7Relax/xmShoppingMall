<template>
	<view>
		<swiper indicator-dots autoplay :interval="3000" :duration="200" :style="getStyle" circular>
			<block v-for="(item, index) in swiperData" :key="index">
				<swiper-item>
					<view class="swiper-item" @tap="event(item, index)">
						<image :src="item.src" lazy-load :style="getStyle"></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			swiperData: [Array, Object],
			height: {
				type: String,
				default: "350"
			},
			// 默认不是预览
			preview: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			getStyle() {
				return `height: ${this.height}rpx`; // rpx兼容性好
			},
			getUrls() {
				console.log(this.swiperData);
				var arr = [];
				for (var i in this.swiperData) {
					arr.push(this.swiperData[i].src);
				}
				return arr;
			}
		},
		methods: {
			// 点击了图片
			event(item, index) {
				console.log(item, index)
				if (this.preview) {
					return uni.previewImage({
						current: index,
						urls: this.getUrls,
						indicator: 'number'
					})
				}
			}
		}
	}
</script>

<style>
</style>