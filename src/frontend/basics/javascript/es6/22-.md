## 1、数组的解构
### 基本用法
```js
const F4 = ['妮露','申鹤','胡桃','甘雨'];
let [ni, shen, hu, gan] = F4;	//数组需要中括号
console.log(ni);
console.log(shen);
console.log(hu);
console.log(gan);
```
本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些使用嵌套数组进行解构的例子。
```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```
对于 Set 结构，也可以使用数组的解构赋值。
```js
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"
```
事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
```js
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```
上面代码中，fibs是一个 Generator 函数，原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。

### 默认值
解构赋值允许指定默认值。
```js
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```
注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
```js
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```
上面代码中，如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
```js
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
```
上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。
```js
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```
默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
```js
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```
上面最后一个表达式之所以会报错，是因为x用y做默认值时，y还没有声明。

## 2、对象的解构

```js
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

## 字符串的解构赋值
字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```
类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
```js
let {length : len} = 'hello';
len // 5
```
## 用途
### 1、交换变量的值
```js
let x = 1;
let y = 2;

[x, y] = [y, x];
```
### 2、从函数返回多个值
函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。
```js
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```
### 3、函数参数的定义
解构赋值可以方便地将一组参数与变量名对应起来。
```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```
### 4、提取 JSON 数据
```js
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```
### 5、函数参数的默认值
```js
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```
指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。
### 6、遍历 Map 结构
任何部署了 Iterator 接口的对象，都可以用for...of循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。
```js
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```
如果只想获取键名，或者只想获取键值，可以写成下面这样。
```js
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}
```