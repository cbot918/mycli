const log = console.log; // 偷懶用xD
const { exec } = require("child_process");

// 主函式
const main = async () => {
  if (process.argv.length === 2) {
    // process.argv:
    // 正常要: [node main.js a.png]
    // 如果忘了給檔名: [node main.js]
    log("example command: ");
    log("mycli picture.png");
    return;
  }

  // 讀入使用者給的檔名
  const source = process.argv[2];
  const output = "output";

  zip(source, output);
};

// zip 用來壓縮圖片
function zip(pictureName, fileName) {
  // exec 可以用來執行指令
  exec(`zip ${fileName}.zip ${pictureName}`, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

main();
