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

function log(args: any[]) {
  return logFn(console.log, args)
}

function time(args: any[]) {
  const times = timestamp('HH:mm:ss')
  return logFn(console.log, args, '[' + colors.gray(times) + ']')
}

function info(args: any[]) {
  return logFn(console.info, args, symbols.info)
}

function error(args: any[]) {
  return logFn(console.error, args, symbols.error)
}

function success(args: any[]) {
  return logFn(console.log, args, symbols.success)
}

function warn(args: any[]) {
  return logFn(console.warn, args, symbols.warn)
}

export {
  time,
  info,
  error,
  success,
  warn,
  symbols
}
export default log
