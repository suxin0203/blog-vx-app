<template>
  <div>
    <view>
      <!-- 提示信息弹窗 -->
      <uni-popup ref="message" type="message">
        <uni-popup-message
          :type="msgType"
          :message="messageText"
          :duration="2000"
        ></uni-popup-message>
      </uni-popup>
    </view>
    <uni-notice-bar show-icon text="功能仅供测试，如有问题请及时反馈！" />
    <!-- 输入ID和活动类型 -->
    <uni-card title="二维码生成">
      <uni-forms ref="baseForm" :modelValue="baseFormData" label-position="top">
        <uni-forms-item label="活动ID:" required>
          <uni-easyinput
            v-model="baseFormData.eventID"
            placeholder="请输入活动ID"
          />
        </uni-forms-item>
        <uni-forms-item label="类型:" required>
          <!-- type= 3签到 4猜口令 11拉朋友 5抽奖 29 免费领  -->
          <uni-data-select
            v-model="baseFormData.type"
            :localdata="[
              { text: '签到', value: 3 },
              { text: '猜口令', value: 4 },
              { text: '邀请朋友', value: 11 },
              { text: '抽奖', value: 5 },
              { text: '直接领取', value: 29 },
            ]"
            placeholder="请选择活动类型"
          >
          </uni-data-select>
        </uni-forms-item>
        <uni-forms-item label="TOKEN:" required>
          <uni-easyinput
            type="password"
            v-model="baseFormData.token"
            placeholder="请输入账号TOKEN"
          ></uni-easyinput>
        </uni-forms-item>
        <button type="primary" @click="getinfo" style="margin-top: 10px">
          一键生成
        </button>
      </uni-forms>
    </uni-card>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { onShow, onLoad, onReady } from "@dcloudio/uni-app";
import { post, get } from "../../common/api";

let msgType = ref("");
let messageText = ref("");
const message = ref(null);
let baseFormData = ref({
  eventID: "6696",
  type: 29,
  token: "",
});

// 获取token
let token = ref();
token.value = uni.getStorageSync("token");

const openMessage = (value = "成功", status = "success") => {
  msgType.value = status;
  messageText.value = value;
  message.value.open();
};

const getinfo = async () => {
  let res = await post("/cbd/qrcode", baseFormData.value);
  if (res.code === 200) {
    openMessage(res.msg ? res.msg : "成功", "success");
    uni.previewImage({
      urls: [res.data],
    });
  } else {
    openMessage(res.msg ? res.msg : "失败", "error");
  }
};

onLoad(() => {});
</script>

<style>
.example {
  padding: 10px;
}

#editor {
  width: 100%;
  height: 300px;
  background-color: #cccccc;
}
</style>