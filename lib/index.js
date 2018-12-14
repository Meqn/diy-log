const chalk = require('chalk')
const timestamp = require('time-stamp')


const symbols = (function () {
  const isSupported = process.platform !== 'win32' || process.env.CI || process.env.TERM === 'xterm-256color'
  const main = {
    info: chalk.blue('ℹ'),
    success: chalk.green('✔'),
    warn: chalk.yellow('⚠'),
    error: chalk.red('✖')
  }

  const fallbacks = {
    info: chalk.blue('i'),
    success: chalk.green('√'),
    warn: chalk.yellow('‼'),
    error: chalk.red('×')
  }

  return isSupported ? main : fallbacks
}())

/**
 * log方法
 * @param {[Function]} fn 调用方法
 * @param {[Array]} args 传递的参数
 * @param {[String]} prefix 输出前缀
 */
function logFn(fn, args, prefix) {
  if (prefix) {
    process.stdout.write(prefix + ' ')
  }

  fn.apply(console, args)
  return this
}

function log() {
  return logFn(console.log, arguments)
}

function time() {
  const times = timestamp('HH:mm:ss')
  return logFn(console.log, arguments, '[' + chalk.gray(times) + ']')
}

function info() {
  return logFn(console.info, arguments, symbols.info)
}

function error() {
  return logFn(console.error, arguments, symbols.error)
}

function success() {
  return logFn(console.log, arguments, symbols.success)
}

function warn() {
  return logFn(console.warn, arguments, symbols.warn)
}


module.exports = log
module.exports.time = time
module.exports.info = info
module.exports.success = success
module.exports.warn = warn
module.exports.error = error
module.exports.symbols = symbols
