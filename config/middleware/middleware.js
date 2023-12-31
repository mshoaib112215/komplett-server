"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const index_1 = require("../error/index");
const sendHttpError_1 = require("../error/sendHttpError");
const morgan = require("morgan");
/**
 * @export
 * @param {express.Application} app
 */
function configure(app) {
    // express middleware
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
    app.use(cookieParser());
    // returns the compression middleware
    app.use(compression());
    // helps you secure your Express apps by setting various HTTP headers
    app.use(helmet());
    // providing a Connect/Express middleware that can be used to enable CORS with various options
    app.use(cors());
    // log http request in file
    // app.use(morgan('common', {
    //     stream: fs.createWriteStream('./logs/access/' + new Date().getDate() + '-' + new Date().getMonth() + '.log', { flags: 'a' })
    // }));
    // logs the request url to console
    app.use(morgan('dev'));
    // custom errors
    app.use(sendHttpError_1.sendHttpErrorModule);
    app.use('/uploads', express.static('uploads'));
    // cors
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,' +
            ' Content-Type, Accept,' +
            ' Authorization,' +
            ' Access-Control-Allow-Credentials');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });
}
exports.configure = configure;
/**
 * @export
 * @param {express.Application} app
 */
function initErrorHandler(app) {
    app.use((error, req, res, next) => {
        if (typeof error === 'number') {
            error = new index_1.HttpError(error); // next(404)
        }
        if (error instanceof index_1.HttpError) {
            res.sendHttpError(error);
        }
        else {
            if (app.get('env') === 'development') {
                error = new index_1.HttpError(500, error.message);
                res.sendHttpError(error);
            }
            else {
                error = new index_1.HttpError(500);
                res.sendHttpError(error, error.message);
            }
        }
        console.error(error);
    });
}
exports.initErrorHandler = initErrorHandler;
