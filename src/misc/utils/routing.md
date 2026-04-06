# 前端路由

优点：

- 前端路由可以让前端自己维护路由与页面展示的逻辑，每次页面改动不需要通知服务端。
- 更好的交互体验：不用每次从服务端拉取资源。

缺点：

-  使用浏览器的前进、后退键时会重新发送请求，来获取数据，没有合理利用缓存。

原理：

- 本质就是监测 URL 的变化，通过拦截 URL 然后解析匹配路由规则。

## hash

我们都知道一个URL是由很多部分组成，包括协议、域名、路径、query、hash等，比如上面的例子，我们点击不同模块的时候可能看到是这样的URL

- 首页：yourdomain.xxx.com/index.html/#/
- 商城：yourdomain.xxx.com/index.html/#/shop
- 购物车：yourdomain.xxx.com/index.html/#/shopping-cart
- 我的：yourdomain.xxx.com/index.html/#/mine

\#号后面的，就是一个URL中关于hash的组成部分，可以看到，不同路由对应的hash是不一样的，但是它们都是在访问同一个静态资源index.html。我们要做的，就是如何能够监听到URL中关于hash部分发生的变化，从而做出对应的改变。



其实浏览器已经暴露给我们一个现成的方法`hashchange`，在hash改变的时候，触发该事件。有了监听事件，且改变hash页面并不刷新，这样我们就可以在监听事件的回调函数中，执行我们展示和隐藏不同UI显示的功能，从而实现前端路由。



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
      name="viewport"
    />
    <title>实现简单的hash路由</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html,
      body {
        height: 100%;
      }
      #content {
        height: calc(100vh - 50px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3em;
      }
      #nav {
        height: 50px;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
      }
      #nav a {
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
      }
      #nav a:not(:last-of-type) {
        border-right: none;
      }
    </style>
  </head>
  <body>
    <main id="content"></main>
    <nav id="nav">
      <a href="#/">首页</a>
      <a href="#/shop">商城</a>
      <a href="#/shopping-cart">购物车</a>
      <a href="#/mine">我的</a>
    </nav>
  </body>
  <script>
    class VueRouter {
      constructor(routes = []) {
        this.routes = routes; // 路由映射
        this.currentHash = ""; // 当前的hash
        this.refresh = this.refresh.bind(this);
        window.addEventListener("load", this.refresh, false);
        window.addEventListener("hashchange", this.refresh, false);
      }

      getUrlPath(url) {
        // 获取hash
        return url.indexOf("#") >= 0 ? url.slice(url.indexOf("#") + 1) : "/";
      }

      refresh(event) {
        console.log(event);
        // URL hash发生改变的时候，拿到当前的hash
        let newHash = "",
          oldHash = null;
        if (event.newURL) {
          oldHash = this.getUrlPath(event.oldURL || "");
          newHash = this.getUrlPath(event.newURL || "");
        } else {
          newHash = this.getUrlPath(window.location.hash);
          window.history.hash = "#/";
        }
        this.currentHash = newHash;
        this.matchComponent();
      }

      matchComponent() {
        let curRoute = this.routes.find(
          (route) => route.path === this.currentHash
        );
        if (!curRoute) {
          // 当前URL中的hash不存在的时候，默认取第一个，当然真实场景下，可能会有各种情况，取决于业务逻辑
          curRoute = this.routes.find((route) => route.path === "/");
        }
        const { component } = curRoute;
        document.querySelector("#content").innerHTML = component;
      }
    }

    const router = new VueRouter([
      {
        path: "/",
        name: "home",
        component: "<div>首页内容</div>"
      },
      {
        path: "/shop",
        name: "shop",
        component: "<div>商城内容</div>"
      },
      {
        path: "/shopping-cart",
        name: "shopping-cart",
        component: "<div>购物车内容</div>"
      },
      {
        path: "/mine",
        name: "mine",
        component: "<div>我的内容</div>"
      }
    ]);
  </script>
