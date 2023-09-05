"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = {
  __name: "blog-detail",
  setup(__props) {
    let detaildata = common_vendor.ref({});
    common_vendor.onLoad((options) => {
      let blogId = options.id;
      blogId = blogId.toString();
      common_vendor.index.request({
        url: "https://api.suxin23.cn/blog/detail",
        method: "GET",
        data: {
          id: blogId
        },
        success: (res) => {
          console.log(res.data.rows[0].content);
          detaildata.value = res.data.rows[0];
          common_vendor.index.setNavigationBarTitle({
            title: detaildata.value.title
          });
        },
        fail: (err) => {
          console.error(err);
        }
      });
    });
    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      const formattedDate = `${year}-${padZero(month)}-${padZero(day)}`;
      const formattedTime = `${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;
      return formattedDate + formattedTime;
    };
    const padZero = (value) => {
      return value < 10 ? `0${value}` : value;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(detaildata).content,
        b: common_vendor.p({
          title: "详细内容:",
          extra: formatTime(common_vendor.unref(detaildata).create_time)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/myProject/blog-vx-app/pages/component/blog-detail.vue"]]);
wx.createPage(MiniProgramPage);
