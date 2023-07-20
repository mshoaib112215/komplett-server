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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var location_dao_1 = require("../location/location.dao");
var user_dao_1 = require("../user/user.dao");
var user_model_1 = require("../user/user.model");
var employee_model_1 = require("./employee.model");
var constants_1 = require("../../constants/constants");
var EmployeeDAO = /** @class */ (function (_super) {
    __extends(EmployeeDAO, _super);
    function EmployeeDAO() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = employee_model_1.default;
        _this.lookupUser = {
            $lookup: {
                from: 'usermodel',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        };
        _this.lookupLocation = {
            $lookup: {
                from: 'Locations',
                localField: 'locationId',
                foreignField: '_id',
                as: 'location'
            }
        };
        // employee is deleted if user.active is flase
        _this.userActiveFilter = {
            $match: {
                "user.active": true
            }
        };
        _this.findAllEmployee = function (config) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fnGetByConfigration(__assign(__assign({}, config), { lookupAggregate: [this.lookupUser, this.lookupLocation, this.userActiveFilter] }))];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.findEmployeeById = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var employeeId, aggregation, match, employee, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        employeeId = mongoose_1.Types.ObjectId(id);
                        aggregation = [];
                        match = {
                            $match: {
                                _id: employeeId,
                            },
                        };
                        aggregation.push(match, this.lookupUser, this.lookupLocation, this.userActiveFilter);
                        return [4 /*yield*/, this.model.aggregate(aggregation)];
                    case 1:
                        employee = _a.sent();
                        return [2 /*return*/, employee];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.insertEmployee = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var user, location_1, userDoc, locationDoc, doc, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        user = data.user;
                        location_1 = data.location;
                        if (!user) return [3 /*break*/, 2];
                        //TODO : user validation for email and name
                        user.role = constants_1.USERROLES.EMPLOYEE;
                        return [4 /*yield*/, user_dao_1.default.insert(user)];
                    case 1:
                        userDoc = _a.sent();
                        data.userId = userDoc._id;
                        _a.label = 2;
                    case 2:
                        if (!location_1) return [3 /*break*/, 4];
                        return [4 /*yield*/, location_dao_1.default.insert(location_1)];
                    case 3:
                        locationDoc = _a.sent();
                        data.locationId = locationDoc._id;
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.insert(data)];
                    case 5:
                        doc = _a.sent();
                        return [2 /*return*/, doc];
                    case 6:
                        error_3 = _a.sent();
                        throw new Error(error_3);
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        _this.updateEmployee = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var location_2, user, locationDoc, userDoc, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        location_2 = data.location;
                        user = data.user;
                        if (!location_2) return [3 /*break*/, 2];
                        if (!location_2._id) {
                            throw new Error('_id not available in "data.location"');
                        }
                        ;
                        return [4 /*yield*/, location_dao_1.default.update(data.location._id, location_2)];
                    case 1:
                        locationDoc = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!user) return [3 /*break*/, 4];
                        if (!user._id) {
                            throw new Error('_id not available in "data.user"');
                        }
                        ;
                        return [4 /*yield*/, user_dao_1.default.update(user)];
                    case 3:
                        userDoc = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.model.findByIdAndUpdate(data._id, { $set: data })];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 6:
                        error_4 = _a.sent();
                        throw new Error(error_4);
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        _this.deleteEmployee = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var doc, user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.fnGet(id)];
                    case 1:
                        doc = _a.sent();
                        user = void 0;
                        if (!(doc && doc.userId)) return [3 /*break*/, 3];
                        return [4 /*yield*/, user_model_1.default.findByIdAndUpdate({ _id: doc.userId }, { $set: { active: false } })];
                    case 2:
                        user = _a.sent();
                        return [3 /*break*/, 4];
                    case 3: throw new Error("userId not available in employee doc");
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        throw new Error(error_5);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return EmployeeDAO;
}(dao_1.default));
exports.default = new EmployeeDAO();
