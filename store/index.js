import Vue from 'vue'
import Vuex from 'vuex'

import cart from '@/store/modules/cart.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		cart
	}
})