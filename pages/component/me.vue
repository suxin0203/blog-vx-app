<template>
	<view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
	<view class="example">
		<uni-card>
			<view class="userheader" @click="tologon">
				<image class="avatar" :src="avatar_url" mode="aspectFit"></image>
				<span style="font-size: 40rpx;">{{nickname}} ></span>
			</view>
		</uni-card>
		<uni-card v-if="nickname!=='点击登录'">
			<view class="countshow">
				<view class="article_count">
					总发表：{{total}}
				</view>
				<view class="article_count">
					总发言：{{total}}
				</view>
			</view>
		</uni-card>
		<uni-card v-if="nickname!=='点击登录'">
			<ul class="menu2">
				<li class="custom-li" @click="checkArticle">文章管理</li>
				<li class="custom-li">分类管理</li>
				<li class="custom-li">留言管理</li>
				<li class="custom-li">用户管理</li>
				<li class="custom-li">其他</li>
				<li class="custom-li" @click="loginout">退出</li>
			</ul>
		</uni-card>
		<uni-card v-if="nickname!=='点击登录'">
			<button type="primary" @click="loginout">注销</button>
		</uni-card>
	</view>
	<uni-card v-if="nickname!=='点击登录'">
		<text>{{logindata}}</text>
	</uni-card>
</template>

<script setup>
	import {
		ref,
		toRef,
		reactive,
		onMounted,
		onUnmounted
	} from "vue"
	import {
		onShow,
		onLoad,
		onReady
	} from '@dcloudio/uni-app';
	import avatar from '../../static/icon/user.png';

	let msgType = ref("")
	let messageText = ref("")
	const message = ref(null);
	let logindata = ref({})
	let avatar_url = ref(avatar)
	let total = ref(10)
	let nickname = ref('点击登录')
	const onChooseAvatar = (e) => {
		console.log(e.detail);
		avatar_url.value = e.detail.avatar_url
	}

	onLoad(() => {
		checklogin()
		// 监听登录成功事件

	})
	onMounted(() => {
		uni.$on('loginSuccess', checklogin);
	});

	onUnmounted(() => {
		uni.$off('loginSuccess', checklogin);
	});

	const checkArticle = (() => {
		// uni.navigateTo({
		// 	url: `/pages/component/login/login` // 跳转到登录页面
		// });
	})
	const readToken = () => {
		return new Promise((resolve, reject) => {
			// 从本地获取登录态的凭证
			const token = uni.getStorageSync('token');
			if (token) {
				// 对登录态的凭证进行校验，判断其是否有效
				// 可以根据自己的业务逻辑进行校验，例如检查令牌是否过期、是否被篡改等
				const isValid = true; // 根据实际情况设置登录态的有效性
				if (isValid) {
					// 登录态有效
					resolve();
				} else {
					// 登录态无效
					reject();
				}
			} else {
				// 本地没有登录态的凭证，视为登录态无效
				reject();
			}
		});
	};

	const checklogin = (() => {
		readToken()
			.then(() => {
				const userinfo = uni.getStorageSync('userinfo');
				// msgType.value = 'success'
				// messageText.value = '登录成功'
				// message.value.open()
				avatar_url.value = userinfo.avatar_url
				nickname.value = userinfo.nickname ? userinfo.nickname : userinfo.username
				// 用户已登录，执行相关操作
				logindata.value = userinfo;
			})
			.catch(() => {
				// 用户未登录或登录态已过期，引导用户进行登录操作
				uni.navigateTo({
					url: `/pages/component/login/login` // 跳转到登录页面
				});
			});
	})

	const loginout = (() => {
		// 删除本地存储的 token 和 userinfo
		uni.removeStorageSync('token');
		uni.removeStorageSync('userinfo');
		avatar_url.value = avatar
		nickname.value = '点击登录'
		logindata.value = ''
		uni.reLaunch({
		  url: '/pages/index/index', // 刷新后打开的页面路径
		  success: () => {
		    console.log('uni-app刷新成功');
		  },
		  fail: (error) => {
		    console.error('uni-app刷新失败', error);
		  }
		});
	})

	const tologon = (() => {
		readToken().then(() => {
			uni.navigateTo({
				url: `/pages/component/userinfo/userinfo` // 跳转到登录页面
			});
		}).catch(() => {
			uni.navigateTo({
				url: `/pages/component/login/login` // 跳转到登录页面
			});
		})
	})
</script>

<style>
	.example {
		margin-top: 40px
	}

	.userheader {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.avatar-wrapper {
		margin-top: 10px;
		padding: 0;
		height: 100rpx;
		width: 100rpx;
	}

	.avatar {
		background: #fff;
		height: 100rpx;
		width: 100rpx;
	}

	.countshow {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.article_count {
		height: 100rpx;
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		font-weight: 600;
	}

	.article_count:first-child {
		border-left: 2px solid grey;
		border-radius: 10px;
	}

	.article_count:last-child {
		border-right: 2px solid grey;
		border-radius: 10px;
	}

/* 	.article_count {
		border-right: 2px solid grey;
	} */

	.custom-li {
		padding-left: 20px;
		height: 60px;
		font-size: 16px;
		line-height: 60px;
		border-radius: 15px;
		border-bottom: 1px solid gray;
		/* background-color: #3F857A; */
		margin-top: 5px;
	}

	.custom-li:hover {
		/* 添加点击效果，例如改变背景色或添加阴影 */
		background-color: #f0f0f0;
	}
</style>