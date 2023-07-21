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
const company_settings_model_1 = require("./company-settings.model");
class CompanySettingsDAO extends dao_1.default {
    constructor() {
        super(...arguments);
        this.model = company_settings_model_1.default;
        this.getCompanySettingByUserId = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const aggregate = [];
                aggregate.push({
                    $match: {
                        userId: mongoose_1.Types.ObjectId(id)
                    }
                });
                const doc = yield this.model.aggregate(aggregate);
                return doc[0];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = new CompanySettingsDAO();
