<template>
	<view class="content">
		<view class="uni-margin-wrap">
					<swiper class="swiper" circular :indicator-dots="true" autoplay="true" :interval="2000"
						:duration="duration">
						<swiper-item  v-for="i in lbt" :key="i.id">
							<image class="lbt" :src="i.image" ></image>
						</swiper-item>
					</swiper>
		</view>
		<view class="main">
			<text>208082474@qq.com</text>
		</view>
	</view>
</template>

<script setup>
import {ref ,reactive} from "vue"
import { onShow,onLoad } from '@dcloudio/uni-app';


let lbt = reactive([])

const test = ["https://s11.mogucdn.com/mlcdn/c45406/201126_0hgl23klege84596ljk0hgcc0g3f2_1060x367.jpg_750x9999.v1c7E.81.webp","https://s11.mogucdn.com/mlcdn/c45406/201126_0hgl23klege84596ljk0hgcc0g3f2_1060x367.jpg_750x9999.v1c7E.81.webp"]


onLoad(() => {
		uni.request({
		    url: 'https://www.fastmock.site/mock/9a8def60025031b7ca10fb38250fbea2/uniappTest/carousel', //仅为示例，并非真实接口地址。
		    success: (res) => {
		        // console.log(res.data);
				lbt.push(...res.data.data)


		    }
		});
		
})




	
</script>

<style>
	.content {
		width: 100%;
	}
	.uni-margin-wrap{
		width: 100%;
		height: auto;
	}
	.lbt{
		width: 100%;
	}
	.main{
		height: 100px;
		line-height: 100px;
		text-align: center;
		width: 100%;
	}
</style>
