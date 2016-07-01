# log4js-memory-appender

A simple memory appender for log4js. It stores log events in an array - good for keeping a buffer of tail logs to output on a diagnostics page.

## install

```
npm install log4js-memory-appender
```


## Usage

```js

var log4js = require('log4js');
var appender = require('log4js-memory-appender');

var buffer = [];
var maxBufferSize = 100;
log4js.loadAppender('memory', appender({ buffer : buffer, maxBufferSize : maxBufferSize }));
log4js.addAppender(log4js.appenders.memory());

var logger = log4js.getLogger();

logger.trace('trace');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
var error = new Error('test');
error.code = 'fatal';
logger.error(error);
logger.fatal('fatal');
logger.mark('mark');

console.log(buffer);

// OR

var log4js = require('log4js');
var appender = require('log4js-memory-appender');

var memAppender = appender({ maxBufferSize : 1000 });

log4js.loadAppender('memory', memAppender);
log4js.addAppender(log4js.appenders.memory());

var logger = log4js.getLogger();

logger.trace('trace');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
var error = new Error('test');
error.code = 'fatal';
logger.error(error);
logger.fatal('fatal');
logger.mark('mark');

console.log(memAppender.getBuffer());

console.log("Flushing the buffer.");
memAppender.flushBuffer();
console.log(memAppender.getBuffer());


```

## Example Output

```

[ 
'[2016-02-20 11:08:36.080] [TRACE] [default] - trace',
'[2016-02-20 11:08:36.086] [DEBUG] [default] - debug',
'[2016-02-20 11:08:36.086] [INFO] [default] - info',
'[2016-02-20 11:08:36.087] [WARN] [default] - warn',
'[2016-02-20 11:08:36.087] [ERROR] [default] - { [Error: test] code: \'fatal\' }\nError: test\n    at Object.<anonymous> (/Users/retroburst/Development/log4js-memory-appender/test.js:18:13)\n    at Module._compile (module.js:435:26)\n    at Object.Module._extensions..js (module.js:442:10)\n    at Module.load (module.js:356:32)\n    at Function.Module._load (module.js:313:12)\n    at Function.Module.runMain (module.js:467:10)\n    at startup (node.js:136:18)\n    at node.js:963:3',
'[2016-02-20 11:08:36.092] [FATAL] [default] - fatal',
'[2016-02-20 11:08:36.092] [MARK] [default] - mark' 
]

```
