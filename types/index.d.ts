import colors from 'picocolors'
import timestamp from 'time-stamp'

declare const symbols: {
  info: string
  success: string
  warn: string
  error: string
}

type LogFunc = (...args: any[]) => void

interface Logger {
  log: LogFunc
  time: LogFunc
  info: LogFunc
  error: LogFunc
  success: LogFunc
  warn: LogFunc
  colors: typeof colors
  timestamp: typeof timestamp
  symbols: typeof symbols
}

declare const log: Logger
export = log
