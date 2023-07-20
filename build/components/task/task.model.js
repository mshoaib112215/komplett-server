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
const connections = require("../../config/connection/connection");
const constants_1 = require("../../constants/constants");
const project_model_1 = require("../project/project.model");
/**
 * @swagger
 * components:
 *  schemas:
 *    TaskSchema:
 *      properties:
 *        name:
 *          type: string
 *        status:
 *          type: string
 *        estimation:
 *          type: number
 *        reportedHours:
 *          type: number
 *        progress:
 *          type: number
 *        startDate:
 *          type: date
 *        deadLine:
 *          type: date
 *        completionDate:
 *          type: date
 *        description:
 *          type: string
 *        assignedEmployees:
 *          type: array
 *          example: []
 *          items:
 *            $ref : '#/components/schemas/EmployeeSchema'
 *        availableForAllEmployees:
 *          type: boolean
 *        projectId:
 *          $ref : '#/components/schemas/ProjectSchema'
 *
 */
const taskSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    status: {
        type: String,
        enum: [constants_1.TASKSTATUS.ACTIVE, constants_1.TASKSTATUS.CANCELLED, constants_1.TASKSTATUS.COMPLETED],
        default: constants_1.TASKSTATUS.ACTIVE
    },
    estimation: Number,
    reportedHours: Number,
    progress: Number,
    startDate: Date,
    deadLine: Date,
    completionDate: Date,
    availableForAllEmployees: Boolean,
    //relations
    assignedEmployees: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'EmployeeModel'
        }
    ],
    projectId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'ProjectModel',
        required: true
    }
}, {
    collection: 'Tasks'
});
taskSchema.post('save', (doc, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        // insert in tasks array of projectDoc
        const update = yield project_model_1.ProjectModel.findByIdAndUpdate({ _id: doc.projectId }, {
            $push: {
                tasks: doc._id
            }
        });
        next();
    }
    catch (error) {
        throw new Error(error);
    }
}));
taskSchema.post('remove', (doc, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        // remove task id from project 
        const projectId = doc.projectId;
        const update = yield project_model_1.ProjectModel.findByIdAndUpdate({ _id: projectId }, {
            $pull: {
                tasks: doc._id
            }
        });
        next();
    }
    catch (error) {
        throw new Error(error);
    }
}));
exports.TaskModel = connections.db.model('TaskModel', taskSchema);
