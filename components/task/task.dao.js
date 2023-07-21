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
const dao_1 = require("../dao");
const task_model_1 = require("./task.model");
const mongoose_1 = require("mongoose");
const project_dao_1 = require("../project/project.dao");
class TaskDAO extends dao_1.default {
    constructor() {
        super(...arguments);
        this.model = task_model_1.TaskModel;
        this.findTaskByProjectId = (projectId, status, config) => __awaiter(this, void 0, void 0, function* () {
            try {
                let configs;
                const project = yield project_dao_1.default.fnGet(projectId);
                // console.log(project);
                if (!project) {
                    throw new Error("Project not available with this id");
                }
                // project
                // NOTE: aggregate to lookup task from project and employees (employee is left    )
                // let aggregate = [];
                // let lookUpTaskAggregate = {
                //     $lookup: {
                //         from: 'Tasks',
                //         localField: 'tasks',
                //         foreignField: '_id',
                //         as: 'task'
                //     }
                // }
                // aggregate.push(lookUpTaskAggregate);
                // const proj = await ProjectModel.aggregate(aggregate);
                // console.log(proj[0].task, 'proj')
                if (status != 'ALL') {
                    let matchStatus = {
                        $match: {
                            status: status
                        }
                    };
                    configs = Object.assign({}, config, { matchField: "projectId", matchValue: mongoose_1.Types.ObjectId(projectId), lookupAggregate: [matchStatus] });
                }
                else {
                    configs = Object.assign({}, config, { matchField: "projectId", matchValue: mongoose_1.Types.ObjectId(projectId) });
                }
                const tasks = yield this.fnGetByConfigration(configs);
                return tasks;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.getTaskById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const aggregate = [];
                const matchId = {
                    $match: {
                        _id: mongoose_1.Types.ObjectId(id)
                    }
                };
                let lookUpTaskAggregate = {
                    $lookup: {
                        from: 'Employees',
                        localField: 'assignedEmployees',
                        foreignField: '_id',
                        as: 'employees'
                    }
                };
                let userAggregate = {
                    $lookup: {
                        from: 'usermodel',
                        localField: 'employees.userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                };
                aggregate.push(matchId, lookUpTaskAggregate, userAggregate);
                const result = yield this.model.aggregate(aggregate);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.insertTask = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const projectId = data.projectId;
                const project = yield project_dao_1.default.fnGet(projectId);
                if (!project) {
                    throw new Error('Project not available with given id');
                }
                const taskDoc = yield this.insert(data);
                return taskDoc;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.updateTask = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (data.projectId) {
                    delete data.projectId;
                }
                const task = yield this.update(data._id, data);
                return task;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = new TaskDAO();
