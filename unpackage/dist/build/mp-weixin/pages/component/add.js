"use strict";const e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("uni-notice-bar")+e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-data-select")+e.resolveComponent("uni-forms")+e.resolveComponent("uni-section"))()}Math||((()=>"../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js")+(()=>"../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js")+(()=>"../../uni_modules/uni-forms/components/uni-forms/uni-forms.js")+(()=>"../../uni_modules/uni-section/components/uni-section/uni-section.js"))();const n={__name:"add",setup(n){let o=e.reactive([]);return(n,i)=>({a:e.p({"show-icon":!0,scrollable:!0,text:"如果你年轻的时候不 996，你什么时候可以 996？你一辈子没有 996，你觉得你就很骄傲了？这个世界上，我们每一个人都希望成功，都希望美好生活，都希望被尊重，我请问大家，你不付出超越别人的努力和时间，你怎么能够实现你想要的成功？"}),b:e.o((n=>e.unref(o).name=n)),c:e.p({placeholder:"请输入标题",modelValue:e.unref(o).name}),d:e.p({label:"标题",required:!0}),e:e.o(n.change),f:e.o((n=>e.unref(o).class=n)),g:e.p({localdata:n.range,placeholder:"请选择分类",modelValue:e.unref(o).class}),h:e.p({label:"分类",required:!0}),i:e.o((n=>e.unref(o).introduction=n)),j:e.p({type:"textarea",autoHeight:!0,placeholder:"请输入文章内容",modelValue:e.unref(o).introduction}),k:e.p({label:"内容",required:!0}),l:e.sr("baseForm","6d86d838-2,6d86d838-1"),m:e.p({modelValue:e.unref(o)}),n:e.p({title:"发表文章",type:"line",titleFontSize:"18px"})})}};wx.createPage(n);
