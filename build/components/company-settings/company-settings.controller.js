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
const winston_1 = require("../../config/winston");
const company_settings_service_1 = require("./company-settings.service");
const company_settings_validation_1 = require("./company-settings.validation");
const fag_model_1 = require("../fag/fag.model");
function findCompanySettings(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const doc = yield company_settings_service_1.default.findCompanySettings(user.id);
            res.json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "company-settings -> company-settings.controller.ts -> findCompanySettings",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.findCompanySettings = findCompanySettings;
function insertCompanySetting(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const user = req.user;
            body["userId"] = user.id;
            const doc = yield company_settings_service_1.default.insertCompanySettings(body);
            res.json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "company-settings -> company-settings.controller.ts -> insertCompanySetting",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.insertCompanySetting = insertCompanySetting;
function deleteCompanySetting(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            console.log(id);
            const validate = company_settings_validation_1.default.checkIdValidation({ id: id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const doc = yield company_settings_service_1.default.deleteCompanySettings(id);
            res.json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "company-settings -> company-settings.controller.ts -> deleteCompanySetting",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.deleteCompanySetting = deleteCompanySetting;
function updateCompanySetting(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const validate = company_settings_validation_1.default.checkIdValidation({ id: body._id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const doc = yield company_settings_service_1.default.updateCompanySettings(body);
            if (doc) {
                yield fag_model_1.default.updateMany({ isDefault: true }, { $set: { hourlyRate: body.netSalary } });
            }
            res.json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "company-settings -> company-settings.controller.ts -> updateCompanySetting",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.updateCompanySetting = updateCompanySetting;
