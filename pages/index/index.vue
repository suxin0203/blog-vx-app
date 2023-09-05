<template>
	<view class="content">
		<view :style="searchBarStyle">
<!-- 			    <uni-data-select
				style="margin: 0 10px;width: 100px;display: inline-block;"
			      v-model="selectvalue"
			      :localdata="selectdata"
			      @change="change"
			    ></uni-data-select> -->
			<uni-search-bar class="uni-mt-10" radius="100" placeholder="请输入想要搜的内容" v-model="keyword" clearButton="auto"
				cancelButton="none" @confirm="changeinput" />
		</view>
		<view class="uni-margin-wrap">
			<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="lbt" :current="current"
				:mode="default" :dots-styles="dotsStyles" field="content">
				<swiper class="swiper-box" @change="change" :current="current">
					<swiper-item v-for="(item, index) in lbt" :key="index">
						<view class="swiper-item" :class="'swiper-item' + index">
							<image class="lbt" :src="item.href"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>


		<uni-section title="文章" type="line" titleFontSize="18px">
						<uni-card :title="item.title" :extra="formatTime(item.create_time)" v-for="item in datalist" :key="item.id" @click="checkCategory(item.id)">
							<text class="uni-body">{{item.content}}..</text>
						</uni-card>
			
<!-- 			<uni-card :title="item.title" :extra="formatTime(item.create_time)" v-for="item in datalist" :key="item.id"
				@click="checkCategory(item.id)">
				<image mode="widthFix" style="width: 100%;margin-bottom: 5px;"
					src="https://api.suxin23.cn/upload/402407191945285.png"></image>
				<text class="uni-body">{{item.content}}..</text>
				<hr>
				<view slot="actions" class="card-actions">
					<view class="card-actions-item" @click="actionsClick('分享')">
						<uni-icons type="redo" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text">分享</text>
					</view>
					<view class="card-actions-item" @click="actionsClick('点赞')">
						<uni-icons type="heart" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text">点赞</text>
					</view>
					<view class="card-actions-item" @click="actionsClick('评论')">
						<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text">评论</text>
					</view>
				</view>
			</uni-card> -->

		</uni-section>
		<view class="fenye">
			<uni-pagination :current="detail_current" :total="total" title="标题文字" :pageSize="pageSize" :show-icon="true"
				@change="changeDetail" />
			<text class="example-info">当前页：{{ detail_current }}，数据总量：{{ total }}条，每页数据：{{ pageSize }}</text>
		</view>
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

	let searchBarStyle = ref('')
	let statusBarHeight = ref(0)
	let lbt = reactive([])
	let datalist = reactive([])
	let selectdata = reactive([
        { value: 0, text: "篮球" },
        { value: 1, text: "足球" },
        { value: 2, text: "游泳" },
      ])
	  let selectvalue = ref('')
	let current = ref(0)
	let total = ref(0)
	let detail_current = ref(1)
	let pageSize = ref(8)
	let keyword = ref("")
	let categoryId = ref(0)

	const clicknotices = ((id) => {
		uni.navigateTo({
			url: `/pages/component/blog-detail?id=${id}`
		});
	})

	const checkCategory = (id) => {
		uni.navigateTo({
			url: `/pages/component/blog-detail?id=${id}`
		});
	};
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

		return formattedDate + formattedTime
	};

	// 辅助函数，用于补零
	const padZero = (value) => {
		return value < 10 ? `0${value}` : value;
	};

	const fetchBlogData = (pages = 1, pageSizes = 8, keywords = "", categoryIds = 0, ) => {
		uni.request({
			url: 'https://api.suxin23.cn/blog/search',
			method: 'GET',
			data: {
				page: pages,
				pageSize: pageSizes,
				keyword: keywords,
				categoryId: categoryIds
			},
			success: (res) => {
				total.value = Number(res.data.data.count);
				detail_current.value = Number(res.data.data.page);
				pageSize.value = Number(res.data.data.pageSize);
				datalist.splice(0, datalist.length, ...res.data.data.rows); // 使用 splice 方法修改 datalist
			},
			fail: (err) => {
				console.error(err);
			}
		});
	};

	onLoad(() => {
		uni.getSystemInfo({
			success: (res) => {
				// 获取顶部导航栏的高度
				const statusBar = res.statusBarHeight || 0;
				const titleBar = res.titleBarHeight || 0;

				// 将获取到的高度保存在 data 中
				statusBarHeight.value = statusBar
				// console.log('statusBar:',statusBar,'titleBar:' ,titleBar);
				// console.log(statusBarHeight.value);
				console.log(wx.getMenuButtonBoundingClientRect());
				searchBarStyle.value =
					`margin-top: ${wx.getMenuButtonBoundingClientRect().top - 7}px; width: ${wx.getSystemInfoSync().screenWidth - wx.getMenuButtonBoundingClientRect().width - 10}px;`
			}
		});

	})

	onReady(() => {

		uni.request({
			url: 'https://api.suxin23.cn/lbt/imglist', //仅为示例，并非真实接口地址。
			success: (res) => {
				lbt.push(...res.data.data)

			}
		});

		fetchBlogData()
	})
	const changeinput = (() => {
		detail_current.value = 1
		fetchBlogData(detail_current.value, pageSize.value, keyword.value)
	})

	const change = ((e) => {
		current.value = e.detail.current
	})
	const changeDetail = ((e) => {
		console.log(e);
		detail_current.value = e.current
		fetchBlogData(detail_current.value, pageSize.value, keyword.value)
	})
</script>

<style>
	.content {
		width: 100%;
	}

	.uni-margin-wrap {
		width: 100%;
		height: auto;
	}

	.lbt {
		width: 100%;
	}

	.main {
		height: 100px;
		line-height: 100px;
		text-align: center;
		width: 100%;
	}

	.cardli {
		width: 95vw;
	}

	.card-actions {
		margin: 5px;
		display: flex;
		justify-content: space-between;
	}

	.uni-body {
		font-size: 16px;
	}

	.fenye {
		/* background-color: gainsboro; */
		/* margin: 30px 15px; */
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15px;
		text-align: center;
		background-color: #fff;
		justify-content: center;
		align-items: center;
	}

	.uni-searchbar {
		padding: 5px 10px !important;
	}
</style>