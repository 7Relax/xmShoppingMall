<template>
	<view>
		<uni-status-bar />
		<view class="d-flex j-sb a-center py-2 px-3 text-light-muted">
			<view class="iconfont icon-shanchu1" @click="goBack"></view>
			<view class="font-md" @click="forget">忘记密码</view>
		</view>
		
		<view class="p-5">
			
			<view class="font-lg mb-5">密码登录</view>
			
			<input type="text" class="border-bottom mb-4 uni-input px-0" v-model="form.username"
				@focus="focus('username')" @blur="blur('username')"
				placeholder-class="text-light-muted" placeholder="请输入手机号/邮箱" 
				:class="focusClass.username ? 'input-border-color' : '' "/>
				
			<input type="text" class="border-bottom uni-input px-0" v-model="form.password"
				@focus="focus('password')" @blur="blur('password')" 
				:class="focusClass.password ? 'input-border-color' : '' "
				placeholder-class="text-light-muted" placeholder="请输入密码" style="margin-bottom: 60rpx;"/>
				
			<view class="py-2 w-100 d-flex j-center a-center rounded main-bg-color text-white font-md mb-4"
				hover-class="main-bg-hover-color" @click="submit">登录</view>
				
			<label class="d-flex a-center" @click="isChecked = !isChecked">
				<checkbox :checked="isChecked"/>
				<text class="text-light-muted font">已阅读并同意xxx协议</text>
			</label>
			
		</view>
	</view>
</template>

<script>
	import uniStatusBar from "@/components/uni-ui/uni-status-bar/uni-status-bar.vue";
	import { mapMutations } from "vuex";
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				focusClass: {
					username: false,
					password: false
				},
				form: {
					username: '',
					password: ''
				},
				// 表单验证规则
				rules: {
					username: [
						{ rule: /^[a-zA-Z]\w{5,17}$/, msg: '账号需以字母开头，长度在6~18之间，只能包含字母、数字和下划线', trigger: 'blur' }
					],
					password: [
						{ rule: /^.{5,20}$/, msg: '密码长度为5~20的所有字符', trigger: 'blur' }
					]
				},
				isChecked: false,
			}
		},
		methods: {
			...mapMutations(['login']),
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			forget() {
				
			},
			focus(type) {
				this.focusClass[type] = true;
			},
			blur(type) {
				this.focusClass[type] = false;
			},
			validate(key) {
				var result = true;
				this.rules[key].forEach( obj => {
					if ( !(obj.rule).test(this.form[key]) ) {
						// 验证失败
						uni.showToast({ title: obj.msg, icon: 'none' });
						result = false;
					}
				})
				return result;
			},
			submit() {
				// if ( !this.isChecked ) {
				// 	uni.showToast({ title: '请同意xxx协议', icon: 'none' });
				// 	return;
				// }
				// 验证用户名
				// if ( !this.validate('username') ) return;
				// 验证密码
				// if ( !this.validate('password') ) return;
				// 登录中
				uni.showLoading({
					title: '登录中...',
					mask: true // 加上遮罩以防止点击多次
				});
				// 提交
				this.$H.post('/login', {
					username: this.form.username,
					password: this.form.password
				}).then(res => {
					console.log(res);
					// 状态存储
					this.login(res);
					// 更新购物车
					this.$emit('updateCart');
					// 隐藏遮罩
					uni.hideLoading();
					// 返回上一页
					uni.navigateBack({
						delta: 1
					})
					uni.showToast({
						title: '登录成功'
					});
				})
			}
		}
	}
</script>

<style>
</style>