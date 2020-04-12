import Vue from 'vue'
import App from './App'
import store from './store'

Vue.prototype.$store = store

Vue.config.productionTip = false

// 引入全局组件（nvue组件中无效）
import divider from '@/components/common/divider.vue'
Vue.component('divider', divider)

// 引入request库（nvue组件中无效）
import $H from "@/common/lib/request.js"
Vue.prototype.$H = $H

// 引入全局加载loading
import loadingPlus from '@/common/mixin/loading-plus.vue'
Vue.component('loading-plus', loadingPlus)

// 权限跳转（options为接收的参数）
Vue.prototype.navigateTo = (options) => {
	// 判断用户是否登录
	if ( !store.state.user.loginStatus ) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login/login'
		});
	}
	// 登录过则放行
	uni.navigateTo(options)
}

// util工具
import $U from './common/lib/util.js'
Vue.prototype.$U = $U

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()