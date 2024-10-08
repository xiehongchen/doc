export enum MY_TAB {
  mianshi = "/面试题/",
  html = "/前端/html/",
  css = "/前端/css/",
  javascript = "/前端/javascript/",
  typescript = "/前端/typescript/",
  vue = "/前端/vue/",
  react = "/前端/react/",
  node = "/后端/node/",
  java = "/后端/java/",
  qita = "/其他/",
  suanfa = "/算法/",
}

export interface IItems {
  text: string;
  link?: string;
  collapsed?: boolean;
  items?: IItems[];
}

export interface ISideBar {
  [MY_TAB.mianshi]: IItems[];
  [MY_TAB.html]: IItems[];
  [MY_TAB.css]: IItems[];
  [MY_TAB.javascript]: IItems[];
  [MY_TAB.typescript]: IItems[];
  [MY_TAB.vue]: IItems[];
  [MY_TAB.react]: IItems[];
  [MY_TAB.node]: IItems[];
  [MY_TAB.java]: IItems[];
  [MY_TAB.qita]: IItems[];
  [MY_TAB.suanfa]: IItems[];
}

export function createSidebar() {
  const res: ISideBar = {
    "/面试题/": [
      { text: "index", link: "/面试题/index.md" },
      { text: "html&css", link: "/面试题/html&css.md" },
      { text: "javascript", link: "/面试题/javascript.md" },
      { text: "react", link: "/面试题/react.md" },
      { text: "vue", link: "/面试题/vue.md" },
      { text: "浏览器", link: "/面试题/浏览器.md" },
      { text: "计算机网络", link: "/面试题/计算机网络.md" },
    ],
    // 前端
    "/前端/html/": [{ text: "HTML", link: "/前端/html/index.md" }],
    "/前端/css/": [
      { text: "CSS", link: "/前端/css/index.md" },
      { text: "css学习", link: "/前端/css/css学习.md" },
    ],
    "/前端/javascript/": [
      { text: "javascript", link: "/前端/javascript/index.md" },
      {
        text: "JavaScript基础",
        link: "/前端/javascript/JavaScript基础",
      },
      { text: "ES6", link: "/前端/javascript/ES6.md" },
      {
        text: "es6",
        collapsed: true,
        items: [
          { text: "1、简介", link: "/前端/javascript/es6/1、简介.md" },
          {
            text: "2、let&const",
            link: "/前端/javascript/es6/2、let&const.md",
          },
          {
            text: "3、变量的解构赋值",
            link: "/前端/javascript/es6/3、变量的解构赋值.md",
          },
          {
            text: "4、字符串的扩展",
            link: "/前端/javascript/es6/4、字符串的扩展.md",
          },
          {
            text: "5、字符串的新增方法",
            link: "/前端/javascript/es6/5、字符串的新增方法.md",
          },
          {
            text: "6、正则的扩展",
            link: "/前端/javascript/es6/6、正则的扩展.md",
          },
          {
            text: "7、数值的扩展",
            link: "/前端/javascript/es6/7、数值的扩展.md",
          },
          {
            text: "8、函数的扩展",
            link: "/前端/javascript/es6/8、函数的扩展.md",
          },
          {
            text: "9、数组的扩展",
            link: "/前端/javascript/es6/9、数组的扩展.md",
          },
          {
            text: "10、对象的扩展",
            link: "/前端/javascript/es6/10、对象的扩展.md",
          },
          {
            text: "11、对象的新增方法",
            link: "/前端/javascript/es6/11、对象的新增方法.md",
          },
          {
            text: "12、运算符的扩展",
            link: "/前端/javascript/es6/12、运算符的扩展.md",
          },
          { text: "13、Symbol", link: "/前端/javascript/es6/13、Symbol.md" },
          {
            text: "14、Set 和 Map 数据结构",
            link: "/前端/javascript/es6/14、Set 和 Map 数据结构.md",
          },
          { text: "15、Proxy", link: "/前端/javascript/es6/15、Proxy.md" },
          { text: "16、Reflect", link: "/前端/javascript/es6/16、Reflect.md" },
          {
            text: "17、Promise 对象",
            link: "/前端/javascript/es6/17、Promise 对象.md",
          },
          {
            text: "18、Iterator 和 for...of 循环",
            link: "/前端/javascript/es6/18、Iterator 和 for...of 循环.md",
          },
          {
            text: "19、Generator 函数的语法",
            link: "/前端/javascript/es6/19、Generator 函数的语法.md",
          },
          {
            text: "20、Generator 函数的异步应用",
            link: "/前端/javascript/es6/20、Generator 函数的异步应用.md",
          },
          {
            text: "21、async 函数",
            link: "/前端/javascript/es6/21、async 函数.md",
          },
          {
            text: "22、Class 的基本语法",
            link: "/前端/javascript/es6/22、Class 的基本语法.md",
          },
          {
            text: "23、Class 的继承",
            link: "/前端/javascript/es6/23、Class 的继承.md",
          },
          {
            text: "24、Module 的语法",
            link: "/前端/javascript/es6/24、Module 的语法.md",
          },
          {
            text: "25、Module 的加载实现",
            link: "/前端/javascript/es6/25、Module 的加载实现.md",
          },
          {
            text: "26、编程风格",
            link: "/前端/javascript/es6/26、编程风格.md",
          },
          {
            text: "27、读懂 ECMAScript 规格",
            link: "/前端/javascript/es6/27、读懂 ECMAScript 规格.md",
          },
          {
            text: "28、异步遍历器",
            link: "/前端/javascript/es6/28、异步遍历器.md",
          },
        ],
      },
      {
        text: "JavaScript进阶dom和bom",
        link: "/前端/javascript/JavaScript进阶dom和bom.md",
      },
      {
        text: "JavaScript面向对象",
        link: "/前端/javascript/JavaScript面向对象.md",
      },
      { text: "jQuery", link: "/前端/javascript/jQuery.md" },
      { text: "symbol", link: "/前端/javascript/symbol.md" },
      { text: "web服务器", link: "/前端/javascript/web服务器.md" },
      { text: "数据可视化", link: "/前端/javascript/数据可视化.md" },
      { text: "本地存储", link: "/前端/javascript/本地存储.md" },
      { text: "特效", link: "/前端/javascript/特效.md" },
      { text: "移动端", link: "/前端/javascript/移动端.md" },
      { text: "promise", link: "/前端/javascript/promise.md" },
      { text: "canvas", link: "/前端/javascript/canvas.md" },
      { text: "并发控制", link: "/前端/javascript/并发控制.md" },
      { text: "对象方法", link: "/前端/javascript/对象方法.md" },
      { text: "数组方法", link: "/前端/javascript/数组方法.md" },
      { text: "函数柯里化", link: "/前端/javascript/函数柯里化.md" },
      { text: "隐式转换", link: "/前端/javascript/隐式转换.md" },
    ],
    "/前端/typescript/": [
      {
        text: "typescript",
        collapsed: true,
        items: [
          { text: "基础类型", link: "/前端/typescript/index.md" },
          { text: "任意类型", link: "/前端/typescript/任意类型.md" },
          {
            text: "接口和对象类型",
            link: "/前端/typescript/接口和对象类型.md",
          },
          { text: "数组类型", link: "/前端/typescript/数组类型.md" },
          { text: "函数扩展", link: "/前端/typescript/函数扩展.md" },
          {
            text: "类型断言 | 联合类型 | 交叉类型",
            link: "/前端/typescript/类型断言 | 联合类型 | 交叉类型.md",
          },
          {
            text: "内置对象&代码雨",
            link: "/前端/typescript/内置对象&代码雨.md",
          },
          { text: "Class类", link: "/前端/typescript/Class类.md" },
          { text: "元组类型", link: "/前端/typescript/元组类型.md" },
          { text: "枚举类型", link: "/前端/typescript/枚举类型.md" },
          {
            text: "类型推论|类型别名",
            link: "/前端/typescript/类型推论|类型别名.md",
          },
          { text: "never类型", link: "/前端/typescript/never类型.md" },
          { text: "symbol类型", link: "/前端/typescript/symbol类型.md" },
          { text: "泛型", link: "/前端/typescript/泛型.md" },
          {
            text: "tsconfig.json配置文件",
            link: "/前端/typescript/tsconfig.json配置文件.md",
          },
          {
            text: "namespace命名空间",
            link: "/前端/typescript/namespace命名空间.md",
          },
          { text: "三斜线指令", link: "/前端/typescript/三斜线指令.md" },
          { text: "声明文件d.ts", link: "/前端/typescript/声明文件d.ts.md" },
          { text: "Mixins混入", link: "/前端/typescript/Mixins混入.md" },
          {
            text: "装饰器Decorator",
            link: "/前端/typescript/装饰器Decorator.md",
          },
        ],
      },
    ],
    "/前端/vue/": [
      { text: "vue", link: "/前端/vue/index.md" },
      { text: "Vue2", link: "/前端/vue/vue2.md" },
      {
        text: "Vue3",
        collapsed: true,
        items: [
          {
            text: "1、创建Vue3.0工程",
            link: "/前端/vue/vue3/1、创建Vue3.0工程.md",
          },
          {
            text: "2、常用 Composition API",
            link: "/前端/vue/vue3/2、常用 Composition API.md",
          },
          {
            text: "3、其它 Composition API",
            link: "/前端/vue/vue3/3、其它 Composition API.md",
          },
          {
            text: "4、Composition API 的优势",
            link: "/前端/vue/vue3/4、Composition API 的优势.md",
          },
          { text: "5、新的组件", link: "/前端/vue/vue3/5、新的组件.md" },
          { text: "6、其他", link: "/前端/vue/vue3/6、其他.md" },
        ],
      },
      {
        text: "Vue3源码学习",
        collapsed: true,
        items: [
          { text: "vdom", link: "/前端/vue/code/vdom" }
        ]
      }
    ],
    "/前端/react/": [
      {
        text: "React",
        collapsed: true,
        items: [
          { text: "React介绍", link: "/前端/react/index.md" },
          { text: "JSX基础", link: "/前端/react/JSX基础.md" },
          { text: "React组件基础", link: "/前端/react/React组件基础.md" },
          { text: "React组件通信", link: "/前端/react/React组件通信.md" },
          { text: "React组件进阶", link: "/前端/react/React组件进阶.md" },
          { text: "Hooks基础", link: "/前端/react/Hooks基础.md" },
          { text: "Hooks进阶", link: "/前端/react/Hooks进阶.md" },
        ],
      },
      { text: 'redux', link: '/前端/react/redux.md' }
    ],
    "/后端/node/": [
      { text: "node", collapsed: true, items: [
        { text: 'index', link: '/后端/node/node/index.md' },
        { text: 'fs文件系统模块', link: '/后端/node/node/fs文件系统模块.md' },
        { text: 'os', link: '/后端/node/node/os.md' },
        { text: 'path路径模块', link: '/后端/node/node/path路径模块.md' },
        { text: 'http 模块', link: '/后端/node/node/http 模块.md' },
        { text: '模块化', link: '/后端/node/node/模块化.md' },
        { text: 'npm和包', link: '/后端/node/node/npm和包.md' }
      ] },
      { text: "express", link: "/后端/node/express.md" },
    ],
    "/后端/java/": [
      { text: "java", link: "/后端/java/index.md" },
      { text: "jdbc", link: "/后端/java/JDBC.md" },
      { text: "mysql", link: "/后端/java/MYSQL.md" },
    ],
    "/其他/": [
      { text: "其他", link: "/其他/index.md" },
      {
        text: "webpack5",
        collapsed: true,
        items: [
          { text: "基础", link: "/其他/Webpack5/基础.md" },
          { text: "高级", link: "/其他/Webpack5/高级.md" },
          { text: "项目", link: "/其他/Webpack5/项目.md" },
        ],
      },
      { text: "前端学习", link: "/其他/前端学习.md" },
      { text: "git", link: "/其他/git.md" },
      { text: "git操作", link: "/其他/git操作.md" },
      { text: "下载", link: "/其他/下载.md" },
      {
        text: "关于时间的处理&Date对象",
        link: "/其他/关于时间的处理&Date对象.md",
      },
      { text: "判断平台", link: "/其他/判断平台.md" },
      { text: "导出功能", link: "/其他/导出功能.md" },
      { text: "微信jssdk接入", link: "/其他/微信jssdk接入.md" },
      { text: "搭建Monorepo", link: "/其他/搭建Monorepo.md" },
      { text: "支付", link: "/其他/支付.md" },
      {
        text: "文件上传后缀名与文件类型对照表",
        link: "/其他/文件上传后缀名与文件类型对照表.md",
      },
      { text: "文件格式", link: "/其他/文件格式.md" },
      { text: "版本号排序", link: "/其他/版本号排序.md" },
      { text: "禁止下拉", link: "/其他/禁止下拉.md" },
      { text: "视频文件修改md5值", link: "/其他/视频文件修改md5值.md" },
      { text: "路由", link: "/其他/路由.md" },
    ],
    "/算法/": [
      { text: "算法", link: "/算法/index.md" },
      { text: "插入排序", link: "/算法/插入排序.md" },
      { text: "快速排序", link: "/算法/快速排序.md" },
      { text: "冒泡排序", link: "/算法/冒泡排序.md" },
      { text: "选择排序", link: "/算法/选择排序.md" },
      {
        text: "华为机考",
        collapsed: true,
        items: [
          {
            text: "HJ5-E-进制转换",
            link: "/算法/华为机考/HJ5-E-进制转换.md",
          },
          {
            text: "HJ10-E-字符个数统计",
            link: "/算法/华为机考/HJ10-E-字符个数统计.md",
          },
          {
            text: "HJ40-E-统计字符",
            link: "/算法/华为机考/HJ40-E-统计字符.md",
          },
          {
            text: "HJ58-E-输入n个整数，输出其中最小的k个",
            link: "/算法/华为机考/HJ58-E-输入n个整数，输出其中最小的k个.md",
          },
          {
            text: "HJ59-M-找出字符串中第一个只出现一次的字符",
            link: "/算法/华为机考/HJ59-M-找出字符串中第一个只出现一次的字符.md",
          },
          {
            text: "HJ60-E-查找组成一个偶数最接近的两个素数",
            link: "/算法/华为机考/HJ60-E-查找组成一个偶数最接近的两个素数.md",
          },
          {
            text: "HJ75-M-公共子串计算",
            link: "/算法/华为机考/HJ75-M-公共子串计算.md",
          },
          {
            text: "HJ81-E-字符串字符匹配",
            link: "/算法/华为机考/HJ81-E-字符串字符匹配.md",
          },
          {
            text: "HJ85-E-最长回文子串",
            link: "/算法/华为机考/HJ85-E-最长回文子串.md",
          },
          {
            text: "HJ86-E-求最大连续bit数",
            link: "/算法/华为机考/HJ86-E-求最大连续bit数.md",
          },
          {
            text: "HJ100-E-等差数列",
            link: "/算法/华为机考/HJ100-E-等差数列.md",
          },
          { text: "5键键盘", link: "/算法/华为机考/5键键盘.md" },
          {
            text: "乱序整数序列两数之和绝对值最小",
            link: "/算法/华为机考/乱序整数序列两数之和绝对值最小.md",
          },
          { text: "分积木", link: "/算法/华为机考/分积木.md" },
          {
            text: "判断是不是子字符串",
            link: "/算法/华为机考/判断是不是子字符串.md",
          },
          {
            text: "多个数组按顺序合并",
            link: "/算法/华为机考/多个数组按顺序合并.md",
          },
          { text: "字符串加密", link: "/算法/华为机考/字符串加密.md" },
          { text: "射击比赛", link: "/算法/华为机考/射击比赛.md" },
          { text: "尼科彻斯定理", link: "/算法/华为机考/尼科彻斯定理.md" },
          { text: "括号检查", link: "/算法/华为机考/括号检查.md" },
          {
            text: "按单词下标区间翻转文章内容",
            link: "/算法/华为机考/按单词下标区间翻转文章内容.md",
          },
          { text: "整数对最小和", link: "/算法/华为机考/整数对最小和.md" },
          {
            text: "检查是否存在满足条件的数字组合",
            link: "/算法/华为机考/检查是否存在满足条件的数字组合.md",
          },
          {
            text: "求字符串中所有整数的最小和",
            link: "/算法/华为机考/求字符串中所有整数的最小和.md",
          },
          { text: "组成最大数", link: "/算法/华为机考/组成最大数.md" },
          {
            text: "非严格递增连续数字序列",
            link: "/算法/华为机考/非严格递增连续数字序列.md",
          },
        ],
      },
      {
        text: "leetcode",
        collapsed: true,
        items: [
          {
            text: "1、E-两数之和",
            link: "/算法/leetcode/1、E-两数之和.md",
          },
          {
            text: "2、M-两数相加",
            link: "/算法/leetcode/2、M-两数相加.md",
          },
          {
            text: "3、M-无重复字符的最长字串",
            link: "/算法/leetcode/3、M-无重复字符的最长字串.md",
          },
          {
            text: "4、H-寻找两个正序数组的中位数",
            link: "/算法/leetcode/4、H-寻找两个正序数组的中位数.md",
          },
          {
            text: "5、M-最长回文字串",
            link: "/算法/leetcode/5、M-最长回文字串.md",
          },
          { text: "9、E-回文数", link: "/算法/leetcode/9、E-回文数.md" },
          {
            text: "10、H-正则表达式匹配",
            link: "/算法/leetcode/10、H-正则表达式匹配.md",
          },
          {
            text: "11、M-盛最多水的容器",
            link: "/算法/leetcode/11、M-盛最多水的容器.md",
          },
          {
            text: "13、E-罗马数字转整数",
            link: "/算法/leetcode/13、E-罗马数字转整数.md",
          },
          {
            text: "14、E-最长公共前缀",
            link: "/算法/leetcode/14、E-最长公共前缀.md",
          },
          {
            text: "20、E-有效的括号",
            link: "/算法/leetcode/20、E-有效的括号.md",
          },
          {
            text: "21、E-合并俩个有序链表",
            link: "/算法/leetcode/21、E-合并俩个有序链表.md",
          },
          {
            text: "26、E-删除有序数组中的重复项",
            link: "/算法/leetcode/26、E-删除有序数组中的重复项.md",
          },
          {
            text: "27、E-移除元素",
            link: "/算法/leetcode/27、E-移除元素.md",
          },
          {
            text: "80、M-删除有序数据中的重复项",
            link: "/算法/leetcode/80、M-删除有序数据中的重复项.md",
          },
          {
            text: "88、E-合并两个有序数组",
            link: "/算法/leetcode/88、E-合并两个有序数组.md",
          },
          {
            text: "121、E-买卖股票的最佳时机",
            link: "/算法/leetcode/121、E-买卖股票的最佳时机.md",
          },
          {
            text: "151、M-反转字符串中的单词",
            link: "/算法/leetcode/151、M-反转字符串中的单词.md",
          },
          {
            text: "169、E-多数元素",
            link: "/算法/leetcode/169、E-多数元素.md",
          },
          {
            text: "189、M-轮转数组",
            link: "/算法/leetcode/189、M-轮转数组.md",
          },
          {
            text: "205、E-同构字符串",
            link: "/算法/leetcode/205、E-同构字符串.md",
          },
          {
            text: "392、E-判断子序列",
            link: "/算法/leetcode/392、E-判断子序列.md",
          },
          {
            text: "724、E-寻找数组的中心下标",
            link: "/算法/leetcode/724、E-寻找数组的中心下标.md",
          },
          {
            text: "1071、E-字符串的最大公因子",
            link: "/算法/leetcode/1071、E-字符串的最大公因子.md",
          },
          {
            text: "1111、M-有效括号的嵌套深度",
            link: "/算法/leetcode/1111、M-有效括号的嵌套深度.md",
          },
          {
            text: "1480、E-一维数组的动态和",
            link: "/算法/leetcode/1480、E-一维数组的动态和.md",
          },
          {
            text: "1507、E-转变日期格式",
            link: "/算法/leetcode/1507、E-转变日期格式.md",
          },
          {
            text: "1556、E-千位分隔符",
            link: "/算法/leetcode/1556、E-千位分隔符.md",
          },
          {
            text: "2047、E-句子中的有效单词数",
            link: "/算法/leetcode/2047、E-句子中的有效单词数.md",
          },
        ],
      },
    ],
  };
  return res;
}
