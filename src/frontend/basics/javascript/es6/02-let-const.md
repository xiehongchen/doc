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

### const 本质
const实际上保证的，并不是**变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动**。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。
```js
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```
上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

下面是另一个例子。
```js
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```
上面代码中，常量a是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给a，就会报错。

如果真的想将对象冻结，应该使用Object.freeze方法。
```js
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```
上面代码中，常量foo指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。
```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```