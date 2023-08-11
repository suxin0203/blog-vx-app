"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_notice_bar2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_select2 + _easycom_uni_forms2 + _easycom_uni_section2)();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_notice_bar + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_select + _easycom_uni_forms + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "add",
  setup(__props) {
    let baseFormData = common_vendor.reactive([]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-icon"]: true,
          scrollable: true,
          text: "如果你年轻的时候不 996，你什么时候可以 996？你一辈子没有 996，你觉得你就很骄傲了？这个世界上，我们每一个人都希望成功，都希望美好生活，都希望被尊重，我请问大家，你不付出超越别人的努力和时间，你怎么能够实现你想要的成功？"
        }),
        b: common_vendor.o(($event) => common_vendor.unref(baseFormData).name = $event),
        c: common_vendor.p({
          placeholder: "请输入标题",
          modelValue: common_vendor.unref(baseFormData).name
        }),
        d: common_vendor.p({
          label: "标题",
          required: true
        }),
        e: common_vendor.o(_ctx.change),
        f: common_vendor.o(($event) => common_vendor.unref(baseFormData).class = $event),
        g: common_vendor.p({
          localdata: _ctx.range,
          placeholder: "请选择分类",
          modelValue: common_vendor.unref(baseFormData).class
        }),
        h: common_vendor.p({
          label: "分类",
          required: true
        }),
        i: common_vendor.o(($event) => common_vendor.unref(baseFormData).introduction = $event),
        j: common_vendor.p({
          type: "textarea",
          autoHeight: true,
          placeholder: "请输入文章内容",
          modelValue: common_vendor.unref(baseFormData).introduction
        }),
        k: common_vendor.p({
          label: "内容",
          required: true
        }),
        l: common_vendor.sr("baseForm", "6d86d838-2,6d86d838-1"),
        m: common_vendor.p({
          modelValue: common_vendor.unref(baseFormData)
        }),
        n: common_vendor.p({
          title: "发表文章",
          type: "line",
          titleFontSize: "18px"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/Git_项目/vxapp/pages/component/add.vue"]]);
wx.createPage(MiniProgramPage);
