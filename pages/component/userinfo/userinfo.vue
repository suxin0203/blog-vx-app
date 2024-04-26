<template>
  <div>
    <uni-card>
      <div style="margin: 20px">
        <button
          class="avatar-wrapper"
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >
          <image class="avatar" :src="avatarUrl" mode="aspectFit"></image>
        </button>
        <span
          style="
            display: inline-block;
            width: 100%;
            text-align: center;
            font-size: 18px;
            margin-top: 20px;
          "
          >{{ username }}</span
        >
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 25px 0;
        "
      >
        <span style="font-size: 18px; font-weight: 600">昵称：</span>
        <input
          v-model="baseFormData.nickname"
          type="nickname"
          @input="handleNicknameInput"
          class="weui-input"
          placeholder="请输入昵称"
        />
      </div>
      <button type="primary" @click="submit('valiForm')">提交</button>
    </uni-card>
    <uni-card>
      <text>{{ baseFormData }}</text>
    </uni-card>
  </div>
</template>

<script setup>
import { ref, toRef, reactive, onMounted, onUnmounted } from "vue";
import { onShow, onLoad, onReady } from "@dcloudio/uni-app";
import { post, get, put } from "../../../common/api";
import avatar from "../../../static/icon/user.png";

const avatarUrl = ref(avatar);
const valiForm = ref(null);
const username = ref("");
let token = ref();
let userinfo = ref();
let updateImg = ref(false);
token.value = uni.getStorageSync("token");
userinfo.value = uni.getStorageSync("userinfo");

onLoad(() => {
  updateImg.value = false;
  avatarUrl.value = userinfo.value.avatar_url;
  baseFormData.value.avatar_url = userinfo.value.avatar_url;
  baseFormData.value.nickname = userinfo.value.nickname;
  username.value = userinfo.value.username;
});

let sexs = ref([
  {
    text: "男",
    value: 0,
  },
  {
    text: "女",
    value: 1,
  },
  {
    text: "保密",
    value: 2,
  },
]);
let baseFormData = ref({
  nickname: "",
  avatar_url: avatar,
});

const handleNicknameInput = (e) => {
  console.log(e.detail.value);
  baseFormData.value.nickname = e.detail.value;
};

const onChooseAvatar = (e) => {
  console.log(e.detail);
  avatarUrl.value = e.detail.avatarUrl;
  baseFormData.value.avatar_url = e.detail.avatarUrl;
  updateImg.value = true;
};

const submit = async () => {
  uni.showLoading({
    title: "保存中...",
  });
  console.log(updateImg.value);
  try {
    if (updateImg.value) {
      const tempFilePath = avatarUrl.value;
      let response = await uni.uploadFile({
        url: "https://api.suxin23.cn/upload/token/rich_editor_upload",
        filePath: tempFilePath,
        name: "file", // 与服务器约定的字段名
        header: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token.value}`,
        },
      });
      console.log("response:", response);
      response = JSON.parse(response.data);
      console.log("response:", response);
      avatarUrl.value = response.data.href;
      baseFormData.value.avatar_url = response.data.href; // 更新上传后的头像地址
      // ... 其他提交逻辑，可以在这里添加
    }
    const res = await put(
      `/users/token/${userinfo.value.id}`,
      baseFormData.value
    );
    console.log(res.data);
    if (res.data.code === 200) {
      userinfo.value.nickname = baseFormData.value.nickname;
      userinfo.value.avatar_url = baseFormData.value.avatar_url;
      console.log(userinfo.value);
      uni.setStorageSync("userinfo", userinfo.value);
      // 触发登录成功事件，传递最新的用户信息
      uni.$emit("userinfoSuccess", userinfo.value);
      uni.navigateBack({
        delta: 1,
      });
    }
  } catch (error) {
    console.error("error", error);
  }
  uni.hideLoading();
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

.weui-input {
  border: 1px solid black;
  border-radius: 10px;
  height: 50px;
  flex: 1;
  padding-left: 20px;
}
</style>