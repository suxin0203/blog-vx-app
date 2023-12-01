<template>

	<uni-card>
		<view style="margin: 20px;">
			<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<image class="avatar" :src="avatarUrl" mode="aspectFit"></image>
			</button>
			<span style="display: inline-block;width: 100%;text-align: center;font-size: 18px;margin-top: 20px;">{{username}}</span>
		</view>

		<uni-forms ref="valiForm" :modelValue="baseFormData" :rules="rules">
			<uni-forms-item label="昵称" required name="nickname">
				<uni-easyinput v-model="baseFormData.nickname" type="nickname" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item label="年龄" name="age">
				<uni-easyinput v-model="baseFormData.age" placeholder="请输入年龄" />
			</uni-forms-item>
			<uni-forms-item label="性别" name="sex">
				<uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" />
			</uni-forms-item>
		</uni-forms>
		<button type="primary" @click="submit('valiForm')">提交</button>
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
	import avatar from '../../../static/icon/user.png';



	const avatarUrl = ref(avatar)
	const valiForm = ref(null)
	const username = ref('')



	onLoad(() => {
		const userinfo = uni.getStorageSync('userinfo');
		avatarUrl.value = userinfo.avatar_url
		baseFormData.value.nickname = userinfo.nickname
		username.value = userinfo.username
	})

	const onChooseAvatar = (e) => {
		console.log(e.detail);
		avatarUrl.value = e.detail.avatarUrl
	}

	let sexs = ref([{
		text: '男',
		value: 0
	}, {
		text: '女',
		value: 1
	}, {
		text: '保密',
		value: 2
	}])
	let baseFormData = ref({
		nickname: '',
		age: '',
		avatar_url: avatar,
		sex: 2,
	})

	let rules = {
		nickname: {
			rules: [{
				required: true,
				errorMessage: '姓名不能为空'
			}]
		},
		age: {
			rules: [{
				errorMessage: '年龄不能为空'
			}, {
				format: 'number',
				errorMessage: '年龄只能输入数字'
			}]
		}
	}


	const submit = (ref) => {
		valiForm.value.validate().then(res => {
			console.log('success', res);
			uni.showToast({
				title: `修改成功`
			});
		uni.navigateBack({
			delta: 1 // 返回的页面数，这里设置为1表示返回上一级页面
		});
		}).catch(err => {
			console.log('err', err);
		});
	};
</script>

<style>
	.avatar-wrapper {
		padding: 0;
		height: 200rpx;
		width: 200rpx;
		border-radius: 100rpx;
		background-color: #fff;
		border: 1rpx solid grey;

	}

	.avatar {
		background: #fff;
		height: 200rpx;
		width: 200rpx;
		border-radius: 100rpx;
	}
</style>