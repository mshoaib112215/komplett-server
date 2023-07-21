"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connections = require("../../config/connection/connection");
exports.defaultCompanySettings = {
    netSalary: 0,
    socialExpenses: 0,
    employersTax: 0,
    operatingCosts: 0,
    totalCostPerHour: 0,
    valueAddedTax: 0,
    valueIncrease: 0,
    surchargeMaterial: 0,
    surchargeWork: 0
};
/**
 * @swagger
 * components:
 *  schemas:
 *    CompanySettingsSchema:
 *      properties:
 *        userId:
 *          type: string
 *        netSalary:
 *          type: number
 *        socialExpenses:
 *          type: number
 *        employersTax:
 *          type: number
 *        operatingCosts:
 *          type: number
 *        totalCostPerHour:
 *          type: number
 *        valueAddedTax:
 *          type: number
 *        valueIncrease:
 *          type: number
 *        surchargeMaterial:
 *          type: number
 *        surchargeWork:
 *          type: number
 *
 */
const CompanySettingsSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        unique: true
    },
    netSalary: Number,
    socialExpenses: Number,
    employersTax: Number,
    operatingCosts: Number,
    totalCostPerHour: Number,
    valueAddedTax: Number,
    valueIncrease: Number,
    surchargeMaterial: Number,
    surchargeWork: Number
}, {
    collection: 'CompanySettings',
    timestamps: true
});
const CompanySettingsModel = connections.db.model('CompanySettingsModel', CompanySettingsSchema);
exports.default = CompanySettingsModel;
