# ES6

> ES全称EcmaScript，是脚本语言的规范，而平时经常编写的JavaScript，是EcmaScript的一种实现，所以ES新特性其实就是指的是JavaScript的新特性

![image-20221107195929284](/images/javascript/image-20221107195929284.png)

## let变量

- 声明格式

```
let a;
let b,c,d;
let e = 100;
let f = 32, g = 'dad', h = []
```

> let 允许创建**块级作用域**，ES6 推荐在函数中使用 let 定义变量，而非 var
>
> let 是在代码块内有效，var 是在全局范围内有效

**特点：**

- 变量不能重复声明，只能声明一次

  ```
  let star = '妮露';
  let star = '胡桃';
  ```

- 块级作用域      全局，函数 eval

  ```
  {
  	let star= '妮露';
  }
  consloe.log(star);	//错误，let是块级作用域，不能使用。var是全局作用域
  ```

- 不存在变量提升

  ```
  console.log(star);
  let star = '妮露';	//错误，先声明才能调用，没有变量提升。var可以
  ```

- 不影响作用域链

  ```
  {
  	let star = '妮露';
      function fn() {
           console.log(star);
      }
  }
  fn();
  ```

- for 循环计数器很适合用 let

```js
for (var i = 0; i < 10; i++) {
  setTimeout(function(){
    console.log(i);
  })
}
// 输出十个 10
for (let j = 0; j < 10; j++) {
  setTimeout(function(){
    console.log(j);
  })
}
// 输出 0123456789
```

- 变量 i 是用 var 声明的，在全局范围内有效，所以全局中只有一个变量 i, 每次循环时，setTimeout 定时器里面的 i 指的是全局变量 i ，而循环里的十个 setTimeout 是在循环结束后才执行，所以此时的 i 都是 10。
- 变量 j 是用 let 声明的，当前的 j 只在本轮循环中有效，每次循环的 j 其实都是一个新的变量，所以 setTimeout 定时器里面的 j 其实是不同的变量，即最后输出 12345。（若每次循环的变量 j 都是重新声明的，如何知道前一个循环的值？这是因为 JavaScript 引擎内部会记住前一个循环的值）。

## const变量

同样在块级作用域有效的另一个变量声明方式是 const，它可以声明一个常量。ES6 中，const 声明的常量类似于指针，**它指向某个引用，也就是说这个「常量」并非一成不变的**，如：

```js
{
  const ARR = [5,6];
  ARR.push(7);
  console.log(ARR); // [5,6,7]
  ARR = 10; // TypeError
}
```

有几个点需要注意：

- let 和 const 声明只在最靠近的一个块中（花括号内）有效
- 当使用常量 const 声明时，请使用**大写变量**，如：CAPITAL_CASING(一般都是大写)
- const **在声明时必须被赋值**
- 常量的值不能修改
- 块级作用域
- 对于数组和对象的元素修改，不算做对常量的修改，不会报错

## 变量的解构赋值

- 解构可以避免在对象赋值时产生中间变量

#### 1、数组的解构

```
const F4 = ['妮露','申鹤','胡桃','甘雨'];
let [ni, shen, hu, gan] = F4;	//数组需要中括号
console.log(ni);
console.log(shen);
console.log(hu);
console.log(gan);
```

#### 2、对象的解构

```
const ni =  {
	name: '妮露',
    age: 20,
    tiaowu: function() {
    	console.log("花神之舞");
    }
}
let {name, age, tiaowu} = ni;	//对象需要花括号
console.log(name);
console.log(age);
console.log(tiaowu);
```

## 模板字符串

ES6 中有一种十分简洁的方法组装一堆字符串和变量。

- ${ ... } 用来渲染一个变量
- ` 作为分隔符

#### 1、声明

```
let str = `字符串!`;
console.log(str, typeof str);
```

#### 2、内容中可以直接出现换行符

```
let str = `<ul>
			<li>妮露</li>
    		<li>申鹤</li>
    		<li>胡桃</li>
           </ul>`;