</html>
```

从上面的一些描述和实践，我们可以得出以下结论：

- hash模式所有的工作都是在前端完成的，不需要后端服务的配合
- hash模式的实现方式就是通过监听URL中hash部分的变化，从而做出对应的渲染逻辑
- hash模式下，URL中会带有#，看起来不太美观



## history

history路由模式的实现，是要归功于HTML5提供的一个history全局对象，可以将它理解为其中包含了关于我们访问网页（历史会话）的一些信息。同时它还暴露了一些有用的方法，比如：

- `window.history.go` 可以跳转到浏览器会话历史中的指定的某一个记录页
- `window.history.forward` 指向浏览器会话历史中的下一页，跟浏览器的前进按钮相同
- `window.history.back` 返回浏览器会话历史中的上一页，跟浏览器的回退按钮功能相同
- `window.history.pushState` 可以将给定的数据压入到浏览器会话历史栈中
- `window.history.replaceState` 将当前的会话页面的url替换成指定的数据

而history路由的实现，主要就是依靠于`pushState`与`replaceState`实现的，这里我们先总结下它们的一些特点

- 都会改变当前页面显示的url，但都不会刷新页面
- pushState是压入浏览器的会话历史栈中，会使得history.length加1，而replaceState是替换当前的这条会话历史，因此不会增加history.length

既然已经能够通过pushState或replaceState实现改变URL而不刷新页面，那么是不是如果我们能够监听到改变URL这个动作，就可以实现前端渲染逻辑的处理呢？这个时候，我们还要了解一个事件处理程序popstate，先看下它的官方定义

> 每当激活同一文档中不同的历史记录条目时，`popstate` 事件就会在对应的 `window` 对象上触发。如果当前处于激活状态的历史记录条目是由 `history.pushState()` 方法创建的或者是由 `history.replaceState()` 方法修改的，则 `popstate` 事件的 `state` 属性包含了这个历史记录条目的 `state` 对象的一个拷贝。
>
> 调用 `history.pushState()` 或者 `history.replaceState()` 不会触发 `popstate` 事件。`popstate` 事件只会在浏览器某些行为下触发，比如点击后退按钮（或者在 JavaScript 中调用 `history.back()` 方法）。即，在同一文档的两个历史记录条目之间导航会触发该事件。

总结下就是以下几点

- history.pushState和history.replaceState方法是不会触发popstate事件的
- 但是浏览器的某些行为会导致popstate，比如go、back、forward
- popstate事件对象中的state属性，可以理解是我们在通过history.pushState或history.replaceState方法时，传入的指定的数据

```js
let _wr = function(type) {
   let orig = history[type]
   return function() {
      let rv = orig.apply(this, arguments)
      let e = new Event(type)
      e.arguments = arguments
      window.dispatchEvent(e)
      return rv
   }
}

 history.pushState = _wr('pushState')
 history.replaceState = _wr('replaceState')
```



hash模式是不需要后端服务配合的。但是history模式下，如果你再跳转路由后再次刷新会得到404的错误，这个错误说白了就是浏览器会把整个地址当成一个可访问的静态资源路径进行访问，然后服务端并没有这个文件～看下面例子更好理解

**没刷新时，只是通过pushState改变URL，不刷新页面**

```tex
http://192.168.30.161:5500/ === http://192.168.30.161:5500/index.html // 默认访问路径下的index.html文件，没毛病
http://192.168.30.161:5500/home === http://192.168.30.161:5500/index.html // 仍然访问路径下的index.html文件，没毛病
...
http://192.168.30.161:5500/mine === http://192.168.30.161:5500/index.html // 所有的路由都是访问路径下的index.html，没毛病
```

**一旦在某个路由下刷新页面的时候，想当于去该路径下寻找可访问的静态资源index.html，无果，报错**

```tex
http://192.168.30.161:5500/mine === http://192.168.30.161:5500/mine/index.html文件，出问题了，服务器上并没有这个资源，404
```

**所以一般情况下，我们都需要配置下nginx，告诉服务器，当我们访问的路径资源不存在的时候，默认指向静态资源index.html**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 总结

一般路由实现主要有history和hash两种方式

hash的实现全部在前端，不需要后端服务器配合，兼容性好，主要是通过监听hashchange事件，处理前端业务逻辑

history的实现，需要服务器做以下简单的配置，通过监听pushState及replaceState事件，处理前端业务逻辑

## abstract

abstract 是vue路由中的第三种模式，本身是用来在不支持浏览器API的环境中，充当fallback，而不论是hash还是history模式都会对浏览器上的url产生作用，他一般要实现的功能就是在已存在的路由页面中内嵌其他的路由页面，而保持在浏览器当中依旧显示当前页面的路由path，这就是abstract这种与浏览器分离的路由模式。

