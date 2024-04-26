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
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_uni_notice_bar2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_select2 + _easycom_uni_forms2 + _easycom_uni_section2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_notice_bar + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_select + _easycom_uni_forms + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "utils",
  setup(__props) {
    let range = common_vendor.ref([]);
    let msgType = common_vendor.ref("");
    let messageText = common_vendor.ref("");
    const message = common_vendor.ref(null);
    let baseFormData = common_vendor.ref({
      title: "",
      category_id: 0,
      content: ""
    });
    let token = common_vendor.ref();
    token.value = common_vendor.index.getStorageSync("token");
    common_vendor.onLoad(() => {
      common_api.get("/categories/").then((res) => {
        if (res.data.code === 200) {
          const categories = res.data.data;
          range.value = categories.map((item) => {
            return { value: item.id, text: item.name };
          });
        }
      });
    });
    const sendArticle = () => {
      common_api.post("/articles/token/", baseFormData.value).then((res) => {
        if (res.data.code === 200) {
          msgType.value = "success";
        } else {
          msgType.value = "error";
        }
        messageText.value = res.data.message;
        message.value.open();
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: common_vendor.unref(msgType),
          message: common_vendor.unref(messageText),
          duration: 2e3
        }),
        b: common_vendor.sr(message, "4a0a866b-0", {
          "k": "message"
        }),
        c: common_vendor.p({
          type: "message"
        }),
        d: common_vendor.p({
          ["show-icon"]: true,
          scrollable: true,
          text: "如果你年轻的时候不 996，你什么时候可以 996？你一辈子没有 996，你觉得你就很骄傲了？这个世界上，我们每一个人都希望成功，都希望美好生活，都希望被尊重，我请问大家，你不付出超越别人的努力和时间，你怎么能够实现你想要的成功？"
        }),
        e: common_vendor.o(($event) => common_vendor.unref(baseFormData).title = $event),
        f: common_vendor.p({
          placeholder: "请输入标题",
          modelValue: common_vendor.unref(baseFormData).title
        }),
        g: common_vendor.p({
          label: "标题",
          required: true
        }),
        h: common_vendor.o(($event) => common_vendor.unref(baseFormData).category_id = $event),
        i: common_vendor.p({
          localdata: common_vendor.unref(range),
          placeholder: "请选择分类",
          modelValue: common_vendor.unref(baseFormData).category_id
        }),
        j: common_vendor.p({
          label: "分类",
          required: true
        }),
        k: common_vendor.o(($event) => common_vendor.unref(baseFormData).content = $event),
        l: common_vendor.p({
          type: "textarea",
          autoHeight: true,
          placeholder: "请输入文章内容",
          modelValue: common_vendor.unref(baseFormData).content
        }),
        m: common_vendor.p({
          label: "内容",
          required: true
        }),
        n: common_vendor.sr("baseForm", "4a0a866b-4,4a0a866b-3"),
        o: common_vendor.p({
          modelValue: common_vendor.unref(baseFormData)
        }),
        p: common_vendor.t(common_vendor.unref(token) ? "立 即 发 表" : "登陆后发表"),
        q: common_vendor.o(sendArticle),
        r: !common_vendor.unref(token),
        s: common_vendor.p({
          title: "发表文章",
          type: "line",
          titleFontSize: "18px"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/mySelfProjrct/blog-vx-app/blog-vx-app/pages/component/utils.vue"]]);
wx.createPage(MiniProgramPage);
