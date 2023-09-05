"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  (_easycom_uni_search_bar2 + _easycom_uni_swiper_dot2 + _easycom_uni_card2 + _easycom_uni_section2 + _easycom_uni_pagination2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_pagination = () => "../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_swiper_dot + _easycom_uni_card + _easycom_uni_section + _easycom_uni_pagination)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let searchBarStyle = common_vendor.ref("");
    let statusBarHeight = common_vendor.ref(0);
    let lbt = common_vendor.reactive([]);
    let datalist = common_vendor.reactive([]);
    common_vendor.reactive([
      { value: 0, text: "篮球" },
      { value: 1, text: "足球" },
      { value: 2, text: "游泳" }
    ]);
    common_vendor.ref("");
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
      common_vendor.index.getSystemInfo({
        success: (res) => {
          const statusBar = res.statusBarHeight || 0;
          res.titleBarHeight || 0;
          statusBarHeight.value = statusBar;
          console.log(common_vendor.wx$1.getMenuButtonBoundingClientRect());
          searchBarStyle.value = `margin-top: ${common_vendor.wx$1.getMenuButtonBoundingClientRect().top - 7}px; width: ${common_vendor.wx$1.getSystemInfoSync().screenWidth - common_vendor.wx$1.getMenuButtonBoundingClientRect().width - 10}px;`;
        }
      });
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
        a: common_vendor.o(changeinput),
        b: common_vendor.o(($event) => common_vendor.isRef(keyword) ? keyword.value = $event : keyword = $event),
        c: common_vendor.p({
          radius: "100",
          placeholder: "请输入想要搜的内容",
          clearButton: "auto",
          cancelButton: "none",
          modelValue: common_vendor.unref(keyword)
        }),
        d: common_vendor.s(common_vendor.unref(searchBarStyle)),
        e: common_vendor.f(common_vendor.unref(lbt), (item, index, i0) => {
          return {
            a: item.href,
            b: common_vendor.n("swiper-item" + index),
            c: index
          };
        }),
        f: common_vendor.o(change),
        g: common_vendor.unref(current),
        h: common_vendor.o(_ctx.clickItem),
        i: common_vendor.p({
          info: common_vendor.unref(lbt),
          current: common_vendor.unref(current),
          mode: _ctx.default,
          ["dots-styles"]: _ctx.dotsStyles,
          field: "content"
        }),
        j: common_vendor.f(common_vendor.unref(datalist), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: item.id,
            c: common_vendor.o(($event) => checkCategory(item.id), item.id),
            d: "20f4664f-3-" + i0 + ",20f4664f-2",
            e: common_vendor.p({
              title: item.title,
              extra: formatTime(item.create_time)
            })
          };
        }),
        k: common_vendor.p({
          title: "文章",
          type: "line",
          titleFontSize: "18px"
        }),
        l: common_vendor.o(changeDetail),
        m: common_vendor.p({
          current: common_vendor.unref(detail_current),
          total: common_vendor.unref(total),
          title: "标题文字",
          pageSize: common_vendor.unref(pageSize),
          ["show-icon"]: true
        }),
        n: common_vendor.t(common_vendor.unref(detail_current)),
        o: common_vendor.t(common_vendor.unref(total)),
        p: common_vendor.t(common_vendor.unref(pageSize))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/myProject/blog-vx-app/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
