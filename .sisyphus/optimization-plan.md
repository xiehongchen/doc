# 目录结构优化方案

## 优化原则

1. **保持中文内容** - 文件内容保持中文，仅优化文件名
2. **最小化改动** - 保持现有内容结构，主要规范化命名
3. **URL 友好** - 文件名转换后 URL 简洁清晰
4. **向后兼容** - 提供迁移对照表，方便查找

---

## 优化方案详情

### 一、文件命名规范

#### 命名规则
| 原格式 | 新格式 | 示例 |
|-------|-------|------|
| 空格分隔 | 连字符 `-` | `JavaScript 基础.md` → `javascript-basics.md` |
| 中文顿号 | 连字符 `-` | `1、简介.md` → `01-intro.md` |
| 特殊符号 | 移除或替换 | `html&css.md` → `html-css.md` |
| 纯中文 | 拼音/英文 | `面试题` → `interview` |

#### 目录命名
- 全部使用**小写英文**
- 使用**连字符**分隔单词
- 保持语义清晰

---

### 二、目录结构调整

#### 优化前
```
src/
├── 前端/
│   ├── javascript/
│   │   ├── es6/           # 3 层，28 个文件
│   │   └── JavaScript 基础.md
│   └── vue/
│       └── vue3/          # 3 层
```

#### 优化后
```
src/
├── frontend/
│   ├── javascript/
│   │   ├── es6/           # 保持，但文件重命名
│   │   │   ├── 01-intro.md
│   │   │   ├── 02-let-const.md
│   │   │   └── ...
│   │   └── dom-bom.md
│   └── vue/
│       └── vue3/
│           ├── 01-setup.md
│           └── ...
```

---

### 三、具体重构计划

#### 1. 顶层目录重命名
| 原目录 | 新目录 | 说明 |
|-------|-------|------|
| `前端` | `frontend` | 前端技术 |
| `后端` | `backend` | 后端技术 |
| `算法` | `algorithms` | 算法题解 |
| `面试题` | `interview` | 面试专题 |
| `其他` | `misc` | 其他技术 |

#### 2. 前端目录重构
```
frontend/
├── basics/              # 基础三件套
│   ├── html/
│   │   └── index.md
│   ├── css/
│   │   ├── index.md
│   │   └── css-guide.md
│   └── javascript/
│       ├── index.md
│       ├── basics.md
│       ├── es6/
│       │   ├── 01-intro.md
│       │   ├── 02-let-const.md
│       │   └── ... (28 章)
│       ├── dom-bom.md
│       ├── oop.md
│       ├── async.md
│       └── ... (其他专题)
├── typescript/
│   ├── 01-basic-types.md
│   ├── 02-any-type.md
│   └── ...
├── vue/
│   ├── index.md
│   ├── vue2.md
│   └── vue3/
│       ├── 01-setup.md
│       └── ...
├── react/
│   ├── 01-intro.md
│   ├── 02-jsx.md
│   └── ...
└── engineering/         # 工程化
    └── index.md
```

#### 3. 后端目录重构
```
backend/
├── nodejs/
│   ├── index.md
│   ├── fs-module.md
│   ├── os-module.md
│   ├── path-module.md
│   ├── http-module.md
│   ├── modules.md
│   └── npm-packages.md
├── express/
│   └── index.md
└── java/
    ├── index.md
    ├── jdbc.md
    └── mysql.md
```

#### 4. 算法目录重构
```
algorithms/
├── index.md
├── sorting/
│   ├── bubble-sort.md
│   ├── selection-sort.md
│   ├── insertion-sort.md
│   └── quick-sort.md
├── huawei/              # 华为机考
│   ├── HJ5-number-base-conversion.md
│   ├── HJ10-char-count.md
│   └── ...
└── leetcode/
    ├── 001-two-sum.md
    ├── 002-add-two-numbers.md
    └── ...
```

#### 5. 面试目录重构
```
interview/
├── index.md
├── html-css.md
├── javascript.md
├── vue.md
├── react.md
├── browser.md
└── network.md
```

#### 6. 杂项目录重构
```
misc/
├── index.md
├── webpack/
│   ├── basics.md
│   ├── advanced.md
│   └── projects.md
├── tools/
│   ├── git.md
│   └── git-commands.md
├── utils/
│   ├── date-utils.md
│   ├── file-upload.md
│   ├── payment.md
│   └── ...
└── guides/
    ├── frontend-learning.md
    └── monorepo-setup.md
```

---

### 四、静态资源重组

#### 优化前
```
public/
├── images/
│   └── 其他/
│       └── xxx.jpg
└── logo.jpeg
```

#### 优化后
```
public/
├── images/
│   ├── common/          # 公共图片
│   │   └── logo.jpeg
│   ├── frontend/        # 前端相关
│   ├── backend/         # 后端相关
│   └── algorithms/      # 算法相关
├── icons/
│   ├── pwa-120x120.png
│   ├── pwa-192x192.png
│   └── pwa-512x512.png
└── downloads/           # 下载资源
```

---

### 五、配置文件更新

#### 需要更新的文件
1. `src/.vitepress/config.mts` - 更新所有路由链接
2. `src/.vitepress/utils/createSidebar.ts` - 更新侧边栏配置
3. 所有 Markdown 文件内的内部链接

---

### 六、迁移对照表（示例）

#### 前端目录
| 原路径 | 新路径 |
|-------|-------|
| `/前端/html/index.md` | `/frontend/basics/html/index.md` |
| `/前端/javascript/ES6.md` | `/frontend/javascript/es6.md` |
| `/前端/javascript/es6/1、简介.md` | `/frontend/javascript/es6/01-intro.md` |
| `/前端/vue/vue3/1、创建 Vue3.0 工程.md` | `/frontend/vue/vue3/01-setup.md` |

#### 算法目录
| 原路径 | 新路径 |
|-------|-------|
| `/算法/快速排序.md` | `/algorithms/sorting/quick-sort.md` |
| `/算法/leetcode/1、E-两数之和.md` | `/algorithms/leetcode/001-two-sum.md` |
| `/算法/华为机考/HJ5-E-进制转换.md` | `/algorithms/huawei/HJ5-number-base-conversion.md` |

---

### 七、实施步骤

1. **备份现有项目** - Git 提交当前状态
2. **创建新目录结构** - 按新规范创建目录
3. **移动并重命名文件** - 批量处理
4. **更新配置文件** - config.mts, createSidebar.ts
5. **更新内部链接** - 批量替换 Markdown 链接
6. **验证构建** - 运行 `pnpm docs:build`
7. **更新路由跳转** - 设置旧链接重定向（可选）

---

### 八、优势总结

| 优化项 | 优化前 | 优化后 |
|-------|-------|-------|
| URL 长度 | `/前端/javascript/es6/1、简介.md` → `%E5%89%8D%E7%AB%AF/...` | `/frontend/javascript/es6/01-intro.md` |
| 可读性 | 中文 URL 编码后难以识别 | 清晰的英文标识符 |
| 一致性 | 多种命名混用 | 统一连字符命名 |
| 可维护性 | 分类不够清晰 | 模块化组织 |
| 搜索友好 | 编码 URL 不利于分享 | 简洁 URL 易于传播 |

---

### 九、注意事项

⚠️ **重要**: 此优化会改变所有页面 URL，需要：
1. 更新所有内部链接
2. 如果有外部链接指向你的文档，需要设置重定向
3. GitHub Pages 部署后，旧链接将失效

**建议**: 
- 在 `gh-pages` 分支部署前完成迁移
- 考虑在网站添加旧链接检测
- 保留一份对照表供参考

---

*优化方案版本：v1.0*
*生成日期：2026-04-06*
