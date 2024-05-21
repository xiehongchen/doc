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
    head: [
      ["link", { rel: "icon", href: "/favicon.ico" }],
    ],
    markdown: {
      image: {
        lazyLoading: true
      }
    },
    themeConfig: {
      siteTitle: "xiehongchen",
      logo: "/seal.png",
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
            }
          ],
        },
        {
          text: "前端进阶",
          items: [
            {
              text: "Vue",
              link: "/前端/vue/",
            },
            {
              text: "React",
              link: "/前端/react/",
            }
          ],
        },
        {
          text: '其他',
          link: '/其他'
        },
        {
          text: "后端",
          items: [{ text: "Node", link: "/后端/go/" }],
        },
      ],
      sidebar: {
        // 前端
        "/前端/html/": [
          { text: "HTML", link: "/前端/html/index.md" },
        ],
        "/前端/css/": [
          { text: "CSS", link: "/前端/html/index.md" },
        ],
        "/前端/javascript/": [
          {
            text: "JavaScript",
            link: "/前端/javascript/index.md",
          },
          {
            text: "初识JavaScript",
            link: "/前端/javascript/01初识JavaScript.md",
          },
          {
            text: "变量、作用域与内存",
            link: "/前端/javascript/04变量、作用域与内存.md",
          },
          {
            text: "引用值与原始值",
            link: "/前端/javascript/05引用值与原始值.md",
          },
        ],
        "/前端/vue/": [
          { text: "Vue", link: "/前端/vue/index.md" },
        ],
        "/前端/react/": [
          { text: "React", link: "/前端/react/index.md" },
        ],
        "/前端/next/": [
          { text: "Next.js", link: "/前端/next/index.md" },
        ],
        "/前端/react-native/": [
          {
            text: "React Native",
            link: "/前端/react-native/index.md",
          },
        ],
        "/前端/flutter/": [
          { text: "Flutter", link: "/前端/html/flutter.md" },
        ],
        "/后端/go/": [
          { text: "Go语言", link: "/后端/go/index.md" },
          {
            text: "Go的前世今生",
            link: "/后端/go/01Go的前世今生.md",
          },
          {
            text: "Go的变量、常量和作用域",
            link: "/后端/go/02Go的变量、常量和作用域.md",
          },
          {
            text: "Go语言中的字符串",
            link: "/后端/go/03Go语言中的字符串.md",
          },
        ],
        "/其他": [
          {
            text: "Go语言中的字符串",
            link: "/后端/go/03Go语言中的字符串.md",
          },
        ]
      },

      socialLinks: [
        { icon: "github", link: "https://github.com/xiehongchen" },
      ],
      // 页脚配置
      // footer: {
      //   message:
      //     '用心去做高质量的专业前端内容网站，欢迎 <a style="color: #0066ff" href="https://github.com/clin211/clin-notes">star ⭐</a> 让更多人发现',
      //   copyright:
      //     "MIT License | 版权所有 © 2023-2024 changlin and clin211 contributors",
      // },
      // github 编辑链接
      editLink: {
        pattern: 'https://github.com/xiehongchen/doc/blob/master/src/:path',
        text: "在 GitHub 上编辑此页",
      },
      // 最后更新时间的显示文本
      lastUpdatedText: "最后一次更新于"
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
            src: "/images/pwa-120x120.png", // 图标路径
            sizes: "120x120", // 图标尺寸
            type: "image/png", // 图标类型
          },
          {
            src: "/images/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/pwa-512x512.png",
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
