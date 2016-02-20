var log4js = require('log4js');
var appender = require('./log4js-memory-appender');

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