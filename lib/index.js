#!/usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')
const updateNotifier = require('update-notifier')
const log = require('./log')
const fs = require('fs')
updateNotifier({ pkg }).notify({ isGlobal: true })
const { gitGenerator, syGenerator } = require('./generator')

/**
 * program 命令询问和帮助，如果没有输入任何参数则输出帮助查看命令
 */
program.version(pkg.version, '-v, --version').usage('<command> [options]').description('模板版本')

program
    .command('init [name]')
    .description('创建模块')
    .option('-g, --git', '使用git模板')
    .action((name, options) => {
        if (!name) return log.error('请输入模块名称')
        // 判断本地目录是否已经存在
        if (fs.existsSync(name)) return log.error('本地文件已存在')
        if (options.git) {
            gitGenerator(name)
        } else {
            syGenerator(name)
        }
    })

program.parse(process.argv)

const commandName = program.args.length
if (!commandName) {
    program.help()
}
