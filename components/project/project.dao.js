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
const mongoose_1 = require("mongoose");
const constants_1 = require("../../constants/constants");
const dao_1 = require("../dao");
const location_dao_1 = require("../location/location.dao");
const location_dao_2 = require("../location/location.dao");
const project_model_1 = require("./project.model");
class ProjectDAO extends dao_1.default {
    constructor() {
        super(...arguments);
        this.model = project_model_1.ProjectModel;
        this.lookupCustomer = {
            $lookup: {
                from: 'Customers',
                localField: 'customerId',
                foreignField: '_id',
                as: 'customer'
            }
        };
        this.lookupLocation = {
            $lookup: {
                from: 'Locations',
                localField: 'locationId',
                foreignField: '_id',
                as: 'location'
            }
        };
        this.userAggregate = {
            $lookup: {
                from: 'usermodel',
                localField: 'customer.userId',
                foreignField: '_id',
                as: 'user'
            }
        };
        this.unwindUser = {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true
            }
        };
        this.unwindLocation = {
            $unwind: {
                path: '$location',
                preserveNullAndEmptyArrays: true
            }
        };
        this.unwindCustomer = {
            $unwind: {
                path: '$customer',
                preserveNullAndEmptyArrays: true
            }
        };
        this.insertProject = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const location = body.location;
                if (location) {
                    const locationDoc = yield location_dao_2.default.insert(location);
                    body.locationId = locationDoc._id;
                }
                const newProject = yield this.insert(body);
                return newProject;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.findAllProjects = (config, status = 'all') => __awaiter(this, void 0, void 0, function* () {
            try {
                let aggregate = [];
                const regEx = new RegExp(`${config.projectName}`, 'i');
                const projectNameAggregate = { $match: { 'name': regEx } };
                if (config.projectName) {
                    console.log(config.projectName, projectNameAggregate);
                    aggregate.push(projectNameAggregate);
                }
                let result;
                const taskLookup = {
                    $lookup: {
                        from: 'Tasks',
                        localField: 'tasks',
                        foreignField: '_id',
                        as: 'tasksArr'
                    }
                };
                aggregate.push(this.lookupCustomer, this.lookupLocation, taskLookup, this.userAggregate, this.unwindUser, this.unwindCustomer, this.unwindLocation);
                if (status !== 'ALL') {
                    let matchStatus = {
                        $match: {
                            status: status,
                        }
                    };
                    aggregate.unshift(matchStatus);
                    // console.log(aggregate);
                    result = yield this.fnGetByConfigration(Object.assign({}, config, { lookupAggregate: aggregate }));
                }
                else {
                    // console.log(aggregate);
                    result = yield this.fnGetByConfigration(Object.assign({}, config, { lookupAggregate: aggregate }));
                }
                // console.log(result);
                // let taskCompleted = 0;
                // result.data[0].tasksArr.forEach((element: any) => {
                //     if (element && element.status && element.status === TASKSTATUS.COMPLETED) {
                //         taskCompleted += 1;
                //     }
                // });
                // result.data[0].taskCompleted = taskCompleted;
                result.data.forEach((project, index) => {
                    project.tasksArr.forEach((task) => {
                        if (task && task.status && task.status === constants_1.TASKSTATUS.COMPLETED) {
                            project.taskCompleted ? project.taskCompleted = 1 + project.taskCompleted : project.taskCompleted = 1;
                        }
                    });
                    delete project.tasksArr;
                });
                // console.log(result.data)
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.getProjectById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const match = {
                    $match: {
                        _id: mongoose_1.Types.ObjectId(id)
                    }
                };
                const aggregate = [];
                aggregate.push(match, this.lookupLocation, this.lookupCustomer, this.userAggregate, this.unwindUser, this.unwindCustomer, this.unwindLocation);
                const project = yield this.model.aggregate(aggregate);
                return project;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.getProjectsByCustomerId = (customerId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const matchAggregate = {
                    $match: {
                        customerId: mongoose_1.Types.ObjectId(customerId)
                    }
                };
                const result = yield this.model.aggregate([matchAggregate, this.lookupLocation, this.lookupCustomer, this.userAggregate, this.unwindUser, this.unwindCustomer, this.unwindLocation]);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.updateProject = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                // cannot update locationId or userId
                if (data.locationId) {
                    delete data.locationId;
                }
                if (data.userId) {
                    delete data.userId;
                }
                if (data.location) {
                    if (!data.location._id) {
                        throw new Error('_id not available in "data.location"');
                    }
                    const location = yield location_dao_1.default.update(data.location._id, data.location);
                }
                const updatedProject = yield this.update(data._id, data);
                return updatedProject;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = new ProjectDAO();