console.log(str);
```

#### 3、变量拼接

```
let lover = '妮露';
let wife = `${lover}是我的老婆`;
console.log(wife);
```

## 简化对象写法

- ES6 允许声明在对象字面量时使用**简写语法**，来初始化属性变量和函数的定义方法，并且允许在对象属性中进行计算操作

```js
function getCar(make, model, value) {
  return {
    // 简写变量
    make,  // 等同于 make: make
    model, // 等同于 model: model
    value, // 等同于 value: value
 
    // 属性可以使用表达式计算值
    ['make' + make]: true,
 
    // 忽略 `function` 关键词简写对象函数
    depreciate() {
      this.value -= 2500;
    }
  };
}
 
let car = getCar('Barret', 'Lee', 40000);
 
// output: {
//     make: 'Barret',
//     model:'Lee',
//     value: 40000,
//     makeBarret: true,
//     depreciate: [Function: depreciate]
// }
```

## 箭头函数

声明：

```
let fn = function() {	//	以前的声明一个函数

}	

let fn = (a, b) => {	//	现在可以省略function，改为 =>
    return a + b;
}
let result = fn(1,2)
console.log(result);
```

#### 1、this是静态的

> this 始终指向函数声明时所在作用域下的this的值

```js
function getName(){
    console.log(this.name);
}
let getName1 = () => {
    console.log(this.name);
}
// 设置window对象的name属性
window.name = '妮露';
const wife = {
    name: '胡桃'
}
//  直接调用
getName();  //  妮露
getName1(); //  妮露

//  call方法
getName.call(wife);  //  胡桃
getName1.call(wife); //  妮露
```

#### 2、不能作为构造实例化对象

```
let Person = (name, age) => {	//	出现错误，因为Person不是一个构造函数
    this.name = name;
    this.age = age;
}
let wife = new Person('妮露',20);
console.log(wife);
```

#### 3、不能使用 arguments 变量

```
let fn = () => {	//	错误，不能使用这个变量
    console.log(arguments);
}
fn(1,2,3);
```

#### 4、箭头函数的简写

- 省略小括号——当形参有且只有一个的时候

```
let add = n => {
	return n + n;
}
console.log(9);		//	结果为18
```

- 省略花括号——当代码体只有一条语句的时候，此时 `return`必须省略，而且语句的执行结果就是函数的返回值

```
let pow = n => n * n;
console.log(pow(8));	//	结果为64
```

## 函数参数默认值

- 允许给函数参数赋值初始化

```
function add(a,b,c=10) {
	return a + b + c;
}
let result = add(1,2);	//	只传前面两个数，c为10。如果传3个数，则c的值就会被传过去的替换掉
let result1 = add(1,2,3);
console.log(result);	//	结果为13
console.log(result1);	//	结果为6
```

- 与解构赋值结合

```
function connect({name='胡桃',age}){
    console.log(name);
    console.log(age);
}
connect({
    name: '妮露',		//	如果没有name这个属性，那么输出显示的name就是初始化的胡桃了，有了就会替换掉							原有的
    age: 20
})
```

##  Spread、rest

Spread / Rest 操作符指的是 ...，具体是 Spread 还是 Rest 需要看上下文语境。

- 当被用于迭代器中时，它是一个 Spread 操作符

```js
function foo(x,y,z) {
  console.log(x,y,z);
}
 
let arr = [1,2,3];
foo(...arr); // 1 2 3
```

- 当被用于函数传参时，是一个 Rest 操作符

```
function foo(...args) {
  console.log(args);
}
foo( 1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]，一个素组，那么就可以使用数组中的一些方法 some、filter
```

- rest  参数必须要放到参数最后

```
function foo(a,b,...args) {
	console.log(a);
	console.log(b);
  	console.log(args);
}
foo( 1, 2, 3, 4, 5);	// 1	2	[3,4,5]
```

## 扩展运算符

- ... 	扩展运算符能将数组转换成逗号分隔的参数序列

```
const wives = ['妮露','申鹤','胡桃','宵宫'];

