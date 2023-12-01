"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2 + _easycom_uni_card2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_forms + _easycom_uni_card)();
}
const _sfc_main = {
  __name: "userinfo",
  setup(__props) {
    const avatarUrl = common_vendor.ref(common_assets.avatar);
    const valiForm = common_vendor.ref(null);
    const username = common_vendor.ref("");
    common_vendor.onLoad(() => {
      const userinfo = common_vendor.index.getStorageSync("userinfo");
      avatarUrl.value = userinfo.avatar_url;
      baseFormData.value.nickname = userinfo.nickname;
      username.value = userinfo.username;
    });
    const onChooseAvatar = (e) => {
      console.log(e.detail);
      avatarUrl.value = e.detail.avatarUrl;
    };
    let sexs = common_vendor.ref([{
      text: "男",
      value: 0
    }, {
      text: "女",
      value: 1
    }, {
      text: "保密",
      value: 2
    }]);
    let baseFormData = common_vendor.ref({
      nickname: "",
      age: "",
      avatar_url: common_assets.avatar,
      sex: 2
    });
    let rules = {
      nickname: {
        rules: [{
          required: true,
          errorMessage: "姓名不能为空"
        }]
      },
      age: {
        rules: [{
          errorMessage: "年龄不能为空"
        }, {
          format: "number",
          errorMessage: "年龄只能输入数字"
        }]
      }
    };
    const submit = (ref) => {
      valiForm.value.validate().then((res) => {
        console.log("success", res);
        common_vendor.index.showToast({
          title: `修改成功`
        });
        common_vendor.index.navigateBack({
          delta: 1
          // 返回的页面数，这里设置为1表示返回上一级页面
        });
      }).catch((err) => {
        console.log("err", err);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: avatarUrl.value,
        b: common_vendor.o(onChooseAvatar),
        c: common_vendor.t(username.value),
        d: common_vendor.o(($event) => common_vendor.unref(baseFormData).nickname = $event),
        e: common_vendor.p({
          type: "nickname",
          placeholder: "请输入姓名",
          modelValue: common_vendor.unref(baseFormData).nickname
        }),
        f: common_vendor.p({
          label: "昵称",
          required: true,
          name: "nickname"
        }),
        g: common_vendor.o(($event) => common_vendor.unref(baseFormData).age = $event),
        h: common_vendor.p({
          placeholder: "请输入年龄",
          modelValue: common_vendor.unref(baseFormData).age
        }),
        i: common_vendor.p({
          label: "年龄",
          name: "age"
        }),
        j: common_vendor.o(($event) => common_vendor.unref(baseFormData).sex = $event),
        k: common_vendor.p({
          localdata: common_vendor.unref(sexs),
          modelValue: common_vendor.unref(baseFormData).sex
        }),
        l: common_vendor.p({
          label: "性别",
          name: "sex"
        }),
        m: common_vendor.sr(valiForm, "2c873d09-1,2c873d09-0", {
          "k": "valiForm"
        }),
        n: common_vendor.p({
          modelValue: common_vendor.unref(baseFormData),
          rules: common_vendor.unref(rules)
        }),
        o: common_vendor.o(($event) => submit())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/mySelfProjrct/blog-vx-app/blog-vx-app/pages/component/userinfo/userinfo.vue"]]);
wx.createPage(MiniProgramPage);
