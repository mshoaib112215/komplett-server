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
const material_model_1 = require("../materials/material.model");
const master_material_model_1 = require("./master-material.model");
class MasterMaterialDAO extends dao_1.default {
    constructor() {
        super(...arguments);
        this.model = master_material_model_1.MasterMaterialModel;
        this.findMasterMaterialByCategory = (config) => __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                const aggregate = [];
                const order = config.order && config.order == "desc" ? -1 : 1;
                const limit = config.limit;
                const page = config.page || 1;
                const sort = config.sort || "createdAt";
                const skipNumber = (page - 1) * limit;
                const category = config.category;
                const groupId = config.groupId;
                const skipAggregate = { $skip: skipNumber };
                const sortAggregate = { $sort: { [sort]: order } };
                const limitAggregate = { $limit: limit };
                const matchCategory = {
                    $match: {
                        category: config.category,
                    },
                };
                const lookupFag = {
                    $lookup: {
                        from: "Fags",
                        localField: "subject",
                        foreignField: "_id",
                        as: "subjectDoc",
                    },
                };
                const lookupGroup = {
                    $lookup: {
                        from: "MaterialGroups",
                        localField: "groupId",
                        foreignField: "_id",
                        as: "groupDoc",
                    },
                };
                const lookupSubgroup = {
                    $lookup: {
                        from: "Subgroups",
                        localField: "subgroupId",
                        foreignField: "_id",
                        as: "subgroupDoc",
                    },
                };
                const unwindFag = {
                    $unwind: {
                        path: "$subjectDoc",
                        preserveNullAndEmptyArrays: true,
                    },
                };
                const unwindGroup = {
                    $unwind: {
                        path: "$groupDoc",
                        preserveNullAndEmptyArrays: true,
                    },
                };
                const unwindSubgroup = {
                    $unwind: {
                        path: "$subgroupDoc",
                        preserveNullAndEmptyArrays: true,
                    },
                };
                if (category !== "all" && category in material_model_1.tabTypes) {
                    aggregate.push(matchCategory);
                }
                if (groupId && groupId !== "all") {
                    const matchGroup = {
                        $match: {
                            groupId: mongoose_1.Types.ObjectId(config.groupId),
                        },
                    };
                    aggregate.push(matchGroup);
                }
                aggregate.push(sortAggregate, lookupFag, lookupGroup, lookupSubgroup, unwindFag, unwindGroup, unwindSubgroup);
                // as wee need all data for predictive search and limited data to show in table
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
                result = yield this.model.aggregate(aggregate);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.insertInMasterMaterial = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield this.insert(data);
                return doc;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = new MasterMaterialDAO();
