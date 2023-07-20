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
exports.deleteTask = exports.updateTask = exports.insertTask = exports.getTaskById = exports.findAllTask = void 0;
var winston_1 = require("../../config/winston");
var constants_1 = require("../../constants/constants");
var task_dao_1 = require("./task.dao");
var task_validation_1 = require("./task.validation");
function findAllTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var limit, page, order, sort, projectId, status_1, validation, config, tasks, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    limit = parseInt(req.query.limit);
                    page = parseInt(req.query.page);
                    order = req.query.order;
                    sort = req.query.sort;
                    projectId = req.query.projectId;
                    status_1 = req.query.status || 'all';
                    status_1 = status_1.toUpperCase();
                    if (status_1 !== 'ALL') {
                        if (!(status_1 in constants_1.TASKSTATUS)) {
                            status_1 = 'ALL';
                        }
                    }
                    if (!projectId) {
                        throw new Error('projectId must be available in query params');
                    }
                    validation = task_validation_1.default.checkIdValidation({ id: projectId });
                    if (validation.error) {
                        throw new Error(validation.error.message);
                    }
                    config = {
                        limit: limit,
                        page: page,
                        sort: sort,
                        order: order
                    };
                    return [4 /*yield*/, task_dao_1.default.findTaskByProjectId(projectId, status_1, config)];
                case 1:
                    tasks = _a.sent();
                    res.status(200).json(tasks);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    winston_1.logger.log('error', error_1, { file: 'task -> task.controller.ts -> findAllTask', request: req.method + ' :' + req.baseUrl + req.url });
                    res.status(400).json({ message: error_1.message || error_1 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findAllTask = findAllTask;
function getTaskById(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, validation, task, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    validation = task_validation_1.default.checkIdValidation({ id: id });
                    if (validation.error) {
                        throw new Error(validation.error.message);
                    }
                    return [4 /*yield*/, task_dao_1.default.getTaskById(id)];
                case 1:
                    task = _a.sent();
                    res.status(200).json(task);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    winston_1.logger.error('error', error_2, { file: 'task -> task.controller.ts -> getTaskById', request: req.method + ' :' + req.baseUrl + req.url });
                    res.status(400).json({ message: error_2.message || error_2 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getTaskById = getTaskById;
function insertTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, validation, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    validation = task_validation_1.default.insertTaskValidation(body);
                    if (validation.error) {
                        throw new Error(validation.error.message);
                    }
                    return [4 /*yield*/, task_dao_1.default.insertTask(body)];
                case 1:
                    response = _a.sent();
                    res.status(201).json(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    winston_1.logger.log('error', error_3, { file: 'task -> task.controller.ts -> insertTask', request: req.method + ' :' + req.baseUrl + req.url });
                    res.status(400).json({ message: error_3.message || error_3 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.insertTask = insertTask;
function updateTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, id, validation, response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    id = body._id;
                    validation = task_validation_1.default.checkIdValidation({ id: id });
                    if (validation.error) {
                        throw new Error(validation.error.message);
                    }
                    return [4 /*yield*/, task_dao_1.default.updateTask(body)];
                case 1:
                    response = _a.sent();
                    res.status(200).json(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    winston_1.logger.log('error', error_4, { file: 'task -> task.controller.ts -> updateTask', request: req.method + ' :' + req.baseUrl + req.url });
                    res.status(400).json({ message: error_4.message || error_4 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateTask = updateTask;
function deleteTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, validation, deletedDoc, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    validation = task_validation_1.default.checkIdValidation({ id: id });
                    if (validation.error) {
                        throw new Error(validation.error.message);
                    }
                    return [4 /*yield*/, task_dao_1.default.deleteRecord(id)];
                case 1:
                    deletedDoc = _a.sent();
                    res.status(200).json(deletedDoc);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    winston_1.logger.log('error', error_5, { file: 'task -> task.controller.ts -> deleteTask', request: req.method + ' :' + req.baseUrl + req.url });
                    res.status(400).json({ message: error_5.message || error_5 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteTask = deleteTask;
/**
 * specifications: The fields to
 *   include or exclude.
 */
// $project : {
//     tasks : {
//       $filter : {
//         input : "$tasks",
//         as : "task", 
//         cond : {$eq :['$$task', ObjectId('5f9f8aabd9bb99369c51923d')]}
//       }
//     }
//   }
