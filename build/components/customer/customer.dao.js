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
const user_dao_1 = require("../user/user.dao");
const user_model_1 = require("../user/user.model");
const customer_model_1 = require("./customer.model");
class CustomerDAO extends dao_1.default {
    constructor() {
        super(...arguments);
        this.model = customer_model_1.default;
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
        this.userActiveFilter = {
            $match: {
                "user.active": true
            }
        };
        this.insertCustomer = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                // create user account of customer
                const user = data.user;
                const location = data.location;
                if (user) {
                    user.role = constants_1.USERROLES.CUSTOMER;
                    delete user._id;
                    const userDoc = yield user_dao_1.default.insert(user);
                    data.userId = userDoc._id;
                }
                // set location ref from location Table
                if (location) {
                    delete location._id;
                    const locationDoc = yield location_dao_2.default.insert(location);
                    data.locationId = locationDoc._id;
                }
                const customer = yield this.model.create(data);
                return customer;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        // findCustomerByName = async (name: string) => {
        //     try {
        //         const regEx = new RegExp(`${name}`, 'i');
        //         const matchAggregate = { $match: { 'user.name': regEx } };
        //         const facet = {
        //             '$facet': {
        //                 metadata: [{ $count: "total" }],
        //                 data: [{ $skip: 0 }]
        //             }
        //         };
        //         const result: any = await this.model.aggregate([this.lookupUser, this.lookupLocation, this.unwindUser, matchAggregate, facet]);
        //         return result[0];
        //     } catch (error) {
        //         throw new Error(error);
        //     }
        // }
        this.findAllCustomer = (config) => __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (config.customerName) {
                    const regEx = new RegExp(`${config.customerName}`, 'i');
                    const CustomerNameMatchAggregate = { $match: { 'user.name': regEx } };
                    result = this.fnGetByConfigration(Object.assign({}, config, { lookupAggregate: [this.lookupUser, this.lookupLocation, this.unwindUser, this.unwindLocation, CustomerNameMatchAggregate, this.userActiveFilter] }));
                }
                else {
                    result = this.fnGetByConfigration(Object.assign({}, config, { lookupAggregate: [this.lookupUser, this.lookupLocation, this.unwindUser, this.unwindLocation, this.userActiveFilter] }));
                }
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.findCustomerById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const customerId = mongoose_1.Types.ObjectId(id);
                let aggregation = [];
                const match = {
                    $match: {
                        _id: customerId
                    }
                };
                aggregation.push(match, this.lookupUser, this.lookupLocation, this.unwindUser, this.unwindLocation);
                const customer = this.model.aggregate(aggregation);
                return customer;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.updateCustomer = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                //NOTE: if updated email id from user table then credentails of customer 
                // login are changes so making it not updatable
                // only admin can update email of customer
                if (data.user) {
                    if (!data.user._id) {
                        throw new Error('_id not available in "data.user"');
                    }
                    const user = yield user_dao_1.default.update(data.user);
                }
                //update location in location table
                if (data.location) {
                    if (!data.location._id) {
                        throw new Error('_id not available in "data.location"');
                    }
                    const location = yield location_dao_1.default.update(data.location._id, data.location);
                }
                const result = this.model.findByIdAndUpdate(data._id, { $set: data });
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        // NOTE we just want to disable customer from login
        // can't delete all data of customer 
        // as projects has refrence of customer table
        this.deleteCustomer = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield this.fnGet(id);
                let user;
                if (customer && customer.userId) {
                    user = yield user_model_1.default.findByIdAndUpdate({ _id: customer.userId }, { $set: { active: false } });
                }
                else {
                    throw new Error("userId is not available in customers doc");
                }
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = new CustomerDAO();
