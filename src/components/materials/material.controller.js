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
exports.reorder = exports.clearAllQuantity = exports.removeSubMaterial = exports.updateSubMaterial = exports.findSubMaterial = exports.deleteDocument = exports.uploadDocument = exports.insertSubMaterial = exports.update = exports.remove = exports.pushInSubMaterials = exports.insertWithSubMaterials = exports.insert = exports.findAll = void 0;
var error_1 = require("../../config/error");
var material_model_1 = require("./material.model");
var material_dao_1 = require("./material.dao");
var material_validation_1 = require("./material.validation");
var winston_1 = require("../../config/winston");
var mongoose_1 = require("mongoose");
var master_material_model_1 = require("../master-material/master-material.model");
function findAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var page, limit, order, type, sort, division, doc, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = parseInt(req.query.page);
                    limit = parseInt(req.query.limit);
                    order = req.query.order;
                    type = req.query.type;
                    sort = req.query.sort ? req.query.sort : "";
                    division = req.query.division;
                    page = page ? page : 1;
                    limit = limit ? limit : 500;
                    order = order ? order : "asc";
                    order = order === "des" ? -1 : 1;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, material_dao_1.default.findAll(page, limit, order, type, sort, division)];
                case 2:
                    doc = _a.sent();
                    res.status(200).json(doc);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    winston_1.logger.error("error", error_2, {
                        file: "material -> material.controller.ts -> findAll",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_2.message.status, error_2.message));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.findAll = findAll;
