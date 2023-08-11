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
				<button type="primary" @click="wxlogin" style="margin-top: 10px;">微信一键登录</button>
				<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image class="avatar" :src="avatarUrl" mode="aspectFit"></image>
				</button>
				<input type="nickname" class="weui-input" placeholder="请输入昵称" v-model="nickName" />
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
	let avatarUrl = ref()
	let nickName = ref()
	const onChooseAvatar = (e) => {
		console.log(e.detail);
		avatarUrl.value = e.detail.avatarUrl
	}

	const wxlogin = (() => {


		uni.login({
			"provider": "weixin",
			"onlyAuthorize": true, // 微信登录仅请求授权认证
			success: function(event) {
				const {
					code
				} = event
				console.log('code:', code);
				//客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
				uni.request({
					url: 'https://api.suxin23.cn/weixinlogin/login', //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {
						code: code
					},
					success: (res) => {
						//获得token完成登录
						// uni.setStorageSync('token',res.token)
						logindata.value = res.data
						if (res.data.code === 200) {
							msgType.value = "success"
							messageText.value = `登陆成功`
							message.value.open()
							logindata.value = res.data
							setTimeout(() => {
								uni.request({
									url: 'https://api.suxin23.cn/weixinlogin/verify', //仅为示例，并非真实接口地址。
									data: {
										openid: res.data.data.openid,
										session_key: res.data.data
											.session_key
									},
									success: (res) => {
										//获得token完成登录
										// uni.setStorageSync('token',res.token)
										logindata.value = res.data
										if (res.data.code === 200) {
											msgType.value = "success"
											messageText.value = res
												.data.msg
											message.value.open()
											logindata.value = res.data
										}
									}
								})
							}, 3000)

						}
					}
				});
			},
			fail: function(err) {
				// 登录授权失败  
				// err.code是错误码
			}
		})

	})

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
	.avatar-wrapper {
		margin-top: 10px;
		padding: 0;
		height: 200rpx;
		width: 200rpx;
	}

	.avatar {
		background: #fff;
		height: 200rpx;
		width: 200rpx;
	}
</style>