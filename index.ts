import colors from 'picocolors'
import timestamp from 'time-stamp'

//see. https://github.com/sindresorhus/is-unicode-supported
function isUnicodeSupported() {
  if (process.platform !== 'win32') {
    return process.env.TERM !== 'linux' // Linux console (kernel)
  }

  return (
    Boolean(process.env.CI) ||
    Boolean(process.env.WT_SESSION) || // Windows Terminal
    Boolean(process.env.TERMINUS_SUBLIME) || // Terminus (<0.2.27)
    process.env.ConEmuTask === '{cmd::Cmder}' || // ConEmu and cmder
    process.env.TERM_PROGRAM === 'Terminus-Sublime' ||
    process.env.TERM_PROGRAM === 'vscode' ||
    process.env.TERM === 'xterm-256color' ||
    process.env.TERM === 'alacritty' ||
    process.env.TERMINAL_EMULATOR === 'JetBrains-JediTerm'
  )
}

interface Symbols {
  info: string
  success: string
  warn: string
  error: string
}
const symbols: Symbols = (function () {
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
})()

/**
 * log函数
 * @param {function} fn 调用方法
 * @param {array<any>} args 输出参数
 * @param {string} prefix 输出前缀
 */
function logFn<F extends (...args: any[]) => void, P extends Parameters<F>>(
  fn: F,
  args: P,
  prefix?: string
) {
  if (prefix) {
    process.stdout.write(prefix + ' ')
  }
  fn.apply(console, args)
}

type LogFunc = (...args: any[]) => void

const log: LogFunc = (...args: any[]) => logFn(console.log, args)
const time: LogFunc = (...args: any[]) => {
  const times = timestamp('HH:mm:ss')
  logFn(console.log, args, '[' + colors.gray(times) + ']')
}
const info: LogFunc = (...args: any[]) => logFn(console.info, args, symbols.info)
const error: LogFunc = (...args: any[]) => logFn(console.error, args, symbols.error)
const success: LogFunc = (...args: any[]) => logFn(console.log, args, symbols.success)
const warn: LogFunc = (...args: any[]) => logFn(console.warn, args, symbols.warn)

export = { log, time, info, error, success, warn, symbols, colors, timestamp }
// export default log
