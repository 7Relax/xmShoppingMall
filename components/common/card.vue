<template>
	<!-- 基础卡片组件 -->
	<view class="card">
		<!-- 标题 -->
		<view v-if="showHead" class="p-2 main-border-color" :class=" headBorderBottom ? 'border-bottom' : '' ">
			<slot name="title">
				<text v-if="headTitle" class="font-md" :class=" headTitleWeight ? 'font-weight' : '' ">{{headTitle}}</text>
			</slot>
		</view>
		<!-- body -->
		<view class="" :style="bodyStyle">
			<image v-if="bodyCover" :src="bodyCover" mode="widthFix"></image>
			<!-- 默认插槽 -->
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bodyStyle: String,
			// 头部标题
			headTitle: String,
			// 封面图
			bodyCover: String,
			// 是否显示头部
			showHead: {
				type: Boolean,
				default: true
			},
			headTitleWeight: {
				type: Boolean,
				default: true
			},
			headBorderBottom: {
				type: Boolean,
				default: true
			}
		}
	}
</script>

<style>
</style>