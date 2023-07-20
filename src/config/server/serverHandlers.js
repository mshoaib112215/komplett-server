"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onListening = exports.onError = void 0;
var debug = require("debug");
/**
 * @param  {NodeJS.ErrnoException} error
 * @param  {number|string|boolean} port
 * @returns throw error
 */
function onError(error, port) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = (typeof port === 'string') ? "Pipe ".concat(port) : "Port ".concat(port);
    switch (error.code) {
        case 'EACCES':
            console.error("".concat(bind, " requires elevated privileges"));
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error("".concat(bind, " is already in use"));
            process.exit(1);
            break;
        default:
            throw error;
    }
}
exports.onError = onError;
/**
 * @export onListening
 */
function onListening() {
    var addr = this.address();
    var bind = (typeof addr === 'string') ? "pipe ".concat(addr) : "port ".concat(addr.port);
    debug("Listening on ".concat(bind));
}
exports.onListening = onListening;