function insert(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, matchAggregate, result, doc, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    body = req.body;
                    matchAggregate = [
                        {
                            $match: {
                                type: body.type,
                                buildingComponents: body.buildingComponents,
                            },
                        },
                    ];
                    return [4 /*yield*/, material_model_1.SectionModel.aggregate(matchAggregate)];
                case 1:
                    result = _a.sent();
                    if (result.length > 0) {
                        throw new Error("Section with same name already exist");
                    }
                    return [4 /*yield*/, material_dao_1.default.insert(req.body)];
                case 2:
                    doc = _a.sent();
                    res.status(200).json(doc);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    winston_1.logger.error("error", error_3, {
                        file: "material -> material.controller.ts -> insert",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    res.status(400).json({ message: error_3.message || error_3 });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.insert = insert;
function insertWithSubMaterials(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, subMaterials, doc, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    subMaterials = body.subMaterials;
                    if (!subMaterials || !Array.isArray(subMaterials)) {
                        throw new Error("subMaterials should be an array");
                    }
                    if (!body.buildingComponents) {
                        throw new Error("buildingComponents not available in request body");
                    }
                    if (!body.type || !(body.type in material_model_1.tabTypes)) {
                        throw new Error("type in request body is not valid");
                    }
                    return [4 /*yield*/, material_dao_1.default.insertWithSubMaterials(req.body)];
                case 1:
                    doc = _a.sent();
                    res.status(200).json(doc);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    winston_1.logger.error("error", error_4, {
                        file: "material -> material.controller.ts -> insertWithSubMaterials",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    res.status(400).json({ message: error_4.message || error_4 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.insertWithSubMaterials = insertWithSubMaterials;
function pushInSubMaterials(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, subMaterialsToPush, materialId, validate, aggregate, result, subMaterials_1, doc, error_5;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    body = req.body;
                    subMaterialsToPush = body.subMaterials;
                    materialId = body.materialId;
                    if (!subMaterialsToPush || !Array.isArray(subMaterialsToPush)) {
                        throw new Error("subMaterials should be an array");
                    }
                    if (!materialId) {
                        throw new Error("materialId is required");
                    }
                    validate = material_validation_1.default.checkIdValidation({ id: materialId });
                    if (validate.error) {
                        throw new Error(validate.error.message);
                    }
                    aggregate = [
                        {
                            $match: {
                                _id: mongoose_1.Types.ObjectId(materialId), //section ID
                            },
                        },
                        {
                            $lookup: {
                                from: "SubMaterials",
                                localField: "subMaterials",
                                foreignField: "_id",
                                as: "subMaterials",
                            },
                        },
                    ];
                    return [4 /*yield*/, material_model_1.SectionModel.aggregate(aggregate)];
                case 1:
                    result = _a.sent();
                    if (!result.length) return [3 /*break*/, 3];
                    subMaterials_1 = result[0].subMaterials;
                    return [4 /*yield*/, Promise.all(subMaterialsToPush.map(function (element) { return __awaiter(_this, void 0, void 0, function () {
                            var masterMaterial;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, master_material_model_1.MasterMaterialModel.findById(element)];
                                    case 1:
                                        masterMaterial = _a.sent();
                                        subMaterials_1.forEach(function (subMaterial) {
                                            if (masterMaterial.application === subMaterial.application) {
                                                throw new Error("Material with same name already exist");
                                            }
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, material_dao_1.default.pushInSubMaterials(body)];
                case 4:
                    doc = _a.sent();
                    res.status(200).json(doc);
                    return [3 /*break*/, 6];
                case 5:
                    error_5 = _a.sent();
                    winston_1.logger.error("error", error_5, {
                        file: "material -> material.controller.ts -> pushInSubMaterials",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    res.status(400).json({ message: error_5.message || error_5 });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.pushInSubMaterials = pushInSubMaterials;
function remove(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, validate, doc, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    validate = material_validation_1.default.checkIdValidation({ id: id });
                    if (validate.error) {
                        throw new Error(validate.error.message);
                    }
                    return [4 /*yield*/, material_dao_1.default.remove(id)];
                case 1:
                    doc = _a.sent();
                    res.status(200).json(doc);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    winston_1.logger.error("error", error_6, {
                        file: "material -> material.controller.ts -> remove",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_6.message.status, error_6.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.remove = remove;
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body_1, matchAggregate, result, doc, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    body_1 = req.body;
                    if (!body_1.buildingComponents) return [3 /*break*/, 2];
                    matchAggregate = [
                        {
                            $match: {
                                type: body_1.type,
                                buildingComponents: body_1.buildingComponents,
                            },
                        },
                    ];
                    return [4 /*yield*/, material_model_1.SectionModel.aggregate(matchAggregate)];
                case 1:
                    result = _a.sent();
                    if (result.length > 0) {
                        result.forEach(function (element) {
                            if (element._id != body_1._id) {
                                throw new Error("Section with same name already exist");
                            }
                        });
                    }
                    _a.label = 2;
                case 2: return [4 /*yield*/, material_dao_1.default.update(req.body)];
                case 3:
                    doc = _a.sent();
                    res.status(200).json(doc);
                    return [3 /*break*/, 5];
                case 4:
                    error_7 = _a.sent();
                    winston_1.logger.error("error", error_7, {
                        file: "material -> material.controller.ts -> update",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    res.status(400).json({ message: error_7.message || error_7 });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.update = update;
/** Materials API */
// DONE
function insertSubMaterial(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var element, validate, body_2, materialId, aggregate, materialMatch, subMaterials, doc, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    element = req.body;
                    validate = material_validation_1.default.insertSubMaterial(element);
                    if (validate.error) {
                        throw new Error(validate.error.message);
                    }
                    body_2 = req.body;
                    materialId = body_2.materialId;
                    aggregate = [
                        {
                            $match: {
                                _id: mongoose_1.Types.ObjectId(materialId),
                            },
                        },
                        {
                            $lookup: {
                                from: "SubMaterials",
                                localField: "subMaterials",
                                foreignField: "_id",
                                as: "subMaterials",
                            },
                        },
                    ];
                    return [4 /*yield*/, material_model_1.SectionModel.aggregate(aggregate)];
                case 1:
                    materialMatch = _a.sent();
                    if (!materialMatch.length) {
                        throw new Error("Material with this materialId does not exist");
                    }
                    subMaterials = materialMatch[0].subMaterials;
                    if (subMaterials) {
                        subMaterials.forEach(function (element) {
                            if (element.application === body_2.application) {
                                throw new Error("Material with same name exist");
                            }
                        });
                    }
                    return [4 /*yield*/, material_dao_1.default.insetSubMaterial(element)];
                case 2:
                    doc = _a.sent();
                    res.status(201).json(doc);
                    return [3 /*break*/, 4];
                case 3:
                    error_8 = _a.sent();
                    winston_1.logger.error("error", error_8, {
                        file: "material -> material.controller.ts -> insertSubMaterial",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    res.status(400).json({ message: error_8.message || error_8 });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.insertSubMaterial = insertSubMaterial;
function uploadDocument(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var fullUrl, data, imageUrl, doc, result, error_9;
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
                    return [4 /*yield*/, material_model_1.MaterialModel.findByIdAndUpdate(doc._id, doc)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [4 /*yield*/, material_model_1.MaterialModel.findById(data._id)];
                case 3:
                    result = _a.sent();
                    res.json(result);
                    return [3 /*break*/, 5];
                case 4:
                    error_9 = _a.sent();
                    winston_1.logger.error("error", error_9, {
                        file: "material -> material.controller.ts -> uploadDocument",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_9.message.status, error_9.message));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.uploadDocument = uploadDocument;
function deleteDocument(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, result, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    id = req.params.id;
                    return [4 /*yield*/, material_model_1.MaterialModel.findByIdAndUpdate(id, {
                            fdvDocument: "",
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, material_model_1.MaterialModel.findById(id)];
                case 2:
                    result = _a.sent();
                    res.json(result);
                    return [3 /*break*/, 4];
                case 3:
                    error_10 = _a.sent();
                    winston_1.logger.error("error", error_10, {
                        file: "material -> material.controller.ts -> deleteDocument",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_10.message.status, error_10.message));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteDocument = deleteDocument;
// DONE
function findSubMaterial(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var doc, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, material_dao_1.default.findSubMaterial(req.params.id)];
                case 1:
                    doc = _a.sent();
                    res.status(200).json(doc);
                    return [3 /*break*/, 3];
                case 2:
                    error_11 = _a.sent();
                    winston_1.logger.error("error", error_11, {
                        file: "material -> material.controller.ts -> findSubMaterial",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_11.message.status, error_11.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findSubMaterial = findSubMaterial;
// DONE
function updateSubMaterial(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body_3, validation, aggregate, result, subMaterials, doc, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    body_3 = req.body;
                    validation = material_validation_1.default.updateSubMaterial(body_3);
                    if (validation.error) {
                        throw new Error(validation.error.message);
                    }
                    aggregate = [
                        {
                            $match: {
                                subMaterials: mongoose_1.Types.ObjectId(body_3._id),
                            },
                        },
                        {
                            $lookup: {
                                from: "SubMaterials",
                                localField: "subMaterials",
                                foreignField: "_id",
                                as: "subMaterials",
                            },
                        },
                    ];
                    return [4 /*yield*/, material_model_1.SectionModel.aggregate(aggregate)];
                case 1:
                    result = _a.sent();
                    if (result.length) {
                        subMaterials = result[0].subMaterials;
                        if (subMaterials) {
                            subMaterials.forEach(function (element) {
                                if (element._id != body_3._id &&
                                    element.application === body_3.application) {
                                    throw new Error("Material with same name exist");
                                }
                            });
                        }
                    }
                    return [4 /*yield*/, material_dao_1.default.updateSubMaterial(req.body)];
                case 2:
                    doc = _a.sent();
                    res.status(200).json(doc);
                    return [3 /*break*/, 4];
                case 3:
                    error_12 = _a.sent();
                    winston_1.logger.error("error", error_12, {
                        file: "material -> material.controller.ts -> updateSubMaterial",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_12.message.status, error_12.message));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateSubMaterial = updateSubMaterial;
function removeSubMaterial(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, validate, doc, error_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    validate = material_validation_1.default.checkIdValidation({ id: id });
                    if (validate.error) {
                        throw new Error(validate.error.message);
                    }
                    return [4 /*yield*/, material_dao_1.default.removeSubMaterial(id)];
                case 1:
                    doc = _a.sent();
                    res.status(200).json(doc);
                    return [3 /*break*/, 3];
                case 2:
                    error_13 = _a.sent();
                    winston_1.logger.error("error", error_13, {
                        file: "material -> material.controller.ts -> removeSubMaterial",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_13.message.status, error_13.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.removeSubMaterial = removeSubMaterial;
// export async function clearAllQuantity(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const doc: ISectionModel = await MaterialService.update(req.body);
//   } catch (err) {}
// }
function clearAllQuantity(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var doc, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, material_dao_1.default.clearAllQuantity()];
                case 1:
                    doc = _a.sent();
                    res.status(200).json(doc);
                    return [3 /*break*/, 3];
                case 2:
                    error_14 = _a.sent();
                    winston_1.logger.error("error", error_14, {
                        file: "material -> material.controller.ts -> clearAllQuantity",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_14.message.status, error_14.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.clearAllQuantity = clearAllQuantity;
function reorder(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, validate, result, error_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    validate = material_validation_1.default.reorderValidation(body);
                    if (validate.error) {
                        throw new Error(validate.error.message);
                    }
                    result = void 0;
                    return [4 /*yield*/, material_dao_1.default.reorderData(body)];
                case 1:
                    result = _a.sent();
                    // const result = await MaterialService.reorderData(body);
                    res.status(200).json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_15 = _a.sent();
                    winston_1.logger.error("error", error_15, {
                        file: "material -> material.controller.ts -> reorder",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    next(new error_1.HttpError(error_15.message.status, error_15.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.reorder = reorder;
