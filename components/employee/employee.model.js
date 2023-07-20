"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connections = require("../../config/connection/connection");
;
/**
 * @swagger
 * components:
 *  schemas:
 *    EmployeeSchema:
 *      properties:
 *        employeeNumber:
 *          type: number
 *        hseCardNumber:
 *          type: number
 *        otherContactDetails:
 *          type: string
 *        emergencyContactName:
 *          type: string
 *        emergencyContactPhoneNumber:
 *          type: string
 *        emergencyContactEmail:
 *          type: string
 *        locationId:
 *          type: string
 *        userId:
 *          type: string
 *        location:
 *          type: object
 *          $ref : '#/components/schemas/LocationSchema'
 *        user:
 *          $ref : '#/components/schemas/UserSchema'
 *
 */
const employeeSchema = new mongoose_1.Schema({
    employeeNumber: Number,
    hseCardNumber: Number,
    otherContactDetails: String,
    emergencyContactName: String,
    emergencyContactPhoneNumber: String,
    emergencyContactEmail: String,
    // relations
    userId: mongoose_1.Types.ObjectId,
    locationId: mongoose_1.Types.ObjectId
}, {
    collection: 'Employees',
    timestamps: true
});
const EmployeeModel = connections.db.model('EmployeeModel', employeeSchema);
exports.default = EmployeeModel;
