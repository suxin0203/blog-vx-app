<template>
<div>
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
					<uni-easyinput v-model="baseFormData.username" placeholder="请输入账号" />
				</uni-forms-item>
				<uni-forms-item label="密码:" required>
					<uni-easyinput type="password" v-model="baseFormData.password" placeholder="请输入密码"></uni-easyinput>
				</uni-forms-item>
				<button type="primary" v-if="register" @click="wxregister" style="margin-top: 40px;">注册并绑定</button>
				<button type="primary" @click="login" style="margin-top: 10px;">{{register?'登录并绑定':'登录'}}</button>
				<button type="primary" v-if="!register" @click="wxlogin" style="margin-top: 10px;">微信一键登录</button>

			</uni-forms>
		</uni-card>
	</view>
	<uni-card>
		<text>{{logindata}}</text>
	</uni-card>
</div>
</template>

<script setup>
	import {
		get,
		post
	} from '@/common/api.js';
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
	let register = ref(false)
	let baseFormData = ref({
		username: "admin",
		password: "123456",
	})
	let openid = ref('')
	let logindata = ref({})

	const openMessage = ((value = '成功', status = 'success', ) => {
		msgType.value = status
		messageText.value = value
		message.value.open()
	})

	// 获得token完成登录
	const saveToken = ((res) => {
		openMessage()
		uni.setStorageSync('token', res.data
			.token)
		uni.setStorageSync('userinfo', res.data
			.data)
		// 触发登录成功事件，传递最新的用户信息
		uni.$emit('loginSuccess', res.data
			.data);
		uni.navigateBack({
			delta: 1 // 返回的页面数，这里设置为1表示返回上一级页面
		});
	})

	const wxlogin = (() => {
		uni.showLoading({
			title: '登录中...',
		})
		uni.login({
			"provider": "weixin",
			"onlyAuthorize": true, // 微信登录仅请求授权认证
			success: async function(event) {
				//客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
				let openidStatus = await get(`/wechat/openid/${event.code}`)
				let wechatStatus = await get(`/wechat/userinfo/${openidStatus.data.data.openid}`)
				logindata.value = wechatStatus.data
				openid.value = openidStatus.data.data.openid
				if (wechatStatus.data.code === 200) {
					let useinfoStatus = await get(`/wechat/userinfo/${wechatStatus.data.data.openid}`)
					logindata.value = useinfoStatus.data
					if (useinfoStatus.data.code === 200) {
						saveToken(useinfoStatus)
						uni.reLaunch({
							url: '/pages/component/me', // 刷新后打开的页面路径
							success: () => {
								console.log('uni-app刷新成功');
							},
							fail: (error) => {
								console.error('uni-app刷新失败', error);
							}
						});
					}
				} else {
					baseFormData.value.username = ''
					baseFormData.value.password = ''
					openMessage('该微信暂未绑定账号请先绑定', 'warn')
					register.value = true
				}
				uni.hideLoading()
			}
		})

	})

	const login = (async () => {
		wx.showLoading({
			title: '登录中...',
		})

		let loginStatus = await post('/users/login', {
			username: baseFormData.value.username,
			password: baseFormData.value.password,
			openid: openid.value
		})
		if (loginStatus.data.code === 200) {
			saveToken(loginStatus)
			uni.reLaunch({
				url: '/pages/component/me', // 刷新后打开的页面路径
				success: () => {
					console.log('uni-app刷新成功');
				},
				fail: (error) => {
					console.error('uni-app刷新失败', error);
				}
			});
		} else {
			msgType.value = "error"
			messageText.value = `登录失败`
			message.value.open()
		}
		uni.hideLoading()
	})


	const wxregister = (() => {
		post('/users/register', {
			username: baseFormData.value.username,
			password: baseFormData.value.password,
		}).then((res) => {
			msgType.value = "success"
			messageText.value = res.data.message
			message.value.open()
			res.data.code === 200 ? login() : ''
		})
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