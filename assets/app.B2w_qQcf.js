import{U as o,bO as p,bP as u,bQ as l,bR as c,bS as f,bT as d,bU as m,bV as b,bW as h,bX as g,d as A,u as P,y as v,x as y,bY as R,bZ as w,b_ as C,a4 as S}from"./chunks/framework.DDBsw1uY.js";import{R as T}from"./chunks/theme.D1X0qkYw.js";function i(e){if(e.extends){const t=i(e.extends);return{...t,...e,async enhanceApp(a){t.enhanceApp&&await t.enhanceApp(a),e.enhanceApp&&await e.enhanceApp(a)}}}return e}const s=i(T),_=A({name:"VitePressApp",setup(){const{site:e,lang:t,dir:a}=P();return v(()=>{y(()=>{document.documentElement.lang=t.value,document.documentElement.dir=a.value})}),e.value.router.prefetchLinks&&R(),w(),C(),s.setup&&s.setup(),()=>S(s.Layout)}});async function E(){globalThis.__VITEPRESS__=!0;const e=D(),t=x();t.provide(u,e);const a=l(e.route);return t.provide(c,a),t.component("Content",f),t.component("ClientOnly",d),Object.defineProperties(t.config.globalProperties,{$frontmatter:{get(){return a.frontmatter.value}},$params:{get(){return a.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:t,router:e,siteData:m}),{app:t,router:e,data:a}}function x(){return b(_)}function D(){let e=o,t;return h(a=>{let n=g(a),r=null;return n&&(e&&(t=n),(e||t===n)&&(n=n.replace(/\.js$/,".lean.js")),r=import(n)),o&&(e=!1),r},s.NotFound)}o&&E().then(({app:e,router:t,data:a})=>{t.go().then(()=>{p(t.route,a.site),e.mount("#app")})});export{E as createApp};