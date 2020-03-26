<template>
	<view>
		<uni-steps :options="list" active-color="#007AFF" :active="active" direction="column" />
	</view>
</template>

<script>
	import uniSteps from "@/components/uni-ui/uni-steps/uni-steps.vue"
	export default {
		components: {
			uniSteps
		},
		data() {
			return {
				active: 1,
				list: [{
					title: '买家下单',
					desc: '2018-11-11'
				}, {
					title: '卖家发货',
					desc: '2018-11-12'
				}, {
					title: '买家签收',
					desc: '2018-11-13'
				}, {
					title: '交易完成',
					desc: '2018-11-14'
				}]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>