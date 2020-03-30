export default {
	state: {
		// 登录状态
		loginStatus: false,
		// token
		token: null,
		// 用户信息
		userInfo: {}
	},
	mutations: {
		// 初始化登录状态
		initUser(state) {
			// 从本地存储拿
			let userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				userInfo = JSON.parse(userInfo);
				state.userInfo = userInfo;
				state.token = userInfo.token;
				state.loginStatus = true;
			}
		},
		// 登录
		login(state, userInfo) {
			state.userInfo = userInfo;
			state.loginStatus = true;
			state.token = userInfo.token;
			// 持久化
			uni.setStorageSync('userInfo', JSON.stringify(userInfo));
		},
		// 退出登录
		logout(state) {
			state.userInfo = {};
			state.loginStatus = false;
			state.token = null;
			uni.removeStorageSync('userInfo');
		}
	}
} 