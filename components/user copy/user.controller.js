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
const user_dao_1 = require("./user.dao");
const error_1 = require("../../config/error");
const user_validation_1 = require("./user.validation");
const winston_1 = require("../../config/winston");
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function findAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_dao_1.default.findAll();
            res.status(200).json(users);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'user -> user.controller.ts -> findAll', request: req.method + ' :' + req.baseUrl + req.url });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.findAll = findAll;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function findOne(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            const validate = user_validation_1.default.getUser({
                id
            });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const user = yield user_dao_1.default.findOne(id);
            res.status(200).json(user);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'user -> user.controller.ts -> findOne', request: req.method + ' :' + req.baseUrl + req.url });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.findOne = findOne;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let body = req.body;
            const validate = user_validation_1.default.createUser(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const user = yield user_dao_1.default.insert(body);
            res.status(201).json(user);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'user -> user.controller.ts -> create', request: req.method + ' :' + req.baseUrl + req.url });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.create = create;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function remove(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            const validate = user_validation_1.default.removeUser({
                id
            });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const user = yield user_dao_1.default.remove(id);
            res.status(200).json(user);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'user -> user.controller.ts -> remove', request: req.method + ' :' + req.baseUrl + req.url });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.remove = remove;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise< void >}
 */
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let body = req.body;
            const validate = user_validation_1.default.updateUser(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const user = yield user_dao_1.default.update(body);
            if (user === null) {
                next(new error_1.HttpError(404, "User not found with this id"));
                return;
            }
            res.status(204).end();
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'user -> user.controller.ts -> update', request: req.method + ' :' + req.baseUrl + req.url });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.update = update;
