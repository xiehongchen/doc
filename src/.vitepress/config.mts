import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
const title = "xiehongchen";
const titleTemplate = "记录学习过程的问题";
const description = "基于 VitePress 构建的个人博客网站";
// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    lastUpdated: true,
    ignoreDeadLinks: true,
    base: "/doc/",
    title,
    titleTemplate,
    description,
    cleanUrls: true,
    head: [["link", { rel: "icon", href: "/doc/logo.jpeg" }]],
    markdown: {
      image: {
        lazyLoading: true,
      },
    },
    themeConfig: {
      siteTitle: "xiehongchen",
      logo: "/logo.jpeg",
      search: {
        provider: "local",
        options: {
          locales: {
            zh: {
              translations: {
                button: {
                  buttonText: "搜索文档",
                  buttonAriaLabel: "搜索文档",
                },
                modal: {
                  noResultsText: "无法找到相关结果",
                  resetButtonTitle: "清除查询条件",
                  footer: {
                    selectText: "选择",
                    navigateText: "切换",
                  },
                },
              },
            },
          },
        },
      },
      outline: "deep",
      outlineTitle: "当前页导航",
      docFooter: {
        prev: "上一篇",
        next: "下一篇",
      },
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        {
          text: "前端基础",
          items: [
            {
              text: "HTML",
              link: "/前端/html/",
            },
            { text: "CSS", link: "/前端/css/" },
            {
              text: "JavaScript",
              link: "/前端/javascript/",
            },
          ],
        },
        {
          text: "前端进阶",
          items: [
            {
              text: "TypeScript",
              link: "/前端/typescript/",
            },
            {
              text: "Vue",
              link: "/前端/vue/",
            },
            {
              text: "React",
              link: "/前端/react/",
            },
          ],
        },
        {
          text: "其他",
          link: "/其他",
        },
        {
          text: "算法",
          link: "/算法",
        },
        {
          text: "后端",
          items: [{ text: "Node", link: "/后端/node/" }],
        },
      ],
      sidebar: {
        // 前端
        "/前端/html/": [{ text: "HTML", link: "/前端/html/index.md" }],
        "/前端/css/": [{ text: "CSS", link: "/前端/html/index.md" }],
        "/前端/javascript/": [
          { text: "javascript", link: "/前端/javascript/index.md" },
          { text: "ES6", link: "/前端/javascript/ES6.md" },
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
        ],
        "/前端/typescript/": [
          { text: "typescript", link: "/前端/typescript/index.md" },
        ],
        "/前端/vue/": [
          { text: "Vue", link: "/前端/vue/index.md" },
          { text: "Vue2", link: "/前端/vue/vue2.md" },
        ],
        "/前端/react/": [{ text: "React", link: "/前端/react/index.md" }],
        "/后端/node/": [{ text: "node", link: "/后端/node/index.md" }],
        "/其他": [
          { text: "其他", link: "/其他/index.md" },
          { text: "前端学习", link: "/其他/前端学习.md" },
        ],
        "/算法": [
          { text: "算法", link: "/算法/index.md" },
          {
            text: "华为机考",
            collapsed: false,
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
            collapsed: false,
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
      },

      socialLinks: [{ icon: "github", link: "https://github.com/xiehongchen" }],
      // 页脚配置
      // footer: {
      //   message:
      //     '用心去做高质量的专业前端内容网站，欢迎 <a style="color: #0066ff" href="https://github.com/clin211/clin-notes">star ⭐</a> 让更多人发现',
      //   copyright:
      //     "MIT License | 版权所有 © 2023-2024 changlin and clin211 contributors",
      // },
      // github 编辑链接
      editLink: {
        pattern: "https://github.com/xiehongchen/doc/blob/master/src/:path",
        text: "在 GitHub 上编辑此页",
      },
      // 最后更新时间的显示文本
      lastUpdatedText: "最后一次更新于",
    },
    pwa: {
      outDir: ".vitepress/dist", // 输出目录
      registerType: "autoUpdate", // 注册类型为自动更新
      includeManifestIcons: false, // 不包含清单图标
      manifest: {
        id: "/", // 清单 ID
        name: title, // 应用名称
        short_name: title, // 应用的短名称
        description: description, // 应用的描述
        theme_color: "#ffffff", // 主题颜色
        icons: [
          {
            src: "/doc/pwa-120x120.png", // 图标路径
            sizes: "120x120", // 图标尺寸
            type: "image/png", // 图标类型
          },
          {
            src: "/doc/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/doc/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"], // 匹配需要缓存的文件类型
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i, // 匹配需要缓存的 Google 字体
            handler: "CacheFirst", // 缓存优先策略
            options: {
              cacheName: "google-fonts-cache", // 缓存名称
              expiration: {
                maxEntries: 10, // 最大缓存条目数
                maxAgeSeconds: 60 * 60 * 24 * 365, // 缓存有效期，365天
              },
              cacheableResponse: {
                statuses: [0, 200], // 缓存的响应状态码
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i, // 匹配需要缓存的 Google 字体
            handler: "CacheFirst", // 缓存优先策略
            options: {
              cacheName: "gstatic-fonts-cache", // 缓存名称
              expiration: {
                maxEntries: 10, // 最大缓存条目数
                maxAgeSeconds: 60 * 60 * 24 * 365, // 缓存有效期，365天
              },
              cacheableResponse: {
                statuses: [0, 200], // 缓存的响应状态码
              },
            },
          },
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i, // 匹配需要缓存的 jsdelivr 图片
            handler: "NetworkFirst", // 网络优先策略
            options: {
              cacheName: "jsdelivr-images-cache", // 缓存名称
              expiration: {
                maxEntries: 10, // 最大缓存条目数
                maxAgeSeconds: 60 * 60 * 24 * 7, // 缓存有效期，7天
              },
              cacheableResponse: {
                statuses: [0, 200], // 缓存的响应状态码
              },
            },
          },
        ],
      },
    },
  })
);
