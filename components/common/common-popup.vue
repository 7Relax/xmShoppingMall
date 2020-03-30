 <template>
	<view class="_popup" :class="popupClass">
		<view class="_mask" @tap.stop="$emit('hide')"  @touchmove.stop.prevent="moveHandle"></view>
		<view class="_body">
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			popupClass: {
				type: String,
				default: "none"
			}
		},
		methods:{
			moveHandle() {
				
			}
		}
	}
</script>

<style scoped>
._popup, ._mask {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
}
._popup {
	z-index: 2000;
	display: none;
}
._mask {
	z-index: 2002;
	background: rgba(0, 0, 0, 0.5);
}
._popup ._body {
	position: fixed;
	bottom: -1035rpx;
	width: 92%;
	padding: 0 4%;
	height: 1035rpx;
	z-index: 2003;
	border-radius: 20rpx 20rpx 0 0;
	background: #FFFFFF;
	display: flex;
	flex-direction: column;
}
._popup.show {
	display: block;
}
.show ._mask {
	animation: showPopupMask 0.2s linear both;
}
.show ._body {
	animation: showPopupBody 0.2s linear both;
}
._popup.hide {
	display: block;
}
.hide ._mask {
	animation: hidePopupMask 0.2s linear both;
}
.hide ._body {
	animation: hidePopupBody 0.2s linear both;
}
@keyframes showPopupMask{
	0%{ opacity: 0; }
	100%{ opacity: 1; }
}
@keyframes hidePopupMask{
	0%{ opacity: 1; }
	100%{ opacity: o; }
}
@keyframes showPopupBody{
	/* 上滑效果：从0到-100% */
	0%{ transform: translateY(0); }
	100%{ transform: translateY(-100%); }
}
@keyframes hidePopupBody{
	0%{ transform: translateY(-100%); }
	100%{ transform: translateY(0); }
}
/* _popup 与 none 是一同级 */
._popup.none {
	display: none;
}
</style>