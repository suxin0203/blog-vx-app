"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  (_easycom_uni_swiper_dot2 + _easycom_uni_easyinput2 + _easycom_uni_section2 + _easycom_uni_icons2 + _easycom_uni_card2 + _easycom_uni_pagination2)();
}
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_pagination = () => "../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
if (!Math) {
  (_easycom_uni_swiper_dot + _easycom_uni_easyinput + _easycom_uni_section + _easycom_uni_icons + _easycom_uni_card + _easycom_uni_pagination)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let lbt = common_vendor.reactive([]);
    let datalist = common_vendor.reactive([]);
    let current = common_vendor.ref(0);
    let total = common_vendor.ref(0);
    let detail_current = common_vendor.ref(1);
    let pageSize = common_vendor.ref(8);
    let keyword = common_vendor.ref("");
    common_vendor.ref(0);
    const checkCategory = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/component/blog-detail?id=${id}`
      });
    };
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
    const fetchBlogData = (pages = 1, pageSizes = 8, keywords = "", categoryIds = 0) => {
      common_vendor.index.request({
        url: "https://api.suxin23.cn/blog/search",
        method: "GET",
        data: {
          page: pages,
          pageSize: pageSizes,
          keyword: keywords,
          categoryId: categoryIds
        },
        success: (res) => {
          total.value = Number(res.data.data.count);
          detail_current.value = Number(res.data.data.page);
          pageSize.value = Number(res.data.data.pageSize);
          datalist.splice(0, datalist.length, ...res.data.data.rows);
        },
        fail: (err) => {
          console.error(err);
        }
      });
    };
    common_vendor.onLoad(() => {
    });
    common_vendor.onReady(() => {
      common_vendor.index.request({
        url: "https://api.suxin23.cn/lbt/imglist",
        //仅为示例，并非真实接口地址。
        success: (res) => {
          lbt.push(...res.data.data);
        }
      });
      fetchBlogData();
    });
    const changeinput = () => {
      detail_current.value = 1;
      fetchBlogData(detail_current.value, pageSize.value, keyword.value);
    };
    const change = (e) => {
      current.value = e.detail.current;
    };
    const changeDetail = (e) => {
      console.log(e);
      detail_current.value = e.current;
      fetchBlogData(detail_current.value, pageSize.value, keyword.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(lbt), (item, index, i0) => {
          return {
            a: item.href,
            b: common_vendor.n("swiper-item" + index),
            c: index
          };
        }),
        b: common_vendor.o(change),
        c: common_vendor.unref(current),
        d: common_vendor.o(_ctx.clickItem),
        e: common_vendor.p({
          info: common_vendor.unref(lbt),
          current: common_vendor.unref(current),
          mode: _ctx.default,
          ["dots-styles"]: _ctx.dotsStyles,
          field: "content"
        }),
        f: common_vendor.o(changeinput),
        g: common_vendor.o(($event) => common_vendor.isRef(keyword) ? keyword.value = $event : keyword = $event),
        h: common_vendor.p({
          prefixIcon: "search",
          placeholder: "请输入想要搜的内容",
          modelValue: common_vendor.unref(keyword)
        }),
        i: common_vendor.p({
          title: "搜索",
          type: "line",
          padding: true,
          titleFontSize: "18px"
        }),
        j: common_vendor.f(common_vendor.unref(datalist), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: "d8f39e2c-5-" + i0 + "," + ("d8f39e2c-4-" + i0),
            c: common_vendor.o(($event) => _ctx.actionsClick("分享"), item.id),
            d: "d8f39e2c-6-" + i0 + "," + ("d8f39e2c-4-" + i0),
            e: common_vendor.o(($event) => _ctx.actionsClick("点赞"), item.id),
            f: "d8f39e2c-7-" + i0 + "," + ("d8f39e2c-4-" + i0),
            g: common_vendor.o(($event) => _ctx.actionsClick("评论"), item.id),
            h: item.id,
            i: common_vendor.o(($event) => checkCategory(item.id), item.id),
            j: "d8f39e2c-4-" + i0 + ",d8f39e2c-3",
            k: common_vendor.p({
              title: item.title,
              extra: formatTime(item.create_time)
            })
          };
        }),
        k: common_vendor.p({
          type: "redo",
          size: "18",
          color: "#999"
        }),
        l: common_vendor.p({
          type: "heart",
          size: "18",
          color: "#999"
        }),
        m: common_vendor.p({
          type: "chatbubble",
          size: "18",
          color: "#999"
        }),
        n: common_vendor.p({
          title: "文章",
          type: "line",
          titleFontSize: "18px"
        }),
        o: common_vendor.o(changeDetail),
        p: common_vendor.p({
          current: common_vendor.unref(detail_current),
          total: common_vendor.unref(total),
          title: "标题文字",
          pageSize: common_vendor.unref(pageSize),
          ["show-icon"]: true
        }),
        q: common_vendor.t(common_vendor.unref(detail_current)),
        r: common_vendor.t(common_vendor.unref(total)),
        s: common_vendor.t(common_vendor.unref(pageSize))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/Git_项目/vxapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
