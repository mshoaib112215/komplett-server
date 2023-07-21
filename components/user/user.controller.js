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
const constants_1 = require("../../constants/constants");
const bcrypt = require("bcrypt");
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
            const role = req.query.role || "all";
            const limit = parseInt(req.query.limit);
            const page = parseInt(req.query.page);
            const order = req.query.order;
            const sort = req.query.sort;
            const config = {
                limit,
                page,
                sort,
                order,
                role,
            };
            const users = yield user_dao_1.default.findAll(config);
            res.status(200).json(users);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "user -> user.controller.ts -> findAll",
                request: req.method + " :" + req.baseUrl + req.url,
            });
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
                id,
            });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const user = yield user_dao_1.default.findOne(id);
            res.status(200).json(user);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "user -> user.controller.ts -> findOne",
                request: req.method + " :" + req.baseUrl + req.url,
            });
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
            if (body.email) {
                body.email = body.email.toLowerCase();
            }
            if (!body.role) {
                throw new Error("Role is Required Field");
            }
            if (body.role == constants_1.USERROLES.EMPLOYEE || body.role == constants_1.USERROLES.CUSTOMER) {
                throw new Error(`Can't create ${body.role} with this api, please use ${body.role} api`);
            }
            const validate = user_validation_1.default.createUser(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const user = yield user_dao_1.default.insert(body);
            res.status(201).json(user);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "user -> user.controller.ts -> create",
                request: req.method + " :" + req.baseUrl + req.url,
            });
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
                id,
            });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const user = yield user_dao_1.default.remove(id);
            res.status(200).json(user);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "user -> user.controller.ts -> remove",
                request: req.method + " :" + req.baseUrl + req.url,
            });
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
            if (body.email) {
                body.email = body.email.toLowerCase();
            }
            const validate = user_validation_1.default.updateUser(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            if (body.role) {
                if (body.role == constants_1.USERROLES.EMPLOYEE || body.role == constants_1.USERROLES.CUSTOMER) {
                    throw new Error(`Can't update ${body.role} with this api, please use ${body.role} api`);
                }
            }
            const user = yield user_dao_1.default.update(body);
            delete user.password;
            if (user === null) {
                next(new error_1.HttpError(404, "User not found with this id"));
                return;
            }
            res.status(200).json(user);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "user -> user.controller.ts -> update",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.update = update;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise< void >}
 */
function changePassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let body = req.body;
            const userId = req.params.id;
            const user = yield user_dao_1.default.findOne(userId);
            if (!user) {
                throw new Error("user not found");
            }
            const isMatched = user && (yield user.comparePassword(body.oldPassword));
            if (!isMatched) {
                throw new Error("Invaild old password");
            }
            const salt = yield bcrypt.genSalt(10);
            const hash = yield bcrypt.hash(body.password, salt);
            user.password = hash;
            const obj = {
                _id: user._id,
                password: hash,
            };
            const updatedUser = yield user_dao_1.default.update(obj);
            res.status(200).json({ success: true });
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "user -> user.controller.ts -> changePassword",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.changePassword = changePassword;