function chu(){
	console.log(arguments);
}
chu(...wives);
```

![image-20221107213122630](/images/javascript/image-20221107213122630.png)

#### 应用

##### 1、数组的合并

```js
const wife1 = ['妮露','申鹤'];
const wife2 = ['胡桃','宵宫'];
const wife = [...wife1,...wife2];
console.log(wife);
```

![image-20221107213451591](/images/javascript/image-20221107213451591.png)

##### 2、数组的克隆	**浅拷贝**

```js
const wife1 = ['妮露','申鹤'];
const wife = [...wife1];
console.log(wife);
```

![image-20221107213600211](/images/javascript/image-20221107213600211.png)

##### 3、将伪数组转为真正的数组

```js
const divs = document.querySelectorAll('div');
const divArr = [...divs];
console.log(divArr);    //  [div,div,div]
```

## symbol

![image-20221107224613368](/images/javascript/image-20221107224613368.png)

#### 1、创建

```
let s = Symbol();
let s1 = Symbol('妮露');
let s2 = Symbol.for('胡桃');
```

- 不能与其他数据进行运算

#### 2、使用

- 给**对象**添加**方法和属性**

```js
//  向对象中添加方法 up down
let game = {
    up: function() {
        console.log("上升!");
    },
    name: '妮露',
    down: function() {
        console.log("下降!");
    }
}
//  声明一个对象
let methods = {
    up: Symbol(),
    down: Symbol()
}
//  添加方式
game[methods.up] = function() {
    console.log("上升~!");
}
game[methods.down] = function() {
    console.log("下降~!");
}
console.log(game);
```

![image-20221107225232687](/images/javascript/image-20221107225232687.png)

```
let game = {
    name: '妮露',
    [Symbol('up')]: function() {
        console.log("上升~");
    },
    [Symbol('down')]: function() {
        console.log("下降~");
    }
}
console.log(game);
```

![image-20221107225635141](/images/javascript/image-20221107225635141.png)

#### 3、内置属性



## 迭代器iterator

![image-20221107225835384](/images/javascript/image-20221107225835384.png)

- iterator接口——就是对象里面的一个属性

#### for-of和for-in区别

- for-of——保存的键值
- for-in——保存的键名

#### 工作原理

![image-20221107230423611](/images/javascript/image-20221107230423611.png)

```
const wife = ['妮露','胡桃','宵宫','申鹤'];
let iterator = wife[Symbol.iterator]();
// 调用对象的next方法
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

![image-20221107230617769](/images/javascript/image-20221107230617769.png)

#### 实例

```js
// 声明一个对象
const wife = {
    name: "原神",
    stus:['妮露','胡桃','宵宫','申鹤'],
    [Symbol.iterator](){
        // 索引变量
        let index = 0;
        // this 指向wife，这里作为保存，以防止后面的this发生改变时使用
        let _this = this;
        return {
            next: function(){
                // 现在这个this指向的式 return 里面的对象的,所以需要在外声明一个变量作为保存
                // 以确保this指向的是 wife 这个对象
                if(index <_this.stus.length) {
                    // 返回 属性值  done：false 表示没有完成，需要继续指向  true，完成，表示结束    
                    const result = {value: _this.stus[index], done: false};
                    // 下标自增
                    index++;
                    // 返回结果
                    return result;
                }else {
                    return {value: undefined, done: true};
                }
            }
        }
    }
};

// 遍历这个对象
for (let v of wife) {
    console.log(v);
}

结果:
妮露
胡桃
宵宫
申鹤
```

## 生成器Generator

传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务。

协程有点像函数，又有点像线程。它的运行流程大致如下。

