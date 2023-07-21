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
const company_settings_model_1 = require("./company-settings.model");
const company_settings_dao_1 = require("./company-settings.dao");
class CompanySettingsService {
    constructor() {
        this.findCompanySettings = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const companySetting: ICompanySettingsModel = await companySettingsDao.getCompanySettingByUserId(id);
                const companySetting = yield company_settings_dao_1.default.fnGetAll();
                /**
                 * id company setting is not available for user then create one with default object
                 */
                if (!companySetting.length) {
                    let obj = company_settings_model_1.defaultCompanySettings;
                    // obj.userId = id;                
                    const doc = yield company_settings_dao_1.default.insert(obj);
                    return doc;
                }
                return companySetting[0];
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.insertCompanySettings = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const companySetting = yield company_settings_dao_1.default.insert(body);
                return companySetting;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.updateCompanySettings = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = body._id;
                const companySetting = yield company_settings_dao_1.default.update(body._id, body);
                return companySetting;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.deleteCompanySettings = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const companySetting = yield company_settings_dao_1.default.deleteRecord(body);
                return companySetting;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.CompanySettingsService = CompanySettingsService;
exports.default = new CompanySettingsService();
