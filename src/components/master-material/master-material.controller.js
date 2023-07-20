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
exports.deleteDocument = exports.uploadDocument = exports.updateMasterMaterial = exports.deleteMasterMaterial = exports.insertInMasterMaterial = exports.findByCategory = void 0;
var mongoose_1 = require("mongoose");
var error_1 = require("../../config/error");
var winston_1 = require("../../config/winston");
var material_model_1 = require("../materials/material.model");
var master_material_dao_1 = require("./master-material.dao");
var master_material_validation_1 = require("./master-material.validation");
var master_material_model_1 = require("./master-material.model");
// DONE
function findByCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var category, groupId, limit, page, order, sort, config, masterMaterials, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    category = req.query.category || "all";
                    groupId = req.query.groupId || "all";
                    limit = parseInt(req.query.limit);
                    page = parseInt(req.query.page);
                    order = req.query.order;
                    sort = req.query.sort;
                    config = {
                        limit: limit,
                        page: page,
                        sort: sort,
                        order: order,
                        category: category,
                        groupId: groupId,
                    };
                    return [4 /*yield*/, master_material_dao_1.default.findMasterMaterialByCategory(config)];
                case 1:
                    masterMaterials = _a.sent();
                    res.json(masterMaterials);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    winston_1.logger.error("error", error_2, {
                        file: "master-material -> master-material.controller.ts -> findAll",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    res.status(400).json({ message: error_2.message || error_2 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findByCategory = findByCategory;
// DONE
function insertInMasterMaterial(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, doc, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    if (!body.category || !(body.category in material_model_1.tabTypes)) {
                        throw new mongoose_1.Error("category field is not Correct !!");
                    }
                    if (!body.application) {
                        throw new mongoose_1.Error("application is not present in request body");
                    }
                    return [4 /*yield*/, master_material_dao_1.default.insertInMasterMaterial(body)];
                case 1:
                    doc = _a.sent();
                    res.json(doc);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    winston_1.logger.error("error", error_3, {
                        file: "master-material -> master-material.controller.ts -> insertInMasterMaterial",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    res.status(400).json({ message: error_3.message || error_3 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.insertInMasterMaterial = insertInMasterMaterial;
function deleteMasterMaterial(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, validate, doc, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    validate = master_material_validation_1.default.checkIdValidation({ id: id });
                    if (validate.error) {
                        throw new mongoose_1.Error(validate.error.message);
                    }
                    return [4 /*yield*/, master_material_dao_1.default.deleteRecord(id)];
                case 1:
                    doc = _a.sent();
                    res.json(doc);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    winston_1.logger.error("error", error_4, {
                        file: "master-material -> master-material.controller.ts -> deleteMasterMaterial",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    res.status(400).json({ message: error_4.message || error_4 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteMasterMaterial = deleteMasterMaterial;
// DONE
function updateMasterMaterial(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, id, validate, doc, updatedDoc, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    body = req.body;
                    id = body._id;
                    validate = master_material_validation_1.default.checkIdValidation({ id: id });
                    if (validate.error) {
                        throw new mongoose_1.Error(validate.error.message);
                    }
                    if (body.category && !(body.category in material_model_1.tabTypes)) {
                        throw new mongoose_1.Error("Category is not valid..");
                    }
                    return [4 /*yield*/, master_material_dao_1.default.update(id, req.body)];
                case 1:
                    doc = _a.sent();
                    return [4 /*yield*/, master_material_model_1.MasterMaterialModel.findById(id).lean()];
                case 2:
                    updatedDoc = _a.sent();
                    delete updatedDoc["_id"];
                    return [4 /*yield*/, material_model_1.MaterialModel.update({ masterMaterialId: id }, updatedDoc)];
                case 3:
                    _a.sent();
                    res.json(doc);
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    winston_1.logger.error("error", error_5, {
                        file: "master-material -> master-material.controller.ts -> updateMasterMaterial",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    res.status(400).json({ message: error_5.message || error_5 });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateMasterMaterial = updateMasterMaterial;
function uploadDocument(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var fullUrl, data, imageUrl, doc, result, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    fullUrl = req.protocol + "://" + req.get("host");
                    data = req.body;
                    if (!(req.file && req.file.path)) return [3 /*break*/, 2];
                    imageUrl = req.file.path;
                    if (!imageUrl) return [3 /*break*/, 2];
                    data["url"] = fullUrl + "/" + imageUrl;
                    if (!data._id) return [3 /*break*/, 2];
                    doc = {
                        _id: data._id,
                        fdvDocument: fullUrl + "/" + imageUrl,
                    };
                    return [4 /*yield*/, master_material_model_1.MasterMaterialModel.findByIdAndUpdate(doc._id, doc)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [4 /*yield*/, master_material_model_1.MasterMaterialModel.findById(data._id)];
                case 3:
                    result = _a.sent();
                    res.json(result);
                    return [3 /*break*/, 5];
                case 4:
                    error_6 = _a.sent();
                    winston_1.logger.error("error", error_6, {
                        file: "masterMaterial -> masterMaterial.controller.ts -> uploadDocument",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_6.message.status, error_6.message));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.uploadDocument = uploadDocument;
function deleteDocument(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, result, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    id = req.params.id;
                    return [4 /*yield*/, master_material_model_1.MasterMaterialModel.findByIdAndUpdate(id, {
                            fdvDocument: "",
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, master_material_model_1.MasterMaterialModel.findById(id)];
                case 2:
                    result = _a.sent();
                    res.json(result);
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _a.sent();
                    winston_1.logger.error("error", error_7, {
                        file: "masterMaterial -> masterMaterial.controller.ts -> deleteDocument",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_7.message.status, error_7.message));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteDocument = deleteDocument;
