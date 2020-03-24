<template>
	<view>
		<uni-swipe-action>
			<uni-swipe-action-item :options="options" :show="isOpened" 
				:auto-close="false" @change="change" @click="bindClick($event, index)"
				v-for="(item, index) in list" :key="index"
			>
				<view class="text-secondary p-3 border-bottom border-light-secondary" style="width: 100%;" hover-class="bg-light-secondary" @click="choiceAddress(item, index)">
					<view class="d-flex a-center">
						<text class="main-text-color">{{item.name}}</text>
						<text class="ml-1">{{item.phone}}</text>
						<text class="main-text-color ml-1">{{item.isDefault ? '[默认]' : ''}}</text>
					</view>
					<view class="d-flex a-center">
						<text>{{item.address}}</text>
						<view class="iconfont icon-you ml-auto"></view>
					</view>
					<view class="">{{item.detailAddr}}</view>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	import UniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"; // --- test
	import UniSwipeAction from '@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue';
	import UniSwipeActionItem from '@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue';
	import { mapState, mapMutations } from 'vuex';
	export default {
		components: {
			UniListItem,
			UniSwipeAction,
			UniSwipeActionItem
		},
		data() {
			return {
				options: [{
					text: '修改',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				isOpened: false,
				// type有两个值：update, choice
				type: 'update',
			}
		},
		// 监听导航栏按钮点击
		onNavigationBarButtonTap: (e) => {
			if (e.index === 0) {
				// 跳转到新增地址页面
				uni.navigateTo({
					url: '/pages/user-address-edit/user-address-edit'
				});
			}
		},
		computed: {
			// 通过扩展运算符的形式引入
			...mapState({
				// list: state => state.address.list,
				list: (state) => {
					return state.address.list
				}
			})
		},
		onLoad(e) {
			if (e.type) {
				this.type = e.type;
			}
		},
		methods: {
			change(e) {
				// this.isOpened = e
				// console.log('返回：', e);
			},
			...mapMutations([
				'deleteAddr'
			]),
			bindClick(e, addrIndex) {
				console.log(e);
				if (e.index === 0) {
					// 修改收货地址
					this.updateAddr(addrIndex);
				} else if (e.index === 1) {
					// 删除
					uni.showModal({
						content: '要删除该地址吗？',
						success: (res) => {
							if (res.confirm) {
								this.deleteAddr(addrIndex);
								uni.showToast({
									title: '删除成功'
								})
							}
						}
					});
				}
			},
			choiceAddress(item, addrIndex) {
				if (this.type === 'choice') {
					// 通知订单提交页修改收货地址
					uni.$emit('choiceAddr', item);
					// 返回上一页
					uni.navigateBack({
						delta: 1
					})
				} else if (this.type === 'update') {
					this.updateAddr(addrIndex);
				}
			},
			// 修改收货地址
			updateAddr(addrIndex) {
				let obj = JSON.stringify({
					index: addrIndex,
					item: this.list[addrIndex]
				});
				uni.navigateTo({
					url: '/pages/user-address-edit/user-address-edit?data='+obj
				});
			}
		}
	}
</script>

<style>

</style>
