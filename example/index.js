const log = require('../lib')


log('message ... ')
log.time('message ...')

log.info('info ...')
log.success('success ...')
log.error('error ...')
log.warn('warn ...')

log(log.symbols.info, 'info ...')
log(log.symbols.success, 'message ...')
log(log.symbols.error, 'error ...')
log(log.symbols.warn, 'warn ...')
