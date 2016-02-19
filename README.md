# log4js-json

json appender

## install

```
npm i log4js-json
```


## Usage

```js

var log4js = require('log4js');
var appender = require('log4js-json');

// log serialized json into console
log4js.loadAppender('json', appender());
log4js.addAppender(log4js.appenders.json());

var logger = log4js.getLogger();

logger.info('test ...');

// OR pass callback

log4js.loadAppender('json', appender(function (event) {
    // got event object, write to file or send to log system
    console.log(event);
}));

log4js.addAppender(log4js.appenders.json());


// OR

var log4js = require('log4js');
log4js.loadAppender('log4js-json');
log4js.addAppender(log4js.appenders['log4js-json'](), 'json');

var logger = log4js.getLogger('json');

logger.info('test info message');
```

## output

```
[2015-12-04 17:54:57.106] [TRACE] [default] - trace
{ time: 1449230097106, level_int: 5000, level: 'TRACE', data: [ 'trace' ] }



[2015-12-04 17:54:57.115] [DEBUG] [default] - debug
{ time: 1449230097115, level_int: 10000, level: 'DEBUG', data: [ 'debug' ] }


[2015-12-04 17:54:57.116] [INFO] [default] - info
{ time: 1449230097116, level_int: 20000, level: 'INFO', data: [ 'info' ] }


[2015-12-04 17:54:57.116] [WARN] [default] - warn
{ time: 1449230097116, level_int: 30000, level: 'WARN', data: [ 'warn' ] }


[2015-12-04 17:54:57.117] [ERROR] [default] - { [Error: test] code: 'fatal' }
Error: test
    at Object.<anonymous> (/Users/alexv/github/log4js-json/test.js:21:13)
    at Module._compile (module.js:435:26)
    at Object.Module._extensions..js (module.js:442:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:311:12)
    at Function.Module.runMain (module.js:467:10)
    at startup (node.js:136:18)
    at node.js:963:3

{ time: 1449230097117, level_int: 40000, level: 'ERROR',
  data:
   [ { is_error: true,
       message: 'test',
       code: 'fatal',
       stack: 'Error: test\n    at Object.<anonymous> (/Users/alexv/github/log4js-json/test.js:21:13)\n    at Module._compile (module.js:435:26)\n    at Object.Module._extensions..js (module.js:442:10)\n    at Module.load (module.js:356:32)\n    at Function.Module._load (module.js:311:12)\n    at Function.Module.runMain (module.js:467:10)\n    at startup (node.js:136:18)\n    at node.js:963:3' } ] }


[2015-12-04 17:54:57.119] [FATAL] [default] - fatal
{ time: 1449230097119, level_int: 50000, level: 'FATAL', data: [ 'fatal' ] }


[2015-12-04 17:54:57.120] [MARK] [default] - mark
{ time: 1449230097120, level_int: 9007199254740992, level: 'MARK', data: [ 'mark' ] }

```
