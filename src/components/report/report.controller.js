"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.fetchReportData = void 0;
var utils_1 = require("./utils");
var winston_1 = require("../../config/winston");
var material_model_1 = require("../materials/material.model");
var offer_template_model_1 = require("../offer-template/offer-template.model");
var company_settings_model_1 = require("../company-settings/company-settings.model");
var match = {
    $match: {
        quantity: {
            $gte: 1,
        },
    },
};
var lookup = {
    $lookup: {
        from: "SubMaterials",
        localField: "subMaterials",
        foreignField: "_id",
        as: "subMaterials",
    },
};
var unwindSubMaterials = {
    $unwind: {
        path: "$subMaterials",
        preserveNullAndEmptyArrays: true,
    },
};
var lookupFag = {
    $lookup: {
        from: "Fags",
        localField: "subMaterials.subject",
        foreignField: "_id",
        as: "subMaterials.subjectDoc",
    },
};
var unwindSubject = {
    $unwind: {
        path: "$subMaterials.subjectDoc",
        preserveNullAndEmptyArrays: true,
    },
};
var lookupGroup = {
    $lookup: {
        from: "MaterialGroups",
        localField: "subMaterials.groupId",
        foreignField: "_id",
        as: "subMaterials.group",
    },
};
var unwindGroup = {
    $unwind: {
        path: "$subMaterials.group",
        preserveNullAndEmptyArrays: true,
    },
};
// FIXME - add $first here whenever change model
var group = {
    $group: {
        _id: "$_id",
        quantity: { $first: "$quantity" },
        unit: { $first: "$unit" },
        buildingComponents: { $first: "$buildingComponents" },
        code: { $first: "$code" },
        // level: { $first: "$level" },
        type: { $first: "$type" },
        description: { $first: "$description" },
        subMaterials: { $push: "$subMaterials" },
        index: { $first: "$index" },
        division: { $first: "$division" },
        order: { $first: "$order" },
    },
};
function fetchReportData(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var aggregation, matchType, sortAggregate, sectionList, companySettingList, firstCompanySetting_1, sectionWithTotalPriceList, subtotal, _loop_1, index, surchargeMaterialValue, surchargeWorkValue, total, totalTax, totalWithTax, reportData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    aggregation = [];
                    aggregation.push(match, lookup, unwindSubMaterials, lookupFag, unwindSubject, lookupGroup, unwindGroup, group);
                    if (req.query.type) {
                        matchType = {
                            $match: {
                                type: req.query.type,
                            },
                        };
                        aggregation.push(matchType);
                    }
                    sortAggregate = { $sort: { index: 1, order: 1 } };
                    aggregation.push(sortAggregate);
                    return [4 /*yield*/, material_model_1.SectionModel.aggregate(aggregation)];
                case 1:
                    sectionList = _a.sent();
                    return [4 /*yield*/, company_settings_model_1.default.find({})];
                case 2:
                    companySettingList = _a.sent();
                    firstCompanySetting_1 = companySettingList[0];
                    sectionWithTotalPriceList = [];
                    subtotal = 0;
                    _loop_1 = function (index) {
                        var section, surcharge, totalPriceSection, subMaterials;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    section = sectionList[index];
                                    return [4 /*yield*/, offer_template_model_1.OfferTemplateModel.findOne({
                                            value: section.type,
                                        })];
                                case 1:
                                    surcharge = _b.sent();
                                    totalPriceSection = 0;
                                    subMaterials = section.subMaterials.map(function (material) {
                                        var totalPrice = (0, utils_1.getTotal)(material, section.quantity, surcharge, firstCompanySetting_1);
                                        totalPriceSection += totalPrice;
                                        return __assign(__assign({}, material), { totalPrice: totalPrice });
                                    });
                                    subtotal += totalPriceSection;
                                    sectionWithTotalPriceList.push(__assign(__assign({}, section), { totalPrice: totalPriceSection, subMaterials: subMaterials }));
                                    return [2 /*return*/];
                            }
                        });
                    };
                    index = 0;
                    _a.label = 3;
                case 3:
                    if (!(index < sectionList.length)) return [3 /*break*/, 6];
                    return [5 /*yield**/, _loop_1(index)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    index++;
                    return [3 /*break*/, 3];
                case 6:
                    surchargeMaterialValue = (0, utils_1.percentageToAmount)(subtotal, firstCompanySetting_1.surchargeMaterial);
                    surchargeWorkValue = (0, utils_1.percentageToAmount)(subtotal, firstCompanySetting_1.surchargeWork);
                    total = subtotal + surchargeMaterialValue + surchargeWorkValue;
                    totalTax = (0, utils_1.percentageToAmount)(total, firstCompanySetting_1.valueAddedTax);
                    totalWithTax = totalTax + total;
                    reportData = {
                        subtotal: subtotal,
                        surchargeMaterialValue: surchargeMaterialValue,
                        surchargeMaterial: firstCompanySetting_1.surchargeMaterial,
                        surchargeWorkValue: surchargeWorkValue,
                        surchargeWork: firstCompanySetting_1.surchargeWork,
                        total: total,
                        data: sectionWithTotalPriceList,
                        totalTax: totalTax,
                        totalWithTax: totalWithTax,
                    };
                    res.json(reportData);
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    winston_1.logger.error("error", error_1, {
                        file: "fag -> report.controller.ts -> fetchReportData",
                        request: req.method + " :" + req.baseUrl + req.url,
                    });
                    res.status(400).json({ message: error_1.message || error_1 });
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.fetchReportData = fetchReportData;
