import{_ as s,c as a,o as n,a5 as p}from"./chunks/framework.DR2TWj9V.js";const h=JSON.parse('{"title":"数据类型","description":"","frontmatter":{},"headers":[],"relativePath":"test.md","filePath":"test.md","lastUpdated":1729093476000}'),e={name:"test.md"},l=p(`<h1 id="数据类型" tabindex="-1">数据类型 <a class="header-anchor" href="#数据类型" aria-label="Permalink to &quot;数据类型&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export enum ReactiveFlags {</span></span>
<span class="line"><span>  SKIP = &#39;__v_skip&#39;, // 跳过，不应被转换为响应式对象</span></span>
<span class="line"><span>  IS_REACTIVE = &#39;__v_isReactive&#39;, // 是否响应式</span></span>
<span class="line"><span>  IS_READONLY = &#39;__v_isReadonly&#39;, // 是否只读</span></span>
<span class="line"><span>  IS_SHALLOW = &#39;__v_isShallow&#39;, // 是否浅层</span></span>
<span class="line"><span>  RAW = &#39;__v_raw&#39;,  // 源数据</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export interface Target {</span></span>
<span class="line"><span>  [ReactiveFlags.SKIP]?: boolean // 是否跳过？</span></span>
<span class="line"><span>  [ReactiveFlags.IS_REACTIVE]?: boolean // 是否响应式</span></span>
<span class="line"><span>  [ReactiveFlags.IS_READONLY]?: boolean //  是否只读</span></span>
<span class="line"><span>  [ReactiveFlags.IS_SHALLOW]?: boolean //  是否浅层</span></span>
<span class="line"><span>  [ReactiveFlags.RAW]?: any //  对象的原始数据</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 存储响应式对象</span></span>
<span class="line"><span>export const reactiveMap = new WeakMap&lt;Target, any&gt;()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 数据类型</span></span>
<span class="line"><span>enum TargetType {</span></span>
<span class="line"><span>  INVALID = 0,  // 对象可跳过、不可扩展</span></span>
<span class="line"><span>  COMMON = 1, // 对象和数组</span></span>
<span class="line"><span>  COLLECTION = 2, // map、set、weakmap、weakset</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function targetTypeMap(rawType: string) {</span></span>
<span class="line"><span>  switch (rawType) {</span></span>
<span class="line"><span>    case &#39;Object&#39;:</span></span>
<span class="line"><span>    case &#39;Array&#39;:</span></span>
<span class="line"><span>      return TargetType.COMMON</span></span>
<span class="line"><span>    case &#39;Map&#39;:</span></span>
<span class="line"><span>    case &#39;Set&#39;:</span></span>
<span class="line"><span>    case &#39;WeakMap&#39;:</span></span>
<span class="line"><span>    case &#39;WeakSet&#39;:</span></span>
<span class="line"><span>      return TargetType.COLLECTION</span></span>
<span class="line"><span>    default:</span></span>
<span class="line"><span>      return TargetType.INVALID</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="_1、reactive" tabindex="-1">1、reactive <a class="header-anchor" href="#_1、reactive" aria-label="Permalink to &quot;1、reactive&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export function reactive&lt;T extends object&gt;(target: T): Reactive&lt;T&gt;</span></span></code></pre></div><h2 id="reactive类型" tabindex="-1">Reactive类型 <a class="header-anchor" href="#reactive类型" aria-label="Permalink to &quot;Reactive类型&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export type Reactive&lt;T&gt; = UnwrapNestedRefs&lt;T&gt; &amp; (T extends readonly any[] ? ReactiveMarker : {})</span></span></code></pre></div><h1 id="_2、reactive重载" tabindex="-1">2、reactive重载 <a class="header-anchor" href="#_2、reactive重载" aria-label="Permalink to &quot;2、reactive重载&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export function reactive(target: object) {</span></span>
<span class="line"><span>  // 如果尝试观察一个只读代理，就返回只读版本</span></span>
<span class="line"><span>  if (isReadonly(target)) {</span></span>
<span class="line"><span>    return target</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return createReactiveObject(</span></span>
<span class="line"><span>    target,</span></span>
<span class="line"><span>    false,</span></span>
<span class="line"><span>    mutableHandlers,</span></span>
<span class="line"><span>    mutableCollectionHandlers,</span></span>
<span class="line"><span>    reactiveMap,</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="isreadonly函数" tabindex="-1">isReadonly函数 <a class="header-anchor" href="#isreadonly函数" aria-label="Permalink to &quot;isReadonly函数&quot;">​</a></h2><p>判断传入的值是否是一个只读对象，只读对象属性可以更改，但不能通过传递的对象直接分配</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export function isReadonly(value: unknown): boolean {</span></span>
<span class="line"><span>  return !!(value &amp;&amp; (value as Target)[ReactiveFlags.IS_READONLY])</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="createreactiveobject函数" tabindex="-1">createReactiveObject函数 <a class="header-anchor" href="#createreactiveobject函数" aria-label="Permalink to &quot;createReactiveObject函数&quot;">​</a></h2><p>创建一个响应式对象</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function createReactiveObject(</span></span>
<span class="line"><span>  target: Target, // 源数据</span></span>
<span class="line"><span>  isReadonly: boolean, // 是否是只读对象</span></span>
<span class="line"><span>  baseHandlers: ProxyHandler&lt;any&gt;, // 对象和数组的代理方法</span></span>
<span class="line"><span>  collectionHandlers: ProxyHandler&lt;any&gt;, // map、set、weakmap、weakset代理方法</span></span>
<span class="line"><span>  proxyMap: WeakMap&lt;Target, any&gt;,</span></span>
<span class="line"><span>) {</span></span>
<span class="line"><span>  // 如果不是对象，且是开发环境，就警告</span></span>
<span class="line"><span>  if (!isObject(target)) {</span></span>
<span class="line"><span>    if (__DEV__) {</span></span>
<span class="line"><span>      warn(</span></span>
<span class="line"><span>        \`value cannot be made \${isReadonly ? &#39;readonly&#39; : &#39;reactive&#39;}: \${String(</span></span>
<span class="line"><span>          target,</span></span>
<span class="line"><span>        )}\`,</span></span>
<span class="line"><span>      )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return target</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 如果本来就是响应式对象，且是可读的，直接返回</span></span>
<span class="line"><span>  if (</span></span>
<span class="line"><span>    target[ReactiveFlags.RAW] &amp;&amp;</span></span>
<span class="line"><span>    !(isReadonly &amp;&amp; target[ReactiveFlags.IS_REACTIVE])</span></span>
<span class="line"><span>  ) {</span></span>
<span class="line"><span>    return target</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 源数据已经有响应的代理</span></span>
<span class="line"><span>  const existingProxy = proxyMap.get(target)</span></span>
<span class="line"><span>  if (existingProxy) {</span></span>
<span class="line"><span>    return existingProxy</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 只能观察特定的值类型</span></span>
<span class="line"><span>  // 如果是targetType是0，表示对象可跳过、不可扩展，则直接返回原数据，这表示该数据不应被转换为响应式数据</span></span>
<span class="line"><span>  const targetType = getTargetType(target)</span></span>
<span class="line"><span>  if (targetType === TargetType.INVALID) {</span></span>
<span class="line"><span>    return target</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 核心，使用proxy，如果类型为2，就使用collectionHandlers，否则使用baseHandlers（也就是数据类型为数组和对象）</span></span>
<span class="line"><span>  const proxy = new Proxy(</span></span>
<span class="line"><span>    target,</span></span>
<span class="line"><span>    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers,</span></span>
<span class="line"><span>  )</span></span>
<span class="line"><span>  proxyMap.set(target, proxy)</span></span>
<span class="line"><span>  return proxy</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="gettargettype函数" tabindex="-1">getTargetType函数 <a class="header-anchor" href="#gettargettype函数" aria-label="Permalink to &quot;getTargetType函数&quot;">​</a></h2><p>判断数据类型，如果对象可跳过、不可扩展，就返回0，否则就根据数据类型返回</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function getTargetType(value: Target) {</span></span>
<span class="line"><span>  return value[ReactiveFlags.SKIP] || !Object.isExtensible(value)</span></span>
<span class="line"><span>    ? TargetType.INVALID</span></span>
<span class="line"><span>    : targetTypeMap(toRawType(value))</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="torawtype函数" tabindex="-1">toRawType函数 <a class="header-anchor" href="#torawtype函数" aria-label="Permalink to &quot;toRawType函数&quot;">​</a></h2><p>获取数据类型</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export const objectToString = Object.prototype.toString</span></span>
<span class="line"><span>export const toTypeString = (value: unknown): string =&gt;</span></span>
<span class="line"><span>  objectToString.call(value)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const toRawType = (value: unknown): string =&gt; {</span></span>
<span class="line"><span>  // extract &quot;RawType&quot; from strings like &quot;[object RawType]&quot;</span></span>
<span class="line"><span>  return toTypeString(value).slice(8, -1)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="mutablehandlers函数" tabindex="-1">mutableHandlers函数 <a class="header-anchor" href="#mutablehandlers函数" aria-label="Permalink to &quot;mutableHandlers函数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export const mutableHandlers: ProxyHandler&lt;object&gt; =</span></span>
<span class="line"><span>  /*#__PURE__*/ new MutableReactiveHandler()</span></span></code></pre></div><h2 id="mutablereactivehandler类" tabindex="-1">MutableReactiveHandler类 <a class="header-anchor" href="#mutablereactivehandler类" aria-label="Permalink to &quot;MutableReactiveHandler类&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 处理响应式的程序</span></span>
<span class="line"><span>class MutableReactiveHandler extends BaseReactiveHandler {</span></span>
<span class="line"><span>  // 默认深层次</span></span>
<span class="line"><span>  constructor(isShallow = false) {</span></span>
<span class="line"><span>    super(false, isShallow)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // set 方法拦截器，用于处理设置属性值的操作</span></span>
<span class="line"><span>  set(</span></span>
<span class="line"><span>    target: object,</span></span>
<span class="line"><span>    key: string | symbol,</span></span>
<span class="line"><span>    value: unknown,</span></span>
<span class="line"><span>    receiver: object,</span></span>
<span class="line"><span>  ): boolean {</span></span>
<span class="line"><span>    // 获取旧的属性值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let oldValue = (target as any)[key]</span></span>
<span class="line"><span>    // 深层次处理</span></span>
<span class="line"><span>    if (!this._isShallow) {</span></span>
<span class="line"><span>      // 旧值是否是只读</span></span>
<span class="line"><span>      const isOldValueReadonly = isReadonly(oldValue)</span></span>
<span class="line"><span>       // 如果新值和旧值都不是浅层代理或只读，获取它们的原始值</span></span>
<span class="line"><span>      if (!isShallow(value) &amp;&amp; !isReadonly(value)) {</span></span>
<span class="line"><span>        oldValue = toRaw(oldValue)</span></span>
<span class="line"><span>        value = toRaw(value)</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      // 如果目标不是数组，且旧值是 Ref 类型，新值不是 Ref 类型</span></span>
<span class="line"><span>      if (!isArray(target) &amp;&amp; isRef(oldValue) &amp;&amp; !isRef(value)) {</span></span>
<span class="line"><span>        // 如果旧值是只读，返回 false</span></span>
<span class="line"><span>        if (isOldValueReadonly) {</span></span>
<span class="line"><span>          return false</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>          // 否则更新旧值的 value 属性</span></span>
<span class="line"><span>          oldValue.value = value</span></span>
<span class="line"><span>          return true</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      // in shallow mode, objects are set as-is regardless of reactive or not</span></span>
<span class="line"><span>      // 在浅层模式下，无论对象是否响应式，直接设置对象</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 检查目标对象中是否已存在该属性</span></span>
<span class="line"><span>    const hadKey =</span></span>
<span class="line"><span>      isArray(target) &amp;&amp; isIntegerKey(key)</span></span>
<span class="line"><span>        ? Number(key) &lt; target.length</span></span>
<span class="line"><span>        : hasOwn(target, key)</span></span>
<span class="line"><span>    // 使用 Reflect 设置属性值</span></span>
<span class="line"><span>    const result = Reflect.set(target, key, value, receiver)</span></span>
<span class="line"><span>    // don&#39;t trigger if target is something up in the prototype chain of original</span></span>
<span class="line"><span>    // 如果目标对象是原始对象的原型链上层对象，不触发响应</span></span>
<span class="line"><span>    if (target === toRaw(receiver)) {</span></span>
<span class="line"><span>      // 如果之前没有该属性，触发 ADD 操作</span></span>
<span class="line"><span>      if (!hadKey) {</span></span>
<span class="line"><span>        trigger(target, TriggerOpTypes.ADD, key, value)</span></span>
<span class="line"><span>      } else if (hasChanged(value, oldValue)) {</span></span>
<span class="line"><span>        // 如果值发生了改变，触发 SET 操作</span></span>
<span class="line"><span>        trigger(target, TriggerOpTypes.SET, key, value, oldValue)</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return result</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // deleteProperty 方法拦截器，用于处理删除属性的操作</span></span>
<span class="line"><span>  deleteProperty(target: object, key: string | symbol): boolean {</span></span>
<span class="line"><span>    // 检查目标对象中是否有该属性</span></span>
<span class="line"><span>    const hadKey = hasOwn(target, key)</span></span>
<span class="line"><span>    // 获取旧的属性值</span></span>
<span class="line"><span>    const oldValue = (target as any)[key]</span></span>
<span class="line"><span>    // 使用 Reflect 删除属性</span></span>
<span class="line"><span>    const result = Reflect.deleteProperty(target, key)</span></span>
<span class="line"><span>    // 如果删除成功且之前有该属性，触发 DELETE 操作</span></span>
<span class="line"><span>    if (result &amp;&amp; hadKey) {</span></span>
<span class="line"><span>      trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return result</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // has 方法拦截器，用于处理 in 操作符</span></span>
<span class="line"><span>  has(target: object, key: string | symbol): boolean {</span></span>
<span class="line"><span>    // 使用 Reflect 检查属性是否存在</span></span>
<span class="line"><span>    const result = Reflect.has(target, key)</span></span>
<span class="line"><span>    // 如果 key 不是 Symbol 或不是内建的 Symbol，进行依赖收集</span></span>
<span class="line"><span>    if (!isSymbol(key) || !builtInSymbols.has(key)) {</span></span>
<span class="line"><span>      track(target, TrackOpTypes.HAS, key)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return result</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // ownKeys 方法拦截器，用于处理 Object.keys 和 for...in 循环</span></span>
<span class="line"><span>  ownKeys(target: object): (string | symbol)[] {</span></span>
<span class="line"><span>    // 进行迭代依赖收集</span></span>
<span class="line"><span>    track(</span></span>
<span class="line"><span>      target,</span></span>
<span class="line"><span>      TrackOpTypes.ITERATE,</span></span>
<span class="line"><span>      isArray(target) ? &#39;length&#39; : ITERATE_KEY,</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    // 使用 Reflect 获取对象的所有属性键</span></span>
<span class="line"><span>    return Reflect.ownKeys(target)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol><li><strong>构造函数</strong><ul><li>构造函数接受一个布尔参数 <code>isShallow</code>，默认值为 <code>false</code>。调用父类 <code>BaseReactiveHandler</code> 的构造函数，并传递 <code>false</code> 作为 <code>isReadonly</code>，以及 <code>isShallow</code> 的值。</li></ul></li><li><strong>set 方法</strong><ul><li>用于拦截对对象属性的设置操作。</li><li>如果不是浅层代理，则处理旧值和新值的原始值。</li><li>对 Ref 类型进行特殊处理。</li><li>使用 <code>Reflect.set</code> 设置属性值。</li><li>根据属性是否存在以及值是否改变，触发相应的响应式操作。</li></ul></li><li><strong>deleteProperty 方法</strong><ul><li>用于拦截对对象属性的删除操作。</li><li>检查属性是否存在，使用 <code>Reflect.deleteProperty</code> 删除属性。</li><li>如果删除成功且属性存在，触发 DELETE 操作。</li></ul></li><li><strong>has 方法</strong><ul><li>用于拦截对对象属性存在性的检查（<code>in</code> 操作符）。</li><li>使用 <code>Reflect.has</code> 检查属性是否存在。</li><li>如果属性不是内建的 Symbol，进行依赖收集。</li></ul></li><li><strong>ownKeys 方法</strong><ul><li>用于拦截对对象所有属性键的获取（如 <code>Object.keys</code> 和 <code>for...in</code> 循环）。</li><li>进行迭代依赖收集。</li><li>使用 <code>Reflect.ownKeys</code> 获取对象的所有属性键。</li></ul></li></ol><p>通过这些拦截器方法，<code>MutableReactiveHandler</code> 实现了对对象属性的读写、删除、存在性检查和键获取的拦截和响应式处理。</p><h2 id="basereactivehandler类" tabindex="-1">BaseReactiveHandler类 <a class="header-anchor" href="#basereactivehandler类" aria-label="Permalink to &quot;BaseReactiveHandler类&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class BaseReactiveHandler implements ProxyHandler&lt;Target&gt; {</span></span>
<span class="line"><span>  constructor(</span></span>
<span class="line"><span>    // 默认不是只读、浅层次的</span></span>
<span class="line"><span>    protected readonly _isReadonly = false,</span></span>
<span class="line"><span>    protected readonly _isShallow = false,</span></span>
<span class="line"><span>  ) {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // get 拦截器，用于拦截对象属性的读取操作</span></span>
<span class="line"><span>  get(target: Target, key: string | symbol, receiver: object) {</span></span>
<span class="line"><span>    const isReadonly = this._isReadonly,</span></span>
<span class="line"><span>      isShallow = this._isShallow</span></span>
<span class="line"><span>    // 处理各种特殊的标志属性</span></span>
<span class="line"><span>    if (key === ReactiveFlags.IS_REACTIVE) {</span></span>
<span class="line"><span>      return !isReadonly</span></span>
<span class="line"><span>    } else if (key === ReactiveFlags.IS_READONLY) {</span></span>
<span class="line"><span>      return isReadonly</span></span>
<span class="line"><span>    } else if (key === ReactiveFlags.IS_SHALLOW) {</span></span>
<span class="line"><span>      return isShallow</span></span>
<span class="line"><span>    } else if (key === ReactiveFlags.RAW) {</span></span>
<span class="line"><span>      if (</span></span>
<span class="line"><span>        receiver ===</span></span>
<span class="line"><span>          (isReadonly</span></span>
<span class="line"><span>            ? isShallow</span></span>
<span class="line"><span>              ? shallowReadonlyMap</span></span>
<span class="line"><span>              : readonlyMap</span></span>
<span class="line"><span>            : isShallow</span></span>
<span class="line"><span>              ? shallowReactiveMap</span></span>
<span class="line"><span>              : reactiveMap</span></span>
<span class="line"><span>          ).get(target) ||</span></span>
<span class="line"><span>        // receiver is not the reactive proxy, but has the same prototype</span></span>
<span class="line"><span>        // 接收器不是被动代理，而是具有相同的原型</span></span>
<span class="line"><span>        // this means the reciever is a user proxy of the reactive proxy</span></span>
<span class="line"><span>        // 这意味着接收器是一个响应式代理的用户代理</span></span>
<span class="line"><span>        Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)</span></span>
<span class="line"><span>      ) {</span></span>
<span class="line"><span>        return target</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      // early return undefined</span></span>
<span class="line"><span>      // 返回undifined</span></span>
<span class="line"><span>      return</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 如果源数据是数组</span></span>
<span class="line"><span>    const targetIsArray = isArray(target)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (!isReadonly) {</span></span>
<span class="line"><span>      // 是原生属性</span></span>
<span class="line"><span>      if (targetIsArray &amp;&amp; hasOwn(arrayInstrumentations, key)) {</span></span>
<span class="line"><span>        // 添加依赖追踪和调度更新</span></span>
<span class="line"><span>        return Reflect.get(arrayInstrumentations, key, receiver)</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      // 获取原生属性</span></span>
<span class="line"><span>      if (key === &#39;hasOwnProperty&#39;) {</span></span>
<span class="line"><span>        return hasOwnProperty</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 通过 Reflect 获取目标对象的属性值</span></span>
<span class="line"><span>    const res = Reflect.get(target, key, receiver)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果 key 是 Symbol 类型且是内置 Symbol 或者是不可追踪的 key，直接返回</span></span>
<span class="line"><span>    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {</span></span>
<span class="line"><span>      return res</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果不是只读的，进行依赖追踪</span></span>
<span class="line"><span>    if (!isReadonly) {</span></span>
<span class="line"><span>      track(target, TrackOpTypes.GET, key)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果是浅层代理，直接返回属性值</span></span>
<span class="line"><span>    if (isShallow) {</span></span>
<span class="line"><span>      return res</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果属性值是 ref 类型，进行解包，数组且 key 是整数时跳过解包</span></span>
<span class="line"><span>    if (isRef(res)) {</span></span>
<span class="line"><span>      // ref unwrapping - skip unwrap for Array + integer key.</span></span>
<span class="line"><span>      return targetIsArray &amp;&amp; isIntegerKey(key) ? res : res.value</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果属性值是对象，将其转换为代理对象，避免循环依赖问题</span></span>
<span class="line"><span>    if (isObject(res)) {</span></span>
<span class="line"><span>      // Convert returned value into a proxy as well. we do the isObject check</span></span>
<span class="line"><span>      // here to avoid invalid value warning. Also need to lazy access readonly</span></span>
<span class="line"><span>      // and reactive here to avoid circular dependency.</span></span>
<span class="line"><span>      return isReadonly ? readonly(res) : reactive(res)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return res</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol><li><strong>构造函数</strong><ul><li>接收两个可选参数 <code>isReadonly</code> 和 <code>isShallow</code>，默认值为 <code>false</code>。</li><li><code>isReadonly</code>：标识对象是否为只读。</li><li><code>isShallow</code>：标识对象是否为浅层代理。</li></ul></li><li><strong><code>get</code> 拦截器</strong><ul><li>处理对目标对象属性的读取操作。</li><li>根据不同的 <code>ReactiveFlags</code> 返回相应的值，判断对象是否为响应式、只读或浅层代理。</li><li>如果 <code>key</code> 是 <code>ReactiveFlags.RAW</code>，返回目标对象的原始值。</li><li>如果目标对象是数组且 <code>key</code> 存在于 <code>arrayInstrumentations</code> 中，返回经过处理的数组方法。</li><li>如果 <code>key</code> 是 <code>hasOwnProperty</code>，返回原生的 <code>hasOwnProperty</code> 方法。</li><li>使用 <code>Reflect.get</code> 获取目标对象的属性值。</li><li>如果 <code>key</code> 是 Symbol 类型且是内置 Symbol 或者是不可追踪的 <code>key</code>，直接返回属性值。</li><li>如果不是只读的，进行依赖追踪。</li><li>如果是浅层代理，直接返回属性值。</li><li>如果属性值是 <code>ref</code> 类型，进行解包处理，数组且 <code>key</code> 是整数时跳过解包。</li><li>如果属性值是对象，将其转换为响应式或只读代理对象。</li></ul></li></ol><p>该类主要用于实现对目标对象属性的读取操作，并根据目标对象的不同类型（普通对象、数组、ref 等）和不同的标志（响应式、只读、浅层代理）进行相应的处理和代理。</p><h2 id="mutablecollectionhandlers函数" tabindex="-1">mutableCollectionHandlers函数 <a class="header-anchor" href="#mutablecollectionhandlers函数" aria-label="Permalink to &quot;mutableCollectionHandlers函数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export const mutableCollectionHandlers: ProxyHandler&lt;CollectionTypes&gt; = {</span></span>
<span class="line"><span>  get: /*#__PURE__*/ createInstrumentationGetter(false, false),</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,32),i=[l];function t(c,r,o,d,g,u){return n(),a("div",null,i)}const v=s(e,[["render",t]]);export{h as __pageData,v as default};
