"use strict";

var layouts = require('log4js').layouts;
var buffer = [];
var maxBufferSize = 10;

function memoryAppender (layout, timezoneOffset) {
    layout = layout || layouts.basicLayout;
    return function(loggingEvent) {
        console.log("Adding to buffer!!!!");
        if(buffer.length > maxBufferSize)
        {
            var numtoRemove = buffer.length - maxBufferSize;
            if(numtoRemove > 0){ buffer.splice(0, numtoRemove); }
        }
        buffer.push(layout(loggingEvent, timezoneOffset));
    };
}

function configure(config) {
    var layout = null;
    if (config.layout) {
        layout = layouts.layout(config.layout.type, config.layout);
    }
    if(config.maxBufferSize){
        maxBufferSize = config.maxBufferSize;
    }
    return memoryAppender(layout, config.timezoneOffset);
}

function getBuffer(){
    return(buffer.slice());
};

exports.appender = memoryAppender;
exports.configure = configure;
exports.getBuffer = getBuffer;
