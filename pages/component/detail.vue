<template>
	<view class="main">
		<uni-card title="详细内容:" :extra="detaildata.created_at">
			<view style="overflow: auto">
				<rich-text :nodes="detaildata.content"></rich-text>
			</view>

		</uni-card>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from "vue"
	import {
		onShow,
		onLoad,
		onReady
	} from '@dcloudio/uni-app';
	import {
		post,
		get
	} from "../../common/api";
	import "prismjs/themes/prism.css";
	let detaildata = ref({})
	onLoad((options) => {
		// 获取传递的博客id参数
		get(`/articles/${options.id}`).then(res => {
			detaildata.value = res.data.data[0]
			// 设置导航栏标题
			uni.setNavigationBarTitle({
				title: detaildata.value.title
			});
		})
	})
	let onShareAppMessage =
		wx.showShareMenu({
			withShareTicket: true,
			menu: ['shareAppMessage', 'shareTimeline']
		})
</script>

<style>
	.main {
		padding: 10px 0;
	}
	.editor-content-view pre>code {
	    display: block;
	    padding: 10px;
	    overflow-x: auto;
	}
</style>