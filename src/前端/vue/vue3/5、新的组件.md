## 5、新的组件

### 组件

#### 全局组件

在main.ts文件中

```ts
import Card from './components/Card.vue'
export const app = createApp(App)
app.component('Card', Card)
```

#### 局部组件

```vue
<template>
  <div></div>
  <Card content='123'></Card>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Card from './components/Card.vue'
</script>

<style scoped>

</style>
```

#### 递归组件

父组件

```ts
type TreeList = {
  name: string;
  icon?: string;
  children?: TreeList[] | [];
};
const data = reactive<TreeList[]>([
  {
    name: "no.1",
    children: [
      {
        name: "no.1-1",
        children: [
          {
            name: "no.1-1-1",
          },
        ],
      },
    ],
  },
  {
    name: "no.2",
    children: [
      {
        name: "no.2-1",
      },
    ],
  },
  {
    name: "no.3",
  },
]);
```

子组件

```ts
type TreeList = {
  name: string;
  icon?: string;
  children?: TreeList[] | [];
};
 
type Props<T> = {
  data?: T[] | [];
};
 
defineProps<Props<TreeList>>();
const clickItem = (item: TreeList) => {
  console.log(item)
}
```

**子组件增加一个script 定义组件名称为了 递归用** 

**给我们的组件定义名称有好几种方式**

##### 1、在增加一个script 通过 export 添加name

```vue
<script lang="ts">
export default {
  name:"TreeItem"
}
</script>
```

##### 2、直接使用文件名当组件名

3、在script加上name

```vue
<script lang="ts" name="TreeItem">

</script>
```

### 动态组件

```vue
<component :is="A"></component>

import A from './A.vue'
import B from './B.vue'
```

### 插件

插件是自包含的代码，通常向 Vue 添加全局级功能。你如果是一个对象需要有install方法Vue会帮你自动注入到install 方法 你如果是function 就直接当install 方法去使用

#### 使用插件

在使用 `createApp()` 初始化 Vue 应用程序后，你可以通过调用 `use()` 方法将插件添加到你的应用程序中。

**实现一个Loading**

##### Loading.Vue

```vue
<template>
    <div v-if="isShow" class="loading">
        <div class="loading-content">Loading...</div>
    </div>
</template>
    
<script setup lang='ts'>
import { ref } from 'vue';
const isShow = ref(false)//定位loading 的开关
 
const show = () => {
    isShow.value = true
}
const hide = () => {
    isShow.value = false
}
//对外暴露 当前组件的属性和方法
defineExpose({
    isShow,
    show,
    hide
})
</script>
 
 
    
<style scoped lang="less">
.loading {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    &-content {
        font-size: 30px;
        color: #fff;
    }
}
</style>
```

##### Loading.ts

```ts
import {  createVNode, render, VNode, App } from 'vue';
import Loading from './index.vue'
 
export default {
    install(app: App) {
        //createVNode vue提供的底层方法 可以给我们组件创建一个虚拟DOM 也就是Vnode
        const vnode: VNode = createVNode(Loading)
        //render 把我们的Vnode 生成真实DOM 并且挂载到指定节点
        render(vnode, document.body)
        // Vue 提供的全局配置 可以自定义
        app.config.globalProperties.$loading = {
            show: () => vnode.component?.exposed?.show(),
            hide: () => vnode.component?.exposed?.hide()
        }
 
    }
}
```

##### Main.ts

```ts
import Loading from './components/loading'
 
 
let app = createApp(App)
 
app.use(Loading)
 
 
type Lod = {
    show: () => void,
    hide: () => void
}
//编写ts loading 声明文件放置报错 和 智能提示
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $loading: Lod
    }
}
 
app.mount('#app')
```

##### 使用方法

```vue
<template>
 
  <div></div>
 
</template>
 
<script setup lang='ts'>
import { ref,reactive,getCurrentInstance} from 'vue'
const  instance = getCurrentInstance()  
instance?.proxy?.$Loading.show()
setTimeout(()=>{
  instance?.proxy?.$Loading.hide()
},5000)
 
 
// console.log(instance)
</script>
<style>
*{
  padding: 0;
  margin: 0;
}
</style>
```

#### Vue use 源码手写

