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

              if (stats.isFile() && path.extname(filePath) === ".js") {
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
      writeToFile(fileContents, outputPath, name)
      .then(() => {
        resolve(); // 在写文件完成后 resolve Promise
      })
      .catch(reject);
    });
  });
}
/**
 * 将js文件转换成代码块的md文件
 * @param {*} file 文件内容
 * @param {*} pathName 文件输出地址
 * @param {*} fileName 文件名
 * @returns 
 */
function writeToFile(file, pathName, fileName) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(pathName, fileName);
    let content = `\`\`\`javascript\n${file}\n\`\`\``;
    fs.mkdir(pathName, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
            reject(err);
            return;
        }
        
        fs.writeFile(outputPath, content, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                reject(err);
                return;
            }
            
            console.log('File written successfully.');
            resolve();
        });
    });
});
}

readDirectory("src/算法/机考", "src/算法/华为机考")
  .then((res) => {
    console.log('readDirectory', res)
  })
  .catch((error) => {
    // 处理错误
    console.error("error", error);
  });

