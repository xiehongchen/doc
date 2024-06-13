const fs = require('fs');
const path = require('path');

function modifyCodeBlocks(filePath) {
  // 读取文件内容
  const content = fs.readFileSync(filePath, 'utf-8');

  // 分割内容以便逐行处理
  const lines = content.split('\n');

  // 初始化标志变量
  let insideCodeBlock = false;
  let codeBlockCount = 0;

  // 遍历每一行
  for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('```')) {
          // 如果遇到代码块标记
          if (insideCodeBlock) {
              insideCodeBlock = false;
          } else {
              insideCodeBlock = true;
              codeBlockCount++;
              lines[i] = '```js';
          }
      }
  }

  // 重新组合修改后的内容
  const modifiedContent = lines.join('\n');

  // 保存修改后的内容到新文件
  const newFilePath = filePath.replace('test.md', '前端/javascript/es6/28、异步遍历器.md');
  fs.writeFileSync(newFilePath, modifiedContent, 'utf-8');
  
  return newFilePath;
}

// 使用示例
const filePath = 'src/test.md';
const newFilePath = modifyCodeBlocks(filePath);
console.log(`Modified file saved as: ${newFilePath}`);
