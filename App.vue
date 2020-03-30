<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// 初始化登录状态
			this.$store.commit('initUser');
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 官方ui库 */
	@import url("/common/uni.css");
	/* 第三方动画库 */
	@import url("/common/animate.css");
	/* 自定义图标库 */
	@import url("/common/icon.css");
	@import url("/common/icon-plus.css");
	/* ui基础库 */
	@import url("/common/zcm-main.css");
	/* 公共样式 */
	@import url("/common/common.css");
</style>