```ts
import type { App } from 'vue'
import { app } from './main'
 
interface Use {
    install: (app: App, ...options: any[]) => void
}
 
const installedList = new Set()
 
export function MyUse<T extends Use>(plugin: T, ...options: any[]) {
    if(installedList.has(plugin)){
      return console.warn('重复添加插件',plugin)
    }else{
        plugin.install(app, ...options)
        installedList.add(plugin)
    }
}
```



### 1.Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

### 2.Teleport

- 什么是Teleport？—— `Teleport` 是一种能够将我们的<strong style="color:#DD5145">组件html结构</strong>移动到指定位置的技术。

- 这里把当前组件html结构移动到body位置，不会在组件位置显示

  ```vue
  <template>
    <teleport to="body">
      <div v-if="isShow" class="mask">
        <div class="dialog">
          <h3>我是一个弹窗</h3>
          <button @click="isShow = false">关闭弹窗</button>
        </div>
      </div>
    </teleport>
  </template>
  <style scoped lang="scss">
  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 300px;
    height: 300px;
    background-color: green;
  }
  </style>
  ```
### 3.Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤：

  - 异步引入组件

    ```js
    import {defineAsyncComponent} from 'vue'	//静态引入
    const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
    ```

  - 使用```Suspense```包裹组件，并配置好```default``` 与 ```fallback```

    ```vue
    <template>
    	<div class="app">
    <h3>我是 App 组件</h3>3>
    		<Suspense>
                <!-- 本应加载的 -->
    			<template v-slot:default>
    				<Child/>
    			</template>
    			<!-- 本应加载的没有加载,这时就加载这个 -->
    			<template v-slot:fallback>
    				<h3>加载中.....</h3>
    			</template>
    		</Suspense>
    	</div>
    </template>
    ```

  - 另外，若 `Child` 组件的 `setup` 函数返回一个 Promise 对象，也能渲染 `fallback` 里的内容：

    ```js
    async setup() {
      let sum = ref(0)
      return await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({sum})
        }, 3000)
      })
    }
    ```
### 4.keep-alive

内置组件keep-alive
有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态。这时候就需要用到keep-alive组件。

开启keep-alive 生命周期的变化

初次进入时： onMounted > onActivated
退出后触发 onDeactivated
再次进入：
只会触发 onActivated
事件挂载的方法等，只执行一次的放在 onMounted中；组件每次进去执行的方法放在 onActivated中

```vue
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>
 
<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>
 
<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```

include 和 exclude

```vue
 <keep-alive :include="" :exclude="" :max=""></keep-alive>
```

include 和 exclude 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：

max

```vue
<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>
```
### 5.transition动画组件

Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡:

- 条件渲染 (使用 v-if)

- 条件展示 (使用 v-show)
- 动态组件
- 组件根节点

自定义 transition 过度效果，你需要对transition组件的name属性自定义。并在css中写入对应的样式

#### 1.过渡的类名

在进入/离开的过渡中，会有 6 个 class 切换。

1. #过渡 class
   在进入/离开的过渡中，会有 6 个 class 切换。
2. v-enter-from：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

3. v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

4. v-enter-to：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡/动画完成之后移除。

5. v-leave-from：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

6. v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
7. v-leave-to：离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave-from 被移除)，在过渡/动画完成之后移除。

```vue
<button @click='flag = !flag'>切换</button>
<transition name='fade'>
  <div v-if='flag' class="box"></div>
</transition>
```
```css
//开始过度
.fade-enter-from{
   background:red;
   width:0px;
   height:0px;
   transform:rotate(360deg)
}
//开始过度了
.fade-enter-active{
  transition: all 2.5s linear;
}
//过度完成
.fade-enter-to{
   background:yellow;
   width:200px;
   height:200px;
}
//离开的过度
.fade-leave-from{
  width:200px;
  height:200px;
  transform:rotate(360deg)
}
//离开中过度
.fade-leave-active{
  transition: all 1s linear;
}
//离开完成
.fade-leave-to{
  width:0px;
   height:0px;
}
```
#### 2.自定义过渡 class 类名

trasnsition props

- enter-from-class

- enter-active-class
- enter-to-class
- leave-from-class
- leave-active-class
- leave-to-class

自定义过度时间 单位毫秒

你也可以分别指定进入和离开的持续时间：

```vue
<transition :duration="1000">...</transition>

<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```


通过自定义class 结合css动画库animate css

安装库 npm install animate.css

引入 import 'animate.css'

