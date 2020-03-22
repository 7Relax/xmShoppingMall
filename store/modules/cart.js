export default {
	state: {
		list: [
			{
				checked: false,
				id: '1',
				title: "商品标题111",
				cover: "/static/images/demo/list/1.jpg",
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
				maxNum: 10
			},
			{
				checked: false,
				id: '2',
				title: "商品标题222",
				cover: "/static/images/demo/list/1.jpg",
				// 当前的商品属性
				attrs: [
					{
						title: "颜色",
						selected: 1,
						list: [
							{ name: "火焰红" },
							{ name: "炭黑" },
							{ name: "冰川蓝" }
						]
					}, {
						title: "容量",
						selected: 1,
						list: [
							{ name: "64GB" },
							{ name: "128GB" }
						]
					}, {
						title: "套餐",
						selected: 1,
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
				maxNum: 10
			},
			{
				checked: false,
				id: '3',
				title: "商品标题333",
				cover: "/static/images/demo/list/1.jpg",
				// 当前的商品属性
				attrs: [
					{
						title: "颜色",
						selected: 2,
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
						selected: 2,
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
				maxNum: 10
			}
		],
		// 选中列表（存放选中id）
		selectedList: [],
		// popup显示
		popupShow: 'none',
		// 当前操作的商品的索引（在selectedList中的位置）
		popIndex: -1
	},
	// 类似计算属性
	getters: {
		// 判断全选
		checkedAll: (state) => {
			return state.list.length === state.selectedList.length
		},
		// 合计
		totalPrice: (state) => {
			console.log("totalPrice 1 ...")
			var total = 0;
			state.list.forEach( obj => {
				console.log("totalPrice 2 ... obj = ", obj)
				if ( state.selectedList.indexOf(obj.id) > -1 ) {
					console.log("totalPrice 3 ... l : ", state.selectedList)
					total += obj.pPrice * obj.num
				}
			})
			return total;
		},
		// 禁用全选
		disableSelectAll: (state) => {
			return state.list.length === 0
		},
		// 拿到当前需要修改属性的商品
		popupData: (state) => {
			return state.popIndex > -1 ? state.list[state.popIndex] : {}
		}
	},
	// 同步方法
	mutations: {
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
		}
	},
	// 异步方法
	actions: {
		// 显示popup
		doShowPopup({state, commit}, index) {
			// 显示popup后立即改变popIndex
			commit('changePopIndex', index);
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
		doDelProduct({commit}) {
			uni.showModal({
				content: '是否删除选中',
				success: function (res) {
					if (res.confirm) {
						commit('deleteProduct');
						uni.showToast({
							title: '删除成功'
						});
					}
				}
			});
		}
	}
}