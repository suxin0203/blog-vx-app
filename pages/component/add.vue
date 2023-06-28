<template>
	<uni-notice-bar show-icon scrollable
					text="如果你年轻的时候不 996，你什么时候可以 996？你一辈子没有 996，你觉得你就很骄傲了？这个世界上，我们每一个人都希望成功，都希望美好生活，都希望被尊重，我请问大家，你不付出超越别人的努力和时间，你怎么能够实现你想要的成功？" />
	<uni-section title="发表文章" type="line" titleFontSize="18px">
		<view class="example">
			<!-- 基础用法，不包含校验规则 -->
			<uni-forms ref="baseForm" :modelValue="baseFormData">
				<uni-forms-item label="标题" required>
					<uni-easyinput v-model="baseFormData.name" placeholder="请输入标题" />
				</uni-forms-item>
				<uni-forms-item label="分类" required>
					<uni-data-select v-model="baseFormData.class" :localdata="range" @change="change"
						placeholder="请选择分类"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="内容" required>
					<uni-easyinput type="textarea" autoHeight v-model="baseFormData.introduction"
						placeholder="请输入文章内容" />
					<!-- <editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady"></editor> -->
				</uni-forms-item>
			</uni-forms>
			<button type="primary">立 即 发 表</button>
		</view>

	</uni-section>
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


	let baseFormData = reactive([])

	const undo = (() => {
		this.editorCtx.undo()
	})
	// const onEditorReady = (() => {
	// 		// #ifdef MP-BAIDU
	// 		this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor');
	// 		// #endif

	// 		// #ifdef APP-PLUS || H5 ||MP-WEIXIN
	// 		uni.createSelectorQuery().select('#editor').context((res) => {
	// 			this.editorCtx = res.context
	// 		}).exec()
	// 		// #endif
	// 	}),
</script>

<style>
	.example {
		padding: 10px;
	}

	#editor {
		width: 100%;
		height: 300px;
		background-color: #CCCCCC;
	}
</style>
