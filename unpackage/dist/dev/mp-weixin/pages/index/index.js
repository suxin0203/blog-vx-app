"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let lbt = common_vendor.reactive([]);
    common_vendor.onLoad(() => {
      common_vendor.index.request({
        url: "https://www.fastmock.site/mock/9a8def60025031b7ca10fb38250fbea2/uniappTest/carousel",
        success: (res) => {
          lbt.push(...res.data.data);
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(lbt), (i, k0, i0) => {
          return {
            a: i.image,
            b: i.id
          };
        }),
        b: _ctx.duration
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/\u684C\u9762/uniapp\u9879\u76EE/TestProject/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
