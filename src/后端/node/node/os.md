## os

### 获取CPU的线程以及详细信息
```js
const os = require('node:os')
os.cpus()
```
```js
[
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 252020,
      nice: 0,
      sys: 30340,
      idle: 1070356870,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 306960,
      nice: 0,
      sys: 26980,
      idle: 1071569080,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 248450,
      nice: 0,
      sys: 21750,
      idle: 1070919370,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 256880,
      nice: 0,
      sys: 19430,
      idle: 1070905480,
      irq: 20,
    },
  },
] 
```
- model: 表示CPU的型号信息，其中 "Intel(R) Core(TM) i7 CPU 860 @ 2.80GHz" 是一种具体的型号描述。

- speed: 表示CPU的时钟速度，以MHz或GHz为单位。在这种情况下，速度为 2926 MHz 或 2.926 GHz。

- times: 是一个包含CPU使用时间的对象，其中包含以下属性：

  - user: 表示CPU被用户程序使用的时间（以毫秒为单位）。
  - nice: 表示CPU被优先级较低的用户程序使用的时间（以毫秒为单位）。
  - sys: 表示CPU被系统内核使用的时间（以毫秒为单位）。
  - idle: 表示CPU处于空闲状态的时间（以毫秒为单位）。
  - irq: 表示CPU被硬件中断处理程序使用的时间（以毫秒为单位）。

### 获取网络信息
```js
const os = require('node:os')
os.networkInterfaces()
```
```js
{
  lo: [
    {
      address: '127.0.0.1',
      netmask: '255.0.0.0',
      family: 'IPv4',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '127.0.0.1/8'
    },
    {
      address: '::1',
      netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      scopeid: 0,
      internal: true,
      cidr: '::1/128'
    }
  ],
  eth0: [
    {
      address: '192.168.1.108',
      netmask: '255.255.255.0',
      family: 'IPv4',
      mac: '01:02:03:0a:0b:0c',
      internal: false,
      cidr: '192.168.1.108/24'
    },
    {
      address: 'fe80::a00:27ff:fe4e:66a1',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '01:02:03:0a:0b:0c',
      scopeid: 1,
      internal: false,
      cidr: 'fe80::a00:27ff:fe4e:66a1/64'
    }
  ]
} 
```

- address: 表示本地回环接口的IP地址，这里是 '127.0.0.1'。
- netmask: 表示本地回环接口的子网掩码，这里是 '255.0.0.0'。
- family: 表示地址族（address family），这里是 'IPv4'，表示IPv4地址。
- mac: 表示本地回环接口的MAC地址，这里是 '00:00:00:00:00:00'。请注意，本地回环接口通常不涉及硬件，因此MAC地址通常为全零。
- internal: 表示本地回环接口是否是内部接口，这里是 true，表示它是一个内部接口。
- cidr: 表示本地回环接口的CIDR表示法，即网络地址和子网掩码的组合，这里是 '127.0.0.1/8'，表示整个 127.0.0.0 网络。

### 案例
知道这些信息有什么用？
非常经典的例子 webpack vite 大家应该都用过 他们有一个配置项可以打开浏览器 open:true 我们来简单复刻一下
```js
const { exec } = require('child_process');
const os = require('os');

function openBrowser(url) {
  if (os.platform() === 'darwin') {  // macOS
    exec(`open ${url}`); //执行shell脚本
  } else if (os.platform() === 'win32') {  // Windows
    exec(`start ${url}`); //执行shell脚本
  } else {  // Linux, Unix-like
    exec(`xdg-open ${url}`); //执行shell脚本
  }
}

// Example usage
openBrowser('https://www.juejin.cn');
```