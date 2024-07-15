# Hooks基础

## Hooks概念理解

### 1. 什么是hooks

Hooks的本质：**一套能够使函数组件更强大，更灵活的“钩子”**



React体系里组件分为 类组件 和 函数组件

经过多年的实战，函数组件是一个更加匹配React的设计理念 `UI = f(data)`，也更有利于逻辑拆分与重用的组件表达形式，而先前的函数组件是不可以有自己的状态的，为了能让函数组件可以拥有自己的状态，所以从react v16.8开始，Hooks应运而生



**注意点：**

1. 有了hooks之后，为了兼容老版本，class类组件并没有被移除，俩者都可以使用
2. 有了hooks之后，不能在把函数成为无状态组件了，因为hooks为函数组件提供了状态
3. hooks只能在函数组件中使用



### 2. Hooks解决了什么问题

Hooks的出现解决了俩个问题   1. 组件的状态逻辑复用  2.class组件自身的问题

1.  组件的逻辑复用
    在hooks出现之前，react先后尝试了 mixins混入，HOC高阶组件，render-props等模式
    但是都有各自的问题，比如mixin的数据来源不清晰，高阶组件的嵌套问题等等 
2.  class组件自身的问题
    class组件就像一个厚重的‘战舰’ 一样，大而全，提供了很多东西，有不可忽视的学习成本，比如各种生命周期，this指向问题等等，而我们更多时候需要的是一个轻快灵活的'快艇' 

## useState

### 1. 基础使用

**作用**

useState为函数组件提供状态（state）

**使用步骤**

1. 导入 `useState` 函数
2. 调用 `useState` 函数，并传入状态的初始值
3. 从`useState`函数的返回值中，拿到状态和修改状态的方法
4. 在JSX中展示状态
5. 调用修改状态的方法更新状态



**代码实现**

```jsx
import { useState } from 'react'

function App() {
  // 参数：状态初始值比如,传入 0 表示该状态的初始值为 0
  // 返回值：数组,包含两个值：1 状态值（state） 2 修改该状态的函数（setState）
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => { setCount(count + 1) }}>{count}</button>
  )
}
export default App
```



### 2. 状态的读取和修改

**读取状态**

该方式提供的状态，是函数内部的局部变量，可以在函数内的任意位置使用

**修改状态**

1. setCount是一个函数，参数表示`最新的状态值`
2. 调用该函数后，将使用新值替换旧值
3. 修改状态后，由于状态发生变化，会引起视图变化



**注意事项**

1. 修改状态的时候，一定要使用新的状态替换旧的状态，不能直接修改旧的状态，尤其是引用类型

### 3. 组件的更新过程 

函数组件使用 **useState** hook 后的执行过程，以及状态值的变化



- 组件第一次渲染 

   1. 从头开始执行该组件中的代码逻辑
   2. 调用 `useState(0)` 将传入的参数作为状态初始值，即：0
   3. 渲染组件，此时，获取到的状态 count 值为： 0

- 组件第二次渲染 

   1. 点击按钮，调用 `setCount(count + 1)` 修改状态，因为状态发生改变，所以，该组件会重新渲染
   2. 组件重新渲染时，会再次执行该组件中的代码逻辑
   3. 再次调用 `useState(0)`，此时 **React 内部会拿到最新的状态值而非初始值**，比如，该案例中最新的状态值为 1
   4. 再次渲染组件，此时，获取到的状态 count 值为：1



注意：**useState 的初始值(参数)只会在组件第一次渲染时生效**。也就是说，以后的每次渲染，useState 获取到都是最新的状态值，React 组件会记住每次最新的状态值



```jsx
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  // 在这里可以进行打印测试
  console.log(count)
  return (
    <button onClick={() => { setCount(count + 1) }}>{count}</button>
  )
}
export default App
```



### 4. 使用规则

1.  `useState` 函数可以执行多次，每次执行互相独立，每调用一次为函数组件提供一个状态 

```javascript
function List(){
  // 以字符串为初始值
  const [name, setName] = useState('cp')
  // 以数组为初始值
  const [list,setList] = useState([])
}
```

 

2.  `useState` 注意事项 

    1.  只能出现在函数组件或者其他hook函数中 
    2.  不能嵌套在if/for/其它函数中（react按照hooks的调用顺序识别每一个hook） 

```javascript
let num = 1
function List(){
  num++
  if(num / 2 === 0){
     const [name, setName] = useState('cp') 
  }
  const [list,setList] = useState([])
}
// 俩个hook的顺序不是固定的，这是不可以的！！！
```

 

3. 可以通过开发者工具查看hooks状态 



## useEffect

### 1. 理解函数副作用

**什么是副作用**

副作用是相对于主作用来说的，一个函数除了主作用，其他的作用就是副作用。对于 React 组件来说，**主作用就是根据数据（state/props）渲染 UI**，除此之外都是副作用（比如，手动修改 DOM）



**常见的副作用**

1. 数据请求 ajax发送
2. 手动修改dom
3. localstorage操作



useEffect函数的作用就是为react函数组件提供副作用处理的！



### 2. 基础使用

**作用**

为react函数组件提供副作用处理



**使用步骤**

1. 导入 `useEffect` 函数
2. 调用 `useEffect` 函数，并传入回调函数
3. 在回调函数中编写副作用处理（dom操作）
4. 修改数据状态
5. 检测副作用是否生效



**代码实现**

```jsx
import { useEffect, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
 
  useEffect(()=>{
    // dom操作
    document.title = `当前已点击了${count}次`
  })
  return (
    <button onClick={() => { setCount(count + 1) }}>{count}</button>
  )
}

export default App
```



### 3. 依赖项控制执行时机

**1. 不添加依赖项**

组件首次渲染执行一次，以及不管是哪个状态更改引起组件更新时都会重新执行

1. 组件初始渲染
2. 组件更新 （不管是哪个状态引起的更新）



```jsx
useEffect(()=>{
    console.log('副作用执行了')
})
```



**2. 添加空数组**

组件只在首次渲染时执行一次

```jsx
useEffect(()=>{
	 console.log('副作用执行了')
},[])
```



**3. 添加特定依赖项**

副作用函数在首次渲染时执行，在依赖项发生变化时重新执行



```jsx
function App() {  
    const [count, setCount] = useState(0)  
    const [name, setName] = useState('zs') 
    
    useEffect(() => {    
        console.log('副作用执行了')  
    }, [count])  
    
    return (    
        <>      
         <button onClick={() => { setCount(count + 1) }}>{count}</button>      
         <button onClick={() => { setName('cp') }}>{name}</button>    
        </>  
    )
}
```



**注意事项**

useEffect 回调函数中用到的数据（比如，count）就是依赖数据，就应该出现在依赖项数组中，如果不添加依赖项就会有bug出现



### 4. 清理副作用

如果想要清理副作用 可以在副作用函数中的末尾return一个新的函数，在新的函数中编写清理副作用的逻辑

注意执行时机为：

1. 组件卸载时自动执行
2. 组件更新时，下一个useEffect副作用函数执行之前自动执行

```jsx
import { useEffect, useState } from "react"


const App = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timerId = setInterval(() => {
      setCount(count + 1)
    }, 1000)
    return () => {
      // 用来清理副作用的事情
      clearInterval(timerId)
    }
  }, [count])
  return (
    <div>
      {count}
    </div>
  )
}

export default App
```
