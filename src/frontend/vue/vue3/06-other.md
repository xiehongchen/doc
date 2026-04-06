## 6、其他

### 1.全局API的转移

- Vue 2.x 有许多全局 API 和配置。

  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })
    
    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0中对这些API做出了调整：

  - 将全局的API，即：```Vue.xxx```调整到应用实例（```app```）上

    | 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)                        |
    | ------------------------- | ------------------------------------------- |
    | Vue.config.xxxx           | app.config.xxxx                             |
    | Vue.config.productionTip  | <strong style="color:#DD5145">移除</strong> |
    | Vue.component             | app.component                               |
    | Vue.directive             | app.directive                               |
    | Vue.mixin                 | app.mixin                                   |
    | Vue.use                   | app.use                                     |
    | Vue.prototype             | app.config.globalProperties                 |
### 2.其他改变

- data选项应始终被声明为一个**函数**。

- 过度类名的更改：

  - Vue2.x写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
    
    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- <strong style="color:#DD5145">移除</strong>keyCode作为 v-on 的修饰符，同时也不再支持`config.keyCodes`

- <strong style="color:#DD5145">移除</strong>`v-on.native`修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    ```vue
    <script>
      export default {
        emits: ['close']
      }
    </script>
    ```

- <strong style="color:#DD5145">移除</strong>过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ...... 

### 可选链操作符	双问号表达式

```
?
a.children?.length
返回的是 undefined		不会报错

??
a.children?.length ?? []
返回的是	[]
这个只能是null和undefined，然后返回 ?? 后面的数据
```

### Scoped和样式穿透

主要是用于修改很多vue常用的组件库（element, vant, AntDesigin），虽然配好了样式但是还是需要更改其他的样式

就需要用到样式穿透

- scoped的原理


vue中的scoped 通过在DOM结构以及css样式上加唯一不重复的标记:data-v-hash的方式，以保证唯一（而这个工作是由过PostCSS转译实现的），达到样式私有化模块化的目的。

总结一下scoped三条渲染规则：

1. 给HTML的DOM节点加一个不重复data属性(形如：data-v-123)来表示他的唯一性

2. 在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如[data-v-123]）来私有化样式
3. 如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性

PostCSS会给一个组件中的所有dom添加了一个独一无二的动态属性data-v-xxxx，然后，给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom——组件内部dom, 从而达到了'样式模块化'的效果.

案例修改Element ui Input样式

发现没有生效
![img](/images/vue/p-2.png)

 如果不写Scoped 就没问题

原因就是Scoped 搞的鬼 他在进行PostCss转化的时候把元素选择器默认放在了最后

![img](/images/vue/p-3.png)

 Vue 提供了样式穿透:deep() 他的作用就是用来改变 属性选择器的位置

![img](/images/vue/p-4.png)

![img](/images/vue/p-5.png)

### css style
#### 1.插槽选择器

A 组件定义一个插槽

```vue
<template>
    <div>
        我是插槽
        <slot></slot>
    </div>
</template>
 
<script>
export default {}
</script>
 
<style scoped>
 
</style>
```

在App.vue 引入

```vue
<template>
    <div>
        <A>
            <div class="a">私人定制div</div>
        </A>
    </div>
</template>
 
<script setup>
import A from "@/components/A.vue"
</script>
 
 
<style lang="less" scoped>
</style>
```

在A组件修改class a 的颜色

```vue
<style scoped>
.a{
    color:red
}
</style>
```

默认情况下，作用域样式不会影响到 `<slot/>` 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。

解决方案 slotted

```vue
<style scoped>
 :slotted(.a) {
    color:red
}
</style>
```

####  2.全局选择器

