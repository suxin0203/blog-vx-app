"use strict";
const common_vendor = require("./vendor.js");
const baseUrl = "https://api.suxin23.cn";
function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + url,
      method: "GET",
      data: params,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    const token = common_vendor.index.getStorageSync("token");
    console.log("token", token);
    common_vendor.index.request({
      url: baseUrl + url,
      method: "POST",
      data,
      header: {
        "Authorization": "Bearer " + token
        // 添加Token到请求头部
      },
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
exports.get = get;
exports.post = post;
