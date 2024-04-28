"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api = require("../../common/api.js");
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_uni_notice_bar2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_select2 + _easycom_uni_forms2 + _easycom_uni_card2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_notice_bar + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_select + _easycom_uni_forms + _easycom_uni_card)();
}
const _sfc_main = {
  __name: "utils",
  setup(__props) {
    let msgType = common_vendor.ref("");
    let messageText = common_vendor.ref("");
    const message = common_vendor.ref(null);
    let baseFormData = common_vendor.ref({
      eventID: "6696",
      type: 29,
      token: ""
    });
    let token = common_vendor.ref();
    token.value = common_vendor.index.getStorageSync("token");
    const openMessage = (value = "成功", status = "success") => {
      msgType.value = status;
      messageText.value = value;
      message.value.open();
    };
    const getinfo = async () => {
      common_vendor.index.showToast({
        title: "生成中...",
        duration: 2e3,
        icon: "loading"
      });
      let res = await common_api.get("/utils/", baseFormData.value);
      if (res.data.code === 200) {
        openMessage(res.data.msg ? res.data.msg : "成功", "success");
        common_vendor.index.previewImage({
          urls: [res.data.data.filePath],
          longPressActions: {
            itemList: ["发送给朋友", "保存图片"]
          }
        });
        common_vendor.index.hideToast();
      } else {
        openMessage(res.data.message, "error");
      }
    };
    common_vendor.onLoad(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: common_vendor.unref(msgType),
          message: common_vendor.unref(messageText),
          duration: 2e3
        }),
        b: common_vendor.sr(message, "e77b3136-0", {
          "k": "message"
        }),
        c: common_vendor.p({
          type: "message"
        }),
        d: common_vendor.p({
          ["show-icon"]: true,
          text: "功能仅供测试，如有问题请及时反馈！"
        }),
        e: common_vendor.o(($event) => common_vendor.unref(baseFormData).eventID = $event),
        f: common_vendor.p({
          placeholder: "请输入活动ID",
          modelValue: common_vendor.unref(baseFormData).eventID
        }),
        g: common_vendor.p({
          label: "活动ID:",
          required: true
        }),
        h: common_vendor.o(($event) => common_vendor.unref(baseFormData).type = $event),
        i: common_vendor.p({
          localdata: [{
            text: "签到",
            value: 3
          }, {
            text: "猜口令",
            value: 4
          }, {
            text: "邀请朋友",
            value: 11
          }, {
            text: "抽奖",
            value: 5
          }, {
            text: "直接领取",
            value: 29
          }],
          placeholder: "请选择活动类型",
          modelValue: common_vendor.unref(baseFormData).type
        }),
        j: common_vendor.p({
          label: "类型:",
          required: true
        }),
        k: common_vendor.o(($event) => common_vendor.unref(baseFormData).token = $event),
        l: common_vendor.p({
          placeholder: "请输入账号TOKEN",
          modelValue: common_vendor.unref(baseFormData).token
        }),
        m: common_vendor.p({
          label: "TOKEN:",
          required: true
        }),
        n: common_vendor.o(getinfo),
        o: common_vendor.sr("baseForm", "e77b3136-4,e77b3136-3"),
        p: common_vendor.p({
          modelValue: common_vendor.unref(baseFormData),
          ["label-position"]: "top"
        }),
        q: common_vendor.p({
          title: "CBD二维码生成"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/mySelfProjrct/blog-vx-app/blog-vx-app/pages/menu/utils.vue"]]);
wx.createPage(MiniProgramPage);
