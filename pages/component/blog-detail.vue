<template>
	<view class="main">
		<uni-card title="详细内容:" :extra="formatTime(detaildata.create_time)">
			<rich-text :nodes="detaildata.content"></rich-text>
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
	let detaildata = ref({})
	onLoad((options) => {
		let blogId = options.id; // 获取传递的博客id参数
		blogId = blogId.toString(); // 将 id 转换为字符串类型
		uni.request({
			url: 'https://api.suxin23.cn/blog/detail',
			method: 'GET',
			data: {
				id: blogId
			},
			success: (res) => {
				console.log(res.data.rows[0].content)
				detaildata.value = res.data.rows[0]
				// 设置导航栏标题
				uni.setNavigationBarTitle({
					title: detaildata.value.title
				});
			},
			fail: (err) => {
				console.error(err);
			}
		});
	})

	const formatTime = (timestamp) => {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = date.getMonth() + 1; // 月份从 0 开始，需要加 1
		const day = date.getDate();
		const hour = date.getHours();
		const minute = date.getMinutes();
		const second = date.getSeconds();

		const formattedDate = `${year}-${padZero(month)}-${padZero(day)}`;
		const formattedTime = `${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;

		return  formattedDate + formattedTime
	};

	// 辅助函数，用于补零
	const padZero = (value) => {
		return value < 10 ? `0${value}` : value;
	};
</script>

<style>
	.main {
		padding: 10px 0;
	}
</style>