## 3、其它 Composition API

### 1.shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。

- 什么时候使用?
  -  如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  -  如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

```js
import { shallowReactive, shallowRef } from 'vue'

setup() {
  let person = shallowReactive({
    name: 'Vue3',
    age: 21,
    info: {
      job: {
        salary: 22
      }
    }
  })
  let x = shallowRef({
    y: 0
  })
  return {
    person,
    x
  }
}
```

### 2.readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。浅层的数据不可以被修改，可以修改深层的数据
- 应用场景: 不希望数据被修改时。

```js
setup() {
  let sum = ref(0)
  let person = reactive({...})

  sum = readonly(sum)
  person = shallowReadonly(person)

  return {
    sum,
    person
  }
}
```

### 3.toRaw 与 markRaw

- toRaw：
  - 作用：将一个由```reactive```生成的<strong style="color:orange">响应式对象</strong>转为<strong style="color:orange">普通对象</strong>。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

```js
setup() {
  function showRawPerson() {
    const p = toRaw(person);
    p.age++;
    console.log(p);
    console.log(person);
  }

  function addCar() {
    let car = { name: "奔驰", price: 40 };
    person.car = markRaw(car);
  }
}
```

### 4.customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

- 实现防抖效果：

  ```vue
  <template>
  	<input type="text" v-model="keyword">
  	<h3>{{keyword}}</h3>
  </template>
  
  <script>
  	import {ref,customRef} from 'vue'
  	export default {
  		name:'Demo',
  		setup(){
  			// let keyword = ref('hello') //使用Vue准备好的内置ref
  			//自定义一个myRef	delay:延迟时间
  			function myRef(value,delay){
  				let timer
  				//通过customRef去实现自定义
  				return customRef((track,trigger)=>{
  					return{
  						get(){
  							track() //告诉Vue这个value值是需要被“追踪”的
  							return value
  						},
  						set(newValue){
  							clearTimeout(timer)
  							timer = setTimeout(()=>{
  								value = newValue
  								trigger() //告诉Vue去更新界面
  							},delay)
  						}
  					}
  				})
  			}
  			let keyword = myRef('hello',500) //使用程序员自定义的ref
  			return {
  				keyword
  			}
  		}
  	}
  </script>
  ```

  

### 5.provide 与 inject

<!-- ![组件通信](C:/Users/谢红尘/笔记/前端/框架/vue/image/provide-inject.840efd40.png) -->

- 作用：实现<strong style="color:#DD5145">祖与后代组件间</strong>通信

- 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

- 具体写法：

  1. 祖组件中：

     ```js
     setup(){
     	......
         let car = reactive({name:'奔驰',price:'40万'})
         provide('car',car)
         ......
     }
     ```

  2. 后代组件中：

     ```js
     setup(props,context){
     	......
         const car = inject('car')
         return {car} 
     	......
     }
     ```

> 你如果传递普通的值 是不具有响应式的 需要通过ref reactive 添加响应式

### 6.响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

### 7、父子组件传参

#### 父组件向子组件传值

父组件

```vue
<template>
  <children :data="name"></children>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
let name = '父组件'
</script>

```

子组件

```vue
<script setup lang='ts'>
// 接收父组件传过来的值 defineProps ts
const props = defineProps<{ data: string }>()

// 添加默认值 ts
withDefaults(defineProps<{
  msg: string
}>(), {
  msg: 'Hello World'
})
    
// 接收父组件传过来的值 js
const props = defineProps({
  data: {
    type: String,
    default: 'default'
  }
})
</script>
```

#### 子组件向父组件传值

父组件

```vue
<template>
  <div>父组件</div>
  <HelloWorld ref="world" @update="getName"/>
</template>
<script setup lang='ts'>
import { ref,onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
const world = ref<InstanceType<typeof HelloWorld>>()
// 子组件向父组件传值
const getName = function({
    
})
// 在onMounted中调用子组件的方法
onMounted(() => {
  world.value?.open()
})
</script>
```

子组件

```vue
<script setup lang='ts'>
// 给父组件传递数据 js写法
const emit = defineEmits(['update'])

// ts写法
const emit = defineEmits<{
 (e: 'update', value: string): void
}>()

// 暴露属性和方法
defineExpose({
    name: 'HelloWorld',
    open:() => {
        console.log('HelloWorld')
    }
})
</script>
```

#### 案例	封装瀑布流组件

父组件

```vue
<template>
  <waterFallVue :list="list"></waterFallVue>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import waterFallVue from './components/water-fall.vue';
const list = [
  {
      height: 300,
      background: 'red'
  },
  {
      height: 400,
      background: 'pink'
  },
  {
      height: 500,
      background: 'blue'
  },
  {
      height: 200,
      background: 'green'
  },
  {
      height: 300,
      background: 'gray'
  },
  {
      height: 400,
      background: '#CC00FF'
  },
  {
      height: 200,
      background: 'black'
  },
  {
      height: 100,
      background: '#996666'
  },
  {
      height: 500,
      background: 'skyblue'
  },
  {
      height: 300,
      background: '#993366'
  },
  {
      height: 100,
      background: '#33FF33'
  },
  {
      height: 400,
      background: 'skyblue'
  },
  {
      height: 200,
      background: '#6633CC'
  },
  {
      height: 300,
      background: '#666699'
  },
  {
      height: 300,
      background: '#66CCFF'
  },
  {
      height: 300,
      background: 'skyblue'
  },
  {
      height: 200,
      background: '#CC3366'
  },
  {
      height: 200,
      background: '#CC9966'
  },
  {
      height: 200,
      background: '#FF00FF'
  },
  {
      height: 500,
      background: '#990000'
  },
  {
      height: 400,
      background: 'red'
  },
  {
      height: 100,
      background: '#999966'
  },
  {
      height: 200,
      background: '#CCCC66'
  },
  {
      height: 300,
      background: '#FF33FF'
  },
  {
      height: 400,
      background: '#FFFF66'
  },
  {
      height: 200,
      background: 'red'
  },
  {
      height: 100,
      background: 'skyblue'
  },
  {
      height: 200,
      background: '#33CC00'
  },
  {
      height: 300,
      background: '#330033'
  },
  {
      height: 100,
      background: '#0066CC'
  },
  {
      height: 200,
      background: 'skyblue'
  },
  {
      height: 100,
      background: '#006666'
  },
  {
      height: 200,
      background: 'yellow'
  },
  {
      height: 300,
      background: 'yellow'
  },
  {
      height: 100,
      background: '#33CCFF'
  },
  {
      height: 400,
      background: 'yellow'
  },
  {
      height: 400,
      background: 'yellow'
  },
  {
      height: 200,
      background: '#33FF00'
  },
  {
      height: 300,
      background: 'yellow'
  },
  {
      height: 100,
      background: 'green'
  }

]
</script>

<style  lang='less'>
#app,
html,
body {
  height: 100%;
}

* {
  padding: 0;
  margin: 0;
}
</style>
```

子组件

```vue
<template>
    <div class="wraps">
        <div :style="{height:item.height+'px',background:item.background,top:item.top+'px',left:item.left + 'px'}"
            v-for="item in waterList" class="items"></div>
    </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
const props = defineProps<{
    list: any[]
}>()
const waterList = reactive<any[]>([])
const init = () => {
    const heightList: any[] = []
    const width = 130;
    const x = document.body.clientWidth
    const column = Math.floor(x / width)
 
    for (let i = 0; i < props.list.length; i++) {
        if (i < column) {
            props.list[i].top = 10;
            props.list[i].left = i * width;
            heightList.push(props.list[i].height + 10)
            waterList.push(props.list[i])
        } else {
            let current = heightList[0]
            let index = 0;
            heightList.forEach((h, inx) => {
                if (current > h) {
                    current = h;
                    index = inx;
                }
            })
            console.log(current,'c')
            props.list[i].top = (current + 20);
            console.log(props.list[i].top,'top',i)
            props.list[i].left = index * width;
            heightList[index] =  (heightList[index] + props.list[i].height + 20);
            waterList.push(props.list[i])
        
        }
    }
    console.log(props.list)
}
 
onMounted(() => {
    window.onresize = () => init()
    init()
})
 
</script>
 
<style scoped lang='less'>
.wraps {
    position: relative;
     height: 100%;
    .items {
        position: absolute;
        width: 120px;
    }
}
</style>
```

### 8、兄弟组件传参和bus

#### 借助父组件传参

例如父组件为App 子组件为A 和 B他两个是同级的

```vue
<template>
    <div>
        <A @on-click="getFalg"></A>
        <B :flag="Flag"></B>
    </div>
</template>
    
<script setup lang='ts'>
import A from './components/A.vue'
import B from './components/B.vue'
import { ref } from 'vue'
let Flag = ref<boolean>(false)
const getFalg = (flag: boolean) => {
   Flag.value = flag;
}
</script>
    
<style>
</style>
```

A 组件派发事件通过App.vue 接受A组件派发的事件然后在Props 传给B组件 也是可以实现的

缺点就是比较麻烦 ，无法直接通信，只能充当桥梁

#### Event Bus

我们在[Vue2](https://so.csdn.net/so/search?q=Vue2&spm=1001.2101.3001.7020) 可以使用$emit 传递 $on监听 emit传递过来的事件

这个原理其实是运用了[JS设计模式](https://so.csdn.net/so/search?q=JS设计模式&spm=1001.2101.3001.7020)之发布订阅模式

```ts
type BusClass<T> = {
    emit: (name: T) => void
    on: (name: T, callback: Function) => void
}
type BusParams = string | number | symbol 
type List = {
    [key: BusParams]: Array<Function>
}
class Bus<T extends BusParams> implements BusClass<T> {
    list: List
    constructor() {
        this.list = {}
    }
    emit(name: T, ...args: Array<any>) {
        let eventName: Array<Function> = this.list[name]
        eventName.forEach(ev => {
            ev.apply(this, args)
        })
    }
    on(name: T, callback: Function) {
        let fn: Array<Function> = this.list[name] || [];
        fn.push(callback)
        this.list[name] = fn
    }
}
 
export default new Bus<number>()
```

然后挂载到Vue config 全局就可以使用啦

> 注：在vue3当中，$on，$off，$once实例方法已被移除，组件实例不再实现事件触发接口，因此EventBus便无法使用
>
> 可以使用Mitt库实现

#### Mitt

在vue3中$on，$off 和 $once 实例方法已被移除，组件实例不再实现事件触发接口，因此大家熟悉的EventBus便无法使用了。然而我们习惯了使用EventBus，对于这种情况我们可以使用Mitt库（其实就是我们视频中讲的发布订阅模式的设计）

##### 1.安装

```
npm install mitt -S
```

##### 2.main.ts 初始化

全局总线，vue 入口文件 main.js 中挂载全局属性

```ts
import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'

const Mit = mitt()

//TypeScript注册
// 由于必须要拓展ComponentCustomProperties类型才能获得类型提示
declare module "vue" {
    export interface ComponentCustomProperties {
        $Bus: typeof Mit
    }
}

const app = createApp(App)

//Vue3挂载全局API
app.config.globalProperties.$Bus = Mit

app.mount('#app')
```

##### 3使用方法通过emit派发， on 方法添加事件，off 方法移除，clear 清空所有

A组件派发（emit）

```vue
<template>
    <div>
        <h1>我是A</h1>
        <button @click="emit1">emit1</button>
        <button @click="emit2">emit2</button>
    </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance();
const emit1 = () => {
    instance?.proxy?.$Bus.emit('on-num', 100)
}
const emit2 = () => {
    instance?.proxy?.$Bus.emit('*****', 500)
}
</script>

<style>
</style> 
```

B组件监听（on）

```vue
<template>
    <div>
        <h1>我是B</h1>
    </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
instance?.proxy?.$Bus.on('on-num', (num) => {
    console.log(num,'===========>B')
})
</script>

<style>
</style>
```

监听所有事件（ on("*") ）

```ts
instance?.proxy?.$Bus.on('*',(type,num)=>{
    console.log(type,num,'===========>B')
})
```

移除监听事件（off）

```ts
const Fn = (num: any) => {
    console.log(num, '===========>B')
}
instance?.proxy?.$Bus.on('on-num',Fn)//listen
instance?.proxy?.$Bus.off('on-num',Fn)//unListen
```

清空所有监听（clear）

```ts
instance?.proxy?.$Bus.all.clear()
```

### 9、插槽

插槽就是子组件中的提供给父组件使用的一个占位符，用<slot></slot> 表示，父组件可以在这个占位符中填充任何模板代码，如 HTML、组件等，填充的内容会替换子组件的<slot></slot>标签。

#### 匿名插槽

1.在子组件放置一个插槽

```vue
<template>
    <div>
       <slot></slot>
    </div>
</template>
```

父组件使用插槽

在父组件给这个插槽填充内容

```vue
    <Dialog>
       <template v-slot>
           <div>2132</div>
       </template>
    </Dialog>
```
#### 具名插槽

具名插槽其实就是给插槽取个名字。一个子组件可以放多个插槽，而且可以放在不同的地方，而父组件填充内容时，可以根据这个名字把内容填充到对应插槽中

```vue
<div>
    <slot name="header"></slot>
    <slot></slot>
 
    <slot name="footer"></slot>
</div>
```
父组件使用需对应名称

```vue
    <Dialog>
        <template v-slot:header>
           <div>1</div>
       </template>
       <template v-slot>
           <div>2</div>
       </template>
       <template v-slot:footer>
           <div>3</div>
       </template>
    </Dialog>
```
 插槽简写

```vue
    <Dialog>
        <template #header>
           <div>1</div>
       </template>
       <template #default>
           <div>2</div>
       </template>
       <template #footer>
           <div>3</div>
       </template>
    </Dialog>
```
#### 作用域插槽

在子组件动态绑定参数 派发给父组件的slot去使用

```vue
<div>
    <slot name="header"></slot>
    <div>
        <div v-for="item in 100">
            <slot :data="item"></slot>
        </div>
    </div>
 
    <slot name="footer"></slot>
</div>
```
通过结构方式取值

```vue
     <Dialog>
        <template #header>
            <div>1</div>
        </template>
        <template #default="{ data }">
            <div>{{ data }}</div>
        </template>
        <template #footer>
            <div>3</div>
        </template>
    </Dialog>
```

#### 动态插槽

插槽可以是一个变量名

```vue
    <Dialog>
        <template #[name]>
            <div>
                23
            </div>
        </template>
    </Dialog>
```
### 10、v-model

在Vue3 v-model 是破坏性更新的

v-model在组件里面也是很重要的

v-model 其实是一个语法糖 通过props 和 emit组合而成的

1.默认值的改变

- prop：value -> modelValue；

- 事件：input -> update:modelValue；
- v-bind 的 .sync 修饰符和组件的 model 选项已移除
- 新增 支持多个v-model
- 新增 支持自定义 修饰符 Modifiers

#### 案例

子组件 

```vue
<template>
     <div v-if='propData.modelValue ' class="dialog">
         <div class="dialog-header">
             <div>标题</div><div @click="close">x</div>
         </div>
         <div class="dialog-content">
            内容
         </div>
         
     </div>
</template>
 
<script setup lang='ts'>
 
type Props = {
   modelValue:boolean
}
 
const propData = defineProps<Props>()
 
const emit = defineEmits(['update:modelValue'])
 
const close = () => {
     emit('update:modelValue',false)
}
 
</script>
 
<style lang='less'>
.dialog{
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    &-header{
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    &-content{
        padding: 10px;
    }
}
</style>
```

父组件

```vue
<template>
  <button @click="show = !show">开关{{show}}</button>
  <Dialog v-model="show"></Dialog>
</template>
 
<script setup lang='ts'>
import Dialog from "./components/Dialog/index.vue";
import {ref} from 'vue'
const show = ref(false)
</script>
 
<style>
</style>
```

#### 绑定多个案例

 子组件

```vue
<template>
     <div v-if='modelValue ' class="dialog">
         <div class="dialog-header">
             <div>标题---{{title}}</div><div @click="close">x</div>
         </div>
         <div class="dialog-content">
            内容
         </div>
         
     </div>
</template>
 
<script setup lang='ts'>
 
type Props = {
   modelValue:boolean,
   title:string
}
 
const propData = defineProps<Props>()
 
const emit = defineEmits(['update:modelValue','update:title'])
 
const close = () => {
     emit('update:modelValue',false)
     emit('update:title','我要改变')
}
 
</script>
 
<style lang='less'>
.dialog{
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    &-header{
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    &-content{
        padding: 10px;
    }
}
</style>
```

父组件

```vue
<template>
  <button @click="show = !show">开关{{show}} ----- {{title}}</button>
  <Dialog v-model:title='title' v-model="show"></Dialog>
</template>
 
<script setup lang='ts'>
import Dialog from "./components/Dialog/index.vue";
import {ref} from 'vue'
const show = ref(false)
const title = ref('我是标题')
</script>
 
<style>
</style>
```

#### 自定义修饰符

添加到组件 `v-model` 的修饰符将通过 `modelModifiers` prop 提供给组件。在下面的示例中，我们创建了一个组件，其中包含默认为空对象的 `modelModifiers` prop

```ts 
type Props = {
    modelValue: boolean,
    title?: string,
    modelModifiers?: {
        default: () => {}
    }
    titleModifiers?: {
        default: () => {}
    }
 
}
 
const propData = defineProps<Props>()
 
const emit = defineEmits(['update:modelValue', 'update:title'])
 
const close = () => {
    console.log(propData.modelModifiers);
 
    emit('update:modelValue', false)
    emit('update:title', '我要改变')
}
```

### 11、自定义指令directive

> 属于破坏性更新

#### 1.Vue3指令的钩子函数

- created 元素初始化的时候
- beforeMount 指令绑定到元素后调用 只调用一次
- mounted 元素插入父级dom调用
- beforeUpdate 元素被更新之前调用
- update 这个周期方法被移除 改用updated
- beforeUnmount 在元素被移除前调用
- unmounted 指令被移除后调用 只调用一次

Vue2 指令 bind inserted update componentUpdated unbind

#### 2.在setup内定义局部指令

但这里有一个需要注意的限制：必须以 `vNameOfDirective` 的形式来命名本地自定义指令，以使得它们可以直接在模板中使用。

```vue
<template>
  <button @click="show = !show">开关{{show}} ----- {{title}}</button>
  <Dialog  v-move-directive="{background:'green',flag:show}"></Dialog>
</template>
```

```ts
 
const vMoveDirective: Directive = {
  created: () => {
    console.log("初始化====>");
  },
  beforeMount(...args: Array<any>) {
    // 在元素上做些操作
    console.log("初始化一次=======>");
  },
  mounted(el: any, dir: DirectiveBinding<Value>) {
    el.style.background = dir.value.background;
    console.log("初始化========>");
  },
  beforeUpdate() {
    console.log("更新之前");
  },
  updated() {
    console.log("更新结束");
  },
  beforeUnmount(...args: Array<any>) {
    console.log(args);
    console.log("======>卸载之前");
  },
  unmounted(...args: Array<any>) {
    console.log(args);
    console.log("======>卸载完成");
  },
};
```

#### 3.生命周期钩子参数详解

第一个 el  当前绑定的DOM 元素

第二个 binding

- instance：使用指令的组件实例。
- value：传递给指令的值。例如，在 v-my-directive="1 + 1" 中，该值为 2。
- oldValue：先前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否有更改都可用。
- arg：传递给指令的参数(如果有的话)。例如在 v-my-directive:foo 中，arg 为 "foo"。
- modifiers：包含修饰符(如果有的话) 的对象。例如在 v-my-directive.foo.bar 中，修饰符对象为 {foo: true，bar: true}。
- dir：一个对象，在注册指令时作为参数传递。例如，在以下指令中

![img](/images/vue/p-1.png)



第三个 当前元素的虚拟DOM 也就是Vnode

第四个 prevNode 上一个虚拟节点，仅在 beforeUpdate 和 updated 钩子中可用 

#### 4.函数简写

你可能想在 `mounted` 和 `updated` 时触发相同行为，而不关心其他的钩子函数。那么你可以通过将这个函数模式实现

```vue
<template>
   <div>
      <input v-model="value" type="text" />
      <A v-move="{ background: value }"></A>
   </div>
</template>
   
<script setup lang='ts'>
import A from './components/A.vue'
import { ref, Directive, DirectiveBinding } from 'vue'
let value = ref<string>('')
type Dir = {
   background: string
}
const vMove: Directive = (el, binding: DirectiveBinding<Dir>) => {
   el.style.background = binding.value.background
}
</script>
 
<style>
</style>
```

##### 1.案例自定义拖拽指令 

```vue
<template>
  <div v-move class="box">
    <div class="header"></div>
    <div>
      内容
    </div>
  </div>
</template>
 
<script setup lang='ts'>
import { Directive } from "vue";
const vMove: Directive = {
  mounted(el: HTMLElement) {
    let moveEl = el.firstElementChild as HTMLElement;
    const mouseDown = (e: MouseEvent) => {
      //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
      console.log(e.clientX, e.clientY, "-----起始", el.offsetLeft);
      let X = e.clientX - el.offsetLeft;
      let Y = e.clientY - el.offsetTop;
      const move = (e: MouseEvent) => {
        el.style.left = e.clientX - X + "px";
        el.style.top = e.clientY - Y + "px";
        console.log(e.clientX, e.clientY, "---改变");
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
      });
    };
    moveEl.addEventListener("mousedown", mouseDown);
  },
};
</script>
 
<style lang='less'>
.box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  .header {
    height: 20px;
    background: black;
    cursor: move;
  }
}
</style>
```

##### 2.案例权限按钮

```vue
<template>
   <div class="btns">
       <button v-has-show="'shop:create'">创建</button>
 
       <button v-has-show="'shop:edit'">编辑</button>
 
       <button v-has-show="'shop:delete'">删除</button>
   </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive,  } from 'vue'
import type {Directive} from 'vue'
//permission
localStorage.setItem('userId','xiaoman-zs')
 
//mock后台返回的数据
const permission = [
    'xiaoman-zs:shop:edit',
    'xiaoman-zs:shop:create',
    'xiaoman-zs:shop:delete'
]
const userId = localStorage.getItem('userId') as string
const vHasShow:Directive<HTMLElement,string> = (el,bingding) => {
   if(!permission.includes(userId+':'+ bingding.value)){
       el.style.display = 'none'
   }
}
 
</script>
 
<style scoped lang='less'>
.btns{
    button{
        margin: 10px;
    }
}
</style>
```

##### 3.图片懒加载

```vue
<template>
    <div>
        <div v-for="item in arr">
            <img height="500" :data-index="item" v-lazy="item" width="360" alt="">
        </div>
    </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import type { Directive } from 'vue'
const images: Record<string, { default: string }> = import.meta.globEager('./assets/images/*.*')
let arr = Object.values(images).map(v => v.default)
 
let vLazy: Directive<HTMLImageElement, string> = async (el, binding) => {
    let url = await import('./assets/vue.svg')
    el.src = url.default;
    let observer = new IntersectionObserver((entries) => {
        console.log(entries[0], el)
        if (entries[0].intersectionRatio > 0 && entries[0].isIntersecting) {
            setTimeout(() => {
                el.src = binding.value;
                observer.unobserve(el)
            }, 2000)
        }
    })
    observer.observe(el)
}
 
</script>
 
<style scoped lang='less'></style>
```