"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_uni_easyinput2 + _easycom_uni_section2 + _easycom_uni_popup_dialog2 + _easycom_uni_card2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_easyinput + _easycom_uni_section + _easycom_uni_popup_dialog + _easycom_uni_card)();
}
const _sfc_main = {
  __name: "me",
  setup(__props) {
    let msgType = common_vendor.ref("");
    let messageText = common_vendor.ref("");
    const message = common_vendor.ref(null);
    const inputDialog = common_vendor.ref(null);
    let logindata = common_vendor.ref({});
    let avatar_url = common_vendor.ref(common_assets.avatar);
    let total = common_vendor.ref(10);
    let nickname = common_vendor.ref("点击登录");
    common_vendor.onLoad(() => {
      console.log("个人中心");
      checklogin();
    });
    common_vendor.onMounted(() => {
      console.log("挂载监听");
      common_vendor.index.$on("loginSuccess", checklogin);
      common_vendor.index.$on("userinfoSuccess", updateInfo);
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("loginSuccess", checklogin);
      common_vendor.index.$off("userinfoSuccess", updateInfo);
    });
    const inputDialogToggle = () => {
      inputDialog.value.open();
    };
    const updateInfo = (userinfo) => {
      console.log("头像更新成功");
      avatar_url.value = userinfo.avatar_url;
      nickname.value = userinfo.nickname;
    };
    const checkArticle = () => {
      const userinfo = common_vendor.index.getStorageSync("userinfo");
      if (userinfo.is_root) {
        common_vendor.index.navigateTo({
          url: `/pages/component/add`
          // 跳转到登录页面
        });
      } else {
        msgType.value = "error";
        messageText.value = "网络繁忙";
        message.value.open();
      }
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
        d: common_vendor.o(_ctx.input),
        e: common_vendor.o(($event) => _ctx.value = $event),
        f: common_vendor.p({
          errorMessage: true,
          focus: true,
          placeholder: "请输入原密码",
          modelValue: _ctx.value
        }),
        g: common_vendor.p({
          title: "原密码",
          type: "line",
          padding: true
        }),
        h: common_vendor.o(_ctx.input),
        i: common_vendor.o(($event) => _ctx.value = $event),
        j: common_vendor.p({
          errorMessage: true,
          focus: true,
          placeholder: "请输入新密码",
          modelValue: _ctx.value
        }),
        k: common_vendor.o(_ctx.input),
        l: common_vendor.o(($event) => _ctx.value = $event),
        m: common_vendor.p({
          errorMessage: true,
          focus: true,
          placeholder: "请重新输入新密码",
          modelValue: _ctx.value
        }),
        n: common_vendor.p({
          title: "新密码",
          type: "line",
          padding: true
        }),
        o: common_vendor.p({
          title: "密码修改"
        }),
        p: common_vendor.sr(inputDialog, "8d85b864-2", {
          "k": "inputDialog"
        }),
        q: common_vendor.p({
          type: "dialog"
        }),
        r: common_vendor.unref(avatar_url),
        s: common_vendor.t(common_vendor.unref(nickname)),
        t: common_vendor.o(tologon),
        v: common_vendor.unref(nickname) !== "点击登录"
      }, common_vendor.unref(nickname) !== "点击登录" ? {
        w: common_vendor.t(common_vendor.unref(total)),
        x: common_vendor.t(common_vendor.unref(total))
      } : {}, {
        y: common_vendor.unref(nickname) !== "点击登录"
      }, common_vendor.unref(nickname) !== "点击登录" ? {
        z: common_vendor.o(checkArticle),
        A: common_vendor.o(inputDialogToggle),
        B: common_vendor.o(loginout)
      } : {}, {
        C: common_vendor.unref(nickname) !== "点击登录"
      }, common_vendor.unref(nickname) !== "点击登录" ? {
        D: common_vendor.o(loginout)
      } : {}, {
        E: common_vendor.unref(nickname) !== "点击登录"
      }, common_vendor.unref(nickname) !== "点击登录" ? {
        F: common_vendor.t(common_vendor.unref(logindata))
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/mySelfProjrct/blog-vx-app/blog-vx-app/pages/component/me.vue"]]);
wx.createPage(MiniProgramPage);
