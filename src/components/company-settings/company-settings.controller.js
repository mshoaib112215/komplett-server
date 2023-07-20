"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompanySetting = exports.deleteCompanySetting = exports.insertCompanySetting = exports.findCompanySettings = void 0;
var winston_1 = require("../../config/winston");
var company_settings_service_1 = require("./company-settings.service");
var company_settings_validation_1 = require("./company-settings.validation");
var fag_model_1 = require("../fag/fag.model");
function findCompanySettings(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, doc, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.user;
                    return [4 /*yield*/, company_settings_service_1.default.findCompanySettings(user.id)];
                case 1:
                    doc = _a.sent();
                    res.json(doc);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    winston_1.logger.error("error", error_1, {
                        file: "company-settings -> company-settings.controller.ts -> findCompanySettings",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    res.status(400).json({ message: error_1.message || error_1 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findCompanySettings = findCompanySettings;
function insertCompanySetting(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, user, doc, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    user = req.user;
                    body["userId"] = user.id;
                    return [4 /*yield*/, company_settings_service_1.default.insertCompanySettings(body)];
                case 1:
                    doc = _a.sent();
                    res.json(doc);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    winston_1.logger.error("error", error_2, {
                        file: "company-settings -> company-settings.controller.ts -> insertCompanySetting",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    res.status(400).json({ message: error_2.message || error_2 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.insertCompanySetting = insertCompanySetting;
function deleteCompanySetting(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, validate, doc, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    console.log(id);
                    validate = company_settings_validation_1.default.checkIdValidation({ id: id });
                    if (validate.error) {
                        throw new Error(validate.error.message);
                    }
                    return [4 /*yield*/, company_settings_service_1.default.deleteCompanySettings(id)];
                case 1:
                    doc = _a.sent();
                    res.json(doc);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    winston_1.logger.error("error", error_3, {
                        file: "company-settings -> company-settings.controller.ts -> deleteCompanySetting",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    res.status(400).json({ message: error_3.message || error_3 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteCompanySetting = deleteCompanySetting;
function updateCompanySetting(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, validate, doc, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    body = req.body;
                    validate = company_settings_validation_1.default.checkIdValidation({ id: body._id });
                    if (validate.error) {
                        throw new Error(validate.error.message);
                    }
                    return [4 /*yield*/, company_settings_service_1.default.updateCompanySettings(body)];
                case 1:
                    doc = _a.sent();
                    if (!doc) return [3 /*break*/, 3];
                    return [4 /*yield*/, fag_model_1.default.updateMany({ isDefault: true }, { $set: { hourlyRate: body.netSalary } })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    res.json(doc);
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    winston_1.logger.error("error", error_4, {
                        file: "company-settings -> company-settings.controller.ts -> updateCompanySetting",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    res.status(400).json({ message: error_4.message || error_4 });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateCompanySetting = updateCompanySetting;
