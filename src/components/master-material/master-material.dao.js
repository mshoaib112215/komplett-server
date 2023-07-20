"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var mongoose_1 = require("mongoose");
var dao_1 = require("../dao");
var material_model_1 = require("../materials/material.model");
var master_material_model_1 = require("./master-material.model");
var MasterMaterialDAO = /** @class */ (function (_super) {
    __extends(MasterMaterialDAO, _super);
    function MasterMaterialDAO() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = master_material_model_1.MasterMaterialModel;
        _this.findMasterMaterialByCategory = function (config) { return __awaiter(_this, void 0, void 0, function () {
            var result, aggregate, order, limit, page, sort, skipNumber, category, groupId, skipAggregate, sortAggregate, limitAggregate, matchCategory, lookupFag, lookupGroup, lookupSubgroup, unwindFag, unwindGroup, unwindSubgroup, matchGroup, facet, facet, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        result = void 0;
                        aggregate = [];
                        order = config.order && config.order == "desc" ? -1 : 1;
                        limit = config.limit;
                        page = config.page || 1;
                        sort = config.sort || "createdAt";
                        skipNumber = (page - 1) * limit;
                        category = config.category;
                        groupId = config.groupId;
                        skipAggregate = { $skip: skipNumber };
                        sortAggregate = { $sort: (_a = {}, _a[sort] = order, _a) };
                        limitAggregate = { $limit: limit };
                        matchCategory = {
                            $match: {
                                category: config.category,
                            },
                        };
                        lookupFag = {
                            $lookup: {
                                from: "Fags",
                                localField: "subject",
                                foreignField: "_id",
                                as: "subjectDoc",
                            },
                        };
                        lookupGroup = {
                            $lookup: {
                                from: "MaterialGroups",
                                localField: "groupId",
                                foreignField: "_id",
                                as: "groupDoc",
                            },
                        };
                        lookupSubgroup = {
                            $lookup: {
                                from: "Subgroups",
                                localField: "subgroupId",
                                foreignField: "_id",
                                as: "subgroupDoc",
                            },
                        };
                        unwindFag = {
                            $unwind: {
                                path: "$subjectDoc",
                                preserveNullAndEmptyArrays: true,
                            },
                        };
                        unwindGroup = {
                            $unwind: {
                                path: "$groupDoc",
                                preserveNullAndEmptyArrays: true,
                            },
                        };
                        unwindSubgroup = {
                            $unwind: {
                                path: "$subgroupDoc",
                                preserveNullAndEmptyArrays: true,
                            },
                        };
                        if (category !== "all" && category in material_model_1.tabTypes) {
                            aggregate.push(matchCategory);
                        }
                        if (groupId && groupId !== "all") {
                            matchGroup = {
                                $match: {
                                    groupId: mongoose_1.Types.ObjectId(config.groupId),
                                },
                            };
                            aggregate.push(matchGroup);
                        }
                        aggregate.push(sortAggregate, lookupFag, lookupGroup, lookupSubgroup, unwindFag, unwindGroup, unwindSubgroup);
                        // as wee need all data for predictive search and limited data to show in table
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
                        return [4 /*yield*/, this.model.aggregate(aggregate)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result];
                    case 2:
                        error_1 = _b.sent();
                        throw new Error(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.insertInMasterMaterial = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var doc, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.insert(data)];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, doc];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return MasterMaterialDAO;
}(dao_1.default));
exports.default = new MasterMaterialDAO();
