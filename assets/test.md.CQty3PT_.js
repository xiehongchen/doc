import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.B7o55Ran.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"test.md","filePath":"test.md","lastUpdated":1718683173000}'),e={name:"test.md"},c=p(`<h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><p>Class 可以通过<code>extends</code>关键字实现继承，让子类继承父类的属性和方法。extends 的写法比 ES5 的原型链继承，要清晰和方便很多。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class Point {</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class ColorPoint extends Point {</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面示例中，<code>Point</code>是父类，<code>ColorPoint</code>是子类，它通过<code>extends</code>关键字，继承了<code>Point</code>类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个<code>Point</code>类。</p><p>下面，我们在<code>ColorPoint</code>内部加上代码。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class Point { /* ... */ }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class ColorPoint extends Point {</span></span>
<span class="line"><span>  constructor(x, y, color) {</span></span>
<span class="line"><span>    super(x, y); // 调用父类的constructor(x, y)</span></span>
<span class="line"><span>    this.color = color;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  toString() {</span></span>
<span class="line"><span>    return this.color + &#39; &#39; + super.toString(); // 调用父类的toString()</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面示例中，<code>constructor()</code>方法和<code>toString()</code>方法内部，都出现了<code>super</code>关键字。<code>super</code>在这里表示父类的构造函数，用来新建一个父类的实例对象。</p><p>ES6 规定，子类必须在<code>constructor()</code>方法中调用<code>super()</code>，否则就会报错。这是因为子类自己的<code>this</code>对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，添加子类自己的实例属性和方法。如果不调用<code>super()</code>方法，子类就得不到自己的<code>this</code>对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class Point { /* ... */ }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class ColorPoint extends Point {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let cp = new ColorPoint(); // ReferenceError</span></span></code></pre></div><p>上面代码中，<code>ColorPoint</code>继承了父类<code>Point</code>，但是它的构造函数没有调用<code>super()</code>，导致新建实例时报错。</p><p>为什么子类的构造函数，一定要调用<code>super()</code>？原因就在于 ES6 的继承机制，与 ES5 完全不同。ES5 的继承机制，是先创造一个独立的子类的实例对象，然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”。ES6 的继承机制，则是先将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例，即“继承在前，实例在后”。这就是为什么 ES6 的继承必须先调用<code>super()</code>方法，因为这一步会生成一个继承父类的<code>this</code>对象，没有这一步就无法继承父类。</p><p>注意，这意味着新建子类实例时，父类的构造函数必定会先运行一次。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class Foo {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    console.log(1);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Bar extends Foo {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    console.log(2);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const bar = new Bar();</span></span>
<span class="line"><span>// 1</span></span>
<span class="line"><span>// 2</span></span></code></pre></div><p>上面示例中，子类 Bar 新建实例时，会输出1和2。原因就是子类构造函数调用<code>super()</code>时，会执行一次父类构造函数。</p><p>另一个需要注意的地方是，在子类的构造函数中，只有调用<code>super()</code>之后，才可以使用<code>this</code>关键字，否则会报错。这是因为子类实例的构建，必须先完成父类的继承，只有<code>super()</code>方法才能让子类实例继承父类。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class Point {</span></span>
<span class="line"><span>  constructor(x, y) {</span></span>
<span class="line"><span>    this.x = x;</span></span>
<span class="line"><span>    this.y = y;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class ColorPoint extends Point {</span></span>
<span class="line"><span>  constructor(x, y, color) {</span></span>
<span class="line"><span>    this.color = color; // ReferenceError</span></span>
<span class="line"><span>    super(x, y);</span></span>
<span class="line"><span>    this.color = color; // 正确</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面代码中，子类的<code>constructor()</code>方法没有调用<code>super()</code>之前，就使用<code>this</code>关键字，结果报错，而放在<code>super()</code>之后就是正确的。</p><p>如果子类没有定义<code>constructor()</code>方法，这个方法会默认添加，并且里面会调用<code>super()</code>。也就是说，不管有没有显式定义，任何一个子类都有<code>constructor()</code>方法。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class ColorPoint extends Point {</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 等同于</span></span>
<span class="line"><span>class ColorPoint extends Point {</span></span>
<span class="line"><span>  constructor(...args) {</span></span>
<span class="line"><span>    super(...args);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>有了子类的定义，就可以生成子类的实例了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let cp = new ColorPoint(25, 8, &#39;green&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cp instanceof ColorPoint // true</span></span>
<span class="line"><span>cp instanceof Point // true</span></span></code></pre></div><p>上面示例中，实例对象<code>cp</code>同时是<code>ColorPoint</code>和<code>Point</code>两个类的实例，这与 ES5 的行为完全一致。</p><h2 id="私有属性和私有方法的继承" tabindex="-1">私有属性和私有方法的继承 <a class="header-anchor" href="#私有属性和私有方法的继承" aria-label="Permalink to &quot;私有属性和私有方法的继承&quot;">​</a></h2><p>父类所有的属性和方法，都会被子类继承，除了私有的属性和方法。</p><p>子类无法继承父类的私有属性，或者说，私有属性只能在定义它的 class 里面使用。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class Foo {</span></span>
<span class="line"><span>  #p = 1;</span></span>
<span class="line"><span>  #m() {</span></span>
<span class="line"><span>    console.log(&#39;hello&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Bar extends Foo {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    console.log(this.#p); // 报错</span></span>
<span class="line"><span>    this.#m(); // 报错</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面示例中，子类 Bar 调用父类 Foo 的私有属性或私有方法，都会报错。</p><p>如果父类定义了私有属性的读写方法，子类就可以通过这些方法，读写私有属性。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class Foo {</span></span>
<span class="line"><span>  #p = 1;</span></span>
<span class="line"><span>  getP() {</span></span>
<span class="line"><span>    return this.#p;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Bar extends Foo {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    console.log(this.getP()); // 1</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面示例中，<code>getP()</code>是父类用来读取私有属性的方法，通过该方法，子类就可以读到父类的私有属性。</p><h2 id="静态属性和静态方法的继承" tabindex="-1">静态属性和静态方法的继承 <a class="header-anchor" href="#静态属性和静态方法的继承" aria-label="Permalink to &quot;静态属性和静态方法的继承&quot;">​</a></h2><p>父类的静态属性和静态方法，也会被子类继承。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {</span></span>
<span class="line"><span>  static hello() {</span></span>
<span class="line"><span>    console.log(&#39;hello world&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>B.hello()  // hello world</span></span></code></pre></div><p>上面代码中，<code>hello()</code>是<code>A</code>类的静态方法，<code>B</code>继承<code>A</code>，也继承了<code>A</code>的静态方法。</p><p>注意，静态属性是通过浅拷贝实现继承的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A { static foo = 100; }</span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    B.foo--;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const b = new B();</span></span>
<span class="line"><span>B.foo // 99</span></span>
<span class="line"><span>A.foo // 100</span></span></code></pre></div><p>上面示例中，<code>foo</code>是 A 类的静态属性，B 类继承了 A 类，因此也继承了这个属性。但是，在 B 类内部操作<code>B.foo</code>这个静态属性，影响不到<code>A.foo</code>，原因就是 B 类继承静态属性时，会采用浅拷贝，拷贝父类静态属性的值，因此<code>A.foo</code>和<code>B.foo</code>是两个彼此独立的属性。</p><p>但是，由于这种拷贝是浅拷贝，如果父类的静态属性的值是一个对象，那么子类的静态属性也会指向这个对象，因为浅拷贝只会拷贝对象的内存地址。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {</span></span>
<span class="line"><span>  static foo = { n: 100 };</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    B.foo.n--;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const b = new B();</span></span>
<span class="line"><span>B.foo.n // 99</span></span>
<span class="line"><span>A.foo.n // 99</span></span></code></pre></div><p>上面示例中，<code>A.foo</code>的值是一个对象，浅拷贝导致<code>B.foo</code>和<code>A.foo</code>指向同一个对象。所以，子类<code>B</code>修改这个对象的属性值，会影响到父类<code>A</code>。</p><h2 id="object-getprototypeof" tabindex="-1">Object.getPrototypeOf() <a class="header-anchor" href="#object-getprototypeof" aria-label="Permalink to &quot;Object.getPrototypeOf()&quot;">​</a></h2><p><code>Object.getPrototypeOf()</code>方法可以用来从子类上获取父类。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class Point { /*...*/ }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class ColorPoint extends Point { /*...*/ }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.getPrototypeOf(ColorPoint) === Point</span></span>
<span class="line"><span>// true</span></span></code></pre></div><p>因此，可以使用这个方法判断，一个类是否继承了另一个类。</p><h2 id="super-关键字" tabindex="-1">super 关键字 <a class="header-anchor" href="#super-关键字" aria-label="Permalink to &quot;super 关键字&quot;">​</a></h2><p><code>super</code>这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。</p><p>第一种情况，<code>super</code>作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次<code>super()</code>函数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面代码中，子类<code>B</code>的构造函数之中的<code>super()</code>，代表调用父类的构造函数。这是必须的，否则报错。</p><p>调用<code>super()</code>的作用是形成子类的<code>this</code>对象，把父类的实例属性和方法放到这个<code>this</code>对象上面。子类在调用<code>super()</code>之前，是没有<code>this</code>对象的，任何对<code>this</code>的操作都要放在<code>super()</code>的后面。</p><p>注意，这里的<code>super</code>虽然代表了父类的构造函数，但是因为返回的是子类的<code>this</code>（即子类的实例对象），所以<code>super</code>内部的<code>this</code>代表子类的实例，而不是父类的实例，这里的<code>super()</code>相当于<code>A.prototype.constructor.call(this)</code>（在子类的<code>this</code>上运行父类的构造函数）。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    console.log(new.target.name);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>new A() // A</span></span>
<span class="line"><span>new B() // B</span></span></code></pre></div><p>上面示例中，<code>new.target</code>指向当前正在执行的函数。可以看到，在<code>super()</code>执行时（<code>new B()</code>），它指向的是子类<code>B</code>的构造函数，而不是父类<code>A</code>的构造函数。也就是说，<code>super()</code>内部的<code>this</code>指向的是<code>B</code>。</p><p>不过，由于<code>super()</code>在子类构造方法中执行时，子类的属性和方法还没有绑定到<code>this</code>，所以如果存在同名属性，此时拿到的是父类的属性。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {</span></span>
<span class="line"><span>  name = &#39;A&#39;;</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    console.log(&#39;My name is &#39; + this.name);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>  name = &#39;B&#39;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const b = new B(); // My name is A</span></span></code></pre></div><p>上面示例中，最后一行输出的是<code>A</code>，而不是<code>B</code>，原因就在于<code>super()</code>执行时，<code>B</code>的<code>name</code>属性还没有绑定到<code>this</code>，所以<code>this.name</code>拿到的是<code>A</code>类的<code>name</code>属性。</p><p>作为函数时，<code>super()</code>只能用在子类的构造函数之中，用在其他地方就会报错。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>  m() {</span></span>
<span class="line"><span>    super(); // 报错</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面代码中，<code>super()</code>用在<code>B</code>类的<code>m</code>方法之中，就会造成语法错误。</p><p>第二种情况，<code>super</code>作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {</span></span>
<span class="line"><span>  p() {</span></span>
<span class="line"><span>    return 2;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    console.log(super.p()); // 2</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let b = new B();</span></span></code></pre></div><p>上面代码中，子类<code>B</code>当中的<code>super.p()</code>，就是将<code>super</code>当作一个对象使用。这时，<code>super</code>在普通方法之中，指向<code>A.prototype</code>，所以<code>super.p()</code>就相当于<code>A.prototype.p()</code>。</p><p>这里需要注意，由于<code>super</code>指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过<code>super</code>调用的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    this.p = 2;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>  get m() {</span></span>
<span class="line"><span>    return super.p;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let b = new B();</span></span>
<span class="line"><span>b.m // undefined</span></span></code></pre></div><p>上面代码中，<code>p</code>是父类<code>A</code>实例的属性，<code>super.p</code>就引用不到它。</p><p>如果属性定义在父类的原型对象上，<code>super</code>就可以取到。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {}</span></span>
<span class="line"><span>A.prototype.x = 2;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    console.log(super.x) // 2</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let b = new B();</span></span></code></pre></div><p>上面代码中，属性<code>x</code>是定义在<code>A.prototype</code>上面的，所以<code>super.x</code>可以取到它的值。</p><p>ES6 规定，在子类普通方法中通过<code>super</code>调用父类的方法时，方法内部的<code>this</code>指向当前的子类实例。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    this.x = 1;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  print() {</span></span>
<span class="line"><span>    console.log(this.x);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    this.x = 2;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  m() {</span></span>
<span class="line"><span>    super.print();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let b = new B();</span></span>
<span class="line"><span>b.m() // 2</span></span></code></pre></div><p>上面代码中，<code>super.print()</code>虽然调用的是<code>A.prototype.print()</code>，但是<code>A.prototype.print()</code>内部的<code>this</code>指向子类<code>B</code>的实例，导致输出的是<code>2</code>，而不是<code>1</code>。也就是说，实际上执行的是<code>super.print.call(this)</code>。</p><p>由于<code>this</code>指向子类实例，所以如果通过<code>super</code>对某个属性赋值，这时<code>super</code>就是<code>this</code>，赋值的属性会变成子类实例的属性。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    this.x = 1;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    this.x = 2;</span></span>
<span class="line"><span>    super.x = 3;</span></span>
<span class="line"><span>    console.log(super.x); // undefined</span></span>
<span class="line"><span>    console.log(this.x); // 3</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let b = new B();</span></span></code></pre></div><p>上面代码中，<code>super.x</code>赋值为<code>3</code>，这时等同于对<code>this.x</code>赋值为<code>3</code>。而当读取<code>super.x</code>的时候，读的是<code>A.prototype.x</code>，所以返回<code>undefined</code>。</p><p>如果<code>super</code>作为对象，用在静态方法之中，这时<code>super</code>将指向父类，而不是父类的原型对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class Parent {</span></span>
<span class="line"><span>  static myMethod(msg) {</span></span>
<span class="line"><span>    console.log(&#39;static&#39;, msg);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  myMethod(msg) {</span></span>
<span class="line"><span>    console.log(&#39;instance&#39;, msg);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Child extends Parent {</span></span>
<span class="line"><span>  static myMethod(msg) {</span></span>
<span class="line"><span>    super.myMethod(msg);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  myMethod(msg) {</span></span>
<span class="line"><span>    super.myMethod(msg);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Child.myMethod(1); // static 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var child = new Child();</span></span>
<span class="line"><span>child.myMethod(2); // instance 2</span></span></code></pre></div><p>上面代码中，<code>super</code>在静态方法之中指向父类，在普通方法之中指向父类的原型对象。</p><p>另外，在子类的静态方法中通过<code>super</code>调用父类的方法时，方法内部的<code>this</code>指向当前的子类，而不是子类的实例。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    this.x = 1;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  static print() {</span></span>
<span class="line"><span>    console.log(this.x);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    this.x = 2;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  static m() {</span></span>
<span class="line"><span>    super.print();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>B.x = 3;</span></span>
<span class="line"><span>B.m() // 3</span></span></code></pre></div><p>上面代码中，静态方法<code>B.m</code>里面，<code>super.print</code>指向父类的静态方法。这个方法里面的<code>this</code>指向的是<code>B</code>，而不是<code>B</code>的实例。</p><p>注意，使用<code>super</code>的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    console.log(super); // 报错</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面代码中，<code>console.log(super)</code>当中的<code>super</code>，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。这时，如果能清晰地表明<code>super</code>的数据类型，就不会报错。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    console.log(super.valueOf() instanceof B); // true</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let b = new B();</span></span></code></pre></div><p>上面代码中，<code>super.valueOf()</code>表明<code>super</code>是一个对象，因此就不会报错。同时，由于<code>super</code>使得<code>this</code>指向<code>B</code>的实例，所以<code>super.valueOf()</code>返回的是一个<code>B</code>的实例。</p><p>最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用<code>super</code>关键字。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var obj = {</span></span>
<span class="line"><span>  toString() {</span></span>
<span class="line"><span>    return &quot;MyObject: &quot; + super.toString();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>obj.toString(); // MyObject: [object Object]</span></span></code></pre></div><h2 id="类的-prototype-属性和-proto-属性" tabindex="-1">类的 prototype 属性和__proto__属性 <a class="header-anchor" href="#类的-prototype-属性和-proto-属性" aria-label="Permalink to &quot;类的 prototype 属性和__proto__属性&quot;">​</a></h2><p>大多数浏览器的 ES5 实现之中，每一个对象都有<code>__proto__</code>属性，指向对应的构造函数的<code>prototype</code>属性。Class 作为构造函数的语法糖，同时有<code>prototype</code>属性和<code>__proto__</code>属性，因此同时存在两条继承链。</p><p>（1）子类的<code>__proto__</code>属性，表示构造函数的继承，总是指向父类。</p><p>（2）子类<code>prototype</code>属性的<code>__proto__</code>属性，表示方法的继承，总是指向父类的<code>prototype</code>属性。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class B extends A {</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>B.__proto__ === A // true</span></span>
<span class="line"><span>B.prototype.__proto__ === A.prototype // true</span></span></code></pre></div><p>上面代码中，子类<code>B</code>的<code>__proto__</code>属性指向父类<code>A</code>，子类<code>B</code>的<code>prototype</code>属性的<code>__proto__</code>属性指向父类<code>A</code>的<code>prototype</code>属性。</p><p>这样的结果是因为，类的继承是按照下面的模式实现的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class B {</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// B 的实例继承 A 的实例</span></span>
<span class="line"><span>Object.setPrototypeOf(B.prototype, A.prototype);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// B 继承 A 的静态属性</span></span>
<span class="line"><span>Object.setPrototypeOf(B, A);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const b = new B();</span></span></code></pre></div><p>《对象的扩展》一章给出过<code>Object.setPrototypeOf</code>方法的实现。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.setPrototypeOf = function (obj, proto) {</span></span>
<span class="line"><span>  obj.__proto__ = proto;</span></span>
<span class="line"><span>  return obj;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>因此，就得到了上面的结果。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Object.setPrototypeOf(B.prototype, A.prototype);</span></span>
<span class="line"><span>// 等同于</span></span>
<span class="line"><span>B.prototype.__proto__ = A.prototype;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.setPrototypeOf(B, A);</span></span>
<span class="line"><span>// 等同于</span></span>
<span class="line"><span>B.__proto__ = A;</span></span></code></pre></div><p>这两条继承链，可以这样理解：作为一个对象，子类（<code>B</code>）的原型（<code>__proto__</code>属性）是父类（<code>A</code>）；作为一个构造函数，子类（<code>B</code>）的原型对象（<code>prototype</code>属性）是父类的原型对象（<code>prototype</code>属性）的实例。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>B.prototype = Object.create(A.prototype);</span></span>
<span class="line"><span>// 等同于</span></span>
<span class="line"><span>B.prototype.__proto__ = A.prototype;</span></span></code></pre></div><p><code>extends</code>关键字后面可以跟多种类型的值。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class B extends A {</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面代码的<code>A</code>，只要是一个有<code>prototype</code>属性的函数，就能被<code>B</code>继承。由于函数都有<code>prototype</code>属性（除了<code>Function.prototype</code>函数），因此<code>A</code>可以是任意函数。</p><p>下面，讨论两种情况。第一种，子类继承<code>Object</code>类。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A extends Object {</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>A.__proto__ === Object // true</span></span>
<span class="line"><span>A.prototype.__proto__ === Object.prototype // true</span></span></code></pre></div><p>这种情况下，<code>A</code>其实就是构造函数<code>Object</code>的复制，<code>A</code>的实例就是<code>Object</code>的实例。</p><p>第二种情况，不存在任何继承。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class A {</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>A.__proto__ === Function.prototype // true</span></span>
<span class="line"><span>A.prototype.__proto__ === Object.prototype // true</span></span></code></pre></div><p>这种情况下，<code>A</code>作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承<code>Function.prototype</code>。但是，<code>A</code>调用后返回一个空对象（即<code>Object</code>实例），所以<code>A.prototype.__proto__</code>指向构造函数（<code>Object</code>）的<code>prototype</code>属性。</p><h3 id="实例的-proto-属性" tabindex="-1">实例的 <strong>proto</strong> 属性 <a class="header-anchor" href="#实例的-proto-属性" aria-label="Permalink to &quot;实例的 __proto__ 属性&quot;">​</a></h3><p>子类实例的<code>__proto__</code>属性的<code>__proto__</code>属性，指向父类实例的<code>__proto__</code>属性。也就是说，子类的原型的原型，是父类的原型。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var p1 = new Point(2, 3);</span></span>
<span class="line"><span>var p2 = new ColorPoint(2, 3, &#39;red&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>p2.__proto__ === p1.__proto__ // false</span></span>
<span class="line"><span>p2.__proto__.__proto__ === p1.__proto__ // true</span></span></code></pre></div><p>上面代码中，<code>ColorPoint</code>继承了<code>Point</code>，导致前者原型的原型是后者的原型。</p><p>因此，通过子类实例的<code>__proto__.__proto__</code>属性，可以修改父类实例的行为。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>p2.__proto__.__proto__.printName = function () {</span></span>
<span class="line"><span>  console.log(&#39;Ha&#39;);</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>p1.printName() // &quot;Ha&quot;</span></span></code></pre></div><p>上面代码在<code>ColorPoint</code>的实例<code>p2</code>上向<code>Point</code>类添加方法，结果影响到了<code>Point</code>的实例<code>p1</code>。</p><h2 id="原生构造函数的继承" tabindex="-1">原生构造函数的继承 <a class="header-anchor" href="#原生构造函数的继承" aria-label="Permalink to &quot;原生构造函数的继承&quot;">​</a></h2><p>原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。</p><ul><li>Boolean()</li><li>Number()</li><li>String()</li><li>Array()</li><li>Date()</li><li>Function()</li><li>RegExp()</li><li>Error()</li><li>Object()</li></ul><p>以前，这些原生构造函数是无法继承的，比如，不能自己定义一个<code>Array</code>的子类。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function MyArray() {</span></span>
<span class="line"><span>  Array.apply(this, arguments);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>MyArray.prototype = Object.create(Array.prototype, {</span></span>
<span class="line"><span>  constructor: {</span></span>
<span class="line"><span>    value: MyArray,</span></span>
<span class="line"><span>    writable: true,</span></span>
<span class="line"><span>    configurable: true,</span></span>
<span class="line"><span>    enumerable: true</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>});</span></span></code></pre></div><p>上面代码定义了一个继承 Array 的<code>MyArray</code>类。但是，这个类的行为与<code>Array</code>完全不一致。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var colors = new MyArray();</span></span>
<span class="line"><span>colors[0] = &quot;red&quot;;</span></span>
<span class="line"><span>colors.length  // 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>colors.length = 0;</span></span>
<span class="line"><span>colors[0]  // &quot;red&quot;</span></span></code></pre></div><p>之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过<code>Array.apply()</code>或者分配给原型对象都不行。原生构造函数会忽略<code>apply</code>方法传入的<code>this</code>，也就是说，原生构造函数的<code>this</code>无法绑定，导致拿不到内部属性。</p><p>ES5 是先新建子类的实例对象<code>this</code>，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。比如，<code>Array</code>构造函数有一个内部属性<code>[[DefineOwnProperty]]</code>，用来定义新属性时，更新<code>length</code>属性，这个内部属性无法在子类获取，导致子类的<code>length</code>属性行为不正常。</p><p>下面的例子中，我们想让一个普通对象继承<code>Error</code>对象。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var e = {};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.getOwnPropertyNames(Error.call(e))</span></span>
<span class="line"><span>// [ &#39;stack&#39; ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.getOwnPropertyNames(e)</span></span>
<span class="line"><span>// []</span></span></code></pre></div><p>上面代码中，我们想通过<code>Error.call(e)</code>这种写法，让普通对象<code>e</code>具有<code>Error</code>对象的实例属性。但是，<code>Error.call()</code>完全忽略传入的第一个参数，而是返回一个新对象，<code>e</code>本身没有任何变化。这证明了<code>Error.call(e)</code>这种写法，无法继承原生构造函数。</p><p>ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象<code>this</code>，然后再用子类的构造函数修饰<code>this</code>，使得父类的所有行为都可以继承。下面是一个继承<code>Array</code>的例子。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class MyArray extends Array {</span></span>
<span class="line"><span>  constructor(...args) {</span></span>
<span class="line"><span>    super(...args);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var arr = new MyArray();</span></span>
<span class="line"><span>arr[0] = 12;</span></span>
<span class="line"><span>arr.length // 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>arr.length = 0;</span></span>
<span class="line"><span>arr[0] // undefined</span></span></code></pre></div><p>上面代码定义了一个<code>MyArray</code>类，继承了<code>Array</code>构造函数，因此就可以从<code>MyArray</code>生成数组的实例。这意味着，ES6 可以自定义原生数据结构（比如<code>Array</code>、<code>String</code>等）的子类，这是 ES5 无法做到的。</p><p>上面这个例子也说明，<code>extends</code>关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数组。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class VersionedArray extends Array {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    this.history = [[]];</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  commit() {</span></span>
<span class="line"><span>    this.history.push(this.slice());</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  revert() {</span></span>
<span class="line"><span>    this.splice(0, this.length, ...this.history[this.history.length - 1]);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var x = new VersionedArray();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>x.push(1);</span></span>
<span class="line"><span>x.push(2);</span></span>
<span class="line"><span>x // [1, 2]</span></span>
<span class="line"><span>x.history // [[]]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>x.commit();</span></span>
<span class="line"><span>x.history // [[], [1, 2]]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>x.push(3);</span></span>
<span class="line"><span>x // [1, 2, 3]</span></span>
<span class="line"><span>x.history // [[], [1, 2]]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>x.revert();</span></span>
<span class="line"><span>x // [1, 2]</span></span></code></pre></div><p>上面代码中，<code>VersionedArray</code>会通过<code>commit</code>方法，将自己的当前状态生成一个版本快照，存入<code>history</code>属性。<code>revert</code>方法用来将数组重置为最新一次保存的版本。除此之外，<code>VersionedArray</code>依然是一个普通数组，所有原生的数组方法都可以在它上面调用。</p><p>下面是一个自定义<code>Error</code>子类的例子，可以用来定制报错时的行为。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class ExtendableError extends Error {</span></span>
<span class="line"><span>  constructor(message) {</span></span>
<span class="line"><span>    super();</span></span>
<span class="line"><span>    this.message = message;</span></span>
<span class="line"><span>    this.stack = (new Error()).stack;</span></span>
<span class="line"><span>    this.name = this.constructor.name;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class MyError extends ExtendableError {</span></span>
<span class="line"><span>  constructor(m) {</span></span>
<span class="line"><span>    super(m);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var myerror = new MyError(&#39;ll&#39;);</span></span>
<span class="line"><span>myerror.message // &quot;ll&quot;</span></span>
<span class="line"><span>myerror instanceof Error // true</span></span>
<span class="line"><span>myerror.name // &quot;MyError&quot;</span></span>
<span class="line"><span>myerror.stack</span></span>
<span class="line"><span>// Error</span></span>
<span class="line"><span>//     at MyError.ExtendableError</span></span>
<span class="line"><span>//     ...</span></span></code></pre></div><p>注意，继承<code>Object</code>的子类，有一个<a href="http://stackoverflow.com/questions/36203614/super-does-not-pass-arguments-when-instantiating-a-class-extended-from-object" target="_blank" rel="noreferrer">行为差异</a>。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class NewObj extends Object{</span></span>
<span class="line"><span>  constructor(){</span></span>
<span class="line"><span>    super(...arguments);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var o = new NewObj({attr: true});</span></span>
<span class="line"><span>o.attr === true  // false</span></span></code></pre></div><p>上面代码中，<code>NewObj</code>继承了<code>Object</code>，但是无法通过<code>super</code>方法向父类<code>Object</code>传参。这是因为 ES6 改变了<code>Object</code>构造函数的行为，一旦发现<code>Object</code>方法不是通过<code>new Object()</code>这种形式调用，ES6 规定<code>Object</code>构造函数会忽略参数。</p><h2 id="mixin-模式的实现" tabindex="-1">Mixin 模式的实现 <a class="header-anchor" href="#mixin-模式的实现" aria-label="Permalink to &quot;Mixin 模式的实现&quot;">​</a></h2><p>Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const a = {</span></span>
<span class="line"><span>  a: &#39;a&#39;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>const b = {</span></span>
<span class="line"><span>  b: &#39;b&#39;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>const c = {...a, ...b}; // {a: &#39;a&#39;, b: &#39;b&#39;}</span></span></code></pre></div><p>上面代码中，<code>c</code>对象是<code>a</code>对象和<code>b</code>对象的合成，具有两者的接口。</p><p>下面是一个更完备的实现，将多个类的接口“混入”（mix in）另一个类。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function mix(...mixins) {</span></span>
<span class="line"><span>  class Mix {</span></span>
<span class="line"><span>    constructor() {</span></span>
<span class="line"><span>      for (let mixin of mixins) {</span></span>
<span class="line"><span>        copyProperties(this, new mixin()); // 拷贝实例属性</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  for (let mixin of mixins) {</span></span>
<span class="line"><span>    copyProperties(Mix, mixin); // 拷贝静态属性</span></span>
<span class="line"><span>    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return Mix;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function copyProperties(target, source) {</span></span>
<span class="line"><span>  for (let key of Reflect.ownKeys(source)) {</span></span>
<span class="line"><span>    if ( key !== &#39;constructor&#39;</span></span>
<span class="line"><span>      &amp;&amp; key !== &#39;prototype&#39;</span></span>
<span class="line"><span>      &amp;&amp; key !== &#39;name&#39;</span></span>
<span class="line"><span>    ) {</span></span>
<span class="line"><span>      let desc = Object.getOwnPropertyDescriptor(source, key);</span></span>
<span class="line"><span>      Object.defineProperty(target, key, desc);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面代码的<code>mix</code>函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class DistributedEdit extends mix(Loggable, Serializable) {</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,148),l=[c];function o(i,t,d,r,h,u){return a(),n("div",null,l)}const v=s(e,[["render",o]]);export{b as __pageData,v as default};
