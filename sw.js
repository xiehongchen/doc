if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let a={};const t=s=>i(s,r),u={module:{uri:r},exports:a,require:t};e[r]=Promise.all(l.map((s=>u[s]||t(s)))).then((s=>(n(...s),a)))}}define(["./workbox-683c2783"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"ab81b595f66e61c334755284a2c0c925"},{url:"assets/app.CkbVUyML.js",revision:null},{url:"assets/chunks/@localSearchIndexroot.DYybaX3n.js",revision:null},{url:"assets/chunks/framework.DjVJMuEi.js",revision:null},{url:"assets/chunks/theme.YKm1ijaB.js",revision:null},{url:"assets/chunks/VPLocalSearchBox.DA7i8xFl.js",revision:null},{url:"assets/index.md.DWQG5-ma.js",revision:null},{url:"assets/index.md.DWQG5-ma.lean.js",revision:null},{url:"assets/inter-italic-cyrillic-ext.r48I6akx.woff2",revision:null},{url:"assets/inter-italic-cyrillic.By2_1cv3.woff2",revision:null},{url:"assets/inter-italic-greek-ext.1u6EdAuj.woff2",revision:null},{url:"assets/inter-italic-greek.DJ8dCoTZ.woff2",revision:null},{url:"assets/inter-italic-latin-ext.CN1xVJS-.woff2",revision:null},{url:"assets/inter-italic-latin.C2AdPX0b.woff2",revision:null},{url:"assets/inter-italic-vietnamese.BSbpV94h.woff2",revision:null},{url:"assets/inter-roman-cyrillic-ext.BBPuwvHQ.woff2",revision:null},{url:"assets/inter-roman-cyrillic.C5lxZ8CY.woff2",revision:null},{url:"assets/inter-roman-greek-ext.CqjqNYQ-.woff2",revision:null},{url:"assets/inter-roman-greek.BBVDIX6e.woff2",revision:null},{url:"assets/inter-roman-latin-ext.4ZJIpNVo.woff2",revision:null},{url:"assets/inter-roman-latin.Di8DUHzh.woff2",revision:null},{url:"assets/inter-roman-vietnamese.BjW4sHH5.woff2",revision:null},{url:"assets/style.EgGzpfie.css",revision:null},{url:"assets/其他_index.md.bXp6iVbP.js",revision:null},{url:"assets/其他_index.md.bXp6iVbP.lean.js",revision:null},{url:"assets/前端_css_index.md.DT4xTBtb.js",revision:null},{url:"assets/前端_css_index.md.DT4xTBtb.lean.js",revision:null},{url:"assets/前端_html_index.md.DVMi2Y17.js",revision:null},{url:"assets/前端_html_index.md.DVMi2Y17.lean.js",revision:null},{url:"assets/前端_index.md.BruvVMwY.js",revision:null},{url:"assets/前端_index.md.BruvVMwY.lean.js",revision:null},{url:"assets/前端_javascript_01初识JavaScript.md.SACQiFLD.js",revision:null},{url:"assets/前端_javascript_01初识JavaScript.md.SACQiFLD.lean.js",revision:null},{url:"assets/前端_javascript_02.md.D_tC_7WU.js",revision:null},{url:"assets/前端_javascript_02.md.D_tC_7WU.lean.js",revision:null},{url:"assets/前端_javascript_03.md.DoI847cy.js",revision:null},{url:"assets/前端_javascript_03.md.DoI847cy.lean.js",revision:null},{url:"assets/前端_javascript_04变量、作用域与内存.md.VS7nnxYI.js",revision:null},{url:"assets/前端_javascript_04变量、作用域与内存.md.VS7nnxYI.lean.js",revision:null},{url:"assets/前端_javascript_05引用值与原始值.md.CjjH91uc.js",revision:null},{url:"assets/前端_javascript_05引用值与原始值.md.CjjH91uc.lean.js",revision:null},{url:"assets/前端_javascript_index.md.B_NLCg15.js",revision:null},{url:"assets/前端_javascript_index.md.B_NLCg15.lean.js",revision:null},{url:"assets/前端_react_index.md.CxI1s6Ua.js",revision:null},{url:"assets/前端_react_index.md.CxI1s6Ua.lean.js",revision:null},{url:"assets/前端_vue_index.md.YGo6S_Ys.js",revision:null},{url:"assets/前端_vue_index.md.YGo6S_Ys.lean.js",revision:null},{url:"assets/后端_go_01Go的前世今生.md.CS9p-TFt.js",revision:null},{url:"assets/后端_go_01Go的前世今生.md.CS9p-TFt.lean.js",revision:null},{url:"assets/后端_go_02Go的变量、常量和作用域.md.CQz-NRVC.js",revision:null},{url:"assets/后端_go_02Go的变量、常量和作用域.md.CQz-NRVC.lean.js",revision:null},{url:"assets/后端_go_03Go语言中的字符串.md.Dt2lrcfO.js",revision:null},{url:"assets/后端_go_03Go语言中的字符串.md.Dt2lrcfO.lean.js",revision:null},{url:"assets/后端_go_index.md.Davdqw6m.js",revision:null},{url:"assets/后端_go_index.md.Davdqw6m.lean.js",revision:null},{url:"assets/后端_index.md.CAp9CkzH.js",revision:null},{url:"assets/后端_index.md.CAp9CkzH.lean.js",revision:null},{url:"assets/后端_nestjs_index.md.D9O7JwD9.js",revision:null},{url:"assets/后端_nestjs_index.md.D9O7JwD9.lean.js",revision:null},{url:"assets/面试题_index.md.BYDvgX1g.js",revision:null},{url:"assets/面试题_index.md.BYDvgX1g.lean.js",revision:null},{url:"css/fancybox.css",revision:"3a867c1ea947834b92530f9d57fa799a"},{url:"images/react/compare.png",revision:"a647432ffe3501bf98729eb1e283ac56"},{url:"index.html",revision:"d1e9d4f48955aaac42d9a9c29f8fcd47"},{url:"js/fancybox.umd.js",revision:"2f1b8cd1daab3056cda543dd0ddffce4"},{url:"registerSW.js",revision:"5ab25053dc3925e18ce1db00d72c743a"},{url:"seal.png",revision:"4428490ece540cf796ae67a1f1b4a802"},{url:"其他/index.html",revision:"cb201094b8a871cee608a9804ee96a5d"},{url:"前端/css/index.html",revision:"a1c8f0365c3983a1d2bcebcb4cd9d892"},{url:"前端/html/index.html",revision:"b4e4f0b926a095c222cc5333884b6424"},{url:"前端/index.html",revision:"4adb5523da352ded0705ca1adafdccfb"},{url:"前端/javascript/01初识JavaScript.html",revision:"42801bedb8218632afa256424fe52faa"},{url:"前端/javascript/02.html",revision:"7e5a153f5f6bcaa244042a63942dafdc"},{url:"前端/javascript/03.html",revision:"274d17e3156f5c675f656e6c9cbed3af"},{url:"前端/javascript/04变量、作用域与内存.html",revision:"90df1809322a2fb532bbdec6d710cbd5"},{url:"前端/javascript/05引用值与原始值.html",revision:"d2f0e9a6bf89f65115a464b34b1c1520"},{url:"前端/javascript/index.html",revision:"5bca617c0ae2a1438bd20f31b8176b92"},{url:"前端/react/index.html",revision:"f7b3398ebba0a40bd0e8f4982de86b55"},{url:"前端/vue/index.html",revision:"66c9314b85369a02346c5e17d3841bac"},{url:"后端/go/01Go的前世今生.html",revision:"cf6dfa79451c30629f4e75be5f7a8490"},{url:"后端/go/02Go的变量、常量和作用域.html",revision:"cc35065bbb20e6aa696808e2bf186588"},{url:"后端/go/03Go语言中的字符串.html",revision:"ee06765f76f3ebb9b95d75d1aed58954"},{url:"后端/go/index.html",revision:"f7b7d462f3bb9b3dc01dcac500ab341e"},{url:"后端/index.html",revision:"0f2e4afdba497929c77d6f281f976f83"},{url:"后端/nestjs/index.html",revision:"43075afcd55207606677897a5f4baa33"},{url:"面试题/index.html",revision:"9eb8de525f1bc8eab26aab63f15679c3"},{url:"manifest.webmanifest",revision:"e0831812379a0be693ef43a03107c1c7"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i,new s.NetworkFirst({cacheName:"jsdelivr-images-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
