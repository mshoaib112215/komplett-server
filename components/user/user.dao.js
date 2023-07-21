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
const user_model_1 = require("./user.model");
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const constants_1 = require("../../constants/constants");
const user_model_2 = require("./user.model");
/**
 * @export
 * @implements {IUserModelService}
 */
const UserService = {
    /**
     * @returns {Promise < IUserModel[] >}
     * @memberof UserService
     */
    findAll(config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const aggregate = [];
                const order = config.order && config.order == "des" ? -1 : 1;
                const limit = config.limit;
                const page = config.page || 1;
                const sort = config.sort || "createdAt";
                const skipNumber = (page - 1) * limit;
                const role = config.role;
                const skipAggregate = { $skip: skipNumber };
                const sortAggregate = { $sort: { [sort]: order } };
                const limitAggregate = { $limit: limit };
                const matchCategory = {
                    $match: {
                        role: role,
                    },
                };
                if (role !== "all" && role in constants_1.USERROLES) {
                    aggregate.push(matchCategory);
                }
                aggregate.push(sortAggregate);
                console.log(aggregate);
                if (limit) {
                    const facet = {
                        $facet: {
                            metadata: [{ $count: "total" }, { $addFields: { page: page } }],
                            data: [skipAggregate, limitAggregate],
                        },
                    };
                    aggregate.push(facet);
                }
                else {
                    const facet = {
                        $facet: {
                            metadata: [{ $count: "total" }, { $addFields: { page: page } }],
                            data: [{ $skip: 0 }],
                        },
                    };
                    aggregate.push(facet);
                }
                const docs = yield user_model_2.default.aggregate(aggregate);
                return docs;
                // if (role && role in USERROLES) {
                //     aggregate.push(
                //         {
                //             $match: {
                //                 role: role
                //             }
                //         }
                //     )
                // } else {
                //     aggregate.push({
                //         $match: {
                //             role: {
                //                 $in: [USERROLES.ADMIN, USERROLES.SUPER_ADMIN, USERROLES.USER]
                //             }
                //         }
                //     })
                // }
                // console.log(aggregate);
                // const docs = await UserModel.aggregate(aggregate);
                // console.log(docs)
                // return docs;
                // return await UserModel.find({});
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.findOne({
                    _id: mongoose_1.Types.ObjectId(id),
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {IUserModel} user
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    insert(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.create(body);
                return user;
            }
            catch (error) {
                if (error instanceof mongodb_1.MongoError) {
                    throw new Error("User with email id already exists");
                }
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOneAndRemove({
                    _id: mongoose_1.Types.ObjectId(id),
                });
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {IUserModel} user
     * @returns {Promise < any >}
     * @memberof UserService
     */
    update(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_model_1.default.updateOne({ _id: mongoose_1.Types.ObjectId(body._id) }, { $set: body });
                const user = yield user_model_1.default.findById(body._id).lean();
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
};
exports.default = UserService;
