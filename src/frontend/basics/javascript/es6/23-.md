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