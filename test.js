var log4js = require('log4js');

var appender = require('./index');

// log4js.configure({
//     replaceConsole: true
// });

log4js.loadAppender('json', appender((event) => {
    console.log(event);
}));

log4js.addAppender(log4js.appenders.json());

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


// logger.trace('trace test');
// logger.debug('debug test');
// logger.info('info test');
// logger.warn('warn test');

// var logger2 = log4js.getLogger();
// logger2.error(new Error('2test error'));
// logger2.error('2test error');
// logger2.fatal('2fatal test');
// logger2.mark('2mark test');




// var http = require('http');
//
//
// var server = http.createServer();
//
//
// server.on('request', (req, res) => {
//
//     res.start_time = new Date().getTime();
//     res.on('finish', () => {
//         var endTime = new Date().getTime();
//         console.log(req.path + 'end in ' + (endTime - res.start_time)  + ' ms');
//     });
//
//     res.write('\nok\n');
//     res.end();
//
// });
//
//
// server.listen(6001);
