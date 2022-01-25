# log4js-memory-appender

A simple memory appender for log4js. It stores log events in an array - good for keeping a buffer of tail logs to output on a diagnostics page.
The latest version has been modified to support Log4js version 6 and above. Please note, from version 6 all appenders need to be defined in
config and cannot be progammatically instantiated and configured. Because of this, log4js-memory-appender can no longer be passed a buffer to
use and can only use its own internal array as a buffer.

* log4js-memory-appender v1.0.5 - works with Log4js versions below v2.0.0
* log4js-memory-appender v6.0.0 and above - designed to work with Log4js v6.4.0 and above
* see [log4js-in-memory-appender](https://www.npmjs.com/package/log4js-in-memory-appender) by [@nivek](https://www.npmjs.com/~nivek) for a version that works with Log4js v2.0.0

## Install

```
npm install log4js-memory-appender
```


## Usage

### Version 6.0.0 and above
#### Config
```json

"log4js" : {
    "level": "ALL",
    "appenders" : {
        "console" : { "type": "console", "timezoneOffset": 0 },
        "file" : { "type": "file", "filename": "logs/something.log", "maxLogSize": 1024000, "timezoneOffset": 0, "backups": 50 },
        "memory" : { "type": "log4js-memory-appender", "maxBufferSize": 100, "timezoneOffset": 0 }
    },
    "categories" :  {
        "default": { "appenders": ["console", "file", "memory"], "level": "ALL" }
    }
}
```

#### Initialisation and Usage

```js

var log4js = require('log4js');
var memAppender = require('log4js-memory-appender');

var log4jsLogger = null;    
log4js.configure(config.log4js);
logger = log4js.getLogger("App Name");
// set the initial level, as newer versions of log4js are set to OFF by default
log4jsLogger.level = someConfig.log4js.level;
logger.trace('trace');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
var error = new Error('test');
error.code = 'fatal';
logger.error(error);
logger.fatal('fatal');
logger.mark('mark');

// set the buffer size later instead of configuration via an exported function on the appender definition
memAppender.setMaxBufferSize(1000);

// access the buffer by a function exported on the appender definition
console.log(memAppender.getBuffer());

// flush the buffer using a function exported on the appender definition
console.log(memAppender.flushBuffer());
```

### Version 1.0.5 and below

#### Initialisation and Usage

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