- 第一步，协程`A`开始执行。
- 第二步，协程`A`执行到一半，进入暂停，执行权转移到协程`B`。
- 第三步，（一段时间后）协程`B`交还执行权。
- 第四步，协程`A`恢复执行。

上面流程的协程`A`，就是异步任务，因为它分成两段（或多段）执行。

> Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）

整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用`yield`语句注明。Generator 函数的执行方法如下。

```js
// 关键字yield可以让生成器停止和开始
function* gen() {	//	* 固定存在
//   console.log(111);
  yield 'qeer'; //	yield  函数代码的分隔符
//   console.log(222);
  yield 'asdf';
//   console.log(333);
  yield 'zxcv';
//   console.log(444);
}
let iterator = gen();
iterator.next();    //  必须使用next调用才能运行
iterator.next(); 
iterator.next(); 
iterator.next(); 
// 遍历
for (const v of gen()) {
    console.log(v);
}
// 返回的结果为
// qeer
// asdf
// zxcv
```

```js
function * gen(x) {
  var y = yield x + 2;
  return y;
};

var g = gen(1);
console.log(g.next()); // { value: 3, done: false }
console.log(g.next()); // { value: undefined, done: true }
```

上面代码中，调用 Generator 函数，会返回一个内部指针（即遍历器）`g`。这是 Generator 函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。调用指针`g`的`next`方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的`yield`语句，上例是执行到`x + 2`为止。

换言之，`next`方法的作用是分阶段执行`Generator`函数。每次调用`next`方法，会返回一个对象，表示当前阶段的信息（`value`属性和`done`属性）。`value`属性是`yield`语句后面表达式的值，表示当前阶段的值；`done`属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。

#### 实例1

```
// 异步编程 文件操作 网络操作(ajax,request) 数据库操作
// 1s后控制台输出111 2s后输出222 3秒后输出333   总共6秒
// 回调地狱 一直回调,一层套一层,不断往前缩进
// setTimeout(() => {
//     console.log(111);
//     setTimeout(() => {
//         console.log(222);
//         setTimeout(() => {
//             console.log(333);
//         },3000)
//     }, 2000)
// }, 1000)

        // 解决方法
        function one() {
            setTimeout(() => {
                console.log(111);
                iterator.next();
            }, 1000)
        }
        function two() {
            setTimeout(() => {
                console.log(222);
                iterator.next();
            }, 2000)
        }
        function three() {
            setTimeout(() => {
                console.log(333);
                iterator.next();
            }, 3000)
        }
        // 生成器
        function* gen(){
            yield one();
            yield two();
            yield three();
        }
        // 调用生成器函数
        let iterator = gen();
        // 这样只会执行第一个,但后面的不能执行,因为有 yiled 它会停止生成器的运行
        // 所以需要在每个方法里面添加 iterator.next(); 以确保生成器运行
        iterator.next();
```

#### 实例2

```js
// 模拟获取 用户数据 订单数据 商品数据 
        function getUsers() {
            setTimeout(() => {
                let data = '用户数据';
                iterator.next(data);
            }, 1000)
        }
        function getOrders() {
            setTimeout(() => {
                let data = '订单数据';
                iterator.next(data);
            }, 1000)
        }
        function getGoods() {
            setTimeout(() => {
                let data = '商品数据';
                iterator.next(data);
            }, 1000)
        }
        // 生成器
        function* gen(){
            let users = yield getUsers();
            console.log(users);
            let orders = yield getOrders();
            console.log(orders);
            let goods = yield getGoods();
            console.log(goods);
        }
        // 调用生成器函数
        let iterator = gen();
        iterator.next();
```

- 和同步很像,但实际上是异步的

## Promise

