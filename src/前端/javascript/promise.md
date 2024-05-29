## 1、实现promise
```js
class MyPromise {
  constructor(executor) {
    this._status = 'PENDING';
    this._value = undefined;
    this._callbacks = [];

    const resolve = (value) => {
      if (this._status === 'PENDING') {
        this._status = 'FULFILLED';
        this._value = value;
        this._executeCallbacks();
      }
    };

    const reject = (reason) => {
      if (this._status === 'PENDING') {
        this._status = 'REJECTED';
        this._value = reason;
        this._executeCallbacks();
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const callback = () => {
        try {
          if (this._status === 'FULFILLED') {
            const result = onFulfilled ? onFulfilled(this._value) : this._value;
            resolve(result);
          } else if (this._status === 'REJECTED') {
            const result = onRejected ? onRejected(this._value) : this._value;
            reject(result);
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this._status === 'PENDING') {
        this._callbacks.push(callback);
      } else {
        callback();
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  _executeCallbacks() {
    this._callbacks.forEach(callback => callback());
    this._callbacks = [];
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}

// 测试用例1：基本功能测试
const promise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('Resolved value');
  }, 1000);
});

promise1.then((result) => {
  console.log('Resolved:', result); // 输出: "Resolved: Resolved value"
});

// 测试用例2：链式调用测试
const promise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('Resolved value 2');
  }, 2000);
});

promise2
  .then((result) => {
    console.log('Step 1:', result); // 输出: "Step 1: Resolved value 2"
    return 'Step 1 result';
  })
  .then((result) => {
    console.log('Step 2:', result); // 输出: "Step 2: Step 1 result"
  });

// 测试用例3：错误处理测试
const promise3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Something went wrong'));
  }, 3000);
});

promise3
  .then((result) => {
    console.log('Resolved:', result);
  })
  .catch((error) => {
    console.error('Error:', error.message); // 输出: "Error: Something went wrong"
  });
```
## 2、实现promise
```js
const PROMISE_PENDING_STATE = "pending";
const PROMISE_FULFILLED_STATE = "fulfilled";
const PROMISE_REJECTED_STATE = "rejected";

class Promise {
  constructor(execute) {
    this.PromiseState = PROMISE_PENDING_STATE;
    this.PromiseResult = undefined;
    this.callbacks = [];

    try {
      execute(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(result) {
    if (this.PromiseState === PROMISE_PENDING_STATE) {
      this.PromiseState = PROMISE_FULFILLED_STATE;
      this.PromiseResult = result;

      setTimeout(() => {
        this.callbacks.forEach((cb) => {
          cb.onResolved(this.PromiseResult);
        });
      });
    }
  }

  reject(reason) {
    if (this.PromiseState === PROMISE_PENDING_STATE) {
      this.PromiseState = PROMISE_REJECTED_STATE;
      this.PromiseResult = reason;

      setTimeout(() => {
        this.callbacks.forEach((cb) => {
          cb.onRejected(this.PromiseResult);
        });
      });
    }
  }

  then(onResolved, onRejected) {
    if (typeof onResolved !== "function") {
      onResolved = (result) => {
        return result;
      };
    }
    if (typeof onRejected !== "function") {
      onRejected = (reason) => {
        throw reason;
      };
    }
    return new Promise((resolve, reject) => {
      const callback = (fn) => {
        try {
          const result = fn(this.PromiseResult);
          if (result instanceof Promise) {
            result.then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      // 成功
      if (this.PromiseState === PROMISE_FULFILLED_STATE) {
        setTimeout(() => {
          callback(onResolved);
        });
      }

      // 失败
      if (this.PromiseState === PROMISE_REJECTED_STATE) {
        setTimeout(() => {
          callback(onRejected);
        });
      }

      // 等待中
      if (this.PromiseState === PROMISE_PENDING_STATE) {
        this.callbacks.push({
          onResolved: () => {
            callback(onResolved);
          },
          onRejected: () => {
            callback(onRejected);
          },
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(result) {
    return new Promise((resolve, reject) => {
      if (result instanceof Promise) {
        result.then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        resolve(result);
      }
    });
  }

  static reject(result) {
    return new Promise((resolve, reject) => {
      reject(result);
    });
  }

  static all(promises) {
    let result = [];
    let count = 0;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (res) => {
            result[i] = res;
            count++;
            if (count === promises.length) {
              resolve(result);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (res) => {
            resolve(res);
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }
}
```
## 3、实现promise
```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function resolvePromise(promise2, value, resolve, reject) {
  // 如果 then 方法返回的是自身 Promise 对象，返回错误信息
  if (value === promise2) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }

  if (typeof value === "object" || typeof value === "function") {
    if (value === null) {
      // 如果返回值是 null，
      // 直接调用 resolve 函数，promise2 的状态变为 fulfilled，
      // 返回值由下一个 then 方法的第一个回调函数接收。
      return resolve(value);
    }
    /**
     * called 变量控制 thanable 对象只调用 resolve 或 reject 函数一次
     */
    let called = false;
    try {
      /**
       * 将 then 函数取出来再执行的原因是：
       * 防止 thenable 对象被开发人员设置了一层代理，从而执行代理逻辑
       */
      const then = value.then;
      if (typeof then === "function") {
        /**
         * 为了让 thenable 对象中的 then 方法稳定异步执行
         */
        queueMicrotask(() => {
          then.call(
            value,
            (value2) => {
              if (called) return;
              called = true;
              // value2 可能是 Promise 对象，所以需要调用 resolvePromise 函数来进行处理
              resolvePromise(promise2, value2, resolve, reject);
            },
            (err) => {
              if (called) return;
              called = true;
              reject(err);
            }
          );
        });
      } else {
        // 如果 then 不是函数，同 null 情况一样的处理逻辑。
        // 直接调用 resolve 函数，promise2 的状态变为 fulfilled。
        resolve(value);
      }
    } catch (error) {
      // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略。
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // 如果返回值是其他对象或者原始数据类型值，
    // 直接调用 resolve 函数，promise2 的状态变为 fulfilled。
    resolve(value);
  }
}
class SelfPromise {
  // 储存状态，初始值是 pending
  status = PENDING;
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;

  // 保存所有的 onFulfilled 回调函数
  onFulfilledCallbacks = [];
  // 保存所有的 onRejected 回调函数
  onRejectedCallbacks = [];
  constructor(executor) {
    try {
      // 将 resolve 和 reject 传给 new Promsie 的回调函数
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  // 箭头函数可以使函数里面的 this 始终指向 Promise 实例对象
  resolve = (value) => {
    // 只有状态是 pending 的情况下，才改变为 fulfilled 状态
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      // 执行所有的 onFulfilled 回调函数
      this.onFulfilledCallbacks.forEach((fn) => fn(value));
    }
  };

  reject = (reason) => {
    // 只有状态是 pending 的情况下，才改变为 rejected 状态
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      // 执行 onRejected 回调函数
      this.onRejectedCallbacks.forEach((fn) => fn(reason));
    }
  };

  then(onFulfilled, onRejected) {
    console.log('onFulfilled', onFulfilled)
    console.log('onRejected', onRejected)
    const promise2 = new SelfPromise((resolve, reject) => {
      // onFulfilled 回调函数的默认值，then 方法值传递的原理
      onFulfilled =
        typeof onFulfilled === "function"
          ? onFulfilled
          : (value) => value;
      // onRejected 回调函数的默认值，then 方法值传递的原理
      onRejected =
        typeof onRejected === "function"
          ? onRejected
          : (reason) => {
            throw reason;
          };

      // 异步执行，等待 promise2 的完成初始化
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            if (
              this.value &&
              typeof this.value.then === "function"
            ) {
              // 如果 resolve 函数传入的值是 Promise 对象或 thenable 对象
              // 需要在其 then 方法的回调函数中调用 onFulfilled 和 onRejected
              this.value.then(
                (value) => {
                  const v = onFulfilled(value);
                  resolvePromise(
                    promise2,
                    value,
                    resolve,
                    reject
                  );
                },
                (error) => {
                  const v = onRejected(error);
                  resolvePromise(
                    promise2,
                    error,
                    resolve,
                    reject
                  );
                }
              );
            } else {
              // 获取上一个 then 方法的 fulfilled 回调函数的返回值
              const v = onFulfilled(this.value);
              // 根据返回值，改变 promise2 的状态，并建立与下一个 then 方法的关系
              resolvePromise(promise2, v, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        });
      };

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            // 获取上一个 then 方法的 rejected 回调函数的返回值
            const v = onRejected(this.reason);
            //根据返回值，改变 promise2 的状态，并建立与下一个 then 方法的关系
            resolvePromise(promise2, v, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      console.log('this.status', this.status)
      if (this.status === FULFILLED) {
        // 异步执行 fulfilled 状态的回调函数
        fulfilledMicrotask();
      } else if (this.status === REJECTED) {
        // 异步执行 rejected 状态的回调函数
        rejectedMicrotask();
      } else {
        // pending 状态下保存所有的异步回调函数
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });
    // 返回 Promise 对象
    return promise2;
  }
  catch(callback) {
    return this.then(null, callback);
  }
  finally(callback) {
    return this.then(
      // 值穿透以及 callback() 返回值不会传递给后面 then 方法的原理
      (value) => {
        callback();
        return SelfPromise.resolve(value);
      },
      (reason) => {
        callback();
        return SelfPromise.reject(reason);
      }
    );
  }

  static resolve(param) {
    // 如果参数是 Promise 实例对象，原封不动地放回这个对象
    if (param instanceof SelfPromise) {
      return param;
    }

    return new SelfPromise((resolve, reject) => {
      // 如果参数是 thenable 对象，放入微任务队列中执行
      if (param && typeof param.then === "function") {
        queueMicrotask(() => {
          param.then(resolve, reject);
        });
      } else {
        // 其他情况直接调用 resolve 函数，返回 fulfilled 状态的 Promise 对象
        resolve(param);
      }
    });
  }

  static reject(param) {
    return new SelfPromise((resolve, reject) => {
      reject(param);
    });
  }

  static all(promiseIterator) {
    return new SelfPromise((resolve, reject) => {
      // 判断参数是否是具有 `Iterator` 接口的数据
      if (
        promiseIterator &&
        typeof promiseIterator[Symbol.iterator] === "function"
      ) {
        const res = []; // 结果数组
        let countRes = 0; // 记录数组中结果的个数
        const len = promiseIterator.length || promiseIterator.size;

        // 保存对应索引的结果
        function saveRes(value, index) {
          res[index] = value;
          if (++countRes === len) {
            resolve(res);
          }
        }
        // 返回迭代器对象
        const iterator = promiseIterator[Symbol.iterator]();
        // 遍历具有迭代器的数据结构，并且记录索引值
        for (
          let i = 0, iteratorRes = iterator.next();
          iteratorRes.done !== true;
          i++, iteratorRes = iterator.next()
        ) {
          SelfPromise.resolve(iteratorRes.value).then((value) => {
            // 在对应索引位置上保存结果
            saveRes(value, i);
          }, reject);
        }
      } else {
        reject(new TypeError("Arguments is not iterable"));
      }
    });
  }

  static race(promiseIterator) {
    return new SelfPromise((resolve, reject) => {
      if (
        promiseIterator &&
        typeof promiseIterator[Symbol.iterator] === "function"
      ) {
        // 返回迭代器对象
        const iterator = promiseIterator[Symbol.iterator]();
        // 遍历具有迭代器的数据结构
        for (
          let iteratorRes = iterator.next();
          iteratorRes.done !== true;
          iteratorRes = iterator.next()
        ) {
          SelfPromise.resolve(iteratorRes.value).then(
            resolve,
            reject
          );
        }
      } else {
        reject(new TypeError("Arguments is not iterable"));
      }
    });
  }
  // 所有 Promise 对象的状态都发生了改变，allSettled 返回的 Promise 对象状态变成 fulfilled
  static allSettled(promiseIterator) {
    return new SelfPromise((resolve, reject) => {
      if (
        promiseIterator &&
        typeof promiseIterator[Symbol.iterator] === "function"
      ) {
        const res = [];
        let countRes = 0;
        const len = promiseIterator.length || promiseIterator.size;

        function saveRes(value, index) {
          res[index] = value;
          if (++countRes === len) {
            resolve(res);
          }
        }
        // 返回迭代器对象
        const iterator = promiseIterator[Symbol.iterator]();
        // 遍历具有迭代器的数据结构，并且记录索引值
        for (
          let i = 0, iteratorRes = iterator.next();
          iteratorRes.done !== true;
          i++, iteratorRes = iterator.next()
        ) {
          SelfPromise.resolve(iteratorRes.value)
            .then((value) => {
              saveRes({ status: "fullfilled", value }, i);
            })
            .catch((reason) => {
              saveRes({ status: "rejected", reason }, i);
            });
        }
      } else {
        reject(new TypeError("Arguments is not iterable"));
      }
    });
  }
  // 如果有一个 Promise 对象的状态是 fulfilled，那么 any 就变成 fulfilled 状态
  // 如果所有 Promise 对象的状态是 rejected，那么 any 就变成 rejected 状态
  static any(promiseIterator) {
    return new SelfPromise((resolve, reject) => {
      if (
        promiseIterator &&
        typeof promiseIterator[Symbol.iterator] === "function"
      ) {
        const res = [];
        let countRes = 0;
        const len = promiseIterator.length || promiseIterator.size;

        function saveRes(reason, index) {
          res[index] = reason;
          if (++countRes === len) {
            const err = new AggregateError(
              res,
              "All promises were rejected"
            );
            reject(err);
          }
        }
        // 返回迭代器对象
        const iterator = promiseIterator[Symbol.iterator]();
        // 遍历具有迭代器的数据结构，并且记录索引值
        for (
          let i = 0, iteratorRes = iterator.next();
          iteratorRes.done !== true;
          i++, iteratorRes = iterator.next()
        ) {
          SelfPromise.resolve(iteratorRes.value).then(
            resolve,
            (reason) => {
              // 在对应索引位置上保存结果
              saveRes(reason, i);
            }
          );
        }
      } else {
        reject(new TypeError("Arguments is not iterable"));
      }
    });
  }
}
```
## 5、顺序执行promise数组
```js
// 模拟一些异步任务函数
const asyncTask1 = () => {
  return new Promise(resolve => {
      setTimeout(() => {
          console.log('Task 1 completed');
          resolve('Result from Task 1');
      }, 1000);
  });
};

const asyncTask2 = () => {
  return new Promise(resolve => {
      setTimeout(() => {
          console.log('Task 2 completed');
          resolve('Result from Task 2');
      }, 3000);
  });
};

const asyncTask3 = () => {
  return new Promise(resolve => {
      setTimeout(() => {
          console.log('Task 3 completed');
          resolve('Result from Task 3');
      }, 1500);
  });
};

// 一组异步任务数组
const tasks = [asyncTask1, asyncTask2, asyncTask3];

// reduce方法
const sequencePromises = promises =>
  promises.reduce(
      (prev, next) => prev.then(() => next()),
      Promise.resolve()
  );

// 使用 sequencePromises 函数按顺序执行异步任务数组中的任务
// sequencePromises(tasks)
//     .then(() => {
//         console.log('All tasks completed');
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// 使用for await of
const executeTasks = async () => {
  const results = [];
  for await (const task of tasks) {
      const result = await task();
      results.push(result);
  }
  return results;
};

executeTasks()
  .then(results => {
      console.log('All tasks completed');
      console.log('Results:', results);
  })
  .catch(error => {
      console.error('Error:', error);
  });
```
## 6、promise间隔输出
```js
// 使用promise实现每隔一秒输出1,2,3

// 间隔一秒成功
function print () {
  return new Promise(
    (resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    }
  )
}
function autoPrint () {
  [1, 2, 3].reduce((preP, curVal, curIndex) => {
    return preP.then(() => {
      console.log(curVal)
      return print().then(() => {
        if (curIndex === 2) autoPrint()
      })
    })
  }, Promise.resolve())
}

autoPrint()
```
## 7、promise超时取消
```js
const promiseWithTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('Timeout after ' + ms + 'ms')), ms)
    )
  ]);
// 模拟一个异步任务，延迟指定的时间后 resolve
const asyncTask = (delay) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('Task completed after ' + delay + 'ms');
      }, delay);
    });
  };
  
// 使用 promiseWithTimeout 包装异步任务，并设置超时时间为 2000ms
const wrappedTask = promiseWithTimeout(asyncTask(2000), 2000);

// 执行包装后的异步任务
wrappedTask
  .then(result => {
    console.log(result); // 如果任务在超时时间内完成，则输出结果
  })
  .catch(error => {
    console.error(error.message); // 如果任务超时，则输出超时错误信息
  });
```

