"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston = require('winston');
var winston_1 = require("winston");
require('winston-daily-rotate-file');
var transport = new (winston.transports.DailyRotateFile)({
    filename: 'logs/application-%DATE%.log',
    // datePattern: 'YYYY-MM-DD-HH',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
});
transport.on('rotate', function (_oldFilename, _newFilename) {
    // do something fun
    console.log('filename : ', _newFilename);
});
exports.logger = winston.createLogger({
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
    transports: [
        transport
    ]
});
//example :  logger.log('error',new Error('some'),{ file: 'customer --> customer.controller' , request :req.method +' :' + req.baseUrl+req.url})
