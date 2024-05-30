## 1、创建Vue3.0工程

### 1.使用 vue-cli 创建

官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

### 2.使用 vite 创建

官方文档：https://v3.cn.vuejs.org/guide/installation.html#vite

vite官网：https://vitejs.cn

- 什么是vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。
- 传统构建 与 vite构建对比图

![img](/images/vue/compare.png)

```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```

### 3、Vue3 项目结构

Vue3 中 `main.js` 代码有所改变：

```js
// 不再引入 Vue 构造函数，而是引入 createApp 工厂函数
// createApp函数：创建 vue 的 SPA 实例
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用实例对象
const app = createApp(App)
app.mount('#app')
```

Vue3 支持定义多个根节点，组件的 `<template>` 支持定义多个根节点：

```html
<template>
  <h1>根节点</h1>
  <h1>根节点</h1>
</template>
```

### 4、`npm run dev`详解

在我们执行这个命令的时候会去找 package json 的scripts 然后执行对应的dev命令

<!-- ![](C:\Users\谢红尘\笔记\前端\框架\vue\vue3-images\Snipaste_2023-04-16_20-15-44.png) -->

其实在我们执行npm install 的时候（包含vite） 会在node_modules/.bin/ 创建好可执行文件

.bin 目录，这个目录不是任何一个 npm 包。目录下的文件，表示这是一个个软链接，打开文件可以看到文件顶部写着 #!/bin/sh ，表示这是一个脚本 

>  所以`npm run xxx`的时候，就会到 node_modules/bin中找对应的映射文件，然后再找到相应的js文件来执行
>
> 1.查找规则是先从当前项目的node_modlue /bin去找,
>
> 2.找不到去全局的node_module/bin 去找
>
> 3.再找不到 去环境变量去找