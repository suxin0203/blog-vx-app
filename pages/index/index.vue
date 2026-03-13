<template>
	<view class="content">
		<view :style="searchBarStyle">
			<uni-search-bar class="uni-mt-10" radius="100" placeholder="请输入想要搜的内容" v-model="keyword" clearButton="auto"
				cancelButton="none" @confirm="changeinput()"   @clear="handleClear()"/>
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
	  <!-- 在列表底部添加加载状态提示 -->
	<view class="loading-container" v-if="loading">
	<text>加载中...</text>
	</view>
	<view class="no-more-container" v-if="noMoreData && datalist.length > 0">
	  <text>没有更多数据了</text>
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
		onReady,
		onReachBottom,
		onPullDownRefresh
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
	let loading = ref(false) // 加载状态
	let noMoreData = ref(false) // 是否没有更多数据
	
	const fetchBlogData = async (pages = 1, pageSizes = 8, keywords = "", categoryIds = 0, isLoadMore = false) => {
		if (loading.value) return;
		loading.value = true;
		
		try {
			const res = await get('/articles/', {
				page: pages,
				pageSize: pageSizes,
				keyword: keywords,
				categoryId: categoryIds
			});
			
			total.value = Number(res.data.pagination.total);
			detail_current.value = Number(res.data.pagination.page);
			pageSize.value = Number(res.data.pagination.pageSize);
			
			if (isLoadMore) {
				// 加载更多，追加数据
				datalist.value = [...datalist.value, ...res.data.data];
			} else {
				// 刷新，替换数据
				datalist.value = res.data.data;
			}
			
			// 检查是否还有更多数据
			noMoreData.value = datalist.value.length >= total.value;
		} finally {
			loading.value = false;
		}
	};

	const getSwiperList = () => {
		get('/upload/imglist').then(res => {
			lbt.value = res.data.data
		})
	}

	const checkCategory = (id) => {
		uni.navigateTo({
			url: `/pages/component/detail?id=${id}`
		});
	};
	
	const formatTime = (timestamp) => {
		timestamp = Date.parse(timestamp);
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hour = date.getHours();
		const minute = date.getMinutes();
		const second = date.getSeconds();

		const formattedDate = `${year}/${padZero(month)}/${padZero(day)}`;
		const formattedTime = `${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;
		return formattedDate + ' ' + formattedTime
	};

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
				const statusBar = res.statusBarHeight || 0;
				const titleBar = res.titleBarHeight || 0;
				statusBarHeight.value = statusBar
				searchBarStyle.value =
					`margin-top: ${wx.getMenuButtonBoundingClientRect().top - 7}px; width: ${wx.getSystemInfoSync().screenWidth - wx.getMenuButtonBoundingClientRect().width - 10}px;`
			}
		});
	})

	// 下拉刷新
	onPullDownRefresh(() => {
		console.log('触发下拉刷新');
		detail_current.value = 1;
		fetchBlogData(detail_current.value, pageSize.value, keyword.value)
			.finally(() => {
				uni.stopPullDownRefresh();
				uni.showToast({ title: '刷新成功', icon: 'none' });
			});
	});

	// 上拉加载更多
	onReachBottom(() => {
		if (noMoreData.value || loading.value) {
			uni.showToast({ title: '没有更多数据了', icon: 'none' });
			return;
		}
		
		console.log('触发上拉加载更多');
		detail_current.value += 1;
		fetchBlogData(detail_current.value, pageSize.value, keyword.value, categoryId.value, true);
	});

	const changeinput = (() => {
		console.log("changeinput事件")
		detail_current.value = 1
		fetchBlogData(detail_current.value, pageSize.value, keyword.value)
	})
	
	const handleClear = () => {
	  keyword.value = ''; // 清空关键词（实际上v-model已经自动处理了）
	  changeinput(); // 调用和搜索相同的逻辑
	};

	const change = ((e) => {
		current.value = e.detail.current
	})
	
	const changeDetail = ((e) => {
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
	
	.loading-container, .no-more-container {
	  padding: 20rpx;
	  text-align: center;
	  color: #999;
	  font-size: 28rpx;
	}
</style>