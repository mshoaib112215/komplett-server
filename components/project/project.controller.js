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
const winston_1 = require("../../config/winston");
const constants_1 = require("../../constants/constants");
const project_dao_1 = require("./project.dao");
const project_dao_2 = require("./project.dao");
const project_validation_1 = require("./project.validation");
function findAllProjects(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const limit = parseInt(req.query.limit);
            const page = parseInt(req.query.page);
            const order = req.query.order;
            const sort = req.query.sort;
            let status = req.query.status || 'all';
            const projectName = req.query.projectName;
            status = status.toUpperCase();
            if (status !== 'ALL') {
                if (!(status in constants_1.PROJECTSTATUS)) {
                    status = 'ALL';
                }
            }
            const config = {
                limit, page, sort, order, projectName
            };
            const response = yield project_dao_1.default.findAllProjects(config, status);
            res.status(200).json(response);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'project -> project.controller.ts -> findAllProjects', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.findAllProjects = findAllProjects;
function getProjectById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const validation = project_validation_1.default.checkIdValidation({ id });
            if (validation.error) {
                throw new Error(validation.error.message);
            }
            const project = yield project_dao_2.default.getProjectById(id);
            res.status(200).json(project);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'project -> project.controller.ts -> getProjectById', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.getProjectById = getProjectById;
function insertProject(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newProj = yield project_dao_2.default.insertProject(req.body);
            res.status(201).json(newProj);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'project -> project.controller.ts -> insertProject', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.insertProject = insertProject;
function findProjectByCustomerId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const validation = project_validation_1.default.checkIdValidation({ id });
            if (validation.error) {
                throw new Error(validation.error.message);
            }
            const projects = yield project_dao_2.default.getProjectsByCustomerId(id);
            res.status(200).json(projects);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'project -> project.controller.ts -> findProjectByCustomerId', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.findProjectByCustomerId = findProjectByCustomerId;
function deleteProject(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const validation = project_validation_1.default.checkIdValidation({ id });
            if (validation.error) {
                throw new Error(validation.error.message);
            }
            const project = yield project_dao_2.default.deleteRecord(id);
            res.status(204).end();
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'project -> project.controller.ts -> deleteProject', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.deleteProject = deleteProject;
function updateProject(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const id = data._id;
            const validation = project_validation_1.default.checkIdValidation({ id });
            if (validation.error) {
                throw new Error(validation.error.message);
            }
            const project = yield project_dao_2.default.updateProject(data);
            res.status(200).json(project);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'project -> project.controller.ts -> updateProject', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.updateProject = updateProject;
