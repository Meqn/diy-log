import colors from 'picocolors'
import type Picocolors from 'picocolors'
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
  done: string
  success: string
  warn: string
  error: string
}
const symbols: Symbols = (function () {
  const main = {
    info: colors.blue('ℹ'),
    done: colors.green('✔'),
    success: colors.green('✔'),
    warn: colors.yellow('⚠'),
    error: colors.red('✖')
  }

  const fallbacks = {
    info: colors.blue('i'),
    done: colors.green('√'),
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
const done: LogFunc = (...args: any[]) => logFn(console.log, args, symbols.done)
const warn: LogFunc = (...args: any[]) => logFn(console.warn, args, symbols.warn)

//== tags =========================================================
type TagTypeFunc = (message: string, label?: string) => void
interface ITagTypes {
  info: TagTypeFunc,
  warn: TagTypeFunc,
  done: TagTypeFunc,
  error: TagTypeFunc,
  success?: TagTypeFunc
}
interface ITag extends ITagTypes {
  (message: string, type?: keyof ITagTypes, label?: string): void
}

function tagFn(
  message: string,
  label: string,
  fn: (...args: any[]) => void,
  bgColorFn: typeof Picocolors.blue,
  colorFn?: typeof Picocolors.blue
) {
  const labelStr = bgColorFn.call(colors, colors.black(` ${label} `))
  fn.call(console, labelStr, typeof colorFn === 'function' ? colorFn.call(colors, message) : message)
}

const tag: ITag = (message, type = 'info', label) => {
  label = label ?? type.toLocaleUpperCase()
  return tag[type]?.call(this, message, label)
}

tag.info = (message, label) => tagFn(message, label ? label : 'info'.toLocaleUpperCase(), console.info, colors.bgBlue)
tag.done = tag.success = (message, label) => tagFn(message, label ? label : 'done'.toLocaleUpperCase(), console.log, colors.bgGreen)
tag.warn = (message, label) => tagFn(message, label ? label : 'warn'.toLocaleUpperCase(), console.warn, colors.bgYellow, colors.yellow)
tag.error = (message, label) => tagFn(message, label ? label : 'error'.toLocaleUpperCase(), console.error, colors.bgRed, colors.red)

export { log, time, info, error, done, done as success, warn, symbols, colors, tag, timestamp }
export default { log, time, info, error, done, warn, symbols, colors, tag, timestamp }
