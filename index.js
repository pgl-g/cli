// 作用：处理控制台命令，解析用户操作的命令、解析参数的作用
// TODO: 最终版本应该是10.x以上，但是bug比较多所以固定9版本
const program = require('commander')

// 控制台命令的美化效果
const chalk = require('chalk')
// 命令行交互
const inquirer = require('inquirer');

// 设置字体
const figlet = require('figlet');

// 设置loading效果
const ora = require('ora');

const { version } = require('./package.json')

// 设置包名、版本名
program.name("create-pgl-app").usage(`<command>[option]`).version(`v${version}`);
program
  .command("create <project-name>")// 增加创建命令
  .description("create a new project") // 增加描述文件
  .option("-f, --force", "overwrite target directory if it exists") // 增加命令行参数 强制覆盖
  .action((projectName, cmd) => {
    // 处理用户输入create 指令附加的参数
    require("./lib/create")(projectName, cmd);
  })

// program
// .command("create <project-name>")// 增加创建命令
// .description("create a new project") // 增加描述文件
// .option("-g, --get <key>", "get value by key") // 增加命令行参数 强制覆盖
// .option("-s, --set <key>", "set option[key] is value") // 增加命令行参数 强制覆盖
// .option("-d, --delete <key>", "delete option by key") // 增加命令行参数 强制覆盖
// .action((value, keys) => {
//     console.log(value, keys);
// })

program.on("--help", function () {
  console.log(
    "\r\n" + figlet.textSync("create-pgl-app", {
      font: '3D-ASCII',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    })
  );
})



// console.log(`${chalk.green.underline.bold("for")} me`);

// new inquirer.prompt([
//     {
//         name: 'vue',
//         type: 'checkbox',
//         message: 'Check the features needed for your project:',
//         choices: [
//             { name: 'Babel',  checked: true },
//             { name: 'TypeScript' }, 
//         ]
//     }
// ]).then(answers => {
//     console.log(answers);
// })

// console.log(
//     "\r\n" + figlet.textSync("pgl-cli", {
//         font: 'Ghost',
//         horizontalLayout: 'default',
//         verticalLayout: 'default',
//         width: 80,
//         whitespaceBreak: true
//     })
// );


program.parse(process.argv);