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
      const fileContents = extractContent(content);

      const name = fileName + ".md";
      console.log('filePath', filePath)
    });
  });
}

readDirectory("src/前端/css", "/src")
  .then((res) => {
    console.log('readDirectory', res)
  })
  .catch((error) => {
    // 处理错误
    console.error("error", error);
  });