## 8、promise的重试逻辑
```js
const retryPromise = (promiseFn, maxAttempts, interval) => {
  return new Promise((resolve, reject) => {
    const attempt = attemptNumber => {
      if (attemptNumber === maxAttempts) {
        reject(new Error('Max attempts reached'));
        return;
      }
      promiseFn().then(resolve).catch(() => {
        setTimeout(() => {
          attempt(attemptNumber + 1);
        }, interval);
      });
    };
    attempt(0);
  });
};

// 模拟一个可能会失败的异步任务函数
const asyncTask = () => {
  return new Promise((resolve, reject) => {
    const success = Math.random() < 0.2; // 80% 的概率成功
    setTimeout(() => {
      if (success) {
          console.log('成功')
        resolve('Task completed successfully');
      } else {
          console.log('失败')
        reject(new Error('Task failed'));
      }
    }, 1000);
  });
};

// 使用 retryPromise 函数重试异步任务
retryPromise(asyncTask, 3, 1000) // 最多重试 3 次，间隔 1000ms
  .then(result => {
    console.log('最后结果', result); // 如果任务成功，则输出结果
  })
  .catch(error => {
    console.error('Error:', error.message); // 如果任务失败且超过重试次数，则输出错误信息
  });
```

## 9、promise只执行1次
```js
const onceResolvedPromise = executor => {
  let isResolved = false;
  return new Promise((resolve, reject) => {
    executor(
      value => {
        if (!isResolved) {
          isResolved = true;
          resolve(value);
        }
      },
      reject
    );
  });
};

const executor = (resolve, reject) => {
  setTimeout(() => {
    resolve('Resolved value');
  }, 1000);
};

const promise = onceResolvedPromise(executor);

promise.then(value => {
  console.log('Resolved:', value); // 输出 'Resolved value'
});

// 下面的 resolve 调用不会生效，因为 Promise 已经被解决过一次了
setTimeout(() => {
  promise.then(value => {
    console.log('Resolved again:', value); // 会输出
  });
}, 5000);

/**你可能遇到了一个常见的 JavaScript 问题，即在异步操作中，Promise 的状态已经被解决后，即使再次调用 .then()，
 * 回调函数也会被执行。这是因为 Promise 的状态一旦改变（无论是解决还是拒绝），它的状态就会被锁定，并且不会再改变。
 * 所以当你的 Promise 在 1 秒后被解决为 'Resolved value'，它的状态就已经确定了。在 JavaScript 中，Promise 是一次性的，
 * 一旦状态被解决，它就不会再变化。所以即使你在之后的代码中再次调用then()，传递的回调函数也会立即执行，
 * 因为 Promise 已经解决了，并且会将解决的值传递给回调函数。如果你有一个已经被解决的 Promise，再次调用 .then()，
 * 传递的回调函数会立即执行，而不会等待任何异步操作。所以，当你调用 promise.then() 时，即使再次调用也会输出回调函数。
 * 这是因为 Promise 的状态已经确定了，并且回调函数会立即执行。*/
```