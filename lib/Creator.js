const inquirer = require('inquirer')
const downloadGitRepo = require('download-git-repo')
const chalk = require('chalk')
const path = require('path')
const { loading, promisify } = require('./util')
const { getRepo, getTagsByRepo } = require('./api')
const { repName } = require('../config')


class Creator {
  constructor(name, targetDir) {
    this.name = name
    this.targetDir = targetDir
    // 转换为 promise 方法
    /**
     * 作用：用来下载远程模版
     * repository: 远程仓库地址
     * ProjectName: 是存放下载文件路径，可直接是文件名, 默认是当前目录
     * options: 一些选项，列：`${clone: boolean}` 表示用http download
     * 还是git clone 的形式下载
     * callback：回调函数
     */
    this.downloadGitRepo = promisify(downloadGitRepo);
  }
  // 创建项目部分
  async create() {
    // 仓库信息 - 模版信息
    let repo = await this.getRepoInfo()

    // 标签信息 - 版本信息
    let tag = await this.getTagInfo(repo)

    // 下载模版
    await this.download(repo, tag);
    // 模版使用提示
    console.log(`\r\nSuccessfully create project ${chalk.cyan(this.name)}`)
    console.log(`\r\n cd ${chalk.cyan(this.name)}`)
    console.log(`   npm install`)
    console.log(`   npm run server\r\n`)

  }


  // 获取模版信息及用户选择的模版
  async getRepoInfo() {
    // 获取仓库信息
    
    let repoList = await loading(
      "waiting for fetching template",
      getRepo
    )
    if (!repoList) return;
    // 获取仓库名
    const repos = repoList.map(item => item.name);

    // 用户选择模版
    const { repo } = await inquirer.prompt([
      {
        name: 'repo',
        type: 'list',
        message: 'Please choose a template to create project',
        choices: repos
      }
    ])
    return repo;


  }

  // 获取版本信息及用户选择版本
  async getTagInfo(repo) {
    let tagList = await loading(
      "waiting for fetching version",
      getTagsByRepo,
      repo
    )

    if (!tagList) return;
    const tags = tagList.map((item) => item.name);
    // 选取模版信息
    const prompt = inquirer.createPromptModule()
    const { tag } = await prompt([
      {
        name: 'tag',
        type: 'list',
        message: 'please chose a version to create project',
        choices: tags
      }
    ])
  
    return tag

  }

  // 下载git 仓库
  async download(repo, tag) {
    // 模版下载地址
    const templateUrl = `${repName}/${repo}#${tag}`;

    // 调用downloadGitRepo 方法将对应模版下载到指定目录
    await loading(
      "downloading template, please wait",
      this.downloadGitRepo,
      templateUrl,
      path.resolve(process.cwd(), this.targetDir) // 项目创建的位置
    )

  }

}

module.exports = Creator;