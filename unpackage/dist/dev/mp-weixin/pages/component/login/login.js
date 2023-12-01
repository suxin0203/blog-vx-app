"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api = require("../../../common/api.js");
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_card2)();
}
const _easycom_uni_popup_message = () => "../../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_card)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    let msgType = common_vendor.ref("");
    let messageText = common_vendor.ref("");
    const message = common_vendor.ref(null);
    let register = common_vendor.ref(false);
    let baseFormData = common_vendor.ref({
      username: "admin",
      password: "123456"
    });
    let openid = common_vendor.ref("");
    let logindata = common_vendor.ref({});
    const openMessage = (value = "成功", status = "success") => {
      msgType.value = status;
      messageText.value = value;
      message.value.open();
    };
    const saveToken = (res) => {
      openMessage();
      common_vendor.index.setStorageSync("token", res.data.token);
      common_vendor.index.setStorageSync("userinfo", res.data.data);
      common_vendor.index.$emit("loginSuccess", res.data.data);
      common_vendor.index.navigateBack({
        delta: 1
        // 返回的页面数，这里设置为1表示返回上一级页面
      });
    };
    const wxlogin = () => {
      common_vendor.index.showLoading({
        title: "登录中..."
      });
      common_vendor.index.login({
        "provider": "weixin",
        "onlyAuthorize": true,
        // 微信登录仅请求授权认证
        success: async function(event) {
          let openidStatus = await common_api.get(`/wechat/openid/${event.code}`);
          let wechatStatus = await common_api.get(`/wechat/userinfo/${openidStatus.data.data.openid}`);
          logindata.value = wechatStatus.data;
          openid.value = openidStatus.data.data.openid;
          if (wechatStatus.data.code === 200) {
            let useinfoStatus = await common_api.get(`/wechat/userinfo/${wechatStatus.data.data.openid}`);
            logindata.value = useinfoStatus.data;
            if (useinfoStatus.data.code === 200) {
              saveToken(useinfoStatus);
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
            }
          } else {
            baseFormData.value.username = "";
            baseFormData.value.password = "";
            openMessage("该微信暂未绑定账号请先绑定", "warn");
            register.value = true;
          }
          common_vendor.index.hideLoading();
        }
      });
    };
    const login = async () => {
      common_vendor.wx$1.showLoading({
        title: "登录中..."
      });
      let loginStatus = await common_api.post("/users/login", {
        username: baseFormData.value.username,
        password: baseFormData.value.password,
        openid: openid.value
      });
      if (loginStatus.data.code === 200) {
        saveToken(loginStatus);
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
      } else {
        msgType.value = "error";
        messageText.value = `登录失败`;
        message.value.open();
      }
      common_vendor.index.hideLoading();
    };
    const wxregister = () => {
      common_api.post("/users/register", {
        username: baseFormData.value.username,
        password: baseFormData.value.password
      }).then((res) => {
        msgType.value = "success";
        messageText.value = res.data.message;
        message.value.open();
        res.data.code === 200 ? login() : "";
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: common_vendor.unref(msgType),
          message: common_vendor.unref(messageText),
          duration: 2e3
        }),
        b: common_vendor.sr(message, "289ecc7d-0", {
          "k": "message"
        }),
        c: common_vendor.p({
          type: "message"
        }),
        d: common_vendor.o(($event) => common_vendor.unref(baseFormData).username = $event),
        e: common_vendor.p({
          placeholder: "请输入账号",
          modelValue: common_vendor.unref(baseFormData).username
        }),
        f: common_vendor.p({
          label: "账号:",
          required: true
        }),
        g: common_vendor.o(($event) => common_vendor.unref(baseFormData).password = $event),
        h: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          modelValue: common_vendor.unref(baseFormData).password
        }),
        i: common_vendor.p({
          label: "密码:",
          required: true
        }),
        j: common_vendor.unref(register)
      }, common_vendor.unref(register) ? {
        k: common_vendor.o(wxregister)
      } : {}, {
        l: common_vendor.t(common_vendor.unref(register) ? "登录并绑定" : "登录"),
        m: common_vendor.o(login),
        n: !common_vendor.unref(register)
      }, !common_vendor.unref(register) ? {
        o: common_vendor.o(wxlogin)
      } : {}, {
        p: common_vendor.sr("baseForm", "289ecc7d-3,289ecc7d-2"),
        q: common_vendor.p({
          modelValue: common_vendor.unref(baseFormData),
          ["label-position"]: "top"
        }),
        r: common_vendor.p({
          title: "登录"
        }),
        s: common_vendor.t(common_vendor.unref(logindata))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/mySelfProjrct/blog-vx-app/blog-vx-app/pages/component/login/login.vue"]]);
wx.createPage(MiniProgramPage);
