> [尚硅谷Webpack5学习视频](https://www.bilibili.com/video/BV14T4y1z7sw/)

# 基础

## 基本配置

webpack 五个核心概念

- Entry

入口(Entry)指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图 

- Output

输出(Output)指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名

- Loader

Loader 让 webpack 能 够 去 处 理 那 些 非 JavaScript 文 件 (webpack 自 身 只 理 解 JavaScript)

- Plugins

插件(Plugins)可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩， 一直到重新定义环境中的变量等

- Mode

**development**

- 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin
- 特点：能让代码本地调试 运行的环境	

**production**

- 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 production。启用FlagDependencyUsagePlugin, FlagIncludedChunksPlugin,ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin
- 能让代码优化上线 运行的环境

```js
const path = require("path");   // nodejs核心模块，专门用来处理路径问题

module.exports = {
    // 入口
    entry:"./src/main.js",  // 相对路径
    // 输出
    output: {
        // 文件的输出路径
        // __dirname nodejs的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname,"dist"),  // 绝对路径
        // 文件名
        filename: "main.js",
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
        ],
    },
    // 插件
    plugins: [
        // plugin的配置
    ],
    // 模式
    mode: "development",
};
```

## 安装

```shell
npm install webpack webpack-cli -D
```

编译

```shell
npx webpack
```

## 开发模式

- 就是写代码

## 处理样式资源

### 处理css资源

安装`css-loader`和`style-loader`

```shell
npm install --save-dev css-loader style-loader
```

使用

```js
import css from "file.css";
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
            "style-loader", 
            "css-loader"
        ],
      },
    ],
  },
};
```

### 处理less资源

安装`less`和`less-loader`

```shell
npm install less less-loader --save-dev
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
};
```

### 处理sass资源

安装`sass`和`sass-loader`

```shell
npm install sass-loader sass webpack --save-dev
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
    ],
  },
};
```

## 处理图片资源

```js
module.exports = {
  module: {
    rules: [
      {
		test: /\.(png|jpe?g|gif|webp|svg)$/,
		type: 'asset',
		parser: {
			dataUrlCondition: {
                // 小于10kb的图片转base64
                // 优点：减少请求数量   缺点：体积会更大
				maxSize: 10 * 1024 // 10
				}
			}
	  }，
      generator: {
	    // 输出图片名称
        // [hash10] hash值取10位
      	filename: "static/images/[hash:10][ext][query]",
      }  
    ],
  },
};
```

## 处理字体图标资源

```js
module.exports = {
  module: {
    rules: [
	 	{
            test: /\.(ttf|woff2?)$/,
            type: 'asset/resource',
            generator: {
                // 输出名称
                // [hash10] hash值取10位
                filename: "static/media/[hash:10][ext][query]",
            }
        },
    ],
  },
};
```

## 处理其他资源

```js
module.exports = {
  module: {
    rules: [
	 	{
            // 在这里直接加就行
            test: /\.(ttf|woff2?|mp3|mp4)$/,
            type: 'asset/resource',
            generator: {
                // 输出名称
                // [hash10] hash值取10位
                filename: "static/media/[hash:10][ext][query]",
            }
        },
    ],
  },
};
```

## 处理js资源

- eslint——代码格式，语法
- Babel——兼容性

### eslint

#### 配置文件

`.eslintrc.js`

```js
module.exports = {
    // 继承 Eslint规则
    extends: ["eslint:recommended"],
    env: {
        node: true, // 启用node中全局变量
        browser: true, // 启用浏览器中全局变量
    },
    parserOptions: {
        ecmaVersion: 6, //es6
        sourceType: "module",   //es module
    },
    rules: {
        "no-var": 2, // 不能使用var定义变量
    }
}
```

`.eslintignore`

- 忽略打包文件

去官网看

#### **使用**

安装

```shell
npm install eslint-webpack-plugin eslint  --save-dev
```

**webpack.config.js**

```js
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // ...
  plugins: [new ESLintPlugin(options)],
  // ...
};
```

### Babel

安装

```shell
npm install -D babel-loader @babel/core @babel/preset-env
```

**webpack.config.js**

```javascript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

## 处理HTMl资源

安装

```shell
npm install --save-dev html-webpack-plugin
```

使用

```js
ndle。 只需添加该插件到你的 webpack 配置中，如下所示：

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

## 开发服务器&自动化

 自动化编译

**安装**

```shell
npm i webpack-dev-server -D
```

**配置**

```js
module.exports = {
  entry: 'index.js',
  // 开发服务器
  devServer: {
  hsot:"localhost",   // 启动服务器域名
  port:"3000",    // 启动服务器端口号
  open:true,  // 是否自动打开浏览器
  },
};
```

**使用**

```shell
npx webpack server
```

## 生产模式

- 主要对代码进行优化

### 区分开发模式和生产模式

创建`config`文件夹，用来存放不同模式的配置文件

- `webpack.dev.js`开发模式的配置文件
- `webpack.prod.js`生产模式的配置文件

**使用**

- 开发模式

```shell
npx webpack server --config ./config/webpack.dev.js
```

- 生产模式

```
npx webpack --config ./config/webpack.prod.js
```

在`package.json`配置快捷

```json
{
  "scripts": {
    "start":"npm run dev",
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev":"webpack server --config ./config/webpack.dev.js",
    "build":"webpack --config ./config/webpack.prod.js"
  },
}
```

后面直接 `npm start` 就是开发环境的了

`npm run build` 就是生产环境的了

## Css处理

### 提取Css成单独文件

Css文件目前被打包到js文件中，当js文件加载时，会创建一个style标签来生成样式

这样对于网站来说，会出现闪屏现象

- 应该时单独的Css文件，通过link标签加载性能才好

安装

```
npm install --save-dev mini-css-extract-plugin
```

**webpack.config.js**

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        //更新之前的css
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

### Css兼容性处理

安装

```
npm i postcss-loader postcss postcss-preset-env -D
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
```

### 封装样式loader函数

### Css压缩

安装

```
npm install css-minimizer-webpack-plugin --save-dev
```

**webpack.config.js**

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};
```