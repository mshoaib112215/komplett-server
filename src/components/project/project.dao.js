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
var constants_1 = require("../../constants/constants");
var dao_1 = require("../dao");
var location_dao_1 = require("../location/location.dao");
var location_dao_2 = require("../location/location.dao");
var project_model_1 = require("./project.model");
var ProjectDAO = /** @class */ (function (_super) {
    __extends(ProjectDAO, _super);
    function ProjectDAO() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = project_model_1.ProjectModel;
        _this.lookupCustomer = {
            $lookup: {
                from: 'Customers',
                localField: 'customerId',
                foreignField: '_id',
                as: 'customer'
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
        _this.userAggregate = {
            $lookup: {
                from: 'usermodel',
                localField: 'customer.userId',
                foreignField: '_id',
                as: 'user'
            }
        };
        _this.unwindUser = {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true
            }
        };
        _this.unwindLocation = {
            $unwind: {
                path: '$location',
                preserveNullAndEmptyArrays: true
            }
        };
        _this.unwindCustomer = {
            $unwind: {
                path: '$customer',
                preserveNullAndEmptyArrays: true
            }
        };
        _this.insertProject = function (body) { return __awaiter(_this, void 0, void 0, function () {
            var location_1, locationDoc, newProject, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        location_1 = body.location;
                        if (!location_1) return [3 /*break*/, 2];
                        return [4 /*yield*/, location_dao_2.default.insert(location_1)];
                    case 1:
                        locationDoc = _a.sent();
                        body.locationId = locationDoc._id;
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.insert(body)];
                    case 3:
                        newProject = _a.sent();
                        return [2 /*return*/, newProject];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error(error_1);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.findAllProjects = function (config, status) {
            if (status === void 0) { status = 'all'; }
            return __awaiter(_this, void 0, void 0, function () {
                var aggregate, regEx, projectNameAggregate, result, taskLookup, matchStatus, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            aggregate = [];
                            regEx = new RegExp("".concat(config.projectName), 'i');
                            projectNameAggregate = { $match: { 'name': regEx } };
                            if (config.projectName) {
                                console.log(config.projectName, projectNameAggregate);
                                aggregate.push(projectNameAggregate);
                            }
                            result = void 0;
                            taskLookup = {
                                $lookup: {
                                    from: 'Tasks',
                                    localField: 'tasks',
                                    foreignField: '_id',
                                    as: 'tasksArr'
                                }
                            };
                            aggregate.push(this.lookupCustomer, this.lookupLocation, taskLookup, this.userAggregate, this.unwindUser, this.unwindCustomer, this.unwindLocation);
                            if (!(status !== 'ALL')) return [3 /*break*/, 2];
                            matchStatus = {
                                $match: {
                                    status: status,
                                }
                            };
                            aggregate.unshift(matchStatus);
                            return [4 /*yield*/, this.fnGetByConfigration(__assign(__assign({}, config), { lookupAggregate: aggregate }))];
                        case 1:
                            // console.log(aggregate);
                            result = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.fnGetByConfigration(__assign(__assign({}, config), { lookupAggregate: aggregate }))];
                        case 3:
                            // console.log(aggregate);
                            result = _a.sent();
                            _a.label = 4;
                        case 4:
                            // console.log(result);
                            // let taskCompleted = 0;
                            // result.data[0].tasksArr.forEach((element: any) => {
                            //     if (element && element.status && element.status === TASKSTATUS.COMPLETED) {
                            //         taskCompleted += 1;
                            //     }
                            // });
                            // result.data[0].taskCompleted = taskCompleted;
                            result.data.forEach(function (project, index) {
                                project.tasksArr.forEach(function (task) {
                                    if (task && task.status && task.status === constants_1.TASKSTATUS.COMPLETED) {
                                        project.taskCompleted ? project.taskCompleted = 1 + project.taskCompleted : project.taskCompleted = 1;
                                    }
                                });
                                delete project.tasksArr;
                            });
                            // console.log(result.data)
                            return [2 /*return*/, result];
                        case 5:
                            error_2 = _a.sent();
                            throw new Error(error_2);
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        _this.getProjectById = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var match, aggregate, project, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        match = {
                            $match: {
                                _id: mongoose_1.Types.ObjectId(id)
                            }
                        };
                        aggregate = [];
                        aggregate.push(match, this.lookupLocation, this.lookupCustomer, this.userAggregate, this.unwindUser, this.unwindCustomer, this.unwindLocation);
                        return [4 /*yield*/, this.model.aggregate(aggregate)];
                    case 1:
                        project = _a.sent();
                        return [2 /*return*/, project];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error(error_3);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getProjectsByCustomerId = function (customerId) { return __awaiter(_this, void 0, void 0, function () {
            var matchAggregate, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        matchAggregate = {
                            $match: {
                                customerId: mongoose_1.Types.ObjectId(customerId)
                            }
                        };
                        return [4 /*yield*/, this.model.aggregate([matchAggregate, this.lookupLocation, this.lookupCustomer, this.userAggregate, this.unwindUser, this.unwindCustomer, this.unwindLocation])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error(error_4);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.updateProject = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var location_2, updatedProject, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        // cannot update locationId or userId
                        if (data.locationId) {
                            delete data.locationId;
                        }
                        if (data.userId) {
                            delete data.userId;
                        }
                        if (!data.location) return [3 /*break*/, 2];
                        if (!data.location._id) {
                            throw new Error('_id not available in "data.location"');
                        }
                        return [4 /*yield*/, location_dao_1.default.update(data.location._id, data.location)];
                    case 1:
                        location_2 = _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.update(data._id, data)];
                    case 3:
                        updatedProject = _a.sent();
                        return [2 /*return*/, updatedProject];
                    case 4:
                        error_5 = _a.sent();
                        throw new Error(error_5);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return ProjectDAO;
}(dao_1.default));
exports.default = new ProjectDAO();
