<template>
	<!-- 判断需要渲染哪一款商城 -->
	<view>
		<AStyle v-if=" style === 'A' " />
		<BStyle v-else-if=" style === 'B' " />
		<CStyle v-else-if=" style === 'C' " />
		<!-- ... -->
	</view>
</template>

<script>
	import AStyle from "@/components/index/style/AStyle.vue";
	import BStyle from "@/components/index/style/BStyle.vue";
	import CStyle from "@/components/index/style/CStyle.vue";
	export default {
		components: {
			AStyle,
			BStyle,
			CStyle
		},
		data() {
			return {
				style: "C", // 登录的时候判断商城类型，放到全局也行
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style>
</style>