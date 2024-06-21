# 数据类型

```
export enum ReactiveFlags {
  SKIP = '__v_skip', // 跳过，不应被转换为响应式对象
  IS_REACTIVE = '__v_isReactive', // 是否响应式
  IS_READONLY = '__v_isReadonly', // 是否只读
  IS_SHALLOW = '__v_isShallow', // 是否浅层
  RAW = '__v_raw',  // 源数据
}

export interface Target {
  [ReactiveFlags.SKIP]?: boolean // 是否跳过？
  [ReactiveFlags.IS_REACTIVE]?: boolean // 是否响应式
  [ReactiveFlags.IS_READONLY]?: boolean //  是否只读
  [ReactiveFlags.IS_SHALLOW]?: boolean //  是否浅层
  [ReactiveFlags.RAW]?: any //  对象的原始数据
}

// 存储响应式对象
export const reactiveMap = new WeakMap<Target, any>()

// 数据类型
enum TargetType {
  INVALID = 0,  // 对象可跳过、不可扩展
  COMMON = 1, // 对象和数组
  COLLECTION = 2, // map、set、weakmap、weakset
}

function targetTypeMap(rawType: string) {
  switch (rawType) {
    case 'Object':
    case 'Array':
      return TargetType.COMMON
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return TargetType.COLLECTION
    default:
      return TargetType.INVALID
  }
}
```

# 1、reactive

```
export function reactive<T extends object>(target: T): Reactive<T>
```

## Reactive类型

```
export type Reactive<T> = UnwrapNestedRefs<T> & (T extends readonly any[] ? ReactiveMarker : {})
```

# 2、reactive重载

```
export function reactive(target: object) {
  // 如果尝试观察一个只读代理，就返回只读版本
  if (isReadonly(target)) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap,
  )
}
```

## isReadonly函数

判断传入的值是否是一个只读对象，只读对象属性可以更改，但不能通过传递的对象直接分配

```
export function isReadonly(value: unknown): boolean {
  return !!(value && (value as Target)[ReactiveFlags.IS_READONLY])
}
```

## createReactiveObject函数

创建一个响应式对象

```
function createReactiveObject(
  target: Target, // 源数据
  isReadonly: boolean, // 是否是只读对象
  baseHandlers: ProxyHandler<any>, // 对象和数组的代理方法
  collectionHandlers: ProxyHandler<any>, // map、set、weakmap、weakset代理方法
  proxyMap: WeakMap<Target, any>,
) {
  // 如果不是对象，且是开发环境，就警告
  if (!isObject(target)) {
    if (__DEV__) {
      warn(
        `value cannot be made ${isReadonly ? 'readonly' : 'reactive'}: ${String(
          target,
        )}`,
      )
    }
    return target
  }
  // 如果本来就是响应式对象，且是可读的，直接返回
  if (
    target[ReactiveFlags.RAW] &&
    !(isReadonly && target[ReactiveFlags.IS_REACTIVE])
  ) {
    return target
  }
  // 源数据已经有响应的代理
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  // 只能观察特定的值类型
  // 如果是targetType是0，表示对象可跳过、不可扩展，则直接返回原数据，这表示该数据不应被转换为响应式数据
  const targetType = getTargetType(target)
  if (targetType === TargetType.INVALID) {
    return target
  }
  // 核心，使用proxy，如果类型为2，就使用collectionHandlers，否则使用baseHandlers（也就是数据类型为数组和对象）
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers,
  )
  proxyMap.set(target, proxy)
  return proxy
}
```

## getTargetType函数

判断数据类型，如果对象可跳过、不可扩展，就返回0，否则就根据数据类型返回

```
function getTargetType(value: Target) {
  return value[ReactiveFlags.SKIP] || !Object.isExtensible(value)
    ? TargetType.INVALID
    : targetTypeMap(toRawType(value))
}
```

## toRawType函数

获取数据类型

```
export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string =>
  objectToString.call(value)

export const toRawType = (value: unknown): string => {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(value).slice(8, -1)
}
```

## mutableHandlers函数

```
export const mutableHandlers: ProxyHandler<object> =
  /*#__PURE__*/ new MutableReactiveHandler()
```

## MutableReactiveHandler类

