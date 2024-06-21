## npm和包

### 1、什么是包

- Node.js 中的第三方模块叫做包

### 2、包的作用

- 由于Node.js的内置模块仅提供了一些底层API，导致在基于内置模块进行项目开发时，效率很低
- 包是基于内置模块封装出来的，提供了更高级、更方便的API，极大的提高了效率
- 包和内置模块的关系，相当于jQuery和浏览器内置API的关系

<!-- ![image-20221108210147450](C:\Users\谢红尘\AppData\Roaming\Typora\typora-user-images\image-20221108210147450.png) -->

### 3、npm

- 安装

```sh
npm install <Module Name>
npm i <Module Name>
//	这个自动安装最新版本

npm install express@2.2.1	#指定版本
npm install express          # 本地安装
npm install express -g   	# 全局安装	
```

- 卸载	

```sh
npm uninstall <Module Name>

npm uninstall express
//	会从dependencies节点中删除
npm uninstall express -g	#卸载全局包
```

- 更新

```sh
npm update <Module Name>

npm update express
```

- 搜索

```sh
npm search <Module Name>

npm search express
```

- 其他
```sh
# 查看指定包的详细信息
npm info <package-name>

# 列出当前项目中安装的所有包
npm list

# 列出当前项目中需要更新的包
npm outdated

# 检查当前项目中的依赖项是否存在安全漏洞
npm audit

# 发布自己开发的包到 npm 库中
npm publish

# 登录到 npm 账户
npm login

# 注销当前 npm 账户
npm logout

# 将本地模块链接到全局的 node_modules 目录下
npm link

# 用于列出所有的 npm 配置信息。执行该命令可以查看当前系统和用户级别的所有 npm 配置信息，以及当前项目的配置信息（如果在项目目录下执行该命令）
npm config list

# 用于获取当前 npm 配置中的 registry 配置项的值。registry 配置项用于指定 npm 包的下载地址，如果未指定，则默认使用 npm 官方的包注册表地址
npm get registry

# 将 registry 配置项的值修改为指定的 <registry-url> 地址
npm set registry npm config set registry <registry-url>
```

### 4、包管理配置文件

- npm规定，在项目根目录中，必须提供一个叫做 `package.json` 的包管理配置文件，用来记录与项目相关的一些配置信息
- 例如
  - 项目的名称、版本号、描述等
  - 项目中都用到了哪些包
  - 哪些包只在开发期间会用到
  - 哪些包在开发和部署时都需要用到

#### 创建package.json

```sh
//	作用：在执行命令所处的目录中，快速新建 package.json 文件
npm init -y
```

- 项目文件夹的名称不能使用中文，不能有空格

#### dependencies节点

- 记录使用npm install 命令安装了哪些包

如果有些包只在项目开发阶段用到，上线之后用不到，就把这些包放到devDependencies节点中

如果有些包在项目开发和上线阶段用到，就把这些包放到dependencies节点中

```sh
//	安装指定的包，并记录到 devDependencies 节点中
npm i 包名 -D
//	等价于,完整写法	包名和-D顺序不重要
npm install 包名 --save-dev
```

```
npm config set registry=https://registry.npm.taobao.org/
```

#### 一次性安装所有的包

可以运行 `npm install` 或`npm i` 一次性安装所有的依赖包

```sh
//	执行npm install 命令时，npm 包管理工具先读取 package.json 中的 dependencies 节点
//	读取到记录的所有依赖包名称和版本号后，npm 包管理工具会把这些包一次性下载到项目中
npm install
npm i
```

#### 包的分类

##### 1.项目包

那些被安装到项目的 node_modules 目录的包都是项目包

- 开发依赖包	(devDependencies)
- 核心依赖包     (dependencies)

##### 2.全局包

在 `C:\Users\用户目录\AppData\Roaming\npm\node_modules`目录下

- 工具性质的包，才有全局安装的必要性
- 参考官方提供的使用说明

##### ３.i5ting_toc

可以把md文档转为html页面的小工具

```sh
i5ting_toc -f 要转换的md文件路径 -o
// -o 转换完后使用默认浏览器打开
```

### 5、规范的包结构

一个规范的包，它的组成结构，必须符合以下３点要求：

- 包必须以单独的目录而存在
- 包的顶级目录下要必须包含 这个包管理配置文件
- `package.json` 中必须包含 name，verson，main 这个是三个属性，分别代表包的名字、版本号、包的入口

###  6、开发属于自己的包

初始化包的基本结构

- 新建itheima-tools文件夹，作为包的根目录
- 在itheima-tools文件夹中，新建如下三个文件：
  - package.json	(包管理配置文件)
  - index.js   (包的入口文件)
  - README.md   (包的说明文档)

### 7、发布npm包

