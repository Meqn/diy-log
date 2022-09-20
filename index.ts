import isUnicodeSupported from 'is-unicode-supported'
import colors from 'picocolors'
import timestamp from 'time-stamp'

const symbols = (function () {
  const main = {
    info: colors.blue('ℹ'),
    success: colors.green('✔'),
    warn: colors.yellow('⚠'),
    error: colors.red('✖')
  }

  const fallbacks = {
    info: colors.blue('i'),
    success: colors.green('√'),
    warn: colors.yellow('‼'),
    error: colors.red('×')
  }

  return isUnicodeSupported() ? main : fallbacks
}())

/**
 * log函数
 * @param {function} fn 调用方法
 * @param {array<any>} args 输出参数
 * @param {string} prefix 输出前缀
 */
 function logFn<F extends (...args: any[]) => void, P extends Parameters<F>>(fn: F, args: P, prefix?: string) {
  if (prefix) {
    process.stdout.write(prefix + ' ')
  }
  fn.apply(console, args)
  // return this
}

function log() {
  return logFn(console.log, [...arguments])
}

function time() {
  const times = timestamp('HH:mm:ss')
  return logFn(console.log, [...arguments], '[' + colors.gray(times) + ']')
}

function info() {
  return logFn(console.info, [...arguments], symbols.info)
}

function error() {
  return logFn(console.error, [...arguments], symbols.error)
}

function success() {
  return logFn(console.log, [...arguments], symbols.success)
}

function warn() {
  return logFn(console.warn, [...arguments], symbols.warn)
}

export {
  log,
  time,
  info,
  error,
  success,
  warn,
  symbols,
  colors
}
export default log
