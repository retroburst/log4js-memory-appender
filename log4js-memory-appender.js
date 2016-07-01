"use strict";

/********************************************************
 * Memory appender module for log4js.
 ********************************************************/
module.exports = function(options){
    var layouts = require('log4js').layouts;
    var buffer = null;
    var maxBufferSize = null;
    
    options = options || {};
    buffer = options.buffer || [];
    maxBufferSize = options.maxBufferSize || 100;
    
    /********************************************************
     * Constructs a new memory appender.
     ********************************************************/
    var memoryAppender = function memoryAppender(layout, timezoneOffset) {
        layout = layout || layouts.basicLayout;
        return function(loggingEvent) {
            if((buffer.length + 1) > maxBufferSize)
            {
                var numtoRemove = (buffer.length - maxBufferSize) + 1;
                if(numtoRemove > 0){ buffer.splice(0, numtoRemove); }
            }
            buffer.push(layout(loggingEvent, timezoneOffset));
        };
    };
    
    /********************************************************
     * Configures and returns a new memory appender.
     ********************************************************/
    var configure = function configure(config) {
        var layout = null;
        if (config.layout) {
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
    
    return({
            appender: memoryAppender,
            configure: configure,
            getBuffer: getBuffer,
            flushBuffer: flushBuffer
        });
};
