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
				isDefault: false,
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
	getters: {
		// 获取默认地址，defaultAddr是数组
		defaultAddr: (state) => {
			return state.list.filter(obj => {
				return obj.isDefault
			})
		}
	},
	// mutations 中的方法不能互相调用，要借助 actions
	mutations: {
		// 更新收货地址, refersh：覆盖全部 or 追加
		updateAddrList(state, {list, refresh}) {
			state.list = refresh ? list : [...state.list, list];
		},
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
		},
		// 取消默认地址
		removeDefault(state) {
			state.list.forEach(obj => {
				if (obj.isDefault) {
					obj.isDefault = false;
				}
			})
		}
	},
	actions: {
		// 更新收货地址
		updateAddrAction({commit}, obj) {
			if (obj.item.isDefault) {
				commit('removeDefault');
			}
			commit('updateAddr', obj);
		},
		// 新增收货地址
		createAddrAction({commit}, obj) {
			if (obj.isDefault) {
				commit('removeDefault');
			}
			commit('createAddr', obj);
		}
	}
}