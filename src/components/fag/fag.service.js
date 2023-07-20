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
exports.FagService = void 0;
var fag_dao_1 = require("./fag.dao");
var material_model_1 = require("../materials/material.model");
var master_material_model_1 = require("../master-material/master-material.model");
var FagService = /** @class */ (function () {
    function FagService() {
        var _this = this;
        this.findFags = function () { return __awaiter(_this, void 0, void 0, function () {
            var fags, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fag_dao_1.default.getAllFags()];
                    case 1:
                        fags = _a.sent();
                        return [2 /*return*/, fags];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.checkIsFagUsed = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var checkMaterial, checkMasterMaterial, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, material_model_1.MaterialModel.findOne({ subject: id })];
                    case 1:
                        checkMaterial = _a.sent();
                        return [4 /*yield*/, master_material_model_1.MasterMaterialModel.findOne({ subject: id })];
                    case 2:
                        checkMasterMaterial = _a.sent();
                        console.log(checkMaterial, checkMasterMaterial);
                        if (!checkMasterMaterial && !checkMaterial) {
                            return [2 /*return*/, {
                                    isUsed: false
                                }];
                        }
                        return [2 /*return*/, { isUsed: true }];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.insertFag = function (body) { return __awaiter(_this, void 0, void 0, function () {
            var doc, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fag_dao_1.default.insert(body)];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, doc];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error(error_3);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateFag = function (body) { return __awaiter(_this, void 0, void 0, function () {
            var doc, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fag_dao_1.default.update(body._id, body)];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, doc];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error(error_4);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteFag = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var doc, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fag_dao_1.default.deleteRecord(id)];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, doc];
                    case 2:
                        error_5 = _a.sent();
                        throw new Error(error_5);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * replaces the fag in all materials
         * @param oldFagId
         * @param newFagId
         */
        this.replaceFag = function (oldFagId, newFagId) { return __awaiter(_this, void 0, void 0, function () {
            var docsFromMaterialModel, docsFromMasterMaterialModel, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, material_model_1.MaterialModel.update({ subject: oldFagId }, { subject: newFagId })];
                    case 1:
                        docsFromMaterialModel = _a.sent();
                        return [4 /*yield*/, master_material_model_1.MasterMaterialModel.update({ subject: oldFagId }, { subject: newFagId })];
                    case 2:
                        docsFromMasterMaterialModel = _a.sent();
                        return [2 /*return*/];
                    case 3:
                        error_6 = _a.sent();
                        throw new Error(error_6);
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return FagService;
}());
exports.FagService = FagService;
exports.default = new FagService();