<template>
	<view>
		<view class="d-flex p-2 border-bottom a-center bg-white">
			<view class="mr-1 text-secondary font-md flex-shrink">收件人：</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.name" />
		</view>
		<view class="d-flex p-2 a-center bg-white">
			<view class="mr-1 text-secondary font-md flex-shrink">手机号码：</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.phone" />
		</view>
		<divider />
		
		<view class="d-flex p-2 border-bottom a-center bg-white">
			<view class="mr-1 text-secondary font-md flex-shrink">所在地区：</view>
			<input class="px-1 font-md flex-1" type="text" disabled @click="showMulLinkageThreePicker" 
				placeholder="请选择所在地区" :value="form.address"/>
			<city-picker :themeColor="themeColor" ref="cityPicker" 
				:pickerValueDefault="pickerValue" @onConfirm="onConfirm">
			</city-picker>
		</view>
		<view class="d-flex p-2 a-center bg-white">
			<view class="mr-1 text-secondary font-md flex-shrink">详细地址：</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.detailAddr" />
		</view>
		<divider />
		
		<view class="d-flex p-2 border-bottom a-center bg-white">
			<view class="mr-1 text-secondary font-md flex-shrink">设为默认地址：</view>
			<switch class="ml-auto" :checked="form.isDefault" color="#FD6801" 
				@change="form.isDefault = $event.detail.value"/>
		</view>
		
		<!-- 底部按钮 -->
		<view class="p-3">
			<view class="text-center w-100 main-bg-color text-white font-md rounded py-2" 
				hover-class="main-bg-hover-color" @click="submit">保存</view>
		</view>
	</view>
</template>

<script>
	import CityPicker from "@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue"
	import { mapActions } from "vuex"
	export default {
		components: {
			CityPicker
		},
		data() {
			return {
				themeColor: '#007AFF',
				pickerValue: [0, 0, 1],
				isEdit: false,
				currentIndex: -1,
				form: {
					name: '',
					phone: '',
					address: '',
					detailAddr: '',
					isDefault: false
				}
			}
		},
		// 监听返回键
		onBackPress() {
			if (this.$refs.cityPicker.showPicker) {
				this.$refs.cityPicker.pickerCancel();
				return true;
			}
		},
		// 页面卸载时
		onUnload() {
			if (this.$refs.cityPicker.showPicker) {
				this.$refs.cityPicker.pickerCancel();
			}
		},
		onLoad(e) {
			if (e.data) {
				let obj = JSON.parse(e.data);
				console.log(obj);
				this.currentIndex = obj.index;
				this.form = obj.item;
				this.isEdit = true;
				uni.setNavigationBarTitle({
					title: '修改收货地址'
				})
			}
		},
		methods: {
			// 三级联动确定
			onConfirm(e) {
				// 负责展示
				this.form.address = e.label;
				// 负责提交到数据库
				this.pickerValue = e.value;
			},
			// 显示三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.cityPicker.show();
			},
			// 引入
			...mapActions(['createAddrAction', 'updateAddrAction']),
			// 提交
			submit() {
				// TODO 验证表单
				if (this.isEdit) {
					// 修改
					this.updateAddrAction({
						index: this.currentIndex,
						item: this.form
					})
					uni.showToast({ title: '修改成功' });
					setTimeout(() => {
						uni.navigateBack({ delta: 1 });
					}, 500);
				} else {
					// 新增收获地址
					this.createAddrAction(this.form);
					// 创建成功
					uni.showToast({ title: '创建成功' });
					// 返回上一页
					uni.navigateBack({ delta: 1 });
				}
			}
		}
	}
</script>

<style>
page {
	background: #EEEEEE;
}
</style>