import{_ as s,c as a,o as n,a5 as e}from"./chunks/framework.CteJOlxb.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"test.md","filePath":"test.md","lastUpdated":1718189123000}'),p={name:"test.md"},t=e(`<h2 id="object-is" tabindex="-1">Object.is() <a class="header-anchor" href="#object-is" aria-label="Permalink to &quot;Object.is()&quot;">​</a></h2><p>ES5 比较两个值是否相等，只有两个运算符：相等运算符（<code>==</code>）和严格相等运算符（<code>===</code>）。它们都有缺点，前者会自动转换数据类型，后者的<code>NaN</code>不等于自身，以及<code>+0</code>等于<code>-0</code>。JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。</p><p>ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。<code>Object.is</code>就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.is(&#39;foo&#39;, &#39;foo&#39;)</span></span>
<span class="line"><span>// true</span></span>
<span class="line"><span>Object.is({}, {})</span></span>
<span class="line"><span>// false</span></span></code></pre></div><p>不同之处只有两个：一是<code>+0</code>不等于<code>-0</code>，二是<code>NaN</code>等于自身。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>+0 === -0 //true</span></span>
<span class="line"><span>NaN === NaN // false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.is(+0, -0) // false</span></span>
<span class="line"><span>Object.is(NaN, NaN) // true</span></span></code></pre></div><p>ES5 可以通过下面的代码，部署<code>Object.is</code>。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.defineProperty(Object, &#39;is&#39;, {</span></span>
<span class="line"><span>  value: function(x, y) {</span></span>
<span class="line"><span>    if (x === y) {</span></span>
<span class="line"><span>      // 针对+0 不等于 -0的情况</span></span>
<span class="line"><span>      return x !== 0 || 1 / x === 1 / y;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 针对NaN的情况</span></span>
<span class="line"><span>    return x !== x &amp;&amp; y !== y;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  configurable: true,</span></span>
<span class="line"><span>  enumerable: false,</span></span>
<span class="line"><span>  writable: true</span></span>
<span class="line"><span>});</span></span></code></pre></div><h2 id="object-assign" tabindex="-1">Object.assign() <a class="header-anchor" href="#object-assign" aria-label="Permalink to &quot;Object.assign()&quot;">​</a></h2><h3 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h3><p><code>Object.assign()</code>方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const target = { a: 1 };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const source1 = { b: 2 };</span></span>
<span class="line"><span>const source2 = { c: 3 };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.assign(target, source1, source2);</span></span>
<span class="line"><span>target // {a:1, b:2, c:3}</span></span></code></pre></div><p><code>Object.assign()</code>方法的第一个参数是目标对象，后面的参数都是源对象。</p><p>注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const target = { a: 1, b: 1 };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const source1 = { b: 2, c: 2 };</span></span>
<span class="line"><span>const source2 = { c: 3 };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.assign(target, source1, source2);</span></span>
<span class="line"><span>target // {a:1, b:2, c:3}</span></span></code></pre></div><p>如果只有一个参数，<code>Object.assign()</code>会直接返回该参数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const obj = {a: 1};</span></span>
<span class="line"><span>Object.assign(obj) === obj // true</span></span></code></pre></div><p>如果该参数不是对象，则会先转成对象，然后返回。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>typeof Object.assign(2) // &quot;object&quot;</span></span></code></pre></div><p>由于<code>undefined</code>和<code>null</code>无法转成对象，所以如果它们作为参数，就会报错。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.assign(undefined) // 报错</span></span>
<span class="line"><span>Object.assign(null) // 报错</span></span></code></pre></div><p>如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果<code>undefined</code>和<code>null</code>不在首参数，就不会报错。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let obj = {a: 1};</span></span>
<span class="line"><span>Object.assign(obj, undefined) === obj // true</span></span>
<span class="line"><span>Object.assign(obj, null) === obj // true</span></span></code></pre></div><p>其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const v1 = &#39;abc&#39;;</span></span>
<span class="line"><span>const v2 = true;</span></span>
<span class="line"><span>const v3 = 10;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const obj = Object.assign({}, v1, v2, v3);</span></span>
<span class="line"><span>console.log(obj); // { &quot;0&quot;: &quot;a&quot;, &quot;1&quot;: &quot;b&quot;, &quot;2&quot;: &quot;c&quot; }</span></span></code></pre></div><p>上面代码中，<code>v1</code>、<code>v2</code>、<code>v3</code>分别是字符串、布尔值和数值，结果只有字符串合入目标对象（以字符数组的形式），数值和布尔值都会被忽略。这是因为只有字符串的包装对象，会产生可枚举属性。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object(true) // {[[PrimitiveValue]]: true}</span></span>
<span class="line"><span>Object(10)  //  {[[PrimitiveValue]]: 10}</span></span>
<span class="line"><span>Object(&#39;abc&#39;) // {0: &quot;a&quot;, 1: &quot;b&quot;, 2: &quot;c&quot;, length: 3, [[PrimitiveValue]]: &quot;abc&quot;}</span></span></code></pre></div><p>上面代码中，布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性<code>[[PrimitiveValue]]</code>上面，这个属性是不会被<code>Object.assign()</code>拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。</p><p><code>Object.assign()</code>拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（<code>enumerable: false</code>）。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.assign({b: &#39;c&#39;},</span></span>
<span class="line"><span>  Object.defineProperty({}, &#39;invisible&#39;, {</span></span>
<span class="line"><span>    enumerable: false,</span></span>
<span class="line"><span>    value: &#39;hello&#39;</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>// { b: &#39;c&#39; }</span></span></code></pre></div><p>上面代码中，<code>Object.assign()</code>要拷贝的对象只有一个不可枚举属性<code>invisible</code>，这个属性并没有被拷贝进去。</p><p>属性名为 Symbol 值的属性，也会被<code>Object.assign()</code>拷贝。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.assign({ a: &#39;b&#39; }, { [Symbol(&#39;c&#39;)]: &#39;d&#39; })</span></span>
<span class="line"><span>// { a: &#39;b&#39;, Symbol(c): &#39;d&#39; }</span></span></code></pre></div><h3 id="注意点" tabindex="-1">注意点 <a class="header-anchor" href="#注意点" aria-label="Permalink to &quot;注意点&quot;">​</a></h3><p><strong>（1）浅拷贝</strong></p><p><code>Object.assign()</code>方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const obj1 = {a: {b: 1}};</span></span>
<span class="line"><span>const obj2 = Object.assign({}, obj1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>obj1.a.b = 2;</span></span>
<span class="line"><span>obj2.a.b // 2</span></span></code></pre></div><p>上面代码中，源对象<code>obj1</code>的<code>a</code>属性的值是一个对象，<code>Object.assign()</code>拷贝得到的是这个对象的引用。这个对象的任何变化，都会反映到目标对象上面。</p><p><strong>（2）同名属性的替换</strong></p><p>对于这种嵌套的对象，一旦遇到同名属性，<code>Object.assign()</code>的处理方法是替换，而不是添加。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const target = { a: { b: &#39;c&#39;, d: &#39;e&#39; } }</span></span>
<span class="line"><span>const source = { a: { b: &#39;hello&#39; } }</span></span>
<span class="line"><span>Object.assign(target, source)</span></span>
<span class="line"><span>// { a: { b: &#39;hello&#39; } }</span></span></code></pre></div><p>上面代码中，<code>target</code>对象的<code>a</code>属性被<code>source</code>对象的<code>a</code>属性整个替换掉了，而不会得到<code>{ a: { b: &#39;hello&#39;, d: &#39;e&#39; } }</code>的结果。这通常不是开发者想要的，需要特别小心。</p><p>一些函数库提供<code>Object.assign()</code>的定制版本（比如 Lodash 的<code>_.defaultsDeep()</code>方法），可以得到深拷贝的合并。</p><p><strong>（3）数组的处理</strong></p><p><code>Object.assign()</code>可以用来处理数组，但是会把数组视为对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.assign([1, 2, 3], [4, 5])</span></span>
<span class="line"><span>// [4, 5, 3]</span></span></code></pre></div><p>上面代码中，<code>Object.assign()</code>把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性<code>4</code>覆盖了目标数组的 0 号属性<code>1</code>。</p><p><strong>（4）取值函数的处理</strong></p><p><code>Object.assign()</code>只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const source = {</span></span>
<span class="line"><span>  get foo() { return 1 }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>const target = {};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.assign(target, source)</span></span>
<span class="line"><span>// { foo: 1 }</span></span></code></pre></div><p>上面代码中，<code>source</code>对象的<code>foo</code>属性是一个取值函数，<code>Object.assign()</code>不会复制这个取值函数，只会拿到值以后，将这个值复制过去。</p><h3 id="常见用途" tabindex="-1">常见用途 <a class="header-anchor" href="#常见用途" aria-label="Permalink to &quot;常见用途&quot;">​</a></h3><p><code>Object.assign()</code>方法有很多用处。</p><p><strong>（1）为对象添加属性</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class Point {</span></span>
<span class="line"><span>  constructor(x, y) {</span></span>
<span class="line"><span>    Object.assign(this, {x, y});</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面方法通过<code>Object.assign()</code>方法，将<code>x</code>属性和<code>y</code>属性添加到<code>Point</code>类的对象实例。</p><p><strong>（2）为对象添加方法</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.assign(SomeClass.prototype, {</span></span>
<span class="line"><span>  someMethod(arg1, arg2) {</span></span>
<span class="line"><span>    ···</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  anotherMethod() {</span></span>
<span class="line"><span>    ···</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 等同于下面的写法</span></span>
<span class="line"><span>SomeClass.prototype.someMethod = function (arg1, arg2) {</span></span>
<span class="line"><span>  ···</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>SomeClass.prototype.anotherMethod = function () {</span></span>
<span class="line"><span>  ···</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>上面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用<code>assign()</code>方法添加到<code>SomeClass.prototype</code>之中。</p><p><strong>（3）克隆对象</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function clone(origin) {</span></span>
<span class="line"><span>  return Object.assign({}, origin);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。</p><p>不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function clone(origin) {</span></span>
<span class="line"><span>  let originProto = Object.getPrototypeOf(origin);</span></span>
<span class="line"><span>  return Object.assign(Object.create(originProto), origin);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>（4）合并多个对象</strong></p><p>将多个对象合并到某个对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const merge =</span></span>
<span class="line"><span>  (target, ...sources) =&gt; Object.assign(target, ...sources);</span></span></code></pre></div><p>如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const merge =</span></span>
<span class="line"><span>  (...sources) =&gt; Object.assign({}, ...sources);</span></span></code></pre></div><p><strong>（5）为属性指定默认值</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const DEFAULTS = {</span></span>
<span class="line"><span>  logLevel: 0,</span></span>
<span class="line"><span>  outputFormat: &#39;html&#39;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function processContent(options) {</span></span>
<span class="line"><span>  options = Object.assign({}, DEFAULTS, options);</span></span>
<span class="line"><span>  console.log(options);</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面代码中，<code>DEFAULTS</code>对象是默认值，<code>options</code>对象是用户提供的参数。<code>Object.assign()</code>方法将<code>DEFAULTS</code>和<code>options</code>合并成一个新对象，如果两者有同名属性，则<code>options</code>的属性值会覆盖<code>DEFAULTS</code>的属性值。</p><p>注意，由于存在浅拷贝的问题，<code>DEFAULTS</code>对象和<code>options</code>对象的所有属性的值，最好都是简单类型，不要指向另一个对象。否则，<code>DEFAULTS</code>对象的该属性很可能不起作用。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const DEFAULTS = {</span></span>
<span class="line"><span>  url: {</span></span>
<span class="line"><span>    host: &#39;example.com&#39;,</span></span>
<span class="line"><span>    port: 7070</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>processContent({ url: {port: 8000} })</span></span>
<span class="line"><span>// {</span></span>
<span class="line"><span>//   url: {port: 8000}</span></span>
<span class="line"><span>// }</span></span></code></pre></div><p>上面代码的原意是将<code>url.port</code>改成 8000，<code>url.host</code>不变。实际结果却是<code>options.url</code>覆盖掉<code>DEFAULTS.url</code>，所以<code>url.host</code>就不存在了。</p><h2 id="object-getownpropertydescriptors" tabindex="-1">Object.getOwnPropertyDescriptors() <a class="header-anchor" href="#object-getownpropertydescriptors" aria-label="Permalink to &quot;Object.getOwnPropertyDescriptors()&quot;">​</a></h2><p>ES5 的<code>Object.getOwnPropertyDescriptor()</code>方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了<code>Object.getOwnPropertyDescriptors()</code>方法，返回指定对象所有自身属性（非继承属性）的描述对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const obj = {</span></span>
<span class="line"><span>  foo: 123,</span></span>
<span class="line"><span>  get bar() { return &#39;abc&#39; }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.getOwnPropertyDescriptors(obj)</span></span>
<span class="line"><span>// { foo:</span></span>
<span class="line"><span>//    { value: 123,</span></span>
<span class="line"><span>//      writable: true,</span></span>
<span class="line"><span>//      enumerable: true,</span></span>
<span class="line"><span>//      configurable: true },</span></span>
<span class="line"><span>//   bar:</span></span>
<span class="line"><span>//    { get: [Function: get bar],</span></span>
<span class="line"><span>//      set: undefined,</span></span>
<span class="line"><span>//      enumerable: true,</span></span>
<span class="line"><span>//      configurable: true } }</span></span></code></pre></div><p>上面代码中，<code>Object.getOwnPropertyDescriptors()</code>方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。</p><p>该方法的实现非常容易。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function getOwnPropertyDescriptors(obj) {</span></span>
<span class="line"><span>  const result = {};</span></span>
<span class="line"><span>  for (let key of Reflect.ownKeys(obj)) {</span></span>
<span class="line"><span>    result[key] = Object.getOwnPropertyDescriptor(obj, key);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return result;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>该方法的引入目的，主要是为了解决<code>Object.assign()</code>无法正确拷贝<code>get</code>属性和<code>set</code>属性的问题。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const source = {</span></span>
<span class="line"><span>  set foo(value) {</span></span>
<span class="line"><span>    console.log(value);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const target1 = {};</span></span>
<span class="line"><span>Object.assign(target1, source);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.getOwnPropertyDescriptor(target1, &#39;foo&#39;)</span></span>
<span class="line"><span>// { value: undefined,</span></span>
<span class="line"><span>//   writable: true,</span></span>
<span class="line"><span>//   enumerable: true,</span></span>
<span class="line"><span>//   configurable: true }</span></span></code></pre></div><p>上面代码中，<code>source</code>对象的<code>foo</code>属性的值是一个赋值函数，<code>Object.assign</code>方法将这个属性拷贝给<code>target1</code>对象，结果该属性的值变成了<code>undefined</code>。这是因为<code>Object.assign</code>方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。</p><p>这时，<code>Object.getOwnPropertyDescriptors()</code>方法配合<code>Object.defineProperties()</code>方法，就可以实现正确拷贝。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const source = {</span></span>
<span class="line"><span>  set foo(value) {</span></span>
<span class="line"><span>    console.log(value);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const target2 = {};</span></span>
<span class="line"><span>Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));</span></span>
<span class="line"><span>Object.getOwnPropertyDescriptor(target2, &#39;foo&#39;)</span></span>
<span class="line"><span>// { get: undefined,</span></span>
<span class="line"><span>//   set: [Function: set foo],</span></span>
<span class="line"><span>//   enumerable: true,</span></span>
<span class="line"><span>//   configurable: true }</span></span></code></pre></div><p>上面代码中，两个对象合并的逻辑可以写成一个函数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const shallowMerge = (target, source) =&gt; Object.defineProperties(</span></span>
<span class="line"><span>  target,</span></span>
<span class="line"><span>  Object.getOwnPropertyDescriptors(source)</span></span>
<span class="line"><span>);</span></span></code></pre></div><p><code>Object.getOwnPropertyDescriptors()</code>方法的另一个用处，是配合<code>Object.create()</code>方法，将对象属性克隆到一个新对象。这属于浅拷贝。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const clone = Object.create(Object.getPrototypeOf(obj),</span></span>
<span class="line"><span>  Object.getOwnPropertyDescriptors(obj));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 或者</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const shallowClone = (obj) =&gt; Object.create(</span></span>
<span class="line"><span>  Object.getPrototypeOf(obj),</span></span>
<span class="line"><span>  Object.getOwnPropertyDescriptors(obj)</span></span>
<span class="line"><span>);</span></span></code></pre></div><p>上面代码会克隆对象<code>obj</code>。</p><p>另外，<code>Object.getOwnPropertyDescriptors()</code>方法可以实现一个对象继承另一个对象。以前，继承另一个对象，常常写成下面这样。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const obj = {</span></span>
<span class="line"><span>  __proto__: prot,</span></span>
<span class="line"><span>  foo: 123,</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>ES6 规定<code>__proto__</code>只有浏览器要部署，其他环境不用部署。如果去除<code>__proto__</code>，上面代码就要改成下面这样。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const obj = Object.create(prot);</span></span>
<span class="line"><span>obj.foo = 123;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 或者</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const obj = Object.assign(</span></span>
<span class="line"><span>  Object.create(prot),</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    foo: 123,</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>);</span></span></code></pre></div><p>有了<code>Object.getOwnPropertyDescriptors()</code>，我们就有了另一种写法。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const obj = Object.create(</span></span>
<span class="line"><span>  prot,</span></span>
<span class="line"><span>  Object.getOwnPropertyDescriptors({</span></span>
<span class="line"><span>    foo: 123,</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>);</span></span></code></pre></div><p><code>Object.getOwnPropertyDescriptors()</code>也可以用来实现 Mixin（混入）模式。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let mix = (object) =&gt; ({</span></span>
<span class="line"><span>  with: (...mixins) =&gt; mixins.reduce(</span></span>
<span class="line"><span>    (c, mixin) =&gt; Object.create(</span></span>
<span class="line"><span>      c, Object.getOwnPropertyDescriptors(mixin)</span></span>
<span class="line"><span>    ), object)</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// multiple mixins example</span></span>
<span class="line"><span>let a = {a: &#39;a&#39;};</span></span>
<span class="line"><span>let b = {b: &#39;b&#39;};</span></span>
<span class="line"><span>let c = {c: &#39;c&#39;};</span></span>
<span class="line"><span>let d = mix(c).with(a, b);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>d.c // &quot;c&quot;</span></span>
<span class="line"><span>d.b // &quot;b&quot;</span></span>
<span class="line"><span>d.a // &quot;a&quot;</span></span></code></pre></div><p>上面代码返回一个新的对象<code>d</code>，代表了对象<code>a</code>和<code>b</code>被混入了对象<code>c</code>的操作。</p><p>出于完整性的考虑，<code>Object.getOwnPropertyDescriptors()</code>进入标准以后，以后还会新增<code>Reflect.getOwnPropertyDescriptors()</code>方法。</p><h2 id="proto-属性-object-setprototypeof-object-getprototypeof" tabindex="-1"><code>__proto__</code>属性，Object.setPrototypeOf()，Object.getPrototypeOf() <a class="header-anchor" href="#proto-属性-object-setprototypeof-object-getprototypeof" aria-label="Permalink to &quot;\`__proto__\`属性，Object.setPrototypeOf()，Object.getPrototypeOf()&quot;">​</a></h2><p>JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法。</p><h3 id="proto-属性" tabindex="-1"><code>__proto__</code>属性 <a class="header-anchor" href="#proto-属性" aria-label="Permalink to &quot;\`__proto__\`属性&quot;">​</a></h3><p><code>__proto__</code>属性（前后各两个下划线），用来读取或设置当前对象的原型对象（prototype）。目前，所有浏览器（包括 IE11）都部署了这个属性。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// es5 的写法</span></span>
<span class="line"><span>const obj = {</span></span>
<span class="line"><span>  method: function() { ... }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>obj.__proto__ = someOtherObj;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// es6 的写法</span></span>
<span class="line"><span>var obj = Object.create(someOtherObj);</span></span>
<span class="line"><span>obj.method = function() { ... };</span></span></code></pre></div><p>该属性没有写入 ES6 的正文，而是写入了附录，原因是<code>__proto__</code>前后的双下划线，说明它本质上是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6。标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的<code>Object.setPrototypeOf()</code>（写操作）、<code>Object.getPrototypeOf()</code>（读操作）、<code>Object.create()</code>（生成操作）代替。</p><p>实现上，<code>__proto__</code>调用的是<code>Object.prototype.__proto__</code>，具体实现如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.defineProperty(Object.prototype, &#39;__proto__&#39;, {</span></span>
<span class="line"><span>  get() {</span></span>
<span class="line"><span>    let _thisObj = Object(this);</span></span>
<span class="line"><span>    return Object.getPrototypeOf(_thisObj);</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  set(proto) {</span></span>
<span class="line"><span>    if (this === undefined || this === null) {</span></span>
<span class="line"><span>      throw new TypeError();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (!isObject(this)) {</span></span>
<span class="line"><span>      return undefined;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (!isObject(proto)) {</span></span>
<span class="line"><span>      return undefined;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    let status = Reflect.setPrototypeOf(this, proto);</span></span>
<span class="line"><span>    if (!status) {</span></span>
<span class="line"><span>      throw new TypeError();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function isObject(value) {</span></span>
<span class="line"><span>  return Object(value) === value;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如果一个对象本身部署了<code>__proto__</code>属性，该属性的值就是对象的原型。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.getPrototypeOf({ __proto__: null })</span></span>
<span class="line"><span>// null</span></span></code></pre></div><h3 id="object-setprototypeof" tabindex="-1">Object.setPrototypeOf() <a class="header-anchor" href="#object-setprototypeof" aria-label="Permalink to &quot;Object.setPrototypeOf()&quot;">​</a></h3><p><code>Object.setPrototypeOf</code>方法的作用与<code>__proto__</code>相同，用来设置一个对象的原型对象（prototype），返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 格式</span></span>
<span class="line"><span>Object.setPrototypeOf(object, prototype)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 用法</span></span>
<span class="line"><span>const o = Object.setPrototypeOf({}, null);</span></span></code></pre></div><p>该方法等同于下面的函数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function setPrototypeOf(obj, proto) {</span></span>
<span class="line"><span>  obj.__proto__ = proto;</span></span>
<span class="line"><span>  return obj;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>下面是一个例子。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let proto = {};</span></span>
<span class="line"><span>let obj = { x: 10 };</span></span>
<span class="line"><span>Object.setPrototypeOf(obj, proto);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>proto.y = 20;</span></span>
<span class="line"><span>proto.z = 40;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>obj.x // 10</span></span>
<span class="line"><span>obj.y // 20</span></span>
<span class="line"><span>obj.z // 40</span></span></code></pre></div><p>上面代码将<code>proto</code>对象设为<code>obj</code>对象的原型，所以从<code>obj</code>对象可以读取<code>proto</code>对象的属性。</p><p>如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.setPrototypeOf(1, {}) === 1 // true</span></span>
<span class="line"><span>Object.setPrototypeOf(&#39;foo&#39;, {}) === &#39;foo&#39; // true</span></span>
<span class="line"><span>Object.setPrototypeOf(true, {}) === true // true</span></span></code></pre></div><p>由于<code>undefined</code>和<code>null</code>无法转为对象，所以如果第一个参数是<code>undefined</code>或<code>null</code>，就会报错。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.setPrototypeOf(undefined, {})</span></span>
<span class="line"><span>// TypeError: Object.setPrototypeOf called on null or undefined</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.setPrototypeOf(null, {})</span></span>
<span class="line"><span>// TypeError: Object.setPrototypeOf called on null or undefined</span></span></code></pre></div><h3 id="object-getprototypeof" tabindex="-1">Object.getPrototypeOf() <a class="header-anchor" href="#object-getprototypeof" aria-label="Permalink to &quot;Object.getPrototypeOf()&quot;">​</a></h3><p>该方法与<code>Object.setPrototypeOf</code>方法配套，用于读取一个对象的原型对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.getPrototypeOf(obj);</span></span></code></pre></div><p>下面是一个例子。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function Rectangle() {</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const rec = new Rectangle();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.getPrototypeOf(rec) === Rectangle.prototype</span></span>
<span class="line"><span>// true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.setPrototypeOf(rec, Object.prototype);</span></span>
<span class="line"><span>Object.getPrototypeOf(rec) === Rectangle.prototype</span></span>
<span class="line"><span>// false</span></span></code></pre></div><p>如果参数不是对象，会被自动转为对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 等同于 Object.getPrototypeOf(Number(1))</span></span>
<span class="line"><span>Object.getPrototypeOf(1)</span></span>
<span class="line"><span>// Number {[[PrimitiveValue]]: 0}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 等同于 Object.getPrototypeOf(String(&#39;foo&#39;))</span></span>
<span class="line"><span>Object.getPrototypeOf(&#39;foo&#39;)</span></span>
<span class="line"><span>// String {length: 0, [[PrimitiveValue]]: &quot;&quot;}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 等同于 Object.getPrototypeOf(Boolean(true))</span></span>
<span class="line"><span>Object.getPrototypeOf(true)</span></span>
<span class="line"><span>// Boolean {[[PrimitiveValue]]: false}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.getPrototypeOf(1) === Number.prototype // true</span></span>
<span class="line"><span>Object.getPrototypeOf(&#39;foo&#39;) === String.prototype // true</span></span>
<span class="line"><span>Object.getPrototypeOf(true) === Boolean.prototype // true</span></span></code></pre></div><p>如果参数是<code>undefined</code>或<code>null</code>，它们无法转为对象，所以会报错。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.getPrototypeOf(null)</span></span>
<span class="line"><span>// TypeError: Cannot convert undefined or null to object</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.getPrototypeOf(undefined)</span></span>
<span class="line"><span>// TypeError: Cannot convert undefined or null to object</span></span></code></pre></div><h2 id="object-keys-object-values-object-entries" tabindex="-1">Object.keys()，Object.values()，Object.entries() <a class="header-anchor" href="#object-keys-object-values-object-entries" aria-label="Permalink to &quot;Object.keys()，Object.values()，Object.entries()&quot;">​</a></h2><h3 id="object-keys" tabindex="-1">Object.keys() <a class="header-anchor" href="#object-keys" aria-label="Permalink to &quot;Object.keys()&quot;">​</a></h3><p>ES5 引入了<code>Object.keys</code>方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var obj = { foo: &#39;bar&#39;, baz: 42 };</span></span>
<span class="line"><span>Object.keys(obj)</span></span>
<span class="line"><span>// [&quot;foo&quot;, &quot;baz&quot;]</span></span></code></pre></div><p>ES2017 <a href="https://github.com/tc39/proposal-object-values-entries" target="_blank" rel="noreferrer">引入</a>了跟<code>Object.keys</code>配套的<code>Object.values</code>和<code>Object.entries</code>，作为遍历一个对象的补充手段，供<code>for...of</code>循环使用。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let {keys, values, entries} = Object;</span></span>
<span class="line"><span>let obj = { a: 1, b: 2, c: 3 };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for (let key of keys(obj)) {</span></span>
<span class="line"><span>  console.log(key); // &#39;a&#39;, &#39;b&#39;, &#39;c&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for (let value of values(obj)) {</span></span>
<span class="line"><span>  console.log(value); // 1, 2, 3</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for (let [key, value] of entries(obj)) {</span></span>
<span class="line"><span>  console.log([key, value]); // [&#39;a&#39;, 1], [&#39;b&#39;, 2], [&#39;c&#39;, 3]</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="object-values" tabindex="-1">Object.values() <a class="header-anchor" href="#object-values" aria-label="Permalink to &quot;Object.values()&quot;">​</a></h3><p><code>Object.values</code>方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const obj = { foo: &#39;bar&#39;, baz: 42 };</span></span>
<span class="line"><span>Object.values(obj)</span></span>
<span class="line"><span>// [&quot;bar&quot;, 42]</span></span></code></pre></div><p>返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const obj = { 100: &#39;a&#39;, 2: &#39;b&#39;, 7: &#39;c&#39; };</span></span>
<span class="line"><span>Object.values(obj)</span></span>
<span class="line"><span>// [&quot;b&quot;, &quot;c&quot;, &quot;a&quot;]</span></span></code></pre></div><p>上面代码中，属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是<code>b</code>、<code>c</code>、<code>a</code>。</p><p><code>Object.values</code>只返回对象自身的可遍历属性。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const obj = Object.create({}, {p: {value: 42}});</span></span>
<span class="line"><span>Object.values(obj) // []</span></span></code></pre></div><p>上面代码中，<code>Object.create</code>方法的第二个参数添加的对象属性（属性<code>p</code>），如果不显式声明，默认是不可遍历的，因为<code>p</code>的属性描述对象的<code>enumerable</code>默认是<code>false</code>，<code>Object.values</code>不会返回这个属性。只要把<code>enumerable</code>改成<code>true</code>，<code>Object.values</code>就会返回属性<code>p</code>的值。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const obj = Object.create({}, {p:</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    value: 42,</span></span>
<span class="line"><span>    enumerable: true</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>Object.values(obj) // [42]</span></span></code></pre></div><p><code>Object.values</code>会过滤属性名为 Symbol 值的属性。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.values({ [Symbol()]: 123, foo: &#39;abc&#39; });</span></span>
<span class="line"><span>// [&#39;abc&#39;]</span></span></code></pre></div><p>如果<code>Object.values</code>方法的参数是一个字符串，会返回各个字符组成的一个数组。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.values(&#39;foo&#39;)</span></span>
<span class="line"><span>// [&#39;f&#39;, &#39;o&#39;, &#39;o&#39;]</span></span></code></pre></div><p>上面代码中，字符串会先转成一个类似数组的对象。字符串的每个字符，就是该对象的一个属性。因此，<code>Object.values</code>返回每个属性的键值，就是各个字符组成的一个数组。</p><p>如果参数不是对象，<code>Object.values</code>会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，<code>Object.values</code>会返回空数组。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.values(42) // []</span></span>
<span class="line"><span>Object.values(true) // []</span></span></code></pre></div><h3 id="object-entries" tabindex="-1">Object.entries() <a class="header-anchor" href="#object-entries" aria-label="Permalink to &quot;Object.entries()&quot;">​</a></h3><p><code>Object.entries()</code>方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const obj = { foo: &#39;bar&#39;, baz: 42 };</span></span>
<span class="line"><span>Object.entries(obj)</span></span>
<span class="line"><span>// [ [&quot;foo&quot;, &quot;bar&quot;], [&quot;baz&quot;, 42] ]</span></span></code></pre></div><p>除了返回值不一样，该方法的行为与<code>Object.values</code>基本一致。</p><p>如果原对象的属性名是一个 Symbol 值，该属性会被忽略。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.entries({ [Symbol()]: 123, foo: &#39;abc&#39; });</span></span>
<span class="line"><span>// [ [ &#39;foo&#39;, &#39;abc&#39; ] ]</span></span></code></pre></div><p>上面代码中，原对象有两个属性，<code>Object.entries</code>只输出属性名非 Symbol 值的属性。将来可能会有<code>Reflect.ownEntries()</code>方法，返回对象自身的所有属性。</p><p><code>Object.entries</code>的基本用途是遍历对象的属性。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let obj = { one: 1, two: 2 };</span></span>
<span class="line"><span>for (let [k, v] of Object.entries(obj)) {</span></span>
<span class="line"><span>  console.log(</span></span>
<span class="line"><span>    \`\${JSON.stringify(k)}: \${JSON.stringify(v)}\`</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// &quot;one&quot;: 1</span></span>
<span class="line"><span>// &quot;two&quot;: 2</span></span></code></pre></div><p><code>Object.entries</code>方法的另一个用处是，将对象转为真正的<code>Map</code>结构。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const obj = { foo: &#39;bar&#39;, baz: 42 };</span></span>
<span class="line"><span>const map = new Map(Object.entries(obj));</span></span>
<span class="line"><span>map // Map { foo: &quot;bar&quot;, baz: 42 }</span></span></code></pre></div><p>自己实现<code>Object.entries</code>方法，非常简单。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Generator函数的版本</span></span>
<span class="line"><span>function* entries(obj) {</span></span>
<span class="line"><span>  for (let key of Object.keys(obj)) {</span></span>
<span class="line"><span>    yield [key, obj[key]];</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 非Generator函数的版本</span></span>
<span class="line"><span>function entries(obj) {</span></span>
<span class="line"><span>  let arr = [];</span></span>
<span class="line"><span>  for (let key of Object.keys(obj)) {</span></span>
<span class="line"><span>    arr.push([key, obj[key]]);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return arr;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="object-fromentries" tabindex="-1">Object.fromEntries() <a class="header-anchor" href="#object-fromentries" aria-label="Permalink to &quot;Object.fromEntries()&quot;">​</a></h2><p><code>Object.fromEntries()</code>方法是<code>Object.entries()</code>的逆操作，用于将一个键值对数组转为对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.fromEntries([</span></span>
<span class="line"><span>  [&#39;foo&#39;, &#39;bar&#39;],</span></span>
<span class="line"><span>  [&#39;baz&#39;, 42]</span></span>
<span class="line"><span>])</span></span>
<span class="line"><span>// { foo: &quot;bar&quot;, baz: 42 }</span></span></code></pre></div><p>该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 例一</span></span>
<span class="line"><span>const entries = new Map([</span></span>
<span class="line"><span>  [&#39;foo&#39;, &#39;bar&#39;],</span></span>
<span class="line"><span>  [&#39;baz&#39;, 42]</span></span>
<span class="line"><span>]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.fromEntries(entries)</span></span>
<span class="line"><span>// { foo: &quot;bar&quot;, baz: 42 }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 例二</span></span>
<span class="line"><span>const map = new Map().set(&#39;foo&#39;, true).set(&#39;bar&#39;, false);</span></span>
<span class="line"><span>Object.fromEntries(map)</span></span>
<span class="line"><span>// { foo: true, bar: false }</span></span></code></pre></div><p>该方法的一个用处是配合<code>URLSearchParams</code>对象，将查询字符串转为对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.fromEntries(new URLSearchParams(&#39;foo=bar&amp;baz=qux&#39;))</span></span>
<span class="line"><span>// { foo: &quot;bar&quot;, baz: &quot;qux&quot; }</span></span></code></pre></div><h2 id="object-hasown" tabindex="-1">Object.hasOwn() <a class="header-anchor" href="#object-hasown" aria-label="Permalink to &quot;Object.hasOwn()&quot;">​</a></h2><p>JavaScript 对象的属性分成两种：自身的属性和继承的属性。对象实例有一个<code>hasOwnProperty()</code>方法，可以判断某个属性是否为原生属性。ES2022 在<code>Object</code>对象上面新增了一个静态方法<a href="https://github.com/tc39/proposal-accessible-object-hasownproperty" target="_blank" rel="noreferrer"><code>Object.hasOwn()</code></a>，也可以判断是否为自身的属性。</p><p><code>Object.hasOwn()</code>可以接受两个参数，第一个是所要判断的对象，第二个是属性名。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const foo = Object.create({ a: 123 });</span></span>
<span class="line"><span>foo.b = 456;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.hasOwn(foo, &#39;a&#39;) // false</span></span>
<span class="line"><span>Object.hasOwn(foo, &#39;b&#39;) // true</span></span></code></pre></div><p>上面示例中，对象<code>foo</code>的属性<code>a</code>是继承属性，属性<code>b</code>是原生属性。<code>Object.hasOwn()</code>对属性<code>a</code>返回<code>false</code>，对属性<code>b</code>返回<code>true</code>。</p><p><code>Object.hasOwn()</code>的一个好处是，对于不继承<code>Object.prototype</code>的对象不会报错，而<code>hasOwnProperty()</code>是会报错的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const obj = Object.create(null);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>obj.hasOwnProperty(&#39;foo&#39;) // 报错</span></span>
<span class="line"><span>Object.hasOwn(obj, &#39;foo&#39;) // false</span></span></code></pre></div><p>上面示例中，<code>Object.create(null)</code>返回的对象<code>obj</code>是没有原型的，不继承任何属性，这导致调用<code>obj.hasOwnProperty()</code>会报错，但是<code>Object.hasOwn()</code>就能正确处理这种情况。</p>`,183),c=[t];function o(l,i,d,r,b,u){return n(),a("div",null,c)}const v=s(p,[["render",o]]);export{g as __pageData,v as default};