- Promise是ES6引入的**异步编程的新解决方案**
- `Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）

> 语法上，Promise是一个**构造函数**，用来封装异步操作并可以获取其成功或失败的结果

```
Promise 构造函数:Promise(excutor) {}
Promise.prototype.then 方法
Promise.prototype.catch 方法
```

```js
// 实例化 Promise 对象
const p = new Promise(function(resolve,reject) {	
    setTimeout(function() {
        // let data = '数据库中的用户数据';
        // resolve(data);

        let err = '读取数据失败';
        reject(err);
    },1000)
});
// 调用 Promise 对象的 thne 方法
p.then(function(value){
    console.log(value);
},function(reason){
    console.error(reason);
}) 
```

- resolve——将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作**成功**时调用，并将异步操作的结果，作为参数传递出去
- reject——将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作**失败**时调用，并将异步操作报出的错误，作为参数传递出去。
- `Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。`then`方法可以接受**两个回调函数**作为参数
- 第一个回调函数是`Promise`对象的状态变为`resolved`时调用。默认写`value`
- 二个回调函数是`Promise`对象的状态变为`rejected`时调用。默认写`reason`

### 读取文件1

```js
// 1.引入 fs 模块	node.js
const fs = require('fs');

// 2.调用方法读取文件
fs.readFile('为学.md',(err, data) =>{
    // 如果失败,则抛出错误
    if(err) throw err;
    // 如果没有出错,则输出内容
    console.log(data.toString());
});
```

### Promise封装获取文件2

```js
// 1.引入 fs 模块
const fs = require('fs');

// 3.使用 Promise 封装
const p = new Promise(function(resolve,reject){
    fs.readFile('为学.md',(err, data) =>{
        // 判断如果失败,则改变 Promise 的状态为失败,失败的值为这个错误对象
        if(err) reject(err);
        // 如果成功
        resolve(data);
    })
});
p.then(function(value){
    console.log(value.toString());
}, function(reason){
    console.log("读取失败");
})
```

### ajax请求

```js
// 1.创建对象
const xhr = new XMLHttpRequest();

// 2.初始化
xhr.open("GET","http://api.apiopen.top/getJoke");
        
// 3.发送
xhr.send();

// 4.绑定事件,处理响应结果
xhr.onreadystatechange = function() {
	// 判断
    if(xhr.readyState == 4){
    	// 判断响应状态码 200-299
        if(xhr.status >= 200 && xhr.status < 300) {
        		// 表示成功
            	console.log(xhr.response);
            }else{
            	// 如果失败
                console.error(xhr.status);
            }
	}
}
```

### Promise封装ajax请求

```js
const p = new Promise((resolve, reject) => {
    // 1.创建对象
    const xhr = new XMLHttpRequest();

    // 2.初始化
    xhr.open("GET", "https://api.apiopen.top/getJoke");

    // 3.发送
    xhr.send();

    // 4.绑定事件,处理响应结果
    xhr.onreadystatechange = function () {
        // 判断
        if (xhr.readyState == 4) {
            // 判断响应状态码 200-299
            if (xhr.status >= 200 && xhr.status < 300) {
                // 表示成功
                resolve(xhr.response);
            } else {
                // 如果失败
                reject(xhr.status);
            }
        }
    }
})
// 指定回调
p.then(function(value){
    console.log(value);
}, function(reason){
    console.error(reason);
})
```

### Promise.prototype.then()

```js
// 创建 Promise 对象
const p = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('用户数据');
        // reject('错误!');
    }, 1000);
});
// 调用 then 方法   then返回结果是 Promise对象,对象状态由回调函数的执行结果决定
// 省略function,直接箭头函数
const result = p.then(value => {
    console.log(value);
    // 1.返回的是 非Promise 类型,状态为成功,放回值为对象的成功的值
    // return '成功~'
    // 2.返回的是 Promise 对象
    // return new Promise((resolve, reject) => {
    //     // resolve('ok');
    //     reject('error');
    // })
    // 3.抛出错误
    throw '错误~';
}, reason => {
    console.error(reason);
})
console.log(result);
```

