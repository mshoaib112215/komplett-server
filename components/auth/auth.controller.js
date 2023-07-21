"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./auth.service");
const error_1 = require("../../config/error");
const jwt = require("jsonwebtoken");
const server_1 = require("../../config/server/server");
const winston_1 = require("../../config/winston");
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            user.email = user.email.toLowerCase();
            const userDoc = yield auth_service_1.default.createUser(user);
            const token = fnSignToken({ id: userDoc._id, email: userDoc.email });
            res.json({
                status: 200,
                logged: true,
                token: token,
                message: 'Sign Up successfully'
            });
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'auth -> auth.controller.ts -> signup', request: req.method + ' :' + req.baseUrl + req.url });
            if (error.code === 500) {
                return next(new error_1.default(error.message.status, error.message));
            }
            res.status(400).json({
                status: 400,
                message: error.message
            });
        }
    });
}
exports.signup = signup;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            user.email = user.email.toLowerCase();
            const userDoc = yield auth_service_1.default.getUser(user);
            const token = fnSignToken({ id: userDoc._id, email: userDoc.email });
            res.json({
                status: 200,
                logged: true,
                token: token,
                message: 'Sign in successfull'
            });
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'auth -> auth.controller.ts -> login', request: req.method + ' :' + req.baseUrl + req.url });
            if (error.code === 500) {
                return next(new error_1.default(error.message.status, error.message));
            }
            res.status(400).json({
                status: 400,
                message: error.message
            });
        }
    });
}
exports.login = login;
/**
 * Returns a jwt token signed by the app secret
 * Value of expiresIn is measured in seconds SS:MM:HH
 * JWT token expires in one day.
 * @param user
 * @return JWT token as string
 */
function fnSignToken(obj) {
    return jwt.sign(obj, server_1.default.get('secret'), { expiresIn: 60 * 60 * 24 * 7 });
}
exports.fnSignToken = fnSignToken;