在之前我们想加入全局 样式 通常都是新建一个style 标签 不加[scoped](https://so.csdn.net/so/search?q=scoped&spm=1001.2101.3001.7020) 现在有更优雅的解决方案

```vue
<style>
 div{
     color:red
 }
</style>
 
<style lang="less" scoped>
 
</style>
```

```vue
<style lang="less" scoped>
:global(div){
    color:red
}
</style>
```

效果等同于上面 

#### 3.动态 CSS

单文件组件的 `<style>` 标签可以通过 `v-bind` 这一 CSS 函数将 CSS 的值关联到动态的组件状态上：

```vue
<template>
    <div class="div">
       小满是个弟弟
    </div>
</template>
 
<script lang="ts" setup>
import { ref } from 'vue'
const red = ref<string>('red')
</script>
 
<style lang="less" scoped>
.div{
   color:v-bind(red)
}
 
</style>
```

如果是对象 [v-bind](https://so.csdn.net/so/search?q=v-bind&spm=1001.2101.3001.7020) 请加引号

```vue
 <template>
    <div class="div">
        小满是个弟弟
    </div>
</template>
 
<script lang="ts" setup>
import { ref } from "vue"
const red = ref({
    color:'pink'
})
</script>
 
    <style lang="less" scoped>
.div {
    color: v-bind('red.color');
}
</style>
```

#### 4.css module

`<style module>` 标签会被编译为 CSS Modules 并且将生成的 CSS 类作为 $style 对象的键暴露给组件

```vue
<template>
    <div :class="$style.red">
        小满是个弟弟
    </div>
</template>
 
<style module>
.red {
    color: red;
    font-size: 20px;
}
</style>
```

自定义注入名称（多个可以用数组）

你可以通过给 module attribute 一个值来自定义注入的类对象的 property 键

```vue
<template>
    <div :class="[zs.red,zs.border]">
        小满是个弟弟
    </div>
</template>
 
<style module="zs">
.red {
    color: red;
    font-size: 20px;
}
.border{
    border: 1px solid #ccc;
}
</style>
```


与组合式 API 一同使用

注入的类可以通过 useCssModule API 在 `setup() `和 `<script setup>` 中使用。对于使用了自定义注入名称的` <style module>` 模块，useCssModule 接收一个对应的 module attribute 值作为第一个参数

```vue
<template>
    <div :class="[zs.red,zs.border]">
        小满是个弟弟
    </div>
</template>
 
 
<script setup lang="ts">
import { useCssModule } from 'vue'
const css = useCssModule('zs')
</script>
 
<style module="zs">
.red {
    color: red;
    font-size: 20px;
}
.border{
    border: 1px solid #ccc;
}
</style>
```

## tsx

我们之前呢是使用Template去写我们模板。现在可以扩展另一种风格[TSX](https://so.csdn.net/so/search?q=TSX&spm=1001.2101.3001.7020)风格

vue2 的时候就已经支持[jsx](https://so.csdn.net/so/search?q=jsx&spm=1001.2101.3001.7020)写法，只不过不是很友好，随着vue3对typescript的支持度，tsx写法越来越被接受

### 1.安装插件

`npm install @vitejs/plugin-vue-jsx -D`

`vite.config.ts` 配置

![img](https://img-blog.csdnimg.cn/35486eb0bd1a4dabac0035384f877cbe.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5ruhenM=,size_20,color_FFFFFF,t_70,g_se,x_16)

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()]
})
```

### 2.修改tsconfig.json 配置文件

```json
    "jsx": "preserve",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment",
```

![img](https://img-blog.csdnimg.cn/e6d0ae1a4c254f13bde802f408fed4b3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5bCP5ruhenM=,size_20,color_FFFFFF,t_70,g_se,x_16)

配置完成就可以使用啦

在目录新建一个xxxxxx.tsx文件

### 3.使用TSX

TIPS tsx不会自动解包使用ref加.vlaue ! ! !

#### tsx支持 v-model 的使用

```ts
 
import { ref } from 'vue'
 
let v = ref<string>('')
 
const renderDom = () => {
    return (
        <>
           <input v-model={v.value} type="text" />
           <div>
               {v.value}
           </div>
        </>
    )
}
 
export default renderDom
```

#### v-show

```ts
import { ref } from 'vue'
 
let flag = ref(false)
 
const renderDom = () => {
    return (
        <>
           <div v-show={flag.value}>景天</div>
           <div v-show={!flag.value}>雪见</div>
        </>
    )
}
 
export default renderDom
```

#### v-if是不支持的

所以需要改变风格

```ts
import { ref } from 'vue'
 
let flag = ref(false)
 
const renderDom = () => {
    return (
        <>
            {
                flag.value ? <div>景天</div> : <div>雪见</div>
            }
        </>
    )
}
 
export default renderDom
```

#### v-for也是不支持的

需要使用Map

```ts
import { ref } from 'vue'
 
let arr = [1,2,3,4,5]
 
const renderDom = () => {
    return (
        <>
            {
              arr.map(v=>{
                  return <div>${v}</div>
              })
            }
        </>
    )
}
 
export default renderDom
```

#### v-bind使用

直接赋值就可以

```ts
import { ref } from 'vue'
 
let arr = [1, 2, 3, 4, 5]
 
const renderDom = () => {
    return (
        <>
            <div data-arr={arr}>1</div>
        </>
    )
}
 
export default renderDom
```

#### v-on绑定事件 所有的事件都按照react风格来

- 所有事件有on开头
- 所有事件名称首字母大写

```ts
 
const renderDom = () => {
    return (
        <>
            <button onClick={clickTap}>点击</button>
        </>
    )
}
 
const clickTap = () => {
    console.log('click');
}
 
export default renderDom
```

#### Props 接受值

```ts
 
import { ref } from 'vue'
 
type Props = {
    title:string
}
 
const renderDom = (props:Props) => {
    return (
        <>
            <div>{props.title}</div>
            <button onClick={clickTap}>点击</button>
        </>
    )
}
 
const clickTap = () => {
    console.log('click');
}
 
export default renderDom
```

#### Emit派发

```ts
type Props = {
    title: string
}
 
const renderDom = (props: Props,content:any) => {
    return (
        <>
            <div>{props.title}</div>
            <button onClick={clickTap.bind(this,content)}>点击</button>
        </>
    )
}
 
const clickTap = (ctx:any) => {
 
    ctx.emit('on-click',1)
}
```

#### Slot

```ts
const A = (props, { slots }) => (
  <>
    <h1>{ slots.default ? slots.default() : 'foo' }</h1>
    <h2>{ slots.bar?.() }</h2>
  </>
);
 
const App = {
  setup() {
    const slots = {
      bar: () => <span>B</span>,
    };
    return () => (
      <A v-slots={slots}>
        <div>A</div>
      </A>
    );
  },
};
 
// or
 
const App = {
  setup() {
    const slots = {
      default: () => <div>A</div>,
      bar: () => <span>B</span>,
    };
    return () => <A v-slots={slots} />;
  },
};
 
// or you can use object slots when `enableObjectSlots` is not false.
const App = {
  setup() {
    return () => (
      <>
        <A>
          {{
            default: () => <div>A</div>,
            bar: () => <span>B</span>,
          }}
        </A>
        <B>{() => "foo"}</B>
      </>
    );
  },
};
```

## Event Loop 和 nextTick

### JS 执行机制

在我们学js 的时候都知道js 是单线程的如果是多线程的话会引发一个问题在同一时间同时操作DOM 一个增加一个删除JS就不知道到底要干嘛了，所以这个语言是单线程的但是随着HTML5到来js也支持了多线程webWorker 但是也是不允许操作DOM

单线程就意味着所有的任务都需要排队，后面的任务需要等前面的任务执行完才能执行，如果前面的任务耗时过长，后面的任务就需要一直等，一些从用户角度上不需要等待的任务就会一直等待，这个从体验角度上来讲是不可接受的，所以JS中就出现了异步的概念。

### 同步任务

代码从上到下按顺序执行

### 异步任务

#### 1.宏任务

script(整体代码)、setTimeout、setInterval、UI交互事件、postMessage、Ajax

#### 2.微任务

Promise.then catch finally、MutaionObserver、process.nextTick(Node.js 环境)

#### 运行机制

所有的同步任务都是在主进程执行的形成一个执行栈，主线程之外，还存在一个"任务队列"，异步任务执行队列中先执行宏任务，然后清空当次宏任务中的所有微任务，然后进行下一个tick如此形成循环。

nextTick 就是创建一个异步任务，那么它自然要等到同步任务执行完成后才执行。

```vue
<template>
   <div ref="xiaoman">
      {{ text }}
   </div>
   <button @click="change">change div</button>
</template>
   
<script setup lang='ts'>
import { ref,nextTick } from 'vue';
 
const text = ref('小满开飞机')
const xiaoman = ref<HTMLElement>()
 
const change = async () => {
   text.value = '小满不开飞机'
   console.log(xiaoman.value?.innerText) //小满开飞机
   await nextTick();
   console.log(xiaoman.value?.innerText) //小满不开飞机
}
 
 
</script>
 
 
<style  scoped>
</style>
```

nextTick 接受一个参数fn（函数）定义了一个变量P 这个P最终返回都是Promise，最后是return 如果传了fn 就使用变量P.then执行一个微任务去执行fn函数，then里面this 如果有值就调用bind改变this指向返回新的函数，否则直接调用fn，如果没传fn，就返回一个promise，最终结果都会返回一个promise

在我们之前讲过的ref源码中有一段 triggerRefValue  他会去调用 triggerEffects

```ts
export function triggerRefValue(ref: RefBase<any>, newVal?: any) {
  ref = toRaw(ref)
  if (ref.dep) {
    if (__DEV__) {
      triggerEffects(ref.dep, {
        target: ref,
        type: TriggerOpTypes.SET,
        key: 'value',
        newValue: newVal
      })
    } else {
      triggerEffects(ref.dep)
    }
  }
}
```

```ts
export function triggerEffects(
  dep: Dep | ReactiveEffect[],
  debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
  // spread into array for stabilization
  for (const effect of isArray(dep) ? dep : [...dep]) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (__DEV__ && effect.onTrigger) {
        effect.onTrigger(extend({ effect }, debuggerEventExtraInfo))
      }
      //当响应式对象发生改变后，执行 effect 如果有 scheduler 这个参数，会执行这个 scheduler 函数
      if (effect.scheduler) {
        effect.scheduler()
      } else {
        effect.run()
      }
    }
  }
}
```

那么scheduler 这个函数从哪儿来的 我们看这个类 ReactiveEffect

```ts
export class ReactiveEffect<T = any> {
  active = true
  deps: Dep[] = []
  parent: ReactiveEffect | undefined = undefined
 