- 返回的是 非Promise 类型，fulfilled就是成功

![image-20221108112905523](/images/javascript/image-20221108112905523.png)

- 返回的是 Promise 对象，对象的状态为成功

![image-20221108113249713](/images/javascript/image-20221108113249713.png)

- 返回的是 Promise 对象，对象的状态为失败

![image-20221108113500431](/images/javascript/image-20221108113500431.png)

- 抛出错误

![image-20221108113556975](/images/javascript/image-20221108113556975.png)

### 链式调用

```js
p.then(value =>{

}).then(value => {

});
```

- 解决回调地狱问题
- 错误reason可以不写

### 读取多个文件

```js
const fs = require("fs");

// 但这个文件一多,就会下陷,产生回调地狱,而且函数形参重名,不易发现,这个是回调地狱的问题
fs.readFile('为学.md',(err, data1) =>{
    fs.readFile('李白.md',(err, data2) =>{
        fs.readFile('杜甫.md',(err, data3) =>{
            // 因为做了运算(+) 就会自动转换字符串
            let result = data1 + '\r\n' + data2 + '\r\n' + data3;
            console.log(result);
        });
    });
});
```

### Promise多个文件

```js
const fs = require("fs");

// 使用 Promise 实现
const p = new Promise((reslove, reject) => {
    fs.readFile('为学.md', (err, data) => {
        reslove(data);
    });
});


p.then(value => {
    return new Promise((reslove, reject) => {
        fs.readFile('李白.md', (err, data) => {
            reslove([value, data]);
        });
    })
}).then(value => {
    return new Promise((reslove, reject) => {
        fs.readFile('杜甫.md', (err, data) => {
            // 压入
            value.push(data);
            reslove(value);
        });
    })
}).then(value => {
    console.log(value.join('\r\n'));
});
```

### catch方法

```js
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // 设置 p 对象的状态为失败,并设置失败的值
        reject("错误~");
    }, 1000);
})
p.then(function(value){}, function(reason){
    console.error(reason);
})
p.catch(function(reason){
    console.warn(reason);
});
```

![image-20221108125706920](/images/javascript/image-20221108125706920.png)

## 集合Set

![image-20221108125907793](/images/javascript/image-20221108125907793.png)

- `Set`本身是一个构造函数，用来生成 Set 数据结构
- Set  执行完返回一个对象

```js
// 声明一个 set
let s = new Set();
// 可迭代数据   一般传入数组    自动去重
let s2 = new Set(['妮露','胡桃','申鹤','宵宫','胡桃']);

//  元素个数
console.log(s2.size);   //  4
// 添加新的元素
s2.add('莫娜');     // {'妮露', '胡桃', '申鹤', '宵宫', '莫娜'}
// 删除元素
s2.delete('莫娜');  //  {'妮露', '胡桃', '申鹤', '宵宫'}
// 检测
console.log(s2.has('妮露'));    //  true
// 清空
s2.clear();     //  Set(0)
console.log(s2);    // {'妮露', '胡桃', '申鹤', '宵宫'}
console.log(s, typeof s);   //  object
```

#### Map

![image-20221108131338213](/images/javascript/image-20221108131338213.png)

- 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键

```js
// 声明 Map
let m = new Map();

// 添加元素
m.set('name','妮露');
m.set('change', function(){
    console.log("改变~");
});
let key = {
    school : '提瓦特'
};
m.set(key,['蒙德','璃月','稻妻']);

// size
console.log(m.size);    //  3
// 删除
// m.delete('name');
// 获取
console.log(m.get('change'));   //  f() { console.log("改变~"); }
console.log(m.get(key));    //  ['蒙德', '璃月', '稻妻']
// 清空
// m.clear();
// 遍历
for (let v of m) {
    console.log(v);     //  键值对
}
// console.log(m);
```

![image-20221108131918442](/images/javascript/image-20221108131918442.png)