使用方法

官方文档 Animate.css | A cross-browser library of CSS animations.
```vue
<transition
    leave-active-class="animate__animated animate__bounceInLeft"
    enter-active-class="animate__animated animate__bounceInRight"
>
    <div v-if="flag" class="box"></div>
</transition>
```

#### 3.transition 生命周期8个

```js
@before-enter="beforeEnter" //对应enter-from
@enter="enter"//对应enter-active
@after-enter="afterEnter"//对应enter-to
@enter-cancelled="enterCancelled"//显示过度打断
@before-leave="beforeLeave"//对应leave-from
@leave="leave"//对应enter-active
@after-leave="afterLeave"//对应leave-to
@leave-cancelled="leaveCancelled"//离开过度打断
```

当只用 JavaScript 过渡的时候，在 enter 和 leave 钩子中必须使用 done 进行回调

结合gsap 动画库使用 GreenSock

```ts
const beforeEnter = (el: Element) => {
    console.log('进入之前from', el);
}
const Enter = (el: Element,done:Function) => {
    console.log('过度曲线');
    setTimeout(()=>{
       done()
    },3000)
}
const AfterEnter = (el: Element) => {
    console.log('to');
}
```

#### 4.appear

通过这个属性可以设置初始节点过度 就是页面加载完成就开始动画 对应三个状态

```js
appear-active-class=""
appear-from-class=""
appear-to-class=""
appear
```

### 6.transition-group过度列表

> 一般配合v-for使用

- 单个节点

- 多个节点，每次只渲染一个

那么怎么同时渲染整个列表，比如使用 v-for？在这种场景下，我们会使用 `<transition-group>` 组件。在我们深入例子之前，先了解关于这个组件的几个特点：

- 默认情况下，它不会渲染一个包裹元素，但是你可以通过 tag attribute 指定渲染一个元素。
- 过渡模式不可用，因为我们不再相互切换特有的元素。
- 内部元素总是需要提供唯一的 key attribute 值。
- CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。

```vue
<transition-group>
     <div style="margin: 10px;" :key="item" v-for="item in list">{{ item }}</div>
</transition-group>
```

```ts
const list = reactive<number[]>([1, 2, 4, 5, 6, 7, 8, 9])
const Push = () => {
    list.push(123)
}
const Pop = () => {
    list.pop()
}
```
#### 2.列表的移动过渡

`<transition-group>` 组件还有一个特殊之处。除了进入和离开，它还可以为定位的改变添加动画。只需了解新增的 v-move 类就可以使用这个新功能，它会应用在元素改变定位的过程中。像之前的类名一样，它的前缀可以通过 name attribute 来自定义，也可以通过 move-class attribute 手动设置

下面代码很酷炫

```vue
<template>
    <div>
        <button @click="shuffle">Shuffle</button>
        <transition-group class="wraps" name="mmm" tag="ul">
            <li class="cell" v-for="item in items" :key="item.id">{{ item.number }}</li>
        </transition-group>
    </div>
</template>
  
<script setup  lang='ts'>
import _ from 'lodash'
import { ref } from 'vue'
let items = ref(Array.apply(null, { length: 81 } as number[]).map((_, index) => {
    return {
        id: index,
        number: (index % 9) + 1
    }
}))
const shuffle = () => {
    items.value = _.shuffle(items.value)
}
</script>
  
<style scoped lang="less">
.wraps {
    display: flex;
    flex-wrap: wrap;
    width: calc(25px * 10 + 9px);
    .cell {
        width: 25px;
        height: 25px;
        border: 1px solid #ccc;
        list-style-type: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
 
.mmm-move {
    transition: transform 0.8s ease;
}
</style>
```

#### 3.状态过渡

Vue 也同样可以给数字 Svg 背景颜色等添加过度动画 今天演示数字变化

```vue
<template>
    <div>
        <input step="20" v-model="num.current" type="number" />
        <div>{{ num.tweenedNumber.toFixed(0) }}</div>
    </div>
</template>
    
<script setup lang='ts'>
import { reactive, watch } from 'vue'
import gsap from 'gsap'
const num = reactive({
    tweenedNumber: 0,
    current:0
})
 
watch(()=>num.current, (newVal) => {
    gsap.to(num, {
        duration: 1,
        tweenedNumber: newVal
    })
})
 
</script>
    
<style>
</style>
```