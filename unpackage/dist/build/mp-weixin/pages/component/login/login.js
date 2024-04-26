"use strict";const e=require("../../../common/vendor.js"),n=require("../../../common/api.js");if(!Array){(e.resolveComponent("uni-popup-message")+e.resolveComponent("uni-popup")+e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-forms")+e.resolveComponent("uni-card"))()}Math||((()=>"../../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js")+(()=>"../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js")+(()=>"../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js")+(()=>"../../../uni_modules/uni-card/components/uni-card/uni-card.js"))();const a={__name:"login",setup(a){let o=e.ref(""),s=e.ref("");const u=e.ref(null);let r=e.ref(!1),i=e.ref({username:"admin",password:"123456"}),t=e.ref(""),p=e.ref({});const d=(e="成功",n="success")=>{o.value=n,s.value=e,u.value.open()},l=n=>{d(),e.index.setStorageSync("token",n.data.token),e.index.setStorageSync("userinfo",n.data.data),e.index.$emit("loginSuccess",n.data.data),e.index.navigateBack({delta:1})},c=()=>{e.index.showLoading({title:"登录中..."}),e.index.login({provider:"weixin",onlyAuthorize:!0,success:async function(a){let o=await n.get(`/wechat/openid/${a.code}`),s=await n.get(`/wechat/userinfo/${o.data.data.openid}`);if(p.value=s.data,t.value=o.data.data.openid,200===s.data.code){let a=await n.get(`/wechat/userinfo/${s.data.data.openid}`);p.value=a.data,200===a.data.code&&(l(a),e.index.reLaunch({url:"/pages/component/me",success:()=>{console.log("uni-app刷新成功")},fail:e=>{console.error("uni-app刷新失败",e)}}))}else i.value.username="",i.value.password="",d("该微信暂未绑定账号请先绑定","warn"),r.value=!0;e.index.hideLoading()}})},m=async()=>{e.wx$1.showLoading({title:"登录中..."});let a=await n.post("/users/login",{username:i.value.username,password:i.value.password,openid:t.value});200===a.data.code?(l(a),e.index.reLaunch({url:"/pages/component/me",success:()=>{console.log("uni-app刷新成功")},fail:e=>{console.error("uni-app刷新失败",e)}})):(o.value="error",s.value="登录失败",u.value.open()),e.index.hideLoading()},f=()=>{n.post("/users/register",{username:i.value.username,password:i.value.password}).then((e=>{o.value="success",s.value=e.data.message,u.value.open(),200===e.data.code&&m()}))};return(n,a)=>e.e({a:e.p({type:e.unref(o),message:e.unref(s),duration:2e3}),b:e.sr(u,"289ecc7d-0",{k:"message"}),c:e.p({type:"message"}),d:e.o((n=>e.unref(i).username=n)),e:e.p({placeholder:"请输入账号",modelValue:e.unref(i).username}),f:e.p({label:"账号:",required:!0}),g:e.o((n=>e.unref(i).password=n)),h:e.p({type:"password",placeholder:"请输入密码",modelValue:e.unref(i).password}),i:e.p({label:"密码:",required:!0}),j:e.unref(r)},e.unref(r)?{k:e.o(f)}:{},{l:e.t(e.unref(r)?"登录并绑定":"登录"),m:e.o(m),n:!e.unref(r)},e.unref(r)?{}:{o:e.o(c)},{p:e.sr("baseForm","289ecc7d-3,289ecc7d-2"),q:e.p({modelValue:e.unref(i),"label-position":"top"}),r:e.p({title:"登录"}),s:e.t(e.unref(p))})}};wx.createPage(a);
