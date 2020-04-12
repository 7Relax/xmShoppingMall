import $store from "@/store/index.js";
export default {
	// 全局配置
	common: {
		baseUrl: 'http://ceshi3.dishait.cn/api',
		header: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		data: {},
		method: 'GET',
		dataType: 'json'
	},
	// 请求返回Promise
	request(options = {}) {
		// 参数处理
		options.url = this.common.baseUrl + options.url;
		options.header = options.header || this.common.header;
		options.data = options.data || this.common.data;
		options.method = options.method || this.common.method;
		options.dataType = options.dataType || this.common.dataType;
		
		// token（判断是否要自动填充token）
		if (options.token) {
			options.header.token = $store.state.user.token;
			// 若token不存在，则跳转到登录页
			if (options.checkToken && !options.header.token ) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				uni.navigateTo({
					url: '/pages/login/login'
				});
				console.log("token不存在则跳转到登录页");
				return;
			}
		}
		
		// 请求，用扩展运算符方式引入options参数 
		return new Promise( (res, rej) => {
			// 请求前... TODO
			// 请求中...
			uni.request({
				...options,
				success: (result) => {
					// 返回原始数据
					if (options.native) {
						return res(result);
					}
					// 服务端失败
					if (result.statusCode !== 200) {
						// options.toast有可能的取值：undefined、true、false
						if (options.toast !== false) {
							uni.showToast({
								title: result.data.msg || '服务端失败',
								icon: 'none'
							});
						}
						return rej(result.data);
					}
					// 成功
					let data = result.data.data;
					res(data);
				},
				fail: (error) => {
					uni.showToast({
						title: error.errMsg || '请求失败',
						icon: 'none'
					});
					return rej();
				}
			});
		})
	},
	// get
	get( url, data = {}, options = {} ) {
		options.url = url;
		options.data = data;
		options.method = 'GET';
		return this.request(options);
	},
	// post
	post( url, data = {}, options = {} ) {
		options.url = url;
		options.data = data;
		options.method = 'POST';
		return this.request(options);
	}
}