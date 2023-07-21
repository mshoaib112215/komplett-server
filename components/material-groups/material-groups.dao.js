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
const material_groups_model_1 = require("./material-groups.model");
const dao_1 = require("../dao");
class MaterialGroupsDAO extends dao_1.default {
    constructor() {
        super(...arguments);
        this.model = material_groups_model_1.MaterialGroupsModel;
        this.getAll = (queryParmas) => __awaiter(this, void 0, void 0, function* () {
            try {
                let docs;
                if (queryParmas && Object.keys(queryParmas).length) {
                    if (queryParmas.category === "all") {
                        docs = yield this.model.find().populate("subgroups"); // link subgroup table via assign model
                    }
                    else {
                        docs = yield this.model.find(queryParmas).populate("subgroups");
                    }
                }
                return docs;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        // addSubgroupRecord = async (
        //   payloads: ISubgroupModel
        // ): Promise<ISubgroupModel> => {
        //   try {
        //     console.log("payloads", payloads);
        //     // const obj = new this.model(body);
        //     const doc: ISubgroupModel = await SubgroupsModel.create(payloads);
        //     console.log("doc", doc);
        //     if (!doc) {
        //       throw new Error("Subgroup create failed");
        //     }
        //     return doc;
        //   } catch (error) {
        //     throw new Error(error.message);
        //   }
        // };
    }
}
exports.default = new MaterialGroupsDAO();
