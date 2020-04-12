import $H from '@/common/lib/request.js';
import $U from '@/common/lib/util.js';
export default {
	state: {
		list: [
			{
				checked: false,
				id: '1',
				title: "商品标题111",
				cover: "/static/images/demo/list/1.jpg",
				skus_type: 1,    // 多规格，skus_type为0时表示是单规格，单规格时是没有attrs商品属性的
				// 当前的商品属性
				attrs: [
					{
						title: "颜色",
						selected: 0,
						list: [
							{ name: "火焰红" },
							{ name: "炭黑" },
							{ name: "冰川蓝" }
						]
					}, {
						title: "容量",
						selected: 0,
						list: [
							{ name: "64GB" },
							{ name: "128GB" }
						]
					}, {
						title: "套餐",
						selected: 0,
						list: [
							{ name: "标配" },
							{ name: "套餐一" },
							{ name: "套餐二" }
						]
					}
				],
				pPrice: 3699,
				num: 1, // 选中的数量
				minNum: 1,
				maxNum: 3
			},
			{
				checked: false,
				id: '2',
				title: "商品标题222",
				cover: "/static/images/demo/list/1.jpg",
				skus_type: 1,    // 多规格，skus_type为0时表示是单规格，单规格时是没有attrs商品属性的
				// 当前的商品属性
				attrs: [
					{
						title: "颜色",
						selected: 0,
						list: [
							{ name: "火焰红" },
							{ name: "炭黑" },
							{ name: "冰川蓝" }
						]
					}, {
						title: "容量",
						selected: 0,
						list: [
							{ name: "64GB" },
							{ name: "128GB" }
						]
					}, {
						title: "套餐",
						selected: 0,
						list: [
							{ name: "标配" },
							{ name: "套餐一" },
							{ name: "套餐二" }
						]
					}
				],
				pPrice: 3799,
				num: 1, // 选中的数量
				minNum: 1,
				maxNum: 5
			}
		],
		// 选中列表（存放选中id）
		selectedList: [],
		// popup显示
		popupShow: 'none',
		// 当前操作的商品的索引（在selectedList中的位置）
		popIndex: -1,
		// 当前需要修改属性的商品
		popupData: {}
	},
	// 类似计算属性
	getters: {
		// 判断全选
		checkedAll: (state) => {
			return state.list.length === state.selectedList.length
		},
		// 合计
		totalPrice: (state) => {
			console.log("getters >> totalPrice() ")
			var total = 0;
			state.list.forEach( obj => {
				if ( state.selectedList.indexOf(obj.id) > -1 ) {
					// TODO 考虑精度丢失问题
					total += obj.pPrice * obj.num
				}
			})
			return total;
		},
		// 禁用全选
		disableSelectAll: (state) => {
			return state.list.length === 0
		},
		// 拿到当前需要修改属性的商品 --- 现在不需要通过getters来拿
		// popupData: (state) => {
		// 	return state.popIndex > -1 ? state.list[state.popIndex] : {}
		// },
		
		// 购物车商品数量
		cartCount: (state) => {
			if (state.list.length < 1) {
				return '0';
			} else if (state.list.length <= 99) {
				return state.list.length;
			} else {
				return '99+';
			}
		}
	},
	// 同步方法
	mutations: {
		// 初始化list
		initCartList(state, list) {
			console.log("initCartList ...");
			state.list = list;
			// 设置tabbar角标
			$U.updateCartBadge(state.list.length);
		},
		// 选中/取消选中某个商品
		selectItem(state, index) {
			// 根据index拿到商品ID
			let id = state.list[index].id;
			let i = state.selectedList.indexOf(id);
			// 之前是选中，取消选中
			if ( i > -1 ) {
				// 取消当前商品的选中状态
				state.list[index].checked = false;
				// 移除选中列表中的当前商品
				return state.selectedList.splice(i, 1);
			}
			// 之前是未选中，现在选中
			state.list[index].checked = true;
			state.selectedList.push(id);
		},
		// 全选
		selectAll(state) {
			state.selectedList = state.list.map( obj => {
				// 设置选中状态
				obj.checked = true;
				return obj.id
			})
		},
		// 取消全选
		unSelectAll(state) {
			state.list.forEach( obj => {
				obj.checked = false;
			})
			state.selectedList = [];
		},
		// 删除选中
		deleteProduct(state) {
			state.list = state.list.filter( obj => {
				// filter有个特点，如果return为true则当前obj对象会留下来，反之会过滤掉
				// indexOf的值为-1说明没找到(true)，则保留 
				return state.selectedList.indexOf(obj.id) === -1
			})
			// 设置tabbar角标
			$U.updateCartBadge(state.list.length);
		},
		// 修改popIndex
		changePopIndex(state, index) {
			// 一旦popIndex有改变就会触发计算属性popupData，从而拿到最新的需要修改的商品对象
			state.popIndex = index;
		},
		// 加入购物车（从商品详情）
		addCartFromDetail(state, product) {
			// 加入到数组头部
			state.list.unshift(product);
			// 设置tabbar角标
			$U.updateCartBadge(state.list.length);
		},
		// 清空购物车
		clearCart(state) {
			console.log("clearCart ...");
			state.list = [];
			state.selectedList = [];
			$U.updateCartBadge(state.list.length);
		}
	},
	// 异步方法
	actions: {
		// 更新购物车列表
		updateCartList({statet, commit}) {
			return new Promise((res, rej) => {
				$H.get('/cart', {},  {
					token: true,
					toast: false 
				}).then(response => {
					console.log(response);
					// 由于后台数据返回为空，所以还是用vuex中的测试数据
					// commit('initCartList', response);
					// 成功
					res(response);
				}).catch(err => {
					rej(err);
				})
			})
		},
		// 显示popup
		doShowPopup({state, commit}, {index, data}) {
			// 显示popup后立即改变popIndex
			commit('changePopIndex', index);
			// 存数据
			state.popupData = data;
			state.popupData.item = state.list[index];
			// 展示popup
			state.popupShow = 'show'; 
		},
		// 隐藏popup
		doHidePopup({state, commit}) {
			state.popupShow = 'hide';
			setTimeout( () => {
				state.popupShow = 'none';
				// 初始化popIndex
				commit('changePopIndex', -1);
			}, 200);
		},
		doSelectAll({commit, getters}) {
			getters.checkedAll ? commit('unSelectAll') : commit('selectAll')
		},
		doDelProduct({commit, state}) {
			if (state.selectedList.length < 1) {
				return uni.showToast({
					title: '请选择要删除的商品',
					icon: 'none'
				})
			}
			uni.showModal({
				content: '是否删除选中',
				success: function (res) {
					if (res.confirm) {
						$H.post('/cart/delete', {
							// 把数组内容转成以逗号隔开的字符串 
							shop_ids: state.selectedList.join(','), // 购物车id，多个用逗号隔开
						}, {
							token: true
						}).then(res => {
							// 删除
							commit('deleteProduct');
							// 取消全选
							commit('unSelectAll');
							uni.showToast({
							 	title: '删除成功'
							});
						})
					}
				}
			});
		}
	}
}