const logger = require('diy-log')
const { log, symbols, colors, timestamp } = logger

// console.log
logger.log('log ...')
logger.time('time ...')

logger.info('info ...')
logger.success('success ...')
logger.error('error ...')
logger.warn('warn ...')

log(symbols.info, 'info ...')
log(symbols.success, 'success ...')
log(symbols.error, 'error ...')
log(symbols.warn, 'warn ...')

// see `picocolors`
log(
  colors.blue('color: blue;'),
  colors.bgGreen('bgcolor: green;'),
  colors.bold('font-weight: bold;'),
  colors.italic('font-style: italic')
)

// see `time-stamp`
log(
  colors.bgRed(timestamp('YYYY/MM/DD HH:mm:ss, ms'))
)
