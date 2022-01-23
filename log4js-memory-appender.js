"use strict";

/********************************************************
 * Memory appender module for log4js.
 ********************************************************/
var buffer = [];
var maxBufferSize = 100;

/********************************************************
 * Constructs a new memory appender.
 ********************************************************/
var memoryAppender = function memoryAppender(layout, timezoneOffset) {
    const appender = function(loggingEvent) {
        if((buffer.length + 1) > maxBufferSize)
        {
            var numtoRemove = (buffer.length - maxBufferSize) + 1;
            if(numtoRemove > 0){ buffer.splice(0, numtoRemove); }
        }
        buffer.push(layout(loggingEvent, timezoneOffset));
    };
    appender.shutdown = function(done){ 
        return done(); 
    };
    return (appender);
};

/********************************************************
 * Configures and returns a new memory appender.
 ********************************************************/
var configure = function configure(config, layouts) {
    var layout = layouts.basicLayout;
    if(config.layout) {
        layout = layouts.layout(config.layout.type, config.layout);
    }
    if(config.maxBufferSize){
        maxBufferSize = config.maxBufferSize;
    }
    return memoryAppender(layout, config.timezoneOffset);
};

/********************************************************
 * Returns a copy of the log buffer.
 ********************************************************/
var getBuffer = function getBuffer(){
    return(buffer.slice());
};

/********************************************************
 * Flushes (empties the log buffer).
 ********************************************************/
var flushBuffer = function flushBuffer(){
    buffer = [];
};

/********************************************************
 * Sets the max buffer size.
 ********************************************************/
var setMaxBufferSize = function setMaxBufferSize(size){
    if(size && size > 0){
        maxBufferSize = size;
    }
};

exports.configure = configure;
exports.getBuffer = getBuffer;
exports.flushBuffer = flushBuffer;
exports.setMaxBufferSize = setMaxBufferSize;