  /**
   * Can be attached after creation
   * @internal
   */
  computed?: ComputedRefImpl<T>
  /**
   * @internal
   */
  allowRecurse?: boolean
 
  onStop?: () => void
  // dev only
  onTrack?: (event: DebuggerEvent) => void
  // dev only
  onTrigger?: (event: DebuggerEvent) => void
 
  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null, //我在这儿 
    scope?: EffectScope
  ) {
    recordEffectScope(this, scope)
  }
```

那么scheduler 这个函数从哪儿来的 我们看这个类 ReactiveEffect

```ts
export class ReactiveEffect<T = any> {
  active = true
  deps: Dep[] = []
  parent: ReactiveEffect | undefined = undefined
 
  /**
   * Can be attached after creation
   * @internal
   */
  computed?: ComputedRefImpl<T>
  /**
   * @internal
   */
  allowRecurse?: boolean
 
  onStop?: () => void
  // dev only
  onTrack?: (event: DebuggerEvent) => void
  // dev only
  onTrigger?: (event: DebuggerEvent) => void
 
  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null, //我在这儿 
    scope?: EffectScope
  ) {
    recordEffectScope(this, scope)
  }
```

scheduler 作为一个参数传进来的

```ts
   const effect = (instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(instance.update),
      instance.scope // track it in component's effect scope
    ))
```

他是在初始化 effect 通过 queueJob 传进来的

```ts
//queueJob 维护job列队，有去重逻辑，保证任务的唯一性，每次调用去执行，被调用的时候去重，每次调用去执行 queueFlush
export function queueJob(job: SchedulerJob) {
  // 判断条件：主任务队列为空 或者 有正在执行的任务且没有在主任务队列中  && job 不能和当前正在执行任务及后面待执行任务相同
  // 重复数据删除：
  // - 使用Array.includes(Obj, startIndex) 的 起始索引参数：startIndex
  // - startIndex默认为包含当前正在运行job的index，此时，它不能再次递归触发自身
  // - 如果job是一个watch()回调函数或者当前job允许递归触发，则搜索索引将+1，以允许他递归触发自身-用户需要确保回调函数不会死循环
  if (
    (!queue.length ||
      !queue.includes(
        job,
        isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
      )) &&
    job !== currentPreFlushParentJob
  ) {
    if (job.id == null) {
      queue.push(job)
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job)
    }
    queueFlush()
  }
}

 queueJob 维护job列队 并且调用  queueFlush

function queueFlush() {
  // 避免重复调用flushJobs
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true
     //开启异步任务处理flushJobs
    currentFlushPromise = resolvedPromise.then(flushJobs)
  }
}
```

queueFlush 给每一个队列创建了微任务

### 如何去理解Tick

> vue更新dom是异步的，数据更新是同步的
>
> 当我们操作dom的时候发现数据获取的是上次的，就需要使用nextTick

例如我们显示器是60FPS

那浏览器绘制一帧就是1000 / 60  ≈ 16.6ms

那浏览器这一帧率做了什么

1.处理用户的事件，就是event 例如 click，input change 等。

2.执行定时器任务

3.执行 requestAnimationFrame 动画

4.执行dom 的回流与重绘

5.计算更新图层的绘制指令

6.绘制指令合并主线程 如果有空余时间会执行 requestidlecallback

所以 一个Tick 就是去做了这些事

```vue
<template>
  <div ref="box" class="wraps">
    <div>
      <div class="item" v-for="item in chatList">
        <div>{{ item.name }}:</div>
        <div>{{ item.message }}</div>
      </div>
    </div>
  </div>
  <div class="ipt">
    <div>
      <textarea v-model="ipt" type="text" />
    </div>
    <div>
      <button @click="send">send</button>
    </div>
  </div>
