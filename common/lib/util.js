 export default {
	// 更新tabbar角标，购物车商品的数量大于0则设置tabbar角标
 	updateCartBadge(count) {
		if (count > 0) {
			return uni.setTabBarBadge({
				index: 2,
				text: count.toString()
			})
		}
		uni.removeTabBarBadge({
			index: 2
		})
	}
 }