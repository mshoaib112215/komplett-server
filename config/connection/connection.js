"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const index_1 = require("../env/index");
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
const MONGO_URI = `${index_1.default.database.MONGODB_URI}${index_1.default.database.MONGODB_DB_MAIN}`;
exports.db = mongoose.createConnection(MONGO_URI, connectOptions);
// handlers
exports.db.on('connecting', () => {
    console.log('\x1b[32m%s\x1b[0m', 'MongoDB :: connecting');
});
exports.db.on('error', (error) => {
    console.log('\x1b[31m%s\x1b[0m', `MongoDB :: connection ${error}`);
    mongoose.disconnect();
});
exports.db.on('connected', () => {
    console.log('\x1b[32m%s\x1b[0m', 'MongoDB :: connected');
});
exports.db.once('open', () => {
    console.log('\x1b[32m%s\x1b[0m', 'MongoDB :: connection opened');
});
exports.db.on('reconnected', () => {
    console.log('\x1b[33m%s\x1b[0m"', 'MongoDB :: reconnected');
});
exports.db.on('reconnectFailed', () => {
    console.log('\x1b[31m%s\x1b[0m', 'MongoDB :: reconnectFailed');
});
exports.db.on('disconnected', () => {
    console.log('\x1b[31m%s\x1b[0m', 'MongoDB :: disconnected');
});
exports.db.on('fullsetup', () => {
    console.log('\x1b[33m%s\x1b[0m', 'MongoDB :: reconnecting... %d');
});