<HelloWorld></HelloWorld>
</template>
 
<script setup lang='ts'>
import { reactive,ref,nextTick,getCurrentInstance, watch } from 'vue'
import HelloWorld from './components/HelloWorld.vue';
// let instance = getCurrentInstance()
// console.log(instance);
let current = ref(0)
watch(current,(newVal,oldVal)=>{
  console.log(newVal);
})
//next Tick
//60FPS 1000/60 = 16.7ms
// 1.处理用户的事件，就是event 例如 click，input change 等。
 
// 2.执行定时器任务
 
// 3.执行 requestAnimationFrame
 
// 4.执行dom 的回流与重绘
 
// 5.计算更新图层的绘制指令
 
// 6.绘制指令合并主线程 如果有空余时间会执行 requestidlecallback
 
// for (let i =0;i<1000;i++) {
//   current.value = i
// }
 
let chatList = reactive([
  { name: '张三', message: "xxxxxxxxx" },
])
let box = ref<HTMLDivElement>()
let ipt = ref('')
//Vue 更新dom是异步的 数据更新是同步
//我们本次执行的代码是同步代码
//当我们操作dom 的时候发现数据读取的是上次的 就需要使用nextIick
const send = async () => {
  chatList.push({
     name:"小满",
     message:ipt.value
  })
  //1.回调函数模式
  //2.async await 写法
  await nextTick()
  box.value!.scrollTop = 99999999
 
  //ipt.value = ''
}
</script>
 
<style scoped lang='less'>
.wraps {
  margin: 10px auto;
  width: 500px;
  height: 400px;
  overflow: auto;
  overflow-x: hidden;
  background: #fff;
  border: 1px solid #ccc;
 
  .item {
    width: 100%;
    height: 50px;
    background: #ccc;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid #fff;
  }
}
 
.ipt {
  margin: 10px auto;
  width: 500px;
  height: 40px;
  background: #fff;
  border: 1px solid #ccc;
 
  textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
  button {
    width: 100px;
    margin: 10px 0;
    float: right;
  }
}
</style>
```

## vue开发移动&打包APP

## unocss原子化

什么是css原子化？
CSS原子化的优缺点

1. 减少了css体积，提高了css复用
2. 减少起名的复杂度
3. 增加了记忆成本 将css拆分为原子之后，你势必要记住一些class才能书写，哪怕tailwindcss提供了完善的工具链，你写background，也要记住开头是bg


## 常见库

- lodash
- gsap
- Mitt --- Bus
- unplugin-auto-import --- 自动引入ref之类的
- vueuse
- Tailwind CSS
