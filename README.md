# diy-log

> Log things, prefixed with a symbols or timestamp.



## Installation

```
npm install diy-log --save-dev
```

or

```
yarn add -D diy-log
```



## Usage

```js
const log = require('diy-log')

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


/**
message ...
[17:47:19] message ...
ℹ info ...
✔ success ...
✖ error ...
⚠ warn ...
*/
```



## Thanks

- [log-symbols](https://github.com/sindresorhus/log-symbols)
