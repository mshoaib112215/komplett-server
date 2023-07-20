"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.update = exports.remove = exports.create = exports.findOne = exports.findAll = void 0;
var user_dao_1 = require("./user.dao");
var error_1 = require("../../config/error");
var user_validation_1 = require("./user.validation");
var winston_1 = require("../../config/winston");
var constants_1 = require("../../constants/constants");
var bcrypt = require("bcrypt");
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function findAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var role, limit, page, order, sort, config, users, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    role = req.query.role || "all";
                    limit = parseInt(req.query.limit);
                    page = parseInt(req.query.page);
                    order = req.query.order;
                    sort = req.query.sort;
                    config = {
                        limit: limit,
                        page: page,
                        sort: sort,
                        order: order,
                        role: role,
                    };
                    return [4 /*yield*/, user_dao_1.default.findAll(config)];
                case 1:
                    users = _a.sent();
                    res.status(200).json(users);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    winston_1.logger.error("error", error_2, {
                        file: "user -> user.controller.ts -> findAll",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_2.message.status, error_2.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var id, validate, user, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    validate = user_validation_1.default.getUser({
                        id: id,
                    });
                    if (validate.error) {
                        throw new Error(validate.error.message);
                    }
                    return [4 /*yield*/, user_dao_1.default.findOne(id)];
                case 1:
                    user = _a.sent();
                    res.status(200).json(user);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    winston_1.logger.error("error", error_3, {
                        file: "user -> user.controller.ts -> findOne",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_3.message.status, error_3.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var body, validate, user, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    if (body.email) {
                        body.email = body.email.toLowerCase();
                    }
                    if (!body.role) {
                        throw new Error("Role is Required Field");
                    }
                    if (body.role == constants_1.USERROLES.EMPLOYEE || body.role == constants_1.USERROLES.CUSTOMER) {
                        throw new Error("Can't create ".concat(body.role, " with this api, please use ").concat(body.role, " api"));
                    }
                    validate = user_validation_1.default.createUser(body);
                    if (validate.error) {
                        throw new Error(validate.error.message);
                    }
                    return [4 /*yield*/, user_dao_1.default.insert(body)];
                case 1:
                    user = _a.sent();
                    res.status(201).json(user);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    winston_1.logger.error("error", error_4, {
                        file: "user -> user.controller.ts -> create",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_4.message.status, error_4.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var id, validate, user, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    validate = user_validation_1.default.removeUser({
                        id: id,
                    });
                    if (validate.error) {
                        throw new Error(validate.error.message);
                    }
                    return [4 /*yield*/, user_dao_1.default.remove(id)];
                case 1:
                    user = _a.sent();
                    res.status(200).json(user);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    winston_1.logger.error("error", error_5, {
                        file: "user -> user.controller.ts -> remove",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_5.message.status, error_5.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var body, validate, user, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    if (body.email) {
                        body.email = body.email.toLowerCase();
                    }
                    validate = user_validation_1.default.updateUser(body);
                    if (validate.error) {
                        throw new Error(validate.error.message);
                    }
                    if (body.role) {
                        if (body.role == constants_1.USERROLES.EMPLOYEE || body.role == constants_1.USERROLES.CUSTOMER) {
                            throw new Error("Can't update ".concat(body.role, " with this api, please use ").concat(body.role, " api"));
                        }
                    }
                    return [4 /*yield*/, user_dao_1.default.update(body)];
                case 1:
                    user = _a.sent();
                    delete user.password;
                    if (user === null) {
                        next(new error_1.HttpError(404, "User not found with this id"));
                        return [2 /*return*/];
                    }
                    res.status(200).json(user);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    winston_1.logger.error("error", error_6, {
                        file: "user -> user.controller.ts -> update",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_6.message.status, error_6.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var body, userId, user, isMatched, _a, salt, hash, obj, updatedUser, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    body = req.body;
                    userId = req.params.id;
                    return [4 /*yield*/, user_dao_1.default.findOne(userId)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        throw new Error("user not found");
                    }
                    _a = user;
                    if (!_a) return [3 /*break*/, 3];
                    return [4 /*yield*/, user.comparePassword(body.oldPassword)];
                case 2:
                    _a = (_b.sent());
                    _b.label = 3;
                case 3:
                    isMatched = _a;
                    if (!isMatched) {
                        throw new Error("Invaild old password");
                    }
                    return [4 /*yield*/, bcrypt.genSalt(10)];
                case 4:
                    salt = _b.sent();
                    return [4 /*yield*/, bcrypt.hash(body.password, salt)];
                case 5:
                    hash = _b.sent();
                    user.password = hash;
                    obj = {
                        _id: user._id,
                        password: hash,
                    };
                    return [4 /*yield*/, user_dao_1.default.update(obj)];
                case 6:
                    updatedUser = _b.sent();
                    res.status(200).json({ success: true });
                    return [3 /*break*/, 8];
                case 7:
                    error_7 = _b.sent();
                    winston_1.logger.error("error", error_7, {
                        file: "user -> user.controller.ts -> changePassword",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_7.message.status, error_7.message));
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.changePassword = changePassword;
