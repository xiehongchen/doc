export enum MY_TAB {
  interview = "/interview/",
  html = "/frontend/basics/html/",
  css = "/frontend/basics/css/",
  javascript = "/frontend/basics/javascript/",
  typescript = "/frontend/typescript/",
  vue = "/frontend/vue/",
  react = "/frontend/react/",
  nodejs = "/backend/nodejs/",
  java = "/backend/java/",
  misc = "/misc/",
  algorithms = "/algorithms/",
}

export interface IItems {
  text: string;
  link?: string;
  collapsed?: boolean;
  items?: IItems[];
}

export interface ISideBar {
  [MY_TAB.interview]: IItems[];
  [MY_TAB.html]: IItems[];
  [MY_TAB.css]: IItems[];
  [MY_TAB.javascript]: IItems[];
  [MY_TAB.typescript]: IItems[];
  [MY_TAB.vue]: IItems[];
  [MY_TAB.react]: IItems[];
  [MY_TAB.nodejs]: IItems[];
  [MY_TAB.java]: IItems[];
  [MY_TAB.misc]: IItems[];
  [MY_TAB.algorithms]: IItems[];
}

export function createSidebar() {
  const res: ISideBar = {
    "/interview/": [
      { text: "index", link: "/interview/index.md" },
      { text: "HTML & CSS", link: "/interview/html-css.md" },
      { text: "JavaScript", link: "/interview/javascript.md" },
      { text: "React", link: "/interview/react.md" },
      { text: "Vue", link: "/interview/vue.md" },
      { text: "浏览器", link: "/interview/browser.md" },
      { text: "计算机网络", link: "/interview/computer-network.md" },
    ],
    // 前端基础
    "/frontend/basics/html/": [{ text: "HTML", link: "/frontend/basics/html/index.md" }],
    "/frontend/basics/css/": [
      { text: "CSS", link: "/frontend/basics/css/index.md" },
      { text: "CSS 学习", link: "/frontend/basics/css/css-guide.md" },
    ],
    "/frontend/basics/javascript/": [
      { text: "JavaScript", link: "/frontend/basics/javascript/index.md" },
      {
        text: "JavaScript 基础",
        link: "/frontend/basics/javascript/basics.md",
      },
      { text: "ES6", link: "/frontend/basics/javascript/es6.md" },
      {
        text: "ES6 教程",
        collapsed: true,
        items: [
          { text: "01. 简介", link: "/frontend/basics/javascript/es6/01-intro.md" },
          {
            text: "02. let & const",
            link: "/frontend/basics/javascript/es6/02-let-const.md",
          },
          {
            text: "03. 变量的解构赋值",
            link: "/frontend/basics/javascript/es6/03-destructuring.md",
          },
          {
            text: "04. 字符串的扩展",
            link: "/frontend/basics/javascript/es6/04-string-extensions.md",
          },
          {
            text: "05. 字符串的新增方法",
            link: "/frontend/basics/javascript/es6/05-string-methods.md",
          },
          {
            text: "06. 正则的扩展",
            link: "/frontend/basics/javascript/es6/06-regex.md",
          },
          {
            text: "07. 数值的扩展",
            link: "/frontend/basics/javascript/es6/07-number.md",
          },
          {
            text: "08. 函数的扩展",
            link: "/frontend/basics/javascript/es6/08-function.md",
          },
          {
            text: "09. 数组的扩展",
            link: "/frontend/basics/javascript/es6/09-array.md",
          },
          {
            text: "10. 对象的扩展",
            link: "/frontend/basics/javascript/es6/10-object.md",
          },
          {
            text: "11. 对象的新增方法",
            link: "/frontend/basics/javascript/es6/11-object-methods.md",
          },
          {
            text: "12. 运算符的扩展",
            link: "/frontend/basics/javascript/es6/12-operator.md",
          },
          { text: "13. Symbol", link: "/frontend/basics/javascript/es6/13-symbol.md" },
          {
            text: "14. Set 和 Map 数据结构",
            link: "/frontend/basics/javascript/es6/14-set-map.md",
          },
          { text: "15. Proxy", link: "/frontend/basics/javascript/es6/15-proxy.md" },
          { text: "16. Reflect", link: "/frontend/basics/javascript/es6/16-reflect.md" },
          {
            text: "17. Promise 对象",
            link: "/frontend/basics/javascript/es6/17-promise.md",
          },
          {
            text: "18. Iterator 和 for...of 循环",
            link: "/frontend/basics/javascript/es6/18-iterator.md",
          },
          {
            text: "19. Generator 函数的语法",
            link: "/frontend/basics/javascript/es6/19-generator-syntax.md",
          },
          {
            text: "20. Generator 函数的异步应用",
            link: "/frontend/basics/javascript/es6/20-generator-async.md",
          },
          {
            text: "21. async 函数",
            link: "/frontend/basics/javascript/es6/21-async-function.md",
          },
          {
            text: "22. Class 的基本语法",
            link: "/frontend/basics/javascript/es6/22-class-syntax.md",
          },
          {
            text: "23. Class 的继承",
            link: "/frontend/basics/javascript/es6/23-class-inheritance.md",
          },
          {
            text: "24. Module 的语法",
            link: "/frontend/basics/javascript/es6/24-module-syntax.md",
          },
          {
            text: "25. Module 的加载实现",
            link: "/frontend/basics/javascript/es6/25-module-loading.md",
          },
          {
            text: "26. 编程风格",
            link: "/frontend/basics/javascript/es6/26-style.md",
          },
          {
            text: "27. 读懂 ECMAScript 规格",
            link: "/frontend/basics/javascript/es6/27-specification.md",
          },
          {
            text: "28. 异步遍历器",
            link: "/frontend/basics/javascript/es6/28-async-iterator.md",
          },
        ],
      },
      {
        text: "DOM 和 BOM",
        link: "/frontend/basics/javascript/dom-bom.md",
      },
      {
        text: "面向对象",
        link: "/frontend/basics/javascript/oop.md",
      },
      { text: "jQuery", link: "/frontend/basics/javascript/jquery.md" },
      { text: "Symbol", link: "/frontend/basics/javascript/symbol-type.md" },
      { text: "Web 服务器", link: "/frontend/basics/javascript/web-server.md" },
      { text: "数据可视化", link: "/frontend/basics/javascript/data-visualization.md" },
      { text: "本地存储", link: "/frontend/basics/javascript/local-storage.md" },
      { text: "特效", link: "/frontend/basics/javascript/effects.md" },
      { text: "移动端", link: "/frontend/basics/javascript/mobile.md" },
      { text: "Promise", link: "/frontend/basics/javascript/promise.md" },
      { text: "Canvas", link: "/frontend/basics/javascript/canvas.md" },
      { text: "并发控制", link: "/frontend/basics/javascript/concurrency.md" },
      { text: "对象方法", link: "/frontend/basics/javascript/object-methods.md" },
      { text: "数组方法", link: "/frontend/basics/javascript/array-methods.md" },
      { text: "函数柯里化", link: "/frontend/basics/javascript/currying.md" },
      { text: "类型转换", link: "/frontend/basics/javascript/type-coercion.md" },
    ],
    "/frontend/typescript/": [
      {
        text: "TypeScript",
        collapsed: true,
        items: [
          { text: "01. 基础类型", link: "/frontend/typescript/01-basic-types.md" },
          { text: "02. 任意类型", link: "/frontend/typescript/02-any-type.md" },
          {
            text: "03. 接口和对象类型",
            link: "/frontend/typescript/03-interface-object.md",
          },
          { text: "04. 数组类型", link: "/frontend/typescript/04-array-type.md" },
          { text: "05. 函数扩展", link: "/frontend/typescript/05-function.md" },
          {
            text: "06. 类型断言 | 联合类型 | 交叉类型",
            link: "/frontend/typescript/06-union-intersection.md",
          },
          {
            text: "07. 内置对象&代码雨",
            link: "/frontend/typescript/07-built-in-objects.md",
          },
          { text: "08. Class 类", link: "/frontend/typescript/08-class.md" },
          { text: "09. 元组类型", link: "/frontend/typescript/09-tuple.md" },
          { text: "10. 枚举类型", link: "/frontend/typescript/10-enum.md" },
          {
            text: "11. 类型推论 | 类型别名",
            link: "/frontend/typescript/11-type-alias.md",
          },
          { text: "12. never 类型", link: "/frontend/typescript/12-never.md" },
          { text: "13. symbol 类型", link: "/frontend/typescript/13-symbol.md" },
          { text: "14. 泛型", link: "/frontend/typescript/14-generics.md" },
          {
            text: "15. tsconfig.json 配置文件",
            link: "/frontend/typescript/15-tsconfig.md",
          },
          {
            text: "16. namespace 命名空间",
            link: "/frontend/typescript/16-namespace.md",
          },
          { text: "17. 三斜线指令", link: "/frontend/typescript/17-triple-slash.md" },
          { text: "18. 声明文件 d.ts", link: "/frontend/typescript/18-declaration-file.md" },
          { text: "19. Mixins 混入", link: "/frontend/typescript/19-mixins.md" },
          {
            text: "20. 装饰器 Decorator",
            link: "/frontend/typescript/20-decorator.md",
          },
        ],
      },
    ],
    "/frontend/vue/": [
      { text: "Vue 介绍", link: "/frontend/vue/vue-intro.md" },
      { text: "Vue 2", link: "/frontend/vue/vue2.md" },
      {
        text: "Vue 3",
        collapsed: true,
        items: [
          {
            text: "01. 创建 Vue3.0 工程",
            link: "/frontend/vue/vue3/01-setup.md",
          },
          {
            text: "02. 常用 Composition API",
            link: "/frontend/vue/vue3/02-composition-api.md",
          },
          {
            text: "03. 其它 Composition API",
            link: "/frontend/vue/vue3/03-composition-api-other.md",
          },
          {
            text: "04. Composition API 的优势",
            link: "/frontend/vue/vue3/04-composition-advantages.md",
          },
          { text: "05. 新的组件", link: "/frontend/vue/vue3/05-new-components.md" },
          { text: "06. 其他", link: "/frontend/vue/vue3/06-other.md" },
        ],
      },
      {
        text: "Vue 源码学习",
        collapsed: true,
        items: [
          { text: "vdom", link: "/frontend/vue/code/vdom" }
        ]
      }
    ],
    "/frontend/react/": [
      {
        text: "React",
        collapsed: true,
        items: [
          { text: "01. React 介绍", link: "/frontend/react/01-react-intro.md" },
          { text: "02. JSX 基础", link: "/frontend/react/02-jsx.md" },
          { text: "03. React 组件基础", link: "/frontend/react/03-component-basics.md" },
          { text: "04. React 组件通信", link: "/frontend/react/04-component-communication.md" },
          { text: "05. React 组件进阶", link: "/frontend/react/05-component-advanced.md" },
          { text: "06. Hooks 基础", link: "/frontend/react/06-hooks-basics.md" },
          { text: "07. Hooks 进阶", link: "/frontend/react/07-hooks-advanced.md" },
        ],
      },
      { text: 'Redux', link: '/frontend/react/08-redux.md' }
    ],
    "/backend/nodejs/": [
      { text: "Node.js", collapsed: true, items: [
        { text: 'index', link: '/backend/nodejs/index.md' },
        { text: 'fs 文件系统模块', link: '/backend/nodejs/fs-module.md' },
        { text: 'os 模块', link: '/backend/nodejs/os-module.md' },
        { text: 'path 路径模块', link: '/backend/nodejs/path-module.md' },
        { text: 'http 模块', link: '/backend/nodejs/http-module.md' },
        { text: '模块化', link: '/backend/nodejs/modules.md' },
        { text: 'npm 和包', link: '/backend/nodejs/npm-packages.md' }
      ] },
      { text: "Express", link: "/backend/express/index.md" },
    ],
    "/backend/java/": [
      { text: "Java", link: "/backend/java/java-intro.md" },
      { text: "JDBC", link: "/backend/java/jdbc.md" },
      { text: "MySQL", link: "/backend/java/mysql.md" },
    ],
    "/misc/": [
      { text: "其他", link: "/misc/misc-intro.md" },
      {
        text: "Webpack 5",
        collapsed: true,
        items: [
          { text: "基础", link: "/misc/webpack/basics.md" },
          { text: "高级", link: "/misc/webpack/advanced.md" },
          { text: "项目", link: "/misc/webpack/projects.md" },
        ],
      },
      { text: "前端学习", link: "/misc/utils/frontend-learning.md" },
      { text: "Git", link: "/misc/utils/git.md" },
      { text: "Git 操作", link: "/misc/utils/git-commands.md" },
      { text: "下载", link: "/misc/utils/download.md" },
      {
        text: "关于时间的处理&Date 对象",
        link: "/misc/utils/date-utils.md",
      },
      { text: "判断平台", link: "/misc/utils/platform-detect.md" },
      { text: "导出功能", link: "/misc/utils/export.md" },
      { text: "微信 jssdk 接入", link: "/misc/utils/wechat-jssdk.md" },
      { text: "搭建 Monorepo", link: "/misc/utils/monorepo-setup.md" },
      { text: "支付", link: "/misc/utils/payment.md" },
      {
        text: "文件上传后缀名与文件类型对照表",
        link: "/misc/utils/file-upload-types.md",
      },
      { text: "文件格式", link: "/misc/utils/file-types.md" },
      { text: "版本号排序", link: "/misc/utils/version-sort.md" },
      { text: "禁止下拉", link: "/misc/utils/disable-pull.md" },
      { text: "视频文件修改 md5 值", link: "/misc/utils/video-md5.md" },
      { text: "路由", link: "/misc/utils/routing.md" },
    ],
    "/algorithms/": [
      { text: "算法", link: "/algorithms/index.md" },
      { text: "插入排序", link: "/algorithms/sorting/insertion-sort.md" },
      { text: "快速排序", link: "/algorithms/sorting/quick-sort.md" },
      { text: "冒泡排序", link: "/algorithms/sorting/bubble-sort.md" },
      { text: "选择排序", link: "/algorithms/sorting/selection-sort.md" },
      {
        text: "华为机考",
        collapsed: true,
        items: [
          {
            text: "HJ5-E-进制转换",
            link: "/algorithms/huawei/HJ5-E-进制转换.md",
          },
          {
            text: "HJ10-E-字符个数统计",
            link: "/algorithms/huawei/HJ10-E-字符个数统计.md",
          },
          {
            text: "HJ40-E-统计字符",
            link: "/algorithms/huawei/HJ40-E-统计字符.md",
          },
          {
            text: "HJ58-E-输入 n 个整数，输出其中最小的 k 个",
            link: "/algorithms/huawei/HJ58-E-输入 n 个整数，输出其中最小的 k 个.md",
          },
          {
            text: "HJ59-M-找出字符串中第一个只出现一次的字符",
            link: "/algorithms/huawei/HJ59-M-找出字符串中第一个只出现一次的字符.md",
          },
          {
            text: "HJ60-E-查找组成一个偶数最接近的两个素数",
            link: "/algorithms/huawei/HJ60-E-查找组成一个偶数最接近的两个素数.md",
          },
          {
            text: "HJ75-M-公共子串计算",
            link: "/algorithms/huawei/HJ75-M-公共子串计算.md",
          },
          {
            text: "HJ81-E-字符串字符匹配",
            link: "/algorithms/huawei/HJ81-E-字符串字符匹配.md",
          },
          {
            text: "HJ85-E-最长回文子串",
            link: "/algorithms/huawei/HJ85-E-最长回文子串.md",
          },
          {
            text: "HJ86-E-求最大连续 bit 数",
            link: "/algorithms/huawei/HJ86-E-求最大连续 bit 数.md",
          },
          {
            text: "HJ100-E-等差数列",
            link: "/algorithms/huawei/HJ100-E-等差数列.md",
          },
          { text: "5 键键盘", link: "/algorithms/huawei/5 键键盘.md" },
          {
            text: "乱序整数序列两数之和绝对值最小",
            link: "/algorithms/huawei/乱序整数序列两数之和绝对值最小.md",
          },
          { text: "分积木", link: "/algorithms/huawei/分积木.md" },
          {
            text: "判断是不是子字符串",
            link: "/algorithms/huawei/判断是不是子字符串.md",
          },
          {
            text: "多个数组按顺序合并",
            link: "/algorithms/huawei/多个数组按顺序合并.md",
          },
          { text: "字符串加密", link: "/algorithms/huawei/字符串加密.md" },
          { text: "射击比赛", link: "/algorithms/huawei/射击比赛.md" },
          { text: "尼科彻斯定理", link: "/algorithms/huawei/尼科彻斯定理.md" },
          { text: "括号检查", link: "/algorithms/huawei/括号检查.md" },
          {
            text: "按单词下标区间翻转文章内容",
            link: "/algorithms/huawei/按单词下标区间翻转文章内容.md",
          },
          { text: "整数对最小和", link: "/algorithms/huawei/整数对最小和.md" },
          {
            text: "检查是否存在满足条件的数字组合",
            link: "/algorithms/huawei/检查是否存在满足条件的数字组合.md",
          },
          {
            text: "求字符串中所有整数的最小和",
            link: "/algorithms/huawei/求字符串中所有整数的最小和.md",
          },
          { text: "组成最大数", link: "/algorithms/huawei/组成最大数.md" },
          {
            text: "非严格递增连续数字序列",
            link: "/algorithms/huawei/非严格递增连续数字序列.md",
          },
        ],
      },
      {
        text: "LeetCode",
        collapsed: true,
        items: [
          {
            text: "1. 两数之和",
            link: "/algorithms/leetcode/两数之和.md",
          },
          {
            text: "2. 两数相加",
            link: "/algorithms/leetcode/两数相加.md",
          },
          {
            text: "3. 无重复字符的最长字串",
            link: "/algorithms/leetcode/无重复字符的最长字串.md",
          },
          {
            text: "4. 寻找两个正序数组的中位数",
            link: "/algorithms/leetcode/寻找两个正序数组的中位数.md",
          },
          {
            text: "5. 最长回文字串",
            link: "/algorithms/leetcode/最长回文字串.md",
          },
          { text: "9. 回文数", link: "/algorithms/leetcode/回文数.md" },
          {
            text: "10. 正则表达式匹配",
            link: "/algorithms/leetcode/正则表达式匹配.md",
          },
          {
            text: "11. 盛最多水的容器",
            link: "/algorithms/leetcode/盛最多水的容器.md",
          },
          {
            text: "13. 罗马数字转整数",
            link: "/algorithms/leetcode/罗马数字转整数.md",
          },
          {
            text: "14. 最长公共前缀",
            link: "/algorithms/leetcode/最长公共前缀.md",
          },
          {
            text: "20. 有效的括号",
            link: "/algorithms/leetcode/有效的括号.md",
          },
          {
            text: "21. 合并俩个有序链表",
            link: "/algorithms/leetcode/合并俩个有序链表.md",
          },
          {
            text: "26. 删除有序数组中的重复项",
            link: "/algorithms/leetcode/删除有序数组中的重复项.md",
          },
          {
            text: "27. 移除元素",
            link: "/algorithms/leetcode/移除元素.md",
          },
          {
            text: "80. 删除有序数据中的重复项",
            link: "/algorithms/leetcode/删除有序数据中的重复项.md",
          },
          {
            text: "88. 合并两个有序数组",
            link: "/algorithms/leetcode/合并两个有序数组.md",
          },
          {
            text: "121. 买卖股票的最佳时机",
            link: "/algorithms/leetcode/买卖股票的最佳时机.md",
          },
          {
            text: "151. 反转字符串中的单词",
            link: "/algorithms/leetcode/反转字符串中的单词.md",
          },
          {
            text: "169. 多数元素",
            link: "/algorithms/leetcode/多数元素.md",
          },
          {
            text: "189. 轮转数组",
            link: "/algorithms/leetcode/轮转数组.md",
          },
          {
            text: "205. 同构字符串",
            link: "/algorithms/leetcode/同构字符串.md",
          },
          {
            text: "392. 判断子序列",
            link: "/algorithms/leetcode/判断子序列.md",
          },
          {
            text: "724. 寻找数组的中心下标",
            link: "/algorithms/leetcode/寻找数组的中心下标.md",
          },
          {
            text: "1071. 字符串的最大公因子",
            link: "/algorithms/leetcode/字符串的最大公因子.md",
          },
          {
            text: "1111. 有效括号的嵌套深度",
            link: "/algorithms/leetcode/有效括号的嵌套深度.md",
          },
          {
            text: "1480. 一维数组的动态和",
            link: "/algorithms/leetcode/一维数组的动态和.md",
          },
          {
            text: "1507. 转变日期格式",
            link: "/algorithms/leetcode/转变日期格式.md",
          },
          {
            text: "1556. 千位分隔符",
            link: "/algorithms/leetcode/千位分隔符.md",
          },
          {
            text: "2047. 句子中的有效单词数",
            link: "/algorithms/leetcode/句子中的有效单词数.md",
          },
        ],
      },
    ],
  };
  return res;
}
