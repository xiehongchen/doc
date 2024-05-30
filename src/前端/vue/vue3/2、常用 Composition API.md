## 2、常用 Composition API	组合式api

官方文档: https://v3.cn.vuejs.org/guide/composition-api-introduction.html

### 1.拉开序幕的setup

- setup 是 Vue3 中一个新的配置项，值为函数
- 组件中使用的数据、方法等都要配置在 setup 中
- setup 函数两种返回值：
  - 返回一个对象，对象中的属性、方法可在模板中直接使用
  - 返回一个渲染函数，可自定义渲染内容
- setup 函数的参数：
  - props：值为对象，包含了组件外部传进来，且组件内部声明接收的属性
  - context：上下文对象
    - `attrs`：值为对象，包含了组件外部传进来，且组件内部没有声明接收的属性，相当于 `this.$attrs`
    - `slots`：收到的插槽内容，相当于 `this.$slots`
    - `emit`：触发自定义事件的函数，相当于 `this.$emit`

```js
import { h } from 'vue'

export default {
  name: 'App',
  props: ['title'],
  // Vue3 需要声明自定义事件，虽然不声明也能运行
  emits: ['changeCount'],

  // 返回函数
  /*
  setup() {
    return () => h('h1', 'Hello')
  },
  */

  // 返回对象
  setup(props, context) {
    let name = 'Vue3'
    function sayHello() {}
    function test() {
      context.emit('changeCount', 888)
    }

    return {
      name,
      sayHello,
      test,
    }
  },
}
```

- setup 在 `beforeCreate` 钩子之前执行，`this` 为 `undefined`
- setup 不要和 Vue2 配置混用。Vue2 的配置可以访问到 setup 的属性方法，反过来不行；如有重名，setup 优先
- setup 不能是 async 函数，因为 async 函数返回的是 promise 不是对象，会导致模板无法访问属性方法
- 若要返回 promise 实例，需要 `Suspense` 和异步组件的配合

###  2.ref函数

- 作用: 定义一个响应式的数据
- 语法: ```const xxx = ref(initValue)``` 
  - 创建一个包含响应式数据的<strong style="color:#DD5145">引用对象（reference对象，简称ref对象）</strong>。
  - JS中操作数据： ```xxx.value```
  - 模板中读取数据: 不需要.value，直接：```<div>{{xxx}}</div>```
- 备注：
  - 接收的数据可以是：基本类型、也可以是**对象类型**。
  - 基本类型的数据：响应式依然是靠``Object.defineProperty()``的```get```与```set```完成的。
  - 对象类型的数据：内部 <i style="color:gray;font-weight:bold">“ 求助 ”</i> 了Vue3.0中的一个新函数—— ```reactive```函数。
  - 对象类型数据使用 ES6 的 `Proxy` 实现响应式，Vue3 把相关操作封装在 `reactive` 函数中
  - 按照之前的办法，对于对象数据，应该遍历每一层的属性添加 `getter` 、`setter`，但 Vue3 使用 Proxy 把内部数据一口气监测了

```html
<h2>{{ name }}</h2>
<p>{{ jobInfo.type }}</p>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    let name = ref('Vue3')
    let jobInfo = ref({
      type: 'frontend',
      salary: '40w',
    })

    function changeInfo() {
      name.value = '鱿鱼丝'
      // jobInfo 是 RefImpl 实例
      // jobInfo.value 是 Proxy 实例对象
      jobInfo.value.salary = '50w'
    }

    return {
      name,
      jobInfo, 
      changeInfo,
    }
  },
}
```

### 3.reactive函数

- 作用: 定义一个<strong style="color:#DD5145">对象类型</strong>的响应式数据（基本类型不要用它，要用```ref```函数）
- 语法：```const 代理对象= reactive(源对象)```接收一个对象（或数组），返回一个<strong style="color:#DD5145">代理对象（Proxy的实例对象，简称proxy对象）</strong>
- reactive定义的响应式数据是“**深层次的**”。
- 内部基于 ES6 的 Proxy 实现，通过**代理对象**操作源对象内部数据进行操作。
- `reactive` `proxy` 不能直接赋值，否则会破坏响应式对象的
  - 解决方法： 数组可以使用push 加上 解构
  - 添加一个对象，把数组作为一个属性去解决


```js
import { reactive } from 'vue'

export default {
  setup() {
    let person = reactive({
      name: 'Vue3',
      sex: 'unknown',
      info: {
        school: 'Oxford',
        major: 'computer',
      },
    })

    let color = reactive(['red', 'green', 'blue'])

    function changeInfo() {
      person.info.major = 'art'
      color[0] = 'yellow'
    }

    return {
      person,
      color,
      changeInfo,
    }
  },
}
```

### 4.Vue3.0中的响应式原理

