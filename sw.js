if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let a={};const t=s=>i(s,r),o={module:{uri:r},exports:a,require:t};e[r]=Promise.all(l.map((s=>o[s]||t(s)))).then((s=>(n(...s),a)))}}define(["./workbox-683c2783"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"1e5f7113827da0f36cac63e628a1dca2"},{url:"assets/app.B0W8Yqis.js",revision:null},{url:"assets/chunks/@localSearchIndexroot.BGsOtwx6.js",revision:null},{url:"assets/chunks/framework.WCwwXLpU.js",revision:null},{url:"assets/chunks/theme.Crw-5rK-.js",revision:null},{url:"assets/chunks/VPLocalSearchBox.DXDRgJL6.js",revision:null},{url:"assets/index.md.BoAjQCKU.js",revision:null},{url:"assets/index.md.BoAjQCKU.lean.js",revision:null},{url:"assets/inter-italic-cyrillic-ext.r48I6akx.woff2",revision:null},{url:"assets/inter-italic-cyrillic.By2_1cv3.woff2",revision:null},{url:"assets/inter-italic-greek-ext.1u6EdAuj.woff2",revision:null},{url:"assets/inter-italic-greek.DJ8dCoTZ.woff2",revision:null},{url:"assets/inter-italic-latin-ext.CN1xVJS-.woff2",revision:null},{url:"assets/inter-italic-latin.C2AdPX0b.woff2",revision:null},{url:"assets/inter-italic-vietnamese.BSbpV94h.woff2",revision:null},{url:"assets/inter-roman-cyrillic-ext.BBPuwvHQ.woff2",revision:null},{url:"assets/inter-roman-cyrillic.C5lxZ8CY.woff2",revision:null},{url:"assets/inter-roman-greek-ext.CqjqNYQ-.woff2",revision:null},{url:"assets/inter-roman-greek.BBVDIX6e.woff2",revision:null},{url:"assets/inter-roman-latin-ext.4ZJIpNVo.woff2",revision:null},{url:"assets/inter-roman-latin.Di8DUHzh.woff2",revision:null},{url:"assets/inter-roman-vietnamese.BjW4sHH5.woff2",revision:null},{url:"assets/style.EgGzpfie.css",revision:null},{url:"assets/其他_index.md.l1WpW8tl.js",revision:null},{url:"assets/其他_index.md.l1WpW8tl.lean.js",revision:null},{url:"assets/前端_css_index.md.DcRkl3aU.js",revision:null},{url:"assets/前端_css_index.md.DcRkl3aU.lean.js",revision:null},{url:"assets/前端_html_index.md.Cadm7fdv.js",revision:null},{url:"assets/前端_html_index.md.Cadm7fdv.lean.js",revision:null},{url:"assets/前端_index.md.CQOg4rID.js",revision:null},{url:"assets/前端_index.md.CQOg4rID.lean.js",revision:null},{url:"assets/前端_javascript_01初识JavaScript.md.BKCiNVTu.js",revision:null},{url:"assets/前端_javascript_01初识JavaScript.md.BKCiNVTu.lean.js",revision:null},{url:"assets/前端_javascript_02.md.DuMK1XKm.js",revision:null},{url:"assets/前端_javascript_02.md.DuMK1XKm.lean.js",revision:null},{url:"assets/前端_javascript_03.md.DQ5IhM-c.js",revision:null},{url:"assets/前端_javascript_03.md.DQ5IhM-c.lean.js",revision:null},{url:"assets/前端_javascript_04变量、作用域与内存.md.v9XmAtc2.js",revision:null},{url:"assets/前端_javascript_04变量、作用域与内存.md.v9XmAtc2.lean.js",revision:null},{url:"assets/前端_javascript_05引用值与原始值.md.C4zD10ca.js",revision:null},{url:"assets/前端_javascript_05引用值与原始值.md.C4zD10ca.lean.js",revision:null},{url:"assets/前端_javascript_index.md.SGPol78c.js",revision:null},{url:"assets/前端_javascript_index.md.SGPol78c.lean.js",revision:null},{url:"assets/前端_react_index.md.DcACrgqc.js",revision:null},{url:"assets/前端_react_index.md.DcACrgqc.lean.js",revision:null},{url:"assets/前端_vue_index.md.CsytyzA9.js",revision:null},{url:"assets/前端_vue_index.md.CsytyzA9.lean.js",revision:null},{url:"assets/后端_go_01Go的前世今生.md.edXidUJp.js",revision:null},{url:"assets/后端_go_01Go的前世今生.md.edXidUJp.lean.js",revision:null},{url:"assets/后端_go_02Go的变量、常量和作用域.md.DZoPdSbG.js",revision:null},{url:"assets/后端_go_02Go的变量、常量和作用域.md.DZoPdSbG.lean.js",revision:null},{url:"assets/后端_go_03Go语言中的字符串.md.jhMsToXo.js",revision:null},{url:"assets/后端_go_03Go语言中的字符串.md.jhMsToXo.lean.js",revision:null},{url:"assets/后端_go_index.md.B1qPcdtW.js",revision:null},{url:"assets/后端_go_index.md.B1qPcdtW.lean.js",revision:null},{url:"assets/后端_index.md.BPxU_tOB.js",revision:null},{url:"assets/后端_index.md.BPxU_tOB.lean.js",revision:null},{url:"assets/后端_nestjs_index.md.Dr24Zwmm.js",revision:null},{url:"assets/后端_nestjs_index.md.Dr24Zwmm.lean.js",revision:null},{url:"assets/面试题_index.md.pF9TqK9B.js",revision:null},{url:"assets/面试题_index.md.pF9TqK9B.lean.js",revision:null},{url:"css/fancybox.css",revision:"3a867c1ea947834b92530f9d57fa799a"},{url:"index.html",revision:"eabad2e42c048611268ffc4c1e665d58"},{url:"js/fancybox.umd.js",revision:"2f1b8cd1daab3056cda543dd0ddffce4"},{url:"registerSW.js",revision:"5ab25053dc3925e18ce1db00d72c743a"},{url:"seal.png",revision:"4428490ece540cf796ae67a1f1b4a802"},{url:"其他/index.html",revision:"ddc1060df9b33d3fde64609741e744f9"},{url:"前端/css/index.html",revision:"22b19963b80343ee397eae6211e863c3"},{url:"前端/html/index.html",revision:"6715177db16635227050e957c53d0907"},{url:"前端/index.html",revision:"3e5bf205e356d3f75dd22a62a648d561"},{url:"前端/javascript/01初识JavaScript.html",revision:"8b24b83a5b91760b2bfabba0a7ed0001"},{url:"前端/javascript/02.html",revision:"9a6eb435fb3c152e0ee77539ea7b348c"},{url:"前端/javascript/03.html",revision:"89bd9ac338ad88bfe06ca0350d30f5fc"},{url:"前端/javascript/04变量、作用域与内存.html",revision:"b8044f93606cccd5a8f9a1855fa30fb5"},{url:"前端/javascript/05引用值与原始值.html",revision:"591c53da45477037d6d15ddd15a3e645"},{url:"前端/javascript/index.html",revision:"b6038ba57b5cabc42a85d02177452826"},{url:"前端/react/index.html",revision:"0d949a61bd8a11bfeb1034574a48976d"},{url:"前端/vue/index.html",revision:"e8035acfc6d30e497656835f3b80b2d1"},{url:"后端/go/01Go的前世今生.html",revision:"709471afe1a3a859efaf71537abd7fff"},{url:"后端/go/02Go的变量、常量和作用域.html",revision:"32ad4583d88cda2853e6b357ce75a7f6"},{url:"后端/go/03Go语言中的字符串.html",revision:"ee5fdf7bdf3edcc0e27c983a2033fa4a"},{url:"后端/go/index.html",revision:"5fa46cbaa919f741a6c21eb0a2a4a86c"},{url:"后端/index.html",revision:"f25c212854a5052d81c42646e7591377"},{url:"后端/nestjs/index.html",revision:"5803808e70151dbac45696d1c62cf179"},{url:"面试题/index.html",revision:"aadc139d60b31f5ea1c22c77ec7e7ef8"},{url:"manifest.webmanifest",revision:"e0831812379a0be693ef43a03107c1c7"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i,new s.NetworkFirst({cacheName:"jsdelivr-images-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));