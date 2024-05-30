import{_ as s,c as i,o as a,a5 as n,a6 as e}from"./chunks/framework.DxQ4Wr7O.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"前端/vue/vue3/1、创建Vue3.0工程.md","filePath":"前端/vue/vue3/1、创建Vue3.0工程.md","lastUpdated":1717050676000}'),t={name:"前端/vue/vue3/1、创建Vue3.0工程.md"},l=n(`<h2 id="_1、创建vue3-0工程" tabindex="-1">1、创建Vue3.0工程 <a class="header-anchor" href="#_1、创建vue3-0工程" aria-label="Permalink to &quot;1、创建Vue3.0工程&quot;">​</a></h2><h3 id="_1-使用-vue-cli-创建" tabindex="-1">1.使用 vue-cli 创建 <a class="header-anchor" href="#_1-使用-vue-cli-创建" aria-label="Permalink to &quot;1.使用 vue-cli 创建&quot;">​</a></h3><p>官方文档：<a href="https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create" target="_blank" rel="noreferrer">https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create</a></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vue</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --version</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">## 安装或者升级你的@vue/cli</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -g</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @vue/cli</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">## 创建</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vue</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vue_test</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">## 启动</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vue_test</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> serve</span></span></code></pre></div><h3 id="_2-使用-vite-创建" tabindex="-1">2.使用 vite 创建 <a class="header-anchor" href="#_2-使用-vite-创建" aria-label="Permalink to &quot;2.使用 vite 创建&quot;">​</a></h3><p>官方文档：<a href="https://v3.cn.vuejs.org/guide/installation.html#vite" target="_blank" rel="noreferrer">https://v3.cn.vuejs.org/guide/installation.html#vite</a></p><p>vite官网：<a href="https://vitejs.cn" target="_blank" rel="noreferrer">https://vitejs.cn</a></p><ul><li>什么是vite？—— 新一代前端构建工具。</li><li>优势如下： <ul><li>开发环境中，无需打包操作，可快速的冷启动。</li><li>轻量快速的热重载（HMR）。</li><li>真正的按需编译，不再等待整个应用编译完成。</li></ul></li><li>传统构建 与 vite构建对比图</li></ul><p><img src="`+e+`" alt="img" loading="lazy"></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">## 创建工程</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vite-app</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">project-nam</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">## 进入工程目录</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">project-nam</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">## 安装依赖</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">## 运行</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev</span></span></code></pre></div><h3 id="_3、vue3-项目结构" tabindex="-1">3、Vue3 项目结构 <a class="header-anchor" href="#_3、vue3-项目结构" aria-label="Permalink to &quot;3、Vue3 项目结构&quot;">​</a></h3><p>Vue3 中 <code>main.js</code> 代码有所改变：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 不再引入 Vue 构造函数，而是引入 createApp 工厂函数</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// createApp函数：创建 vue 的 SPA 实例</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { createApp } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vue&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> App </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./App.vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 创建应用实例对象</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> app</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createApp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(App)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mount</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#app&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>Vue3 支持定义多个根节点，组件的 <code>&lt;template&gt;</code> 支持定义多个根节点：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;根节点&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;根节点&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h3 id="_4、npm-run-dev详解" tabindex="-1">4、<code>npm run dev</code>详解 <a class="header-anchor" href="#_4、npm-run-dev详解" aria-label="Permalink to &quot;4、\`npm run dev\`详解&quot;">​</a></h3><p>在我们执行这个命令的时候会去找 package json 的scripts 然后执行对应的dev命令</p><p>其实在我们执行npm install 的时候（包含vite） 会在node_modules/.bin/ 创建好可执行文件</p><p>.bin 目录，这个目录不是任何一个 npm 包。目录下的文件，表示这是一个个软链接，打开文件可以看到文件顶部写着 #!/bin/sh ，表示这是一个脚本</p><blockquote><p>所以<code>npm run xxx</code>的时候，就会到 node_modules/bin中找对应的映射文件，然后再找到相应的js文件来执行</p><p>1.查找规则是先从当前项目的node_modlue /bin去找,</p><p>2.找不到去全局的node_module/bin 去找</p><p>3.再找不到 去环境变量去找</p></blockquote>`,20),p=[l];function h(k,r,d,c,g,o){return a(),i("div",null,p)}const F=s(t,[["render",h]]);export{E as __pageData,F as default};
