# React介绍

`目标任务:`  了解什么是React以及它的特点



**React是什么**

   一个专注于构建用户界面的 JavaScript 库，和vue和angular并称前端三大框架，不夸张的说，react引领了很多新思想，世界范围内是最流行的js前端框架，最新版本已经到了18，加入了许多很棒的新特性

​	React英文文档（https://reactjs.org/）

​	React中文文档 （https://zh-hans.reactjs.org/）

​	React新文档（https://beta.reactjs.org/）（开发中....）



**React有什么特点**

1- 声明式UI（JSX）

写UI就和写普通的HTML一样，抛弃命令式的繁琐实现


![img](/images/react/compare.png)



2- 组件化

组件是react中最重要的内容，组件可以通过搭积木的方式拼成一个完整的页面，通过组件的抽象可以增加复用能力和提高可维护性 

![img](/images/react/image.png)

3- 跨平台

react既可以开发web应用也可以使用同样的语法开发原生应用（react-native），比如安卓和ios应用，甚至可以使用react开发VR应用，想象力空间十足，react更像是一个 `元框架`  为各种领域赋能 



# 环境初始化

`目标任务:`  能够独立使用React脚手架创建一个react项目

## 1. 使用脚手架创建项目

![img](/images/react/create-react.png)

-  打开命令行窗口 
-  执行命令 

```bash
$ npx create-react-app react-basic
```


说明： 

1. 1. npx create-react-app 是固定命令，`create-react-app`是React脚手架的名称
   1. react-basic表示项目名称，可以自定义，保持语义化
   2. npx 命令会帮助我们临时安装create-react-app包，然后初始化项目完成之后会自自动删掉，所以不需要全局安装create-react-app

-  启动项目 

```bash
$ yarn start
or
$ npm start
```

## 2. 项目目录说明调整

-  目录说明 

1. 1. `src` 目录是我们写代码进行项目开发的目录
   2. `package.json`  中俩个核心库：react 、react-dom

-  目录调整 

1. 1. 删除src目录下自带的所有文件，只保留app.js根组件和index.js
   2. 创建index.js文件作为项目的入口文件，在这个文件中书写react代码即可

-  入口文件说明 

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// 引入根组件App
import App from './App'
// 通过调用ReactDOM的render方法渲染App根组件到id为root的dom节点上
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```