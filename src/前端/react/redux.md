# Redux

## Redux介绍 

Redux是React中使用广泛的集中状态管理工具  类比vuex之于vue 同类的工具还有mobx等

![image.png](/images/react/redux/image.png)



**为什么要使用Redux？**

1. 独立于组件，无视组件之间的层级关系，简化通信问题
2. 单项数据流清晰，易于定位bug
3. 调试工具配套良好，方便调试

## Redux快速体验

###  1、Redux数据流架构 

> Redux的难点是理解它对于数据修改的规则, 下图动态展示了在整个数据的修改中，数据的流向

![无标题-2022-07-27-1257.png](/images/react/redux/image2.png)



为了职责清晰，Redux代码被分为三个核心的概念，我们学redux，其实就是学这三个核心概念之间的配合，三个概念分别是:

1. state:  一个对象 存放着我们管理的数据
2. action:  一个对象 用来描述你想怎么改数据

3. reducer:  一个函数 根据action的描述更新state

### 2、纯Redux实现计数器 

> 核心步骤
>
> 1. 创建reducer函数 在内部定义好action和state的定义关系
> 2. 调用Redux的createStore方法传入定义好的reducer函数生成store实例
> 3. 通过store实例身上的subscribe方法监控数据是否变化
> 4. 点击按钮 通过专门的dispatch函数 提交action对象 实现数据更新

## Redux与React 

> Redux虽然是一个框架无关可以独立运行的插件，但是社区通常还是把它与React绑定在一起使用，以一个计数器案例体验一下Redux + React 的基础使用

### 1、开发环境准备 

> 使用create-react-app创建react基础项目，并安装Redux相关工具

```bash
# 创建项目
$ yarn create vite react-redux --template react


# 安装redux配套工具
$ yarn add  @reduxjs/toolkit react-redux

# 启动项目
$ yarn dev
```

目录核心结构

```
src
  - store
    - modules  // 模块store
    - index.js // 组合模块的入口文件
  - App.js
```



### 2、创建counterStore 

> 创建store的的核心步骤分为两步
>
> 1. 使用toolkit的createSlice方法创建一个独立的子模块
> 2. 使用configureStore语法组合子模块

#### 1、创建子模块

```js
import { createSlice } from '@reduxjs/toolkit'

const counter = createSlice({
  // 模块名称独一无二
  name: 'counter',
  // 初始数据
  initialState: {
    count: 1
  },
  // 修改数据的同步方法
  reducers: {
    add (state) {
      state.count++
    }
  }
})

const { add } = counter.actions
const counterReducer = counter.reducer

// 导出修改数据的函数
export { add }
// 导出reducer
export default counterReducer
```

#### 2、组合子模块

```js
import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counterStore'

export default configureStore({
  reducer: {
    // 注册子模块
    counter: counterReducer
  }
})
```

### 3、为React提供Redux store 

> 要想让所有的组件都有资格访问store中的数据，需要我们在入口文件中，渲染根组件的位置通过Provider提供store数据

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// 导入store
import store from './store'
// 导入store提供组件Provider
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  // 提供store数据
  <Provider store={store}>
    <App />
  </Provider>
)
```

### 4、组件使用store中的数据 

> 组件使用store中的数据需要借助一个hook方法，叫做useSelector
> useSelector(state => state.模块名)  方法的返回值为一个对象，对象中包含store子模块中的所有数据

```jsx
import { useSelector } from 'react-redux'

function App () {
  // 使用数据
  const { count } = useSelector(state => state.counter)
  
  return (
    <div className="App">
      {count}
      <button onClick={clickHandler}>+</button>
    </div>
  )
}

export default App
```

### 5、组件修改store中的数据 

> 修改store中的数据有俩个核心步骤
>
> 1. 使用counterStore模块中导出的add方法创建action对象
> 2. 通过dispatch函数以action作为参数传入完成数据更新

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { add } from './store/counterStore'

function App () {
  // 使用数据
  const { count } = useSelector(state => state.counter)
  // 修改数据
  const dispatch = useDispatch()
  const clickHandler = () => {
    // 1. 生成action对象
    const action = add()
    // 2. 提交action进行数据更新
    dispatch(action)
  }
  return (
    <div className="App">
      {count}
      <button onClick={clickHandler}>+</button>
    </div>
  )
}

export default App
```



### 6、组件修改数据并传参 

#### 1、修改数据的方法中补充第二个参数action

```js
import { createSlice } from "@reduxjs/toolkit"
const counterStore = createSlice({
  name: 'counter', // 独一无二不重复的名字语义化
  // 定义初始化的数据
  initialState: {
    taskList: ['react']
  },
  reducers: {
    // action为一个对象 对象中有一个固定的属性叫做payload 为传递过来的参数
    addTaskList (state, action) {
      state.taskList.push(action.payload)
    }
  }
})

// 生成修改数据的方法导出
const { addTaskList } = counterStore.actions
export { addTaskList }
// 生成reducer 导出 供index.js做组合模块
const counterReducer = counterStore.reducer

export default counterReducer
```

#### 2、dispatch的时候传入实参

```jsx
<button onClick={() => dispatch(addTaskList('vue'))}>addList</button>
```



### 7、Redux异步处理 

测试接口地址：  [http://geek.itheima.net/v1_0/channels](http://geek.itheima.net/v1_0/channels')

```js
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const channelStore = createSlice({
  name: 'channel',
  initialState: {
    channelList: []
  },
  reducers: {
    setChannelList (state, action) {
      state.channelList = action.payload
    }
  }
})


// 创建异步
const { setChannelList } = channelStore.actions
const url = 'http://geek.itheima.net/v1_0/channels'
// 封装一个函数 在函数中return一个新函数 在新函数中封装异步
// 得到数据之后通过dispatch函数 触发修改
const fetchChannelList = () => {
  return async (dispatch) => {
    const res = await axios.get(url)
    dispatch(setChannelList(res.data.data.channels))
  }
}

export { fetchChannelList }

const channelReducer = channelStore.reducer
export default channelReducer
```

```jsx
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchChannelList } from './store/channelStore'

function App () {
  // 使用数据
  const { channelList } = useSelector(state => state.channel)
  useEffect(() => {
    dispatch(fetchChannelList())
  }, [dispatch])

  return (
    <div className="App">
      <ul>
        {channelList.map(task => <li key={task.id}>{task.name}</li>)}
      </ul>
    </div>
  )
}

export default App
```