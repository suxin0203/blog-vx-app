<template>
	<view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
	<uni-notice-bar show-icon scrollable
		text="如果你年轻的时候不 996，你什么时候可以 996？你一辈子没有 996，你觉得你就很骄傲了？这个世界上，我们每一个人都希望成功，都希望美好生活，都希望被尊重，我请问大家，你不付出超越别人的努力和时间，你怎么能够实现你想要的成功？" />
	<uni-section title="发表文章" type="line" titleFontSize="18px">
		<view class="example">
			<!-- 基础用法，不包含校验规则 -->
			<uni-forms ref="baseForm" :modelValue="baseFormData">
				<uni-forms-item label="标题" required>
					<uni-easyinput v-model="baseFormData.title" placeholder="请输入标题" />
				</uni-forms-item>
				<uni-forms-item label="分类" required>
					<uni-data-select v-model="baseFormData.category_id" :localdata="range"
						placeholder="请选择分类"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="内容" required>
					<uni-easyinput type="textarea" autoHeight v-model="baseFormData.content" placeholder="请输入文章内容" />
					<!-- <editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady"></editor> -->
				</uni-forms-item>
			</uni-forms>
			<button type="primary" @click="sendArticle" :disabled="!token">{{token?'立 即 发 表':'登陆后发表'}}</button>
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
	import {
		post,
		get
	} from "../../common/api";

	let range = ref([])
	let msgType = ref("")
	let messageText = ref("")
	const message = ref(null);

	let baseFormData = ref({
		title: '',
		category_id: 0,
		content: ''
	})
	let token = ref()
	token.value = uni.getStorageSync('token');

	const undo = (() => {
		this.editorCtx.undo()
	})


	onLoad(() => {
		get('/categories/').then(res => {
			// 获取分类列表成功，处理返回的数据
			if (res.data.code === 200) {
				const categories = res.data.data;
				range.value = categories.map(item => {
					return {value: item.id,text: item.name}
				})
			}
		})
	})

	const sendArticle = (() => {
		post('/articles/token/', baseFormData.value).then(res => {
			if (res.data.code === 200) {
				msgType.value = "success"
			} else {
				msgType.value = "error"
			}
			messageText.value = res.data.message
			message.value.open()
		})
	})
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