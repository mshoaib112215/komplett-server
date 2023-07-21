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
const task_dao_1 = require("./task.dao");
const task_validation_1 = require("./task.validation");
function findAllTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const limit = parseInt(req.query.limit);
            const page = parseInt(req.query.page);
            const order = req.query.order;
            const sort = req.query.sort;
            const projectId = req.query.projectId;
            let status = req.query.status || 'all';
            status = status.toUpperCase();
            if (status !== 'ALL') {
                if (!(status in constants_1.TASKSTATUS)) {
                    status = 'ALL';
                }
            }
            if (!projectId) {
                throw new Error('projectId must be available in query params');
            }
            const validation = task_validation_1.default.checkIdValidation({ id: projectId });
            if (validation.error) {
                throw new Error(validation.error.message);
            }
            const config = {
                limit, page, sort, order
            };
            const tasks = yield task_dao_1.default.findTaskByProjectId(projectId, status, config);
            res.status(200).json(tasks);
        }
        catch (error) {
            winston_1.logger.log('error', error, { file: 'task -> task.controller.ts -> findAllTask', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.findAllTask = findAllTask;
function getTaskById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const validation = task_validation_1.default.checkIdValidation({ id });
            if (validation.error) {
                throw new Error(validation.error.message);
            }
            const task = yield task_dao_1.default.getTaskById(id);
            res.status(200).json(task);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'task -> task.controller.ts -> getTaskById', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.getTaskById = getTaskById;
function insertTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const validation = task_validation_1.default.insertTaskValidation(body);
            if (validation.error) {
                throw new Error(validation.error.message);
            }
            const response = yield task_dao_1.default.insertTask(body);
            res.status(201).json(response);
        }
        catch (error) {
            winston_1.logger.log('error', error, { file: 'task -> task.controller.ts -> insertTask', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.insertTask = insertTask;
function updateTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const id = body._id;
            const validation = task_validation_1.default.checkIdValidation({ id });
            if (validation.error) {
                throw new Error(validation.error.message);
            }
            const response = yield task_dao_1.default.updateTask(body);
            res.status(200).json(response);
        }
        catch (error) {
            winston_1.logger.log('error', error, { file: 'task -> task.controller.ts -> updateTask', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.updateTask = updateTask;
function deleteTask(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const validation = task_validation_1.default.checkIdValidation({ id });
            if (validation.error) {
                throw new Error(validation.error.message);
            }
            const deletedDoc = yield task_dao_1.default.deleteRecord(id);
            res.status(200).json(deletedDoc);
        }
        catch (error) {
            winston_1.logger.log('error', error, { file: 'task -> task.controller.ts -> deleteTask', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
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
