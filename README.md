# 博客微信小程序（uni-app 旧版）

> **仓库现状（2026-10-14 补）**
>
> 这份源码**已经不再使用，仅作留存**。
>
> - 线上小程序虽然仍在架，但**已改名**，搜索「小泸校园君」找不到了；现在的实现换成了 [blog-bishe/wenzhan_miniprogram](https://github.com/suxin0203/blog-bishe)（原生小程序重写，与本仓库**没有一行代码重合**）。
> - 本仓库连的是**旧后端** `https://api.suxin23.cn`（配套 [BlogServes_Express_Mysql](https://github.com/suxin0203/BlogServes_Express_Mysql)），与新栈的 `wzapi.suxin23.cn` 无关。
> - 下方「申请体验账号」的二维码是当时留的，大概率已失效。

## 技术栈

uni-app + Vue 3，HBuilderX 工程（无 npm 构建脚本，靠 IDE 编译到微信小程序端）。

## 页面构成（7 个）

| 路径 | 作用 |
|------|------|
| `pages/index/index` | 首页文章列表 |
| `pages/component/detail` | 文章详情 |
| `pages/component/add` | 发布内容 |
| `pages/component/me` | 个人中心 |
| `pages/component/userinfo/userinfo` | 用户资料编辑 |
| `pages/component/login/login` | 登录：`uni.login` 拿 code 换 openid |
| `pages/menu/utils` | 工具/设置页 |

接口统一封装在 `common/api.js`，其中富文本图片走 `https://api.suxin23.cn/upload/token/rich_editor_upload`。

## 关于仓库体积（重要）

本仓库**从未添加过 `.gitignore`**，所以依赖和构建产物被完整提交进了 git：

| 内容 | 追踪文件数 |
|------|-----------|
| `node_modules/` | 699 |
| `uni_modules/`（uni-app 插件市场组件） | 292 |
| `unpackage/`（编译产物） | 254 |
| **真实源码** | **26** |

也就是说 1271 个追踪文件里只有 26 个是本人写的东西，其余 1245 个是依赖与产物（约 3.5 MB）。**要看代码请直接看上面表格里列的 26 个文件路径**，别在 `node_modules` 里翻。

> 历史里的这些文件没有被清除（清除需要重写历史，会破坏他人已有的 clone），这里只做说明。

## 申请体验账号

![微信小程序](weixin.jpg)
