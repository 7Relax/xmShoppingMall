<template>
	<view class="row">
		<view class="span24-8 px-2 mb-2" :key="index" v-for="(item, index) in label.list">
			<view class="rounded px-2 py-1 bg-light-secondary font-md text-center border"
				:class=" label.selected === index ? 'radio-active': 'border-light-secondary' "
				@click="changeRadio(index)"
			>
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			label: Object,
		},
		methods: {
			changeRadio(index) {
				this.$emit('update:selected', index)
			}
		},
	}
</script>

<style scoped>
.radio-active{
	background: #FCE0D5!important;
	color: #EB7320!important;
	border-color: #EB7320!important;;
}
</style>