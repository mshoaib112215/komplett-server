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
const dao_1 = require("../dao");
const location_dao_1 = require("../location/location.dao");
const user_dao_1 = require("../user/user.dao");
const user_model_1 = require("../user/user.model");
const employee_model_1 = require("./employee.model");
const constants_1 = require("../../constants/constants");
class EmployeeDAO extends dao_1.default {
    constructor() {
        super(...arguments);
        this.model = employee_model_1.default;
        this.lookupUser = {
            $lookup: {
                from: 'usermodel',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
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
        // employee is deleted if user.active is flase
        this.userActiveFilter = {
            $match: {
                "user.active": true
            }
        };
        this.findAllEmployee = (config) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.fnGetByConfigration(Object.assign({}, config, { lookupAggregate: [this.lookupUser, this.lookupLocation, this.userActiveFilter] }));
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.findEmployeeById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeId = mongoose_1.Types.ObjectId(id);
                let aggregation = [];
                const match = {
                    $match: {
                        _id: employeeId,
                    },
                };
                aggregation.push(match, this.lookupUser, this.lookupLocation, this.userActiveFilter);
                const employee = yield this.model.aggregate(aggregation);
                return employee;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.insertEmployee = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = data.user;
                const location = data.location;
                if (user) {
                    //TODO : user validation for email and name
                    user.role = constants_1.USERROLES.EMPLOYEE;
                    const userDoc = yield user_dao_1.default.insert(user);
                    data.userId = userDoc._id;
                }
                if (location) {
                    const locationDoc = yield location_dao_1.default.insert(location);
                    data.locationId = locationDoc._id;
                }
                const doc = yield this.insert(data);
                return doc;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.updateEmployee = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const location = data.location;
                const user = data.user;
                if (location) {
                    if (!location._id) {
                        throw new Error('_id not available in "data.location"');
                    }
                    ;
                    const locationDoc = yield location_dao_1.default.update(data.location._id, location);
                }
                if (user) {
                    if (!user._id) {
                        throw new Error('_id not available in "data.user"');
                    }
                    ;
                    const userDoc = yield user_dao_1.default.update(user);
                }
                const result = yield this.model.findByIdAndUpdate(data._id, { $set: data });
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.deleteEmployee = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield this.fnGet(id);
                let user;
                if (doc && doc.userId) {
                    user = yield user_model_1.default.findByIdAndUpdate({ _id: doc.userId }, { $set: { active: false } });
                }
                else {
                    throw new Error("userId not available in employee doc");
                }
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = new EmployeeDAO();
