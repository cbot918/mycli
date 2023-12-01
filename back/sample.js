const inquirer = require("inquirer");
const chalk = require("chalk");
const shell = require("shelljs");

const askQuestions = () => {
  const questions = [
    {
      name: "FILENAME",
      type: "input",
      message: "What is the name of the file without extension?",
    },
    {
      type: "list",
      name: "EXTENSION",
      message: "What is the file extension?",
      choices: [".rb", ".js", ".php", ".css"],
      filter: function (val) {
        return val.split(".")[1];
      },
    },
  ];
  return inquirer.prompt(questions);
};

const createFile = (filename, extension) => {
  const filePath = `${process.cwd()}/${filename}.${extension}`;

  // 這個 touch 是 nodejs套件封好可以直接呼叫, 但應該也可以直接用另個檔案 zip.js 裡面的 exec 下指令就好
  shell.touch(filePath);
  return filePath;
};

const success = (filepath) => {
  console.log(chalk.white.bgGreen.bold(`Done! File created at ${filepath}`));
};

const run = async () => {
  // ask questions
  const answers = await askQuestions();
  const { FILENAME, EXTENSION } = answers;

  // create the file
  const filePath = createFile(FILENAME, EXTENSION);

  // show success message
  success(filePath);
};

run();
