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
		// 请求，用扩展运算符方式引入options参数 
		return new Promise( (res, rej) => {
			// 请求前... TODO
			// 请求中...
			uni.request({
				...options,
				success: (result) => {
					// 服务端失败
					if (result.statusCode !== 200) {
						uni.showToast({
							title: result.data.msg || '服务端失败',
							icon: 'none'
						});
						return rej();
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