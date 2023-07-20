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
var mongoose_1 = require("mongoose");
var material_model_1 = require("./material.model");
var master_material_model_1 = require("../master-material/master-material.model");
var MaterialService = {
    findAll: function (page, limit, order, type, sorting, division) {
        return __awaiter(this, void 0, void 0, function () {
            var skip, aggregation, match, match, sort, lookup, unwindSubMaterials, lookupFag, unwindSubject, group, facet, result, response_1, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        skip = (page - 1) * limit;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        aggregation = [];
                        // let facett = {
                        //   $facet: {
                        //     divisions: [{ $match: {type: type,  division: { $exists: true } } },],
                        //     without:[{$match: {type: type,  division: { $exists: false} } }]
                        //   },
                        // };
                        // aggregation.push(facett);
                        if (type && type in material_model_1.tabTypes) {
                            match = {
                                $match: { type: type },
                            };
                            aggregation.push(match);
                        }
                        if (division && division in material_model_1.divisionTypes) {
                            match = {
                                $match: { division: division },
                            };
                            aggregation.push(match);
                        }
                        sort = sorting
                            ? { $sort: (_a = {}, _a[sorting] = order, _a) }
                            : { $sort: { _id: order } };
                        lookup = {
                            $lookup: {
                                from: "SubMaterials",
                                localField: "subMaterials",
                                foreignField: "_id",
                                as: "subMaterials",
                            },
                        };
                        unwindSubMaterials = {
                            $unwind: {
                                path: "$subMaterials",
                                preserveNullAndEmptyArrays: true,
                            },
                        };
                        lookupFag = {
                            $lookup: {
                                from: "Fags",
                                localField: "subMaterials.subject",
                                foreignField: "_id",
                                as: "subMaterials.subjectDoc",
                            },
                        };
                        unwindSubject = {
                            $unwind: {
                                path: "$subMaterials.subjectDoc",
                                preserveNullAndEmptyArrays: true,
                            },
                        };
                        group = {
                            $group: {
                                _id: "$_id",
                                quantity: { $first: "$quantity" },
                                unit: { $first: "$unit" },
                                buildingComponents: { $first: "$buildingComponents" },
                                code: { $first: "$code" },
                                level: { $first: "$level" },
                                division: { $first: "$division" },
                                order: { $first: "$order" },
                                type: { $first: "$type" },
                                description: { $first: "$description" },
                                subMaterials: { $push: "$subMaterials" },
                                index: { $first: "$index" },
                            },
                        };
                        facet = {
                            $facet: {
                                metadata: [{ $count: "total" }, { $addFields: { page: page } }],
                                data: [{ $skip: skip }, { $limit: limit }], // add projection here wish you re-shape the docs
                            },
                        };
                        aggregation.push(lookup, unwindSubMaterials, lookupFag, unwindSubject, group, sort, facet);
                        return [4 /*yield*/, material_model_1.SectionModel.aggregate(aggregation)];
                    case 2:
                        result = _b.sent();
                        response_1 = result[0];
                        response_1.data.forEach(function (e, index) {
                            var res = e.subMaterials.filter(function (o) {
                                return Object.keys(o).length !== 0;
                            });
                            response_1.data[index].subMaterials = res;
                        });
                        return [2 /*return*/, response_1];
                    case 3:
                        error_1 = _b.sent();
                        throw new Error(error_1.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    insert: function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, material_model_1.SectionModel.create(body)];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/, doc];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    insertWithSubMaterials: function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var subMaterials, copiedSubMaterialsArray_1, lastDoc, newMaterialDoc, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        subMaterials = body.subMaterials;
                        copiedSubMaterialsArray_1 = [];
                        return [4 /*yield*/, Promise.all(subMaterials.map(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                var elemId, doc, newDoc, error_4;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            elemId = element;
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 7, , 8]);
                                            doc = void 0;
                                            if (!body.isDuplicate) return [3 /*break*/, 3];
                                            return [4 /*yield*/, material_model_1.MaterialModel.findById(element).lean()];
                                        case 2:
                                            doc = _a.sent();
                                            return [3 /*break*/, 5];
                                        case 3: return [4 /*yield*/, master_material_model_1.MasterMaterialModel.findById(elemId).lean()];
                                        case 4:
                                            doc = _a.sent();
                                            // copy properties and insert in submaterial table
                                            // fetch id of newly created submaterials replace sub material array with
                                            // copiedSubMaterialsArray
                                            if (!doc) {
                                                throw new Error("master material with id - ".concat(elemId, " is not available"));
                                            }
                                            doc.masterMaterialId = doc["_id"];
                                            _a.label = 5;
                                        case 5:
                                            delete doc["_id"];
                                            if (!doc.subject || !mongoose_1.Types.ObjectId.isValid(doc.subject)) {
                                                delete doc.subject;
                                            }
                                            return [4 /*yield*/, material_model_1.MaterialModel.create(doc)];
                                        case 6:
                                            newDoc = _a.sent();
                                            copiedSubMaterialsArray_1.push(newDoc._id);
                                            return [3 /*break*/, 8];
                                        case 7:
                                            error_4 = _a.sent();
                                            throw new Error(error_4);
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        if (body.isDuplicate) {
                            delete body.isDuplicate;
                        }
                        body.subMaterials = copiedSubMaterialsArray_1;
                        return [4 /*yield*/, material_model_1.SectionModel.findOne({
                                type: body.type,
                                division: body.division,
                            })
                                .sort({ order: -1 })
                                .limit(1)];
                    case 2:
                        lastDoc = _a.sent();
                        console.log("lastDoc", lastDoc);
                        body.order = lastDoc ? lastDoc.order + 1 : 1;
                        return [4 /*yield*/, material_model_1.SectionModel.create(body)];
                    case 3:
                        newMaterialDoc = _a.sent();
                        return [2 /*return*/, newMaterialDoc];
                    case 4:
                        error_3 = _a.sent();
                        throw new Error(error_3.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    pushInSubMaterials: function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var subMaterials, materialId, copiedSubMaterialsArray_2, result, error_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        subMaterials = body.subMaterials;
                        materialId = body.materialId;
                        copiedSubMaterialsArray_2 = [];
                        return [4 /*yield*/, Promise.all(subMaterials.map(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                var doc, newDoc, error_6;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 3, , 4]);
                                            return [4 /*yield*/, master_material_model_1.MasterMaterialModel.findById(element).lean()];
                                        case 1:
                                            doc = _a.sent();
                                            // copy properties and insert in submaterial table
                                            // fetch id of newly created submaterials replace sub material array with
                                            // copiedSubMaterialsArray
                                            if (!doc) {
                                                throw new Error("master material with id - ".concat(element, " is not available"));
                                            }
                                            doc.masterMaterialId = doc["_id"];
                                            delete doc["_id"];
                                            return [4 /*yield*/, material_model_1.MaterialModel.create(doc)];
                                        case 2:
                                            newDoc = _a.sent();
                                            copiedSubMaterialsArray_2.push(newDoc._id); //push in matrail tabel
                                            return [3 /*break*/, 4];
                                        case 3:
                                            error_6 = _a.sent();
                                            throw new Error(error_6);
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, material_model_1.SectionModel.update(
                            // material table(section)
                            { _id: materialId }, // section ID
                            { $push: { subMaterials: copiedSubMaterialsArray_2 } })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error(error_5.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    remove: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, material_model_1.SectionModel.findById(id)];
                    case 1:
                        doc = _a.sent();
                        if (!doc) {
                            throw new Error("Doc with this id not found");
                        }
                        doc.remove();
                        return [2 /*return*/, doc];
                    case 2:
                        error_7 = _a.sent();
                        throw new Error(error_7.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    update: function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var oldDoc, lastDoc, doc, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, material_model_1.SectionModel.findById(body._id)];
                    case 1:
                        oldDoc = _a.sent();
                        if (!(body.division && oldDoc.division !== body.division)) return [3 /*break*/, 3];
                        return [4 /*yield*/, material_model_1.SectionModel.findOne({
                                type: oldDoc.type,
                                division: body.division,
                            })
                                .sort({ order: -1 })
                                .limit(1)];
                    case 2:
                        lastDoc = _a.sent();
                        body.order = lastDoc ? lastDoc.order + 1 : 1;
                        _a.label = 3;
                    case 3: return [4 /*yield*/, material_model_1.SectionModel.findByIdAndUpdate({ _id: mongoose_1.Types.ObjectId(body._id) }, { $set: body })];
                    case 4:
                        doc = _a.sent();
                        return [2 /*return*/, doc];
                    case 5:
                        error_8 = _a.sent();
                        throw new Error(error_8.message);
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    // DONE
    insetSubMaterial: function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, material_model_1.MaterialModel.create(body)];
                    case 1:
                        doc = _a.sent();
                        material_model_1.SectionModel.update({ _id: body.materialId }, { $push: { subMaterials: doc._id } }).then(function (res) { });
                        return [2 /*return*/, doc];
                    case 2:
                        error_9 = _a.sent();
                        throw new Error(error_9.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    // DONE
    findSubMaterial: function (materialId) {
        return __awaiter(this, void 0, void 0, function () {
            var lookup, unwindSubMaterials, lookupFag, unwindSubject, group, match, subMaterials;
            return __generator(this, function (_a) {
                try {
                    lookup = {
                        $lookup: {
                            from: "SubMaterials",
                            localField: "subMaterials",
                            foreignField: "_id",
                            as: "subMaterials",
                        },
                    };
                    unwindSubMaterials = {
                        $unwind: {
                            path: "$subMaterials",
                        },
                    };
                    lookupFag = {
                        $lookup: {
                            from: "Fags",
                            localField: "subMaterials.subject",
                            foreignField: "_id",
                            as: "subMaterials.subjectDoc",
                        },
                    };
                    unwindSubject = {
                        $unwind: {
                            path: "$subMaterials.subjectDoc",
                        },
                    };
                    group = {
                        $group: {
                            _id: "$_id",
                            subMaterials: { $push: "$subMaterials" },
                        },
                    };
                    match = { $match: { _id: mongoose_1.Types.ObjectId(materialId) } };
                    subMaterials = material_model_1.SectionModel.aggregate([
                        match,
                        lookup,
                        unwindSubMaterials,
                        lookupFag,
                        unwindSubject,
                        group,
                        { $project: { subMaterials: 1 } },
                    ]);
                    return [2 /*return*/, subMaterials];
                }
                catch (error) {
                    throw new Error(error.message);
                }
                return [2 /*return*/];
            });
        });
    },
    // DONE
    updateSubMaterial: function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                try {
                    doc = material_model_1.MaterialModel.findByIdAndUpdate(body._id, { $set: body });
                    return [2 /*return*/, doc];
                }
                catch (error) {
                    throw new Error(error.message);
                }
                return [2 /*return*/];
            });
        });
    },
    removeSubMaterial: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var doc, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, material_model_1.MaterialModel.findById(id)];
                    case 1:
                        doc = _a.sent();
                        if (!doc) {
                            throw new Error("Doc with this id not found");
                        }
                        doc.remove();
                        return [2 /*return*/, doc];
                    case 2:
                        error_10 = _a.sent();
                        throw new Error(error_10.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    clearAllQuantity: function () {
        return __awaiter(this, void 0, void 0, function () {
            var doc, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, material_model_1.SectionModel.updateMany({}, { quantity: 0 })];
                    case 1:
                        doc = _a.sent();
                        if (!doc) {
                            throw new Error("Doc with this id not found");
                        }
                        return [2 /*return*/, doc];
                    case 2:
                        error_11 = _a.sent();
                        throw new Error(error_11.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    reorderData: function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var from, to, type, division, doc, query, test, query, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        from = body.from;
                        to = body.to;
                        type = body.type;
                        division = body.division ? body.division : "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        if (!(from.order > to)) return [3 /*break*/, 3];
                        query = division
                            ? { order: { $gte: to, $lt: from.order }, type: type, division: division }
                            : { order: { $gte: to, $lt: from.order }, type: type };
                        return [4 /*yield*/, material_model_1.SectionModel.updateMany(query, //Your Condition
                            { $inc: { order: 1 } } //YOUR JSON contents
                            )];
                    case 2:
                        test = _a.sent();
                        console.log("increment", test);
                        return [3 /*break*/, 5];
                    case 3:
                        console.log("decrement");
                        query = division
                            ? { order: { $lte: to, $gt: from.order }, type: type, division: division }
                            : { order: { $lte: to, $gt: from.order }, type: type };
                        return [4 /*yield*/, material_model_1.SectionModel.updateMany(query, //Your Condition
                            { $inc: { order: -1 } } //YOUR JSON contents
                            )];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, material_model_1.SectionModel.updateOne({ _id: mongoose_1.Types.ObjectId(from.id) }, { $set: { order: to } })];
                    case 6:
                        doc = _a.sent();
                        return [2 /*return*/, "Reorder done"];
                    case 7:
                        error_12 = _a.sent();
                        throw new Error(error_12.message);
                    case 8: return [2 /*return*/];
                }
            });
        });
    },
};
exports.default = MaterialService;
