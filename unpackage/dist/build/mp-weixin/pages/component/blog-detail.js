"use strict";const e=require("../../common/vendor.js");if(!Array){e.resolveComponent("uni-card")()}Math;const t={__name:"blog-detail",setup(t){let n=e.ref({});e.onLoad((t=>{let o=t.id;o=o.toString(),e.index.request({url:"https://api.suxin23.cn/blog/detail",method:"GET",data:{id:o},success:t=>{console.log(t.data.rows[0].content),n.value=t.data.rows[0],e.index.setNavigationBarTitle({title:n.value.title})},fail:e=>{console.error(e)}})}));const o=e=>{const t=new Date(e),n=t.getFullYear(),o=t.getMonth()+1,a=t.getDate(),s=t.getHours(),i=t.getMinutes(),l=t.getSeconds();return`${n}-${r(o)}-${r(a)}`+`${r(s)}:${r(i)}:${r(l)}`},r=e=>e<10?`0${e}`:e;return(t,r)=>({a:e.unref(n).content,b:e.p({title:"详细内容:",extra:o(e.unref(n).create_time)})})}};wx.createPage(t);
