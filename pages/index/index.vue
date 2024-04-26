<template>
	<view class="content">
		<view :style="searchBarStyle">
			<uni-search-bar class="uni-mt-10" radius="100" placeholder="请输入想要搜的内容" v-model="keyword" clearButton="auto"
				cancelButton="none" @confirm="changeinput" />
		</view>
		<view class="uni-margin-wrap">
			<uni-swiper-dot class="uni-swiper-dot-box" :info="lbt" :current="current" field="content">
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
			<uni-card :title="item.title" :extra="formatTime(item.created_at)" v-for="item in datalist" :key="item.id"
				@click="checkCategory(item.id)">
				<text class="uni-body" style="font-size: 12px;color:gray">{{item.content}}..</text>
			</uni-card>


		</uni-section>
		<view class="fenye">
			<uni-pagination :current="detail_current" :total="total" :pageSize="pageSize" :show-icon="true"
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
	import {
		post,
		get
	} from "../../common/api";

	let searchBarStyle = ref('')
	let statusBarHeight = ref(0)
	let lbt = ref([])
	let datalist = ref([])
	let selectvalue = ref('')
	let current = ref(0)
	let total = ref(0)
	let detail_current = ref(1)
	let pageSize = ref(8)
	let keyword = ref("")
	let categoryId = ref(0)

	const fetchBlogData = (pages = 1, pageSizes = 8, keywords = "", categoryIds = 0, ) => {
		get('/articles/', {
			page: pages,
			pageSize: pageSizes,
			keyword: keywords,
			categoryId: categoryIds
		}).then(res => {
			total.value = Number(res.data.pagination.total);
			detail_current.value = Number(res.data.pagination.page);
			pageSize.value = Number(res.data.pagination.pageSize);
			datalist.value = res.data.data
		})
	};

	const getSwiperList = () => {
		get('/upload/imglist').then(res => {
			// console.log('获取接口轮播图', res.data.data)
			lbt.value = res.data.data
		})
	}



	const checkCategory = (id) => {
		uni.navigateTo({
			url: `/pages/component/detail?id=${id}`
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

		// yyyy/MM/dd HH:mm:ss
		const formattedDate = `${year}/${padZero(month)}/${padZero(day)}`;
		const formattedTime = `${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;

		return formattedDate + ' ' + formattedTime
	};

	// 辅助函数，用于补零
	const padZero = (value) => {
		return value < 10 ? `0${value}` : value;
	};



	let onShareAppMessage =
		uni.showShareMenu({
			withShareTicket: true,
			menu: ['shareAppMessage', 'shareTimeline']
		})

	onLoad(() => {
		fetchBlogData()
		getSwiperList()
		
		uni.getSystemInfo({
			success: (res) => {
				// 获取顶部导航栏的高度
				const statusBar = res.statusBarHeight || 0;
				const titleBar = res.titleBarHeight || 0;
				// 将获取到的高度保存在 data 中
				statusBarHeight.value = statusBar
				searchBarStyle.value =
					`margin-top: ${wx.getMenuButtonBoundingClientRect().top - 7}px; width: ${wx.getSystemInfoSync().screenWidth - wx.getMenuButtonBoundingClientRect().width - 10}px;`
			}
		});
	})



	const changeinput = (() => {
		detail_current.value = 1
		fetchBlogData(detail_current.value, pageSize.value, keyword.value)
	})

	const change = ((e) => {
		current.value = e.detail.current
	})
	const changeDetail = ((e) => {
		// console.log(e);
		detail_current.value = e.current
		fetchBlogData(detail_current.value, pageSize.value, keyword.value)
	})
</script>

<style>
	.content {
		width: 100%;
	}

	.uni-margin-wrap {
		width: 100vw;
		height: auto;
	}

	.swiper-box {
		width: 100vw;
		min-height: 36vw;
	}

	.lbt {
		width: 100vw;
		height: 35.89vw;
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