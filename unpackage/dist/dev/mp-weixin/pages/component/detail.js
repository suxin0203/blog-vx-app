"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api = require("../../common/api.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    let detaildata = common_vendor.ref({});
    common_vendor.onLoad((options) => {
      common_api.get(`/articles/${options.id}`).then((res) => {
        detaildata.value = res.data.data[0];
        common_vendor.index.setNavigationBarTitle({
          title: detaildata.value.title
        });
      });
    });
    common_vendor.wx$1.showShareMenu({
      withShareTicket: true,
      menu: ["shareAppMessage", "shareTimeline"]
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(detaildata).content,
        b: common_vendor.p({
          title: "详细内容:",
          extra: common_vendor.unref(detaildata).created_at
        })
      };
    };
  }
};
_sfc_main.__runtimeHooks = 2;
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/component/detail.js.map
