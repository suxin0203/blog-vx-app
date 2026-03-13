"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api = require("../../common/api.js");
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
    let lbt = common_vendor.ref([]);
    let datalist = common_vendor.ref([]);
    common_vendor.ref("");
    let current = common_vendor.ref(0);
    let total = common_vendor.ref(0);
    let detail_current = common_vendor.ref(1);
    let pageSize = common_vendor.ref(8);
    let keyword = common_vendor.ref("");
    let categoryId = common_vendor.ref(0);
    let loading = common_vendor.ref(false);
    let noMoreData = common_vendor.ref(false);
    const fetchBlogData = async (pages = 1, pageSizes = 8, keywords = "", categoryIds = 0, isLoadMore = false) => {
      if (loading.value)
        return;
      loading.value = true;
      try {
        const res = await common_api.get("/articles/", {
          page: pages,
          pageSize: pageSizes,
          keyword: keywords,
          categoryId: categoryIds
        });
        total.value = Number(res.data.pagination.total);
        detail_current.value = Number(res.data.pagination.page);
        pageSize.value = Number(res.data.pagination.pageSize);
        if (isLoadMore) {
          datalist.value = [...datalist.value, ...res.data.data];
        } else {
          datalist.value = res.data.data;
        }
        noMoreData.value = datalist.value.length >= total.value;
      } finally {
        loading.value = false;
      }
    };
    const getSwiperList = () => {
      common_api.get("/upload/imglist").then((res) => {
        lbt.value = res.data.data;
      });
    };
    const checkCategory = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/component/detail?id=${id}`
      });
    };
    const formatTime = (timestamp) => {
      timestamp = Date.parse(timestamp);
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      const formattedDate = `${year}/${padZero(month)}/${padZero(day)}`;
      const formattedTime = `${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;
      return formattedDate + " " + formattedTime;
    };
    const padZero = (value) => {
      return value < 10 ? `0${value}` : value;
    };
    common_vendor.index.showShareMenu({
      withShareTicket: true,
      menu: ["shareAppMessage", "shareTimeline"]
    });
    common_vendor.onLoad(() => {
      fetchBlogData();
      getSwiperList();
      common_vendor.index.getSystemInfo({
        success: (res) => {
          const statusBar = res.statusBarHeight || 0;
          res.titleBarHeight || 0;
          statusBarHeight.value = statusBar;
          searchBarStyle.value = `margin-top: ${common_vendor.wx$1.getMenuButtonBoundingClientRect().top - 7}px; width: ${common_vendor.wx$1.getSystemInfoSync().screenWidth - common_vendor.wx$1.getMenuButtonBoundingClientRect().width - 10}px;`;
        }
      });
    });
    common_vendor.onPullDownRefresh(() => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:159", "触发下拉刷新");
      detail_current.value = 1;
      fetchBlogData(detail_current.value, pageSize.value, keyword.value).finally(() => {
        common_vendor.index.stopPullDownRefresh();
        common_vendor.index.showToast({ title: "刷新成功", icon: "none" });
      });
    });
    common_vendor.onReachBottom(() => {
      if (noMoreData.value || loading.value) {
        common_vendor.index.showToast({ title: "没有更多数据了", icon: "none" });
        return;
      }
      common_vendor.index.__f__("log", "at pages/index/index.vue:175", "触发上拉加载更多");
      detail_current.value += 1;
      fetchBlogData(detail_current.value, pageSize.value, keyword.value, categoryId.value, true);
    });
    const changeinput = () => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:181", "changeinput事件");
      detail_current.value = 1;
      fetchBlogData(detail_current.value, pageSize.value, keyword.value);
    };
    const handleClear = () => {
      keyword.value = "";
      changeinput();
    };
    const change = (e) => {
      current.value = e.detail.current;
    };
    const changeDetail = (e) => {
      detail_current.value = e.current;
      fetchBlogData(detail_current.value, pageSize.value, keyword.value);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => changeinput()),
        b: common_vendor.o(($event) => handleClear()),
        c: common_vendor.o(($event) => common_vendor.isRef(keyword) ? keyword.value = $event : keyword = $event),
        d: common_vendor.p({
          radius: "100",
          placeholder: "请输入想要搜的内容",
          clearButton: "auto",
          cancelButton: "none",
          modelValue: common_vendor.unref(keyword)
        }),
        e: common_vendor.s(common_vendor.unref(searchBarStyle)),
        f: common_vendor.f(common_vendor.unref(lbt), (item, index, i0) => {
          return {
            a: item.href,
            b: common_vendor.n("swiper-item" + index),
            c: index
          };
        }),
        g: common_vendor.o(change),
        h: common_vendor.unref(current),
        i: common_vendor.p({
          info: common_vendor.unref(lbt),
          current: common_vendor.unref(current),
          field: "content"
        }),
        j: common_vendor.f(common_vendor.unref(datalist), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: item.id,
            c: common_vendor.o(($event) => checkCategory(item.id), item.id),
            d: "173e44a6-3-" + i0 + ",173e44a6-2",
            e: common_vendor.p({
              title: item.title,
              extra: formatTime(item.created_at)
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
          pageSize: common_vendor.unref(pageSize),
          ["show-icon"]: true
        }),
        n: common_vendor.t(common_vendor.unref(detail_current)),
        o: common_vendor.t(common_vendor.unref(total)),
        p: common_vendor.t(common_vendor.unref(pageSize)),
        q: common_vendor.unref(loading)
      }, common_vendor.unref(loading) ? {} : {}, {
        r: common_vendor.unref(noMoreData) && common_vendor.unref(datalist).length > 0
      }, common_vendor.unref(noMoreData) && common_vendor.unref(datalist).length > 0 ? {} : {});
    };
  }
};
_sfc_main.__runtimeHooks = 2;
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