```
// 处理响应式的程序
class MutableReactiveHandler extends BaseReactiveHandler {
  // 默认深层次
  constructor(isShallow = false) {
    super(false, isShallow)
  }

  // set 方法拦截器，用于处理设置属性值的操作
  set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object,
  ): boolean {
    // 获取旧的属性值

    let oldValue = (target as any)[key]
    // 深层次处理
    if (!this._isShallow) {
      // 旧值是否是只读
      const isOldValueReadonly = isReadonly(oldValue)
       // 如果新值和旧值都不是浅层代理或只读，获取它们的原始值
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue)
        value = toRaw(value)
      }
      // 如果目标不是数组，且旧值是 Ref 类型，新值不是 Ref 类型
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        // 如果旧值是只读，返回 false
        if (isOldValueReadonly) {
          return false
        } else {
          // 否则更新旧值的 value 属性
          oldValue.value = value
          return true
        }
      }
    } else {
      // in shallow mode, objects are set as-is regardless of reactive or not
      // 在浅层模式下，无论对象是否响应式，直接设置对象
    }

    // 检查目标对象中是否已存在该属性
    const hadKey =
      isArray(target) && isIntegerKey(key)
        ? Number(key) < target.length
        : hasOwn(target, key)
    // 使用 Reflect 设置属性值
    const result = Reflect.set(target, key, value, receiver)
    // don't trigger if target is something up in the prototype chain of original
    // 如果目标对象是原始对象的原型链上层对象，不触发响应
    if (target === toRaw(receiver)) {
      // 如果之前没有该属性，触发 ADD 操作
      if (!hadKey) {
        trigger(target, TriggerOpTypes.ADD, key, value)
      } else if (hasChanged(value, oldValue)) {
        // 如果值发生了改变，触发 SET 操作
        trigger(target, TriggerOpTypes.SET, key, value, oldValue)
      }
    }
    return result
  }

  // deleteProperty 方法拦截器，用于处理删除属性的操作
  deleteProperty(target: object, key: string | symbol): boolean {
    // 检查目标对象中是否有该属性
    const hadKey = hasOwn(target, key)
    // 获取旧的属性值
    const oldValue = (target as any)[key]
    // 使用 Reflect 删除属性
    const result = Reflect.deleteProperty(target, key)
    // 如果删除成功且之前有该属性，触发 DELETE 操作
    if (result && hadKey) {
      trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue)
    }
    return result
  }

  // has 方法拦截器，用于处理 in 操作符
  has(target: object, key: string | symbol): boolean {
    // 使用 Reflect 检查属性是否存在
    const result = Reflect.has(target, key)
    // 如果 key 不是 Symbol 或不是内建的 Symbol，进行依赖收集
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, TrackOpTypes.HAS, key)
    }
    return result
  }

  // ownKeys 方法拦截器，用于处理 Object.keys 和 for...in 循环
  ownKeys(target: object): (string | symbol)[] {
    // 进行迭代依赖收集
    track(
      target,
      TrackOpTypes.ITERATE,
      isArray(target) ? 'length' : ITERATE_KEY,
    )
    // 使用 Reflect 获取对象的所有属性键
    return Reflect.ownKeys(target)
  }
}
```

1. **构造函数**
   - 构造函数接受一个布尔参数 `isShallow`，默认值为 `false`。调用父类 `BaseReactiveHandler` 的构造函数，并传递 `false` 作为 `isReadonly`，以及 `isShallow` 的值。
2. **set 方法**
   - 用于拦截对对象属性的设置操作。
   - 如果不是浅层代理，则处理旧值和新值的原始值。
   - 对 Ref 类型进行特殊处理。
   - 使用 `Reflect.set` 设置属性值。
   - 根据属性是否存在以及值是否改变，触发相应的响应式操作。
3. **deleteProperty 方法**
   - 用于拦截对对象属性的删除操作。
   - 检查属性是否存在，使用 `Reflect.deleteProperty` 删除属性。
   - 如果删除成功且属性存在，触发 DELETE 操作。
4. **has 方法**
   - 用于拦截对对象属性存在性的检查（`in` 操作符）。
   - 使用 `Reflect.has` 检查属性是否存在。
   - 如果属性不是内建的 Symbol，进行依赖收集。
5. **ownKeys 方法**
   - 用于拦截对对象所有属性键的获取（如 `Object.keys` 和 `for...in` 循环）。
   - 进行迭代依赖收集。
   - 使用 `Reflect.ownKeys` 获取对象的所有属性键。

