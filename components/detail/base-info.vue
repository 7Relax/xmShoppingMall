<template>
	<view class="p-2">
		<view class="font-lg">{{detail.title}}</view>
		<view class="font text-light-muted mb-3 line-h-sm">{{detail.desc}}</view>
		<price priceSize="font-lg" unitSize="font">{{detail.pPrice}}</price>
	</view>
</template>

<script>
	import Price from "@/components/common/price.vue";
	export default {
		components: {
			Price
		},
		props: ['detail']
	}
</script>

<style>
</style>