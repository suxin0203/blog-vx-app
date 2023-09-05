"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_card2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_card)();
}
const _sfc_main = {
  __name: "me",
  setup(__props) {
    let msgType = common_vendor.ref("");
    let messageText = common_vendor.ref("");
    const message = common_vendor.ref(null);
    let baseFormData = common_vendor.ref({
      account: "admin",
      password: "123456"
    });
    let logindata = common_vendor.ref({});
    let avatarUrl = common_vendor.ref();
    let nickName = common_vendor.ref();
    const onChooseAvatar = (e) => {
      console.log(e.detail);
      avatarUrl.value = e.detail.avatarUrl;
    };
    const wxlogin = () => {
      common_vendor.index.login({
        "provider": "weixin",
        "onlyAuthorize": true,
        // 微信登录仅请求授权认证
        success: function(event) {
          const {
            code
          } = event;
          console.log("code:", code);
          common_vendor.index.request({
            url: "https://api.suxin23.cn/weixinlogin/login",
            //仅为示例，并非真实接口地址。
            method: "POST",
            data: {
              code
            },
            success: (res) => {
              logindata.value = res.data;
              if (res.data.code === 200) {
                msgType.value = "success";
                messageText.value = `登陆成功`;
                message.value.open();
                logindata.value = res.data;
                setTimeout(() => {
                  common_vendor.index.request({
                    url: "https://api.suxin23.cn/weixinlogin/verify",
                    //仅为示例，并非真实接口地址。
                    data: {
                      openid: res.data.data.openid,
                      session_key: res.data.data.session_key
                    },
                    success: (res2) => {
                      logindata.value = res2.data;
                      if (res2.data.code === 200) {
                        msgType.value = "success";
                        messageText.value = res2.data.msg;
                        message.value.open();
                        logindata.value = res2.data;
                      }
                    }
                  });
                }, 3e3);
              }
            }
          });
        },
        fail: function(err) {
        }
      });
    };
    const login = () => {
      common_vendor.index.request({
        url: "https://api.suxin23.cn/admin/login",
        method: "POST",
        data: {
          account: baseFormData.value.account,
          password: baseFormData.value.password
        },
        success: (res) => {
          console.log(res);
          if (res.data.code === 200) {
            msgType.value = "success";
            messageText.value = `登陆成功`;
            message.value.open();
            logindata.value = res.data;
          } else {
            msgType.value = "error";
            messageText.value = `登录失败`;
            message.value.open();
          }
        },
        fail: (err) => {
          console.error(err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: common_vendor.unref(msgType),
          message: common_vendor.unref(messageText),
          duration: 2e3
        }),
        b: common_vendor.sr(message, "11fcb8e0-0", {
          "k": "message"
        }),
        c: common_vendor.p({
          type: "message"
        }),
        d: common_vendor.o(($event) => common_vendor.unref(baseFormData).account = $event),
        e: common_vendor.p({
          placeholder: "请输入账号",
          modelValue: common_vendor.unref(baseFormData).account
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
        j: common_vendor.o(login),
        k: common_vendor.o(wxlogin),
        l: common_vendor.unref(avatarUrl),
        m: common_vendor.o(onChooseAvatar),
        n: common_vendor.unref(nickName),
        o: common_vendor.o(($event) => common_vendor.isRef(nickName) ? nickName.value = $event.detail.value : nickName = $event.detail.value),
        p: common_vendor.sr("baseForm", "11fcb8e0-3,11fcb8e0-2"),
        q: common_vendor.p({
          modelValue: common_vendor.unref(baseFormData),
          ["label-position"]: "top"
        }),
        r: common_vendor.p({
          title: "登录"
        }),
        s: common_vendor.t(common_vendor.unref(logindata))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/myProject/blog-vx-app/pages/component/me.vue"]]);
wx.createPage(MiniProgramPage);
