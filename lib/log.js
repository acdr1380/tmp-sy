const chalk = require('chalk')
const logSymbols = require('chalk')

module.exports = {
    // 输出带图标
    successIcon: (text) => console.log(logSymbols.success, chalk.green(text)),
    infoIcon: (text) => console.log(logSymbols.info, chalk.blue(text)),
    warningIcon: (text) => console.log(logSymbols.warning, chalk.yellow(text)),
    errorIcon: (text) => console.log(logSymbols.error, chalk.red(text)),

    // 不带图标
    success: (text) => console.log(chalk.green(text)),
    info: (text) => console.log(chalk.blue(text)),
    bash: (text) => console.log(chalk.cyan(`$ ${text}`)),
    warning: (text) => console.log(chalk.yellow(text)),
    error: (text) => console.log(chalk.red(text))
}
