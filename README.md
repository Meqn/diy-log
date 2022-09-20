# diy-log

Log things, prefixed with a symbols or timestamp.

![img](./example/screenshot.png)



## Installation

```bash
npm install diy-log --save-dev
```



## Usage

```js
// for cjs
const logger = require('diy-log')
const { log, symbols, colors, timestamp } = logger


// for esm
import logger, {
  log,
  colors,
  symbols,
  timestamp
} from 'diy-log'
```

```js
logger.log('message ...')
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
  colors.bgRed(timestamp('YYYY/MM/DD HH:mm:ss'))
)
```



## Thanks

- [log-symbols](https://github.com/sindresorhus/log-symbols)
