export default {
	state: {
		list: [
			{
				name: 'Seven1',
				phone: '159****3720',
				address: '广东省 广州市 黄埔区',
				detailAddr: 'xxxx 街道',
				isDefault: false, // 是否默认地址
			},
			{
				name: 'Seven2',
				phone: '159****3720',
				address: '广东省 广州市 黄埔区',
				detailAddr: 'xxxx 街道',
				isDefault: true,
			},
			{
				name: 'Seven3',
				phone: '159****3720',
				address: '广东省 广州市 黄埔区',
				detailAddr: 'xxxx 街道',
				isDefault: false,
			},
		]
	},
	mutations: {
		// 创建收货地址
		createAddr(state, item) {
			state.list.unshift(item);
		},
		// 删除收货地址
		deleteAddr(state, index) {
			state.list.splice(index, 1);
		},
		/**
		 * 修改收货地址，传一个对象过来，解构index、item，传过来的参数格式要如下才能解构：
			{
				index: '',
				item: {}
			}
		 */
		updateAddr(state, {index, item}) {
			// state.list[index] = item; // 这样赋值虽然vuex中数据是变了，但是页面不变，可以采用遍历赋值的方式
			for (let key in item) {
				state.list[index][key] = item[key];
			}
		}
	}
}