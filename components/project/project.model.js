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
const location_dao_1 = require("../location/location.dao");
const task_dao_1 = require("../task/task.dao");
/**
 * @swagger
 * components:
 *  schemas:
 *    ProjectSchema:
 *      properties:
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        contactPersonName:
 *          type: string
 *        contactPersonEmail:
 *          type: string
 *        contactPersonPhoneNumber:
 *          type: string
 *        projectNumber:
 *          type: number
 *        status:
 *          type: string
 *        estimatedHours:
 *          type: number
 *        registeredHours:
 *          type: number
 *        startDate:
 *          type: date
 *        completionDate:
 *          type: date
 *        deadLine:
 *          type: date
 *        locationId:
 *          type: string
 *        customerId:
 *          type: string
 *        location:
 *          type: object
 *          $ref : '#/components/schemas/LocationSchema'
 *        customer:
 *          $ref : '#/components/schemas/CustomerSchema'
 *
 */
const projectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    desciption: String,
    contactPersonName: String,
    contactPersonEmail: String,
    contactPersonPhoneNumber: String,
    projectNumber: Number,
    status: {
        type: String,
        enum: [constants_1.PROJECTSTATUS.ACTIVE, constants_1.PROJECTSTATUS.CANCELLED, constants_1.PROJECTSTATUS.COMPLETED, constants_1.PROJECTSTATUS.ONGOING, constants_1.PROJECTSTATUS.ONHOLD, constants_1.PROJECTSTATUS.PLANNED],
        default: constants_1.PROJECTSTATUS.ACTIVE
    },
    estimatedHours: Number,
    registeredHours: Number,
    startDate: Date,
    completionDate: Date,
    deadLine: Date,
    //relations
    locationId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'LocationModel'
    },
    customerId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'CustomerModel'
    },
    tasks: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'TaskModel'
        }
    ],
    projectManager: {
        type: mongoose_1.Types.ObjectId,
        ref: 'EmployeeModel'
    }
    // NOTE: impletent after task and employee module creation
    // manager
}, { collection: 'Projects', timestamps: true });
projectSchema.post('remove', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const self = this;
            // remove location ref from location table
            if (self.locationId) {
                yield location_dao_1.default.deleteRecord(self.locationId);
            }
            let tasks = doc.tasks;
            // also delete all the tasks associated with project
            tasks.forEach((task) => __awaiter(this, void 0, void 0, function* () {
                yield task_dao_1.default.deleteRecord(task);
            }));
            next();
            // shold not remove employee and customer
        }
        catch (error) {
            throw new Error(error);
        }
    });
});
const ProjectModel = connections.db.model('ProjectModel', projectSchema);
exports.ProjectModel = ProjectModel;