通过这些拦截器方法，`MutableReactiveHandler` 实现了对对象属性的读写、删除、存在性检查和键获取的拦截和响应式处理。

## BaseReactiveHandler类

```
class BaseReactiveHandler implements ProxyHandler<Target> {
  constructor(
    // 默认不是只读、浅层次的
    protected readonly _isReadonly = false,
    protected readonly _isShallow = false,
  ) {}

  // get 拦截器，用于拦截对象属性的读取操作
  get(target: Target, key: string | symbol, receiver: object) {
    const isReadonly = this._isReadonly,
      isShallow = this._isShallow
    // 处理各种特殊的标志属性
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    } else if (key === ReactiveFlags.IS_SHALLOW) {
      return isShallow
    } else if (key === ReactiveFlags.RAW) {
      if (
        receiver ===
          (isReadonly
            ? isShallow
              ? shallowReadonlyMap
              : readonlyMap
            : isShallow
              ? shallowReactiveMap
              : reactiveMap
          ).get(target) ||
        // receiver is not the reactive proxy, but has the same prototype
        // 接收器不是被动代理，而是具有相同的原型
        // this means the reciever is a user proxy of the reactive proxy
        // 这意味着接收器是一个响应式代理的用户代理
        Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)
      ) {
        return target
      }
      // early return undefined
      // 返回undifined
      return
    }
    // 如果源数据是数组
    const targetIsArray = isArray(target)

    if (!isReadonly) {
      // 是原生属性
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        // 添加依赖追踪和调度更新
        return Reflect.get(arrayInstrumentations, key, receiver)
      }
      // 获取原生属性
      if (key === 'hasOwnProperty') {
        return hasOwnProperty
      }
    }

    // 通过 Reflect 获取目标对象的属性值
    const res = Reflect.get(target, key, receiver)

    // 如果 key 是 Symbol 类型且是内置 Symbol 或者是不可追踪的 key，直接返回
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res
    }

    // 如果不是只读的，进行依赖追踪
    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key)
    }

    // 如果是浅层代理，直接返回属性值
    if (isShallow) {
      return res
    }

    // 如果属性值是 ref 类型，进行解包，数组且 key 是整数时跳过解包
    if (isRef(res)) {
      // ref unwrapping - skip unwrap for Array + integer key.
      return targetIsArray && isIntegerKey(key) ? res : res.value
    }

    // 如果属性值是对象，将其转换为代理对象，避免循环依赖问题
    if (isObject(res)) {
      // Convert returned value into a proxy as well. we do the isObject check
      // here to avoid invalid value warning. Also need to lazy access readonly
      // and reactive here to avoid circular dependency.
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}
```

1. **构造函数**
   - 接收两个可选参数 `isReadonly` 和 `isShallow`，默认值为 `false`。
   - `isReadonly`：标识对象是否为只读。
   - `isShallow`：标识对象是否为浅层代理。
2. **`get` 拦截器**
   - 处理对目标对象属性的读取操作。
   - 根据不同的 `ReactiveFlags` 返回相应的值，判断对象是否为响应式、只读或浅层代理。
   - 如果 `key` 是 `ReactiveFlags.RAW`，返回目标对象的原始值。
   - 如果目标对象是数组且 `key` 存在于 `arrayInstrumentations` 中，返回经过处理的数组方法。
   - 如果 `key` 是 `hasOwnProperty`，返回原生的 `hasOwnProperty` 方法。
   - 使用 `Reflect.get` 获取目标对象的属性值。
   - 如果 `key` 是 Symbol 类型且是内置 Symbol 或者是不可追踪的 `key`，直接返回属性值。
   - 如果不是只读的，进行依赖追踪。
   - 如果是浅层代理，直接返回属性值。
   - 如果属性值是 `ref` 类型，进行解包处理，数组且 `key` 是整数时跳过解包。
   - 如果属性值是对象，将其转换为响应式或只读代理对象。

该类主要用于实现对目标对象属性的读取操作，并根据目标对象的不同类型（普通对象、数组、ref 等）和不同的标志（响应式、只读、浅层代理）进行相应的处理和代理。

## mutableCollectionHandlers函数

```
export const mutableCollectionHandlers: ProxyHandler<CollectionTypes> = {
  get: /*#__PURE__*/ createInstrumentationGetter(false, false),
}
```

