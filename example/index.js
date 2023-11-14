const logger = require('../dist/index')
const { log, info, done, warn, error, symbols, colors, tag } = logger

log('==========================: symbols')
logger.time('time ...')

info('info ...')
done('done ...')
error('error ...')
warn('warn ...')

logger.log('==========================: colors')
// see `picocolors`
log(
  colors.dim('dim:text;'),
  colors.blue('color: blue;'),
  colors.bgGreen(' bgcolor: green; ')
)
log(
  colors.bold('bold:text;'),
  colors.italic('italic:text;'),
  colors.underline('underline:text;')
)

log('==========================: tags')
tag('info message\n')
tag.warn('warning message\n')
tag.done('done message\n')
tag.info(colors.blue('info message\n'))
tag.error('error message\n')