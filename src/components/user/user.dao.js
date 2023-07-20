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
var user_model_1 = require("./user.model");
var mongoose_1 = require("mongoose");
var mongodb_1 = require("mongodb");
var constants_1 = require("../../constants/constants");
var user_model_2 = require("./user.model");
/**
 * @export
 * @implements {IUserModelService}
 */
var UserService = {
    /**
     * @returns {Promise < IUserModel[] >}
     * @memberof UserService
     */
    findAll: function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var aggregate, order, limit, page, sort, skipNumber, role, skipAggregate, sortAggregate, limitAggregate, matchCategory, facet, facet, docs, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        aggregate = [];
                        order = config.order && config.order == "des" ? -1 : 1;
                        limit = config.limit;
                        page = config.page || 1;
                        sort = config.sort || "createdAt";
                        skipNumber = (page - 1) * limit;
                        role = config.role;
                        skipAggregate = { $skip: skipNumber };
                        sortAggregate = { $sort: (_a = {}, _a[sort] = order, _a) };
                        limitAggregate = { $limit: limit };
                        matchCategory = {
                            $match: {
                                role: role,
                            },
                        };
                        if (role !== "all" && role in constants_1.USERROLES) {
                            aggregate.push(matchCategory);
                        }
                        aggregate.push(sortAggregate);
                        console.log(aggregate);
                        if (limit) {
                            facet = {
                                $facet: {
                                    metadata: [{ $count: "total" }, { $addFields: { page: page } }],
                                    data: [skipAggregate, limitAggregate],
                                },
                            };
                            aggregate.push(facet);
                        }
                        else {
                            facet = {
                                $facet: {
                                    metadata: [{ $count: "total" }, { $addFields: { page: page } }],
                                    data: [{ $skip: 0 }],
                                },
                            };
                            aggregate.push(facet);
                        }
                        return [4 /*yield*/, user_model_2.default.aggregate(aggregate)];
                    case 1:
                        docs = _b.sent();
                        return [2 /*return*/, docs];
                    case 2:
                        error_1 = _b.sent();
                        throw new Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    findOne: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.default.findOne({
                                _id: mongoose_1.Types.ObjectId(id),
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * @param {IUserModel} user
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    insert: function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.default.create(body)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        error_3 = _a.sent();
                        if (error_3 instanceof mongodb_1.MongoError) {
                            throw new Error("User with email id already exists");
                        }
                        throw new Error(error_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    remove: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.default.findOneAndRemove({
                                _id: mongoose_1.Types.ObjectId(id),
                            })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error(error_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * @param {IUserModel} user
     * @returns {Promise < any >}
     * @memberof UserService
     */
    update: function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, user_model_1.default.updateOne({ _id: mongoose_1.Types.ObjectId(body._id) }, { $set: body })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, user_model_1.default.findById(body._id).lean()];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error(error_5.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
};
exports.default = UserService;
