<template>
	<view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
	<view class="example">
		<uni-card title="登录">
			<uni-forms ref="baseForm" :modelValue="baseFormData" label-position="top">
				<uni-forms-item label="账号:" required>
					<uni-easyinput v-model="baseFormData.account" placeholder="请输入账号" />
				</uni-forms-item>
				<uni-forms-item label="密码:" required>
					<uni-easyinput type="password" v-model="baseFormData.password" placeholder="请输入密码"></uni-easyinput>
				</uni-forms-item>
				<button type="primary" @click="login">登录</button>
			</uni-forms>
		</uni-card>
	</view>
	<uni-card>
		<text>{{logindata}}</text>
	</uni-card>
</template>

<script setup>
	import {
		ref,
		toRef,
		reactive
	} from "vue"
	import {
		onShow,
		onLoad,
		onReady
	} from '@dcloudio/uni-app';

	let msgType = ref("")
	let messageText = ref("")
	const message = ref(null);
	let baseFormData = ref({
		account: "admin",
		password: "123456"
	})
	let logindata = ref({})
	const login = (() => {
		uni.request({
			url: 'https://api.suxin23.cn/admin/login',
			method: 'POST',
			data: {
				account: baseFormData.value.account,
				password: baseFormData.value.password
			},
			success: (res) => {
				console.log(res);
				if (res.data.code === 200) {
					msgType.value = "success"
					messageText.value = `登陆成功`
					message.value.open()
					logindata.value = res.data
				} else {
					msgType.value = "error"
					messageText.value = `登录失败`
					message.value.open()
				}
			},
			fail: (err) => {
				console.error(err);
			}
		});
	})
</script>

<style>

</style>