"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var mongoose = require("mongoose");
var index_1 = require("../env/index");
var connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
var MONGO_URI = "".concat(index_1.default.database.MONGODB_URI).concat(index_1.default.database.MONGODB_DB_MAIN);
exports.db = mongoose.createConnection(MONGO_URI, connectOptions);
// handlers
exports.db.on('connecting', function () {
    console.log('\x1b[32m%s\x1b[0m', 'MongoDB :: connecting');
});
exports.db.on('error', function (error) {
    console.log('\x1b[31m%s\x1b[0m', "MongoDB :: connection ".concat(error));
    mongoose.disconnect();
});
exports.db.on('connected', function () {
    console.log('\x1b[32m%s\x1b[0m', 'MongoDB :: connected');
});
exports.db.once('open', function () {
    console.log('\x1b[32m%s\x1b[0m', 'MongoDB :: connection opened');
});
exports.db.on('reconnected', function () {
    console.log('\x1b[33m%s\x1b[0m"', 'MongoDB :: reconnected');
});
exports.db.on('reconnectFailed', function () {
    console.log('\x1b[31m%s\x1b[0m', 'MongoDB :: reconnectFailed');
});
exports.db.on('disconnected', function () {
    console.log('\x1b[31m%s\x1b[0m', 'MongoDB :: disconnected');
});
exports.db.on('fullsetup', function () {
    console.log('\x1b[33m%s\x1b[0m', 'MongoDB :: reconnecting... %d');
});