#### vue2.x的响应式

- 实现原理：

  - 对象类型：通过```Object.defineProperty()```对属性的读取、修改进行拦截（数据劫持）。

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```js
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })
    ```

- 存在问题：

  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。

#### Vue3.0的响应式

- 实现原理: 

  - 通过**Proxy（代理）**:  **拦截对象中任意属性的变化**, 包括：属性值的读写、属性的添加、属性的删除等。

  - 通过**Reflect（反射）**:  对源对象的属性进行操作。

  - MDN文档中描述的Proxy与Reflect：

    - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

    - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect


```js
new Proxy(data, {
	// 拦截读取属性值	target:源对象	prop:属性
    get (target, prop) {
    	return Reflect.get(target, prop)
    },
    // 拦截设置属性值或添加新属性
    set (target, prop, value) {
    	return Reflect.set(target, prop, value)
    },
    // 拦截删除属性
    deleteProperty (target, prop) {
    	return Reflect.deleteProperty(target, prop)
    }
})

proxy.name = 'tom'
```

### 5.reactive对比ref

-  从定义数据角度对比：
   -  ref用来定义：<strong style="color:#DD5145">基本类型数据</strong>。
   -  reactive用来定义：<strong style="color:#DD5145">对象（或数组）类型数据</strong>。
   -  备注：ref也可以用来定义<strong style="color:#DD5145">对象（或数组）类型数据</strong>, 它内部会自动通过```reactive```转为<strong style="color:#DD5145">代理对象</strong>。
-  从原理角度对比：
   -  ref通过``Object.defineProperty()``的```get```与```set```来实现响应式（数据劫持）。
   -  reactive通过使用<strong style="color:#DD5145">Proxy</strong>来实现响应式（数据劫持）, 并通过<strong style="color:#DD5145">Reflect</strong>操作<strong style="color:orange">源对象</strong>内部的数据。
-  从使用角度对比：
   -  ref定义的数据：操作数据<strong style="color:#DD5145">需要</strong>```.value```，读取数据时模板中直接读取<strong style="color:#DD5145">不需要</strong>```.value```。
   -  reactive定义的数据：操作数据与读取数据：<strong style="color:#DD5145">均不需要</strong>```.value```。

### 6.setup的两个注意点

- setup执行的时机
  - 在beforeCreate之前执行一次，**this是undefined**。
  - 所以setup拿不到data的数据

- setup的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：**上下文对象**
    - attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 ```this.$attrs```。
    - slots: 收到的插槽内容, 相当于 ```this.$slots```。
    - emit: 分发自定义事件的函数, 相当于 ```this.$emit```。


### 7.计算属性与监视

#### 1.computed函数

- 与Vue2.x中computed配置功能一致

- 写法

  ```js
  import {reavtive,computed} from 'vue'
  
  setup(){
      let person = reavtive({
          firstName: '张',
          lastName: '三'
      })
  	//计算属性——简写（没有考虑计算属性被修改的情况）
      let fullName = computed(()=>{
          return person.firstName + '-' + person.lastName
      })
      
      //也可以作为reactive的一个子项加入
      Person.fullName = computed(()=>{
          return person.firstName + '-' + person.lastName
      })
      //计算属性——完整（考虑到计算属性被修改的情况）
      let fullName = computed({
          get(){
              return person.firstName + '-' + person.lastName
          },
          set(value){
              const nameArr = value.split('-')
              person.firstName = nameArr[0]
              person.lastName = nameArr[1]
          }
      })
  }
  ```

#### 2.watch函数

- 与Vue2.x中watch配置功能一致

- 两个小“坑”：

  - 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
  - 监视reactive定义的响应式数据中某个属性时：deep配置有效。

  ```js
  //情况一：监视ref定义的响应式数据
  watch(sum,(newValue,oldValue)=>{
  	console.log('sum变化了',newValue,oldValue)
  },{immediate:true})
  
  //情况二：监视多个ref定义的响应式数据
  watch([sum,msg],(newValue,oldValue)=>{
  	console.log('sum或msg变化了',newValue,oldValue)
  }) 
  
  /* 情况三：监视reactive定义的响应式数据
  	若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
  	若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
  */
  watch(person,(newValue,oldValue)=>{
  	console.log('person变化了',newValue,oldValue)
  },{immediate:true,deep:false}) //此处的deep配置不再奏效
  
  //情况四：监视reactive定义的响应式数据中的某个属性
  watch(()=>person.job,(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true}) 
  
  //情况五：监视reactive定义的响应式数据中的某些属性
  watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true})
  
  //特殊情况
  watch(()=>person.job,(newValue,oldValue)=>{
      console.log('person的job变化了',newValue,oldValue)
  },{deep:true}) //此处由于监视的是reactive所定义的对象中的某个属性，所以deep配置有效
  ```

#### 3.watchEffect函数

- watch的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect有点像computed：

  - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

  ```js
  //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
  watchEffect(()=>{
      const x1 = sum.value
      const x2 = person.age
      console.log('watchEffect配置的回调执行了')
  })
  ```

### 8.生命周期

vue3的生命周期图:

<!-- ![vue3生命周期图](C:/Users/谢红尘/笔记/前端/框架/vue/image/lifecycle.16e4c08e.png) -->

vue2生命周期图:

<!-- ![vue2生命周期图](C:/Users/谢红尘/笔记/前端/框架/vue/image/生命周期.png) -->

- Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
  - `beforeDestroy`改名为 `beforeUnmount`
  - `destroyed`改名为 `unmounted`
- Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`
  - `onErrorCaptured` =====>注册一个钩子，在捕获了后代组件传递的错误时调用。
  - `onRenderTracked` =====> 注册一个调试钩子，当组件渲染过程中追踪到响应式依赖时调用。（仅在开发模式下可用）
  - `onRenderTriggered` =====> 注册一个调试钩子，当响应式依赖的变更触发了组件渲染时调用。（仅在开发模式下可用）
  - `onServerPrefetch` =====> 注册一个异步函数，在组件实例在服务器上被渲染之前调用。（仅在**服务器端渲染期间**可用）

### 9.自定义hook函数

- 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装。

- 类似于vue2.x中的mixin。

- 自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂。

- hook 放在 hooks 文件夹中，一个文件对应一个功能模块，以 `useXxx` 命名


```js
// hooks/usePoint.js
import { reactive, onMounted, onBeforeUnmount } from 'vue'

export default function () {
  //实现鼠标“打点”相关的数据
  let point = reactive({
    x: 0,
    y: 0,
  })

  //实现鼠标“打点”相关的方法
  function savePoint(event) {
    point.x = event.pageX
    point.y = event.pageY
  }

  //实现鼠标“打点”相关的生命周期钩子
  onMounted(() => {
    window.addEventListener('click', savePoint)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', savePoint)
  })

  return point
}
```

```js
// 使用 hook
import usePoint from '../hooks/usePoint.js'

export default {
  setup() {
    let point = usePoint()

    return { point }
  },
}
```

#### 案例

```ts
import { onMounted } from 'vue'
 
 
type Options = {
    el: string
}
 
type Return = {
    Baseurl: string | null
}
export default function (option: Options): Promise<Return> {
 
    return new Promise((resolve) => {
        onMounted(() => {
            const file: HTMLImageElement = document.querySelector(option.el) as HTMLImageElement;
            file.onload = ():void => {
                resolve({
                    Baseurl: toBase64(file)
                })
            }
 
        })
 
 
        const toBase64 = (el: HTMLImageElement): string => {
            const canvas: HTMLCanvasElement = document.createElement('canvas')
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            canvas.width = el.width
            canvas.height = el.height
            ctx.drawImage(el, 0, 0, canvas.width,canvas.height)
            console.log(el.width);
            
            return canvas.toDataURL('image/png')
 
        }
    })
}
```

#### 案例二

自定义指令 + hooks 双管齐下

实现一个监听元素变化的hook

主要会用到一个新的API resizeObserver 兼容性一般 可以做polyfill

但是他可以监听元素的变化 执行回调函数 返回 contentRect 里面有变化之后的宽高。

```ts
import { App, defineComponent, onMounted } from 'vue'
 
function useResize(el: HTMLElement, callback: (cr: DOMRectReadOnly,resize:ResizeObserver) => void) {
    let resize: ResizeObserver
        resize = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const cr = entry.contentRect;
                callback(cr,resize)
            }
        });
        resize.observe(el)
}
 
 
 
const install = (app: App) => {
    app.directive('resize', {
        mounted(el, binding) {
            useResize(el, binding.value)
        }
    })
}
 
useResize.install = install
 
export default useResize
```



### 10.toRef

- 作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性。
- 语法：```const name = toRef(person,'name')```
- 应用:   要将响应式对象中的某个属性单独提供给外部使用时。
- 只能修改响应式对象的值
- 使用场景：解构赋值，解构出来的也是响应式数据


- 扩展：```toRefs``` 与```toRef```功能一致，但可以批量创建多个 ref 对象，语法：`toRefs(person)`   只能拆开

```js
import {reactive, toRef, toRefs} from 'vue'
...

setup() {
  let person = reactive({
    name: 'Vue3',
    age: 18,
    info: {
      job: {
        salary: 40,
      },
    },
  })

  return {
    // 注意不能写成 ref(person.name)，这和源对象是割裂开的
    name: toRef(person, 'name'),
    salary: toRef(person.info.job, 'salary')
    // or
    ...toRefs(person)
  }
}
```