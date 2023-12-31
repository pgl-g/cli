
const path = require('path');
const fs = require('fs');
const { loading } = require('./util')
const Creator = require('./Creator');
const { default: inquirer } = require('inquirer');

module.exports = async function (projectName, options) {
  // 获取当前工作目录
  const cwd = process.cwd();
  const targetDirectory = path.join(cwd, projectName);

  if (fs.existsSync(targetDirectory)) {
    if (options.force) {
      // 删除重名目录
      await fs.remove(targetDirectory);
    } else {
      await inquirer.prompt([
        // 返回值为promise
        {
          name: 'isOverwrite', // 与返回值对应
          type: 'list',
          message: 'Target directory exists, Please choose an action',
          choices: [
            { name: 'Overwrite', value: true },
            { name: 'Cancel', value: false }
          ]
        }
      ]);
      if (!isOverwrite) {
        return
      } else {
        await loading(
          `Remove ${projectName}, please wait a minute`,
          fs.remove,
          targetDirectory
        )
      }
    }
  }


  // 创建项目
  const creator = new Creator(projectName, targetDirectory);

  creator.create();
}