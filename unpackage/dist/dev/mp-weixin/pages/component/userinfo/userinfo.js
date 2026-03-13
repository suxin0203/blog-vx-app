"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api = require("../../../common/api.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = {
  __name: "userinfo",
  setup(__props) {
    const avatarUrl = common_vendor.ref(common_assets.avatar);
    common_vendor.ref(null);
    const username = common_vendor.ref("");
    let token = common_vendor.ref();
    let userinfo = common_vendor.ref();
    let updateImg = common_vendor.ref(false);
    token.value = common_vendor.index.getStorageSync("token");
    userinfo.value = common_vendor.index.getStorageSync("userinfo");
    common_vendor.onLoad(() => {
      updateImg.value = false;
      avatarUrl.value = userinfo.value.avatar_url;
      baseFormData.value.avatar_url = userinfo.value.avatar_url;
      baseFormData.value.nickname = userinfo.value.nickname;
      username.value = userinfo.value.username;
    });
    common_vendor.ref([
      {
        text: "男",
        value: 0
      },
      {
        text: "女",
        value: 1
      },
      {
        text: "保密",
        value: 2
      }
    ]);
    let baseFormData = common_vendor.ref({
      nickname: "",
      avatar_url: common_assets.avatar
    });
    const handleNicknameInput = (e) => {
      common_vendor.index.__f__("log", "at pages/component/userinfo/userinfo.vue:91", e.detail.value);
      baseFormData.value.nickname = e.detail.value;
    };
    const onChooseAvatar = (e) => {
      common_vendor.index.__f__("log", "at pages/component/userinfo/userinfo.vue:96", e.detail);
      avatarUrl.value = e.detail.avatarUrl;
      baseFormData.value.avatar_url = e.detail.avatarUrl;
      updateImg.value = true;
    };
    const submit = async () => {
      common_vendor.index.showLoading({
        title: "保存中..."
      });
      common_vendor.index.__f__("log", "at pages/component/userinfo/userinfo.vue:106", updateImg.value);
      try {
        if (updateImg.value) {
          const tempFilePath = avatarUrl.value;
          let response = await common_vendor.index.uploadFile({
            url: "https://api.suxin23.cn/upload/token/rich_editor_upload",
            filePath: tempFilePath,
            name: "file",
            // 与服务器约定的字段名
            header: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token.value}`
            }
          });
          common_vendor.index.__f__("log", "at pages/component/userinfo/userinfo.vue:119", "uploadFile返回的response:", response);
          if (response.statusCode == 200) {
            response = JSON.parse(response.data);
            avatarUrl.value = response.data.href;
            baseFormData.value.avatar_url = response.data.href;
          } else {
            common_vendor.index.__f__("log", "at pages/component/userinfo/userinfo.vue:126", "上传失败response:", response);
          }
        }
        const res = await common_api.put(
          `/users/token/${userinfo.value.id}`,
          baseFormData.value
        );
        common_vendor.index.__f__("log", "at pages/component/userinfo/userinfo.vue:135", "用户信息更新：", res.data);
        if (res.data.message === "更新成功") {
          userinfo.value.nickname = baseFormData.value.nickname;
          userinfo.value.avatar_url = baseFormData.value.avatar_url;
          common_vendor.index.__f__("log", "at pages/component/userinfo/userinfo.vue:139", userinfo.value);
          common_vendor.index.setStorageSync("userinfo", userinfo.value);
          common_vendor.index.$emit("userinfoSuccess", userinfo.value);
          common_vendor.index.navigateBack({
            delta: 1
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/component/userinfo/userinfo.vue:148", "error", error);
      }
      common_vendor.index.hideLoading();
    };
    return (_ctx, _cache) => {
      return {
        a: avatarUrl.value,
        b: common_vendor.o(onChooseAvatar),
        c: common_vendor.t(username.value),
        d: common_vendor.o([($event) => common_vendor.unref(baseFormData).nickname = $event.detail.value, handleNicknameInput]),
        e: common_vendor.unref(baseFormData).nickname,
        f: common_vendor.o(($event) => submit()),
        g: common_vendor.t(common_vendor.unref(baseFormData))
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/component/userinfo/userinfo.js.map
