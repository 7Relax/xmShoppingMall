<template>
	<view>
		<card :headTitle="item.label" v-for="(item, index) in list" :key="index"
			bodyStyle="background: #FFFFFF" v-if="loginStatus || item.num !== 0">
			
			<uni-list-item v-for="(val, listIndex) in item.value" :key="listIndex"
				:title="val.title" @click="navigate(val.path)">
			</uni-list-item>
			
		</card>
		<view class="p-3" v-if="loginStatus">
			<button type="default" class="bg-white" @click="logoutEvent">退出登录</button>
		</view>
	</view>
</template>

<script>
	import card from "@/components/common/card.vue";
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue";
	import { mapState, mapMutations } from "vuex";
	export default {
		components: {
			card,
			uniListItem
		},
		data() {
			return {
				list: [
					{
						label: '帐号管理',
						num: 0,
						value: [
							{ title: '个人资料', path: '' },
							{ title: '收货地址', path: 'user-address-list' }
						]
					},
					{
						label: '关于',
						num: 1,
						value: [
							{ title: '关于商城', path: 'about' },
							{ title: '意见反馈', path: '' },
							{ title: '协议规则', path: '' },
							// { title: '资质证件', path: '' },
							{ title: '用户协议', path: '' },
							{ title: '隐私政策', path: '' }
						]
					}
				]
			}
		},
		computed: {
			...mapState({
				// token: state => state.user.token,
				loginStatus: state => state.user.loginStatus
			})
		},
		methods: {
			...mapMutations(['logout', 'clearCart']),
			navigate(path) {
				if (!path) { return; }
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				});
			},
			// 退出登录
			logoutEvent() {
				/**
				 * token为true 代表需要传递token到后台
				 * checkToken为true 代表需要验证token是否存在，如果token存在则继续请求后台，否则跳转到登录页
				 * toast：是否需要提示
				 */
				this.$H.post('/logout', {}, {
					token: true,
					checkToken: false,
					toast: false
				}).then(res => {
					console.log("logout ... res = ", res);
					// 清除state
					this.logout();
					// 清空购物车
					this.clearCart();
					// 返回上一页
					uni.navigateBack({
						delta: 1
					})
					uni.showToast({
						title: '退出成功',
						icon: 'none'
					});
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style>
page {
	background: #EEEEEE;
}
</style>