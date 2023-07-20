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
exports.updateProject = exports.deleteProject = exports.findProjectByCustomerId = exports.insertProject = exports.getProjectById = exports.findAllProjects = void 0;
var winston_1 = require("../../config/winston");
var constants_1 = require("../../constants/constants");
var project_dao_1 = require("./project.dao");
var project_dao_2 = require("./project.dao");
var project_validation_1 = require("./project.validation");
function findAllProjects(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var limit, page, order, sort, status_1, projectName, config, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    limit = parseInt(req.query.limit);
                    page = parseInt(req.query.page);
                    order = req.query.order;
                    sort = req.query.sort;
                    status_1 = req.query.status || 'all';
                    projectName = req.query.projectName;
                    status_1 = status_1.toUpperCase();
                    if (status_1 !== 'ALL') {
                        if (!(status_1 in constants_1.PROJECTSTATUS)) {
                            status_1 = 'ALL';
                        }
                    }
                    config = {
                        limit: limit,
                        page: page,
                        sort: sort,
                        order: order,
                        projectName: projectName
                    };
                    return [4 /*yield*/, project_dao_1.default.findAllProjects(config, status_1)];
                case 1:
                    response = _a.sent();
                    res.status(200).json(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    winston_1.logger.error('error', error_1, { file: 'project -> project.controller.ts -> findAllProjects', request: req.method + ' :' + req.baseUrl + req.url });
                    res.status(400).json({ message: error_1.message || error_1 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findAllProjects = findAllProjects;
function getProjectById(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, validation, project, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    validation = project_validation_1.default.checkIdValidation({ id: id });
                    if (validation.error) {
                        throw new Error(validation.error.message);
                    }
                    return [4 /*yield*/, project_dao_2.default.getProjectById(id)];
                case 1:
                    project = _a.sent();
                    res.status(200).json(project);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    winston_1.logger.error('error', error_2, { file: 'project -> project.controller.ts -> getProjectById', request: req.method + ' :' + req.baseUrl + req.url });
                    res.status(400).json({ message: error_2.message || error_2 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getProjectById = getProjectById;
function insertProject(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var newProj, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, project_dao_2.default.insertProject(req.body)];
                case 1:
                    newProj = _a.sent();
                    res.status(201).json(newProj);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    winston_1.logger.error('error', error_3, { file: 'project -> project.controller.ts -> insertProject', request: req.method + ' :' + req.baseUrl + req.url });
                    res.status(400).json({ message: error_3.message || error_3 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.insertProject = insertProject;
function findProjectByCustomerId(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, validation, projects, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    validation = project_validation_1.default.checkIdValidation({ id: id });
                    if (validation.error) {
                        throw new Error(validation.error.message);
                    }
                    return [4 /*yield*/, project_dao_2.default.getProjectsByCustomerId(id)];
                case 1:
                    projects = _a.sent();
                    res.status(200).json(projects);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    winston_1.logger.error('error', error_4, { file: 'project -> project.controller.ts -> findProjectByCustomerId', request: req.method + ' :' + req.baseUrl + req.url });
                    res.status(400).json({ message: error_4.message || error_4 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findProjectByCustomerId = findProjectByCustomerId;
function deleteProject(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, validation, project, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    validation = project_validation_1.default.checkIdValidation({ id: id });
                    if (validation.error) {
                        throw new Error(validation.error.message);
                    }
                    return [4 /*yield*/, project_dao_2.default.deleteRecord(id)];
                case 1:
                    project = _a.sent();
                    res.status(204).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    winston_1.logger.error('error', error_5, { file: 'project -> project.controller.ts -> deleteProject', request: req.method + ' :' + req.baseUrl + req.url });
                    res.status(400).json({ message: error_5.message || error_5 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteProject = deleteProject;
function updateProject(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var data, id, validation, project, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    data = req.body;
                    id = data._id;
                    validation = project_validation_1.default.checkIdValidation({ id: id });
                    if (validation.error) {
                        throw new Error(validation.error.message);
                    }
                    return [4 /*yield*/, project_dao_2.default.updateProject(data)];
                case 1:
                    project = _a.sent();
                    res.status(200).json(project);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    winston_1.logger.error('error', error_6, { file: 'project -> project.controller.ts -> updateProject', request: req.method + ' :' + req.baseUrl + req.url });
                    res.status(400).json({ message: error_6.message || error_6 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateProject = updateProject;
