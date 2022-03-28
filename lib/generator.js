const inquirer = require('inquirer')
const fsExtra = require('fs-extra')
const download = require('download-git-repo')
const ora = require('ora')
const execa = require('execa')
const log = require('./log')
const pkg = require('../package.json')

/**
 * @param {*} prompt 询问选项
 * @param {*} action 询问后的执行函数
 */
const generator = (prompt, action) => {
    inquirer
        .prompt(prompt)
        .then((answers) => {
            action(answers)
        })
        .catch((error) => {
            if (error.isTtyError) {
                log.error(`Prompt couldn't be rendered in the current environment`)
            } else {
                log.error(error)
            }
        })
}

const spinner = ora('下载模板中...')

const successInfo = (name) => {
    spinner.succeed()
    log.success(`🎉  成功创建模板 ${name}.`)
}

const SY_PROMPTS = [
    {
        name: 'temp',
        message: '选择模板',
        type: 'list',
        choices: [
            {
                name: '公共业务模板',
                value: 'commonWfTemplate'
            },
            {
                name: '公共功能模板',
                value: 'commonModule'
            }
        ]
    }
]

// 通过本地创建模板
const syGenerator = (name) => {
    generator(SY_PROMPTS, async (answers) => {
        spinner.start()
        let _path = await execa.commandSync('npm root -g').stdout
        fsExtra.copy(`${_path}/${pkg.name}/generators/${answers.temp}`, `./${name}`, (err) => {
            if (err) {
                spinner.fail()
                log.error(err)
                return
            }
            successInfo(name)
        })
    })
}

const GIT_PROMPTS = [
    {
        name: 'version',
        message: '输入git地址',
        type: 'input',
        name: 'git'
    }
]

// 通过git创建模板
const gitGenerator = (name) => {
    generator([], (answers) => {
        spinner.start()
        download(`direct:${pkg.templateUrl.wf}`, name, { clone: true }, (err) => {
            if (err) {
                spinner.fail()
                log.error(err)
            } else {
                successInfo(name)
            }
        })
    })
}

module.exports = {
    gitGenerator,
    syGenerator
}
