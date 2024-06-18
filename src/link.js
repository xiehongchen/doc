const fs = require("fs");
const path = require("path");

/**
 * 获取文件内容
 * @param {*} content 文件内容
 * @returns
 */
function extractContent(content) {
  return content.replace(/---[\s\S]*?---/, "");
}

/**
 *
 * @param {*} directoryPath 读取目录
 * @param {*} outputPath 输出目录
 * @returns
 */
function readDirectory(directoryPath, outputPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      const fileInfoPromises = [];

      files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        fileInfoPromises.push(
          new Promise((resolve, reject) => {
            fs.stat(filePath, (err, stats) => {
              if (err) {
                reject(err);
                return;
              }

              if (stats.isFile() && path.extname(filePath) === ".md") {
                const fileName = path.basename(
                  filePath,
                  path.extname(filePath)
                );
                processFile(filePath, fileName, outputPath)
                  .then(resolve)
                  .catch(reject);
              } else if (stats.isDirectory()) {
                readDirectory(filePath).then(resolve).catch(reject);
              } else {
                resolve();
              }
            });
          })
        );
      });
      Promise.all(fileInfoPromises).then(resolve).catch(reject);
    });
  });
}
/**
 * 准备写入文件
 * @param {*} filePath 文件地址，这里需要读取文件内容
 * @param {*} fileName 文件名称，后续写入文件需要
 * @param {*} outputPath 文件输出地址
 * @returns
 */
function processFile(filePath, fileName, outputPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) {
        reject(err);
        return;
      }
      const name = `${fileName}`;
      // 删除前4个字符
      const path = filePath.slice(3).replace(/\\/g, "/");
      // 获取text的数字
      const index = Number(fileName.split("、")[0]) || 0
      resolve({ index, name, path });
    });
  });
}

readDirectory("src/前端/typescript", "/src")
  .then((res) => {
    console.log("readDirectory", res);

    // 如果index是数字，按照数字排序，否则删除
    const sort = ['基础类型', '任意类型', '接口和对象类型', '数组类型', '函数扩展', 
    '类型断言 | 联合类型 | 交叉类型', '内置对象&代码雨', 'Class类', '元组类型', '枚举类型', '类型推论|类型别名', 
    'never类型', 'symbol类型', '泛型', 'tsconfig.json配置文件', 'namespace命名空间', '三斜线指令', '声明文件d.ts', 
    'Mixins混入', '装饰器Decorator']
    const list = res.map(item => {
      item.index = sort.findIndex(n => n == item.name)
      return item
    })
      .sort((a, b) => a.index - b.index)
      .map((item) => {
        return {
          text: item.name,
          link: item.path,
        };
      });
    console.log("list", list);
  })
  .catch((error) => {
    // 处理错误
    console.error("error", error);
  });
