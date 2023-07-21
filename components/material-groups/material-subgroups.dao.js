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
class MaterialSubgroupsDAO extends dao_1.default {
    constructor() {
        super(...arguments);
        this.model = material_groups_model_1.SubgroupsModel;
        this.addSubgroupRecord = (payloads) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("payloads", payloads);
                // const obj = new this.model(body);
                const doc = yield material_groups_model_1.SubgroupsModel.create(payloads);
                console.log("doc", doc);
                if (!doc) {
                    throw new Error("Subgroup create failed");
                }
                return doc;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.deleteSubgroupRecord = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("payloads", id);
                // const obj = new this.model(body);
                const doc = yield material_groups_model_1.SubgroupsModel.findOneAndDelete({ "_id": id });
                console.log("doc", doc);
                if (!doc) {
                    throw new Error("Subgroup create failed");
                }
                return doc;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = new MaterialSubgroupsDAO();
