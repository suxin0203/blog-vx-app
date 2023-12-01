"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_uni_card2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_card)();
}
const _sfc_main = {
  __name: "me",
  setup(__props) {
    let msgType = common_vendor.ref("");
    let messageText = common_vendor.ref("");
    const message = common_vendor.ref(null);
    let logindata = common_vendor.ref({});
    let avatar_url = common_vendor.ref(common_assets.avatar);
    let total = common_vendor.ref(10);
    let nickname = common_vendor.ref("点击登录");
    common_vendor.onLoad(() => {
      checklogin();
    });
    common_vendor.onMounted(() => {
      common_vendor.index.$on("loginSuccess", checklogin);
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("loginSuccess", checklogin);
    });
    const checkArticle = () => {
    };
    const readToken = () => {
      return new Promise((resolve, reject) => {
        const token = common_vendor.index.getStorageSync("token");
        if (token) {
          {
            resolve();
          }
        } else {
          reject();
        }
      });
    };
    const checklogin = () => {
      readToken().then(() => {
        const userinfo = common_vendor.index.getStorageSync("userinfo");
        avatar_url.value = userinfo.avatar_url;
        nickname.value = userinfo.nickname ? userinfo.nickname : userinfo.username;
        logindata.value = userinfo;
      }).catch(() => {
        common_vendor.index.navigateTo({
          url: `/pages/component/login/login`
          // 跳转到登录页面
        });
      });
    };
    const loginout = () => {
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.removeStorageSync("userinfo");
      avatar_url.value = common_assets.avatar;
      nickname.value = "点击登录";
      logindata.value = "";
      common_vendor.index.reLaunch({
        url: "/pages/index/index",
        // 刷新后打开的页面路径
        success: () => {
          console.log("uni-app刷新成功");
        },
        fail: (error) => {
          console.error("uni-app刷新失败", error);
        }
      });
    };
    const tologon = () => {
      readToken().then(() => {
        common_vendor.index.navigateTo({
          url: `/pages/component/userinfo/userinfo`
          // 跳转到登录页面
        });
      }).catch(() => {
        common_vendor.index.navigateTo({
          url: `/pages/component/login/login`
          // 跳转到登录页面
        });
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: common_vendor.unref(msgType),
          message: common_vendor.unref(messageText),
          duration: 2e3
        }),
        b: common_vendor.sr(message, "8d85b864-0", {
          "k": "message"
        }),
        c: common_vendor.p({
          type: "message"
        }),
        d: common_vendor.unref(avatar_url),
        e: common_vendor.t(common_vendor.unref(nickname)),
        f: common_vendor.o(tologon),
        g: common_vendor.unref(nickname) !== "点击登录"
      }, common_vendor.unref(nickname) !== "点击登录" ? {
        h: common_vendor.t(common_vendor.unref(total)),
        i: common_vendor.t(common_vendor.unref(total))
      } : {}, {
        j: common_vendor.unref(nickname) !== "点击登录"
      }, common_vendor.unref(nickname) !== "点击登录" ? {
        k: common_vendor.o(checkArticle),
        l: common_vendor.o(loginout)
      } : {}, {
        m: common_vendor.unref(nickname) !== "点击登录"
      }, common_vendor.unref(nickname) !== "点击登录" ? {
        n: common_vendor.o(loginout)
      } : {}, {
        o: common_vendor.unref(nickname) !== "点击登录"
      }, common_vendor.unref(nickname) !== "点击登录" ? {
        p: common_vendor.t(common_vendor.unref(logindata))
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/mySelfProjrct/blog-vx-app/blog-vx-app/pages/component/me.vue"]]);
wx.createPage(MiniProgramPage);
