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
const utils_1 = require("./utils");
const winston_1 = require("../../config/winston");
const material_model_1 = require("../materials/material.model");
const offer_template_model_1 = require("../offer-template/offer-template.model");
const company_settings_model_1 = require("../company-settings/company-settings.model");
const match = {
    $match: {
        quantity: {
            $gte: 1,
        },
    },
};
const lookup = {
    $lookup: {
        from: "SubMaterials",
        localField: "subMaterials",
        foreignField: "_id",
        as: "subMaterials",
    },
};
const unwindSubMaterials = {
    $unwind: {
        path: "$subMaterials",
        preserveNullAndEmptyArrays: true,
    },
};
const lookupFag = {
    $lookup: {
        from: "Fags",
        localField: "subMaterials.subject",
        foreignField: "_id",
        as: "subMaterials.subjectDoc",
    },
};
const unwindSubject = {
    $unwind: {
        path: "$subMaterials.subjectDoc",
        preserveNullAndEmptyArrays: true,
    },
};
const lookupGroup = {
    $lookup: {
        from: "MaterialGroups",
        localField: "subMaterials.groupId",
        foreignField: "_id",
        as: "subMaterials.group",
    },
};
const unwindGroup = {
    $unwind: {
        path: "$subMaterials.group",
        preserveNullAndEmptyArrays: true,
    },
};
// FIXME - add $first here whenever change model
const group = {
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
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let aggregation = [];
            aggregation.push(match, lookup, unwindSubMaterials, lookupFag, unwindSubject, lookupGroup, unwindGroup, group);
            if (req.query.type) {
                const matchType = {
                    $match: {
                        type: req.query.type,
                    },
                };
                aggregation.push(matchType);
            }
            const sortAggregate = { $sort: { index: 1, order: 1 } };
            aggregation.push(sortAggregate);
            const sectionList = yield material_model_1.SectionModel.aggregate(aggregation);
            // We have 1 item in the list
            const companySettingList = yield company_settings_model_1.default.find({});
            const firstCompanySetting = companySettingList[0];
            const sectionWithTotalPriceList = [];
            let subtotal = 0;
            for (let index = 0; index < sectionList.length; index++) {
                const section = sectionList[index];
                const surcharge = yield offer_template_model_1.OfferTemplateModel.findOne({
                    value: section.type,
                });
                let totalPriceSection = 0;
                const subMaterials = section.subMaterials.map((material) => {
                    const totalPrice = utils_1.getTotal(material, section.quantity, surcharge, firstCompanySetting);
                    totalPriceSection += totalPrice;
                    return Object.assign({}, material, { totalPrice });
                });
                subtotal += totalPriceSection;
                sectionWithTotalPriceList.push(Object.assign({}, section, { totalPrice: totalPriceSection, subMaterials }));
            }
            const surchargeMaterialValue = utils_1.percentageToAmount(subtotal, firstCompanySetting.surchargeMaterial);
            const surchargeWorkValue = utils_1.percentageToAmount(subtotal, firstCompanySetting.surchargeWork);
            const total = subtotal + surchargeMaterialValue + surchargeWorkValue;
            const totalTax = utils_1.percentageToAmount(total, firstCompanySetting.valueAddedTax);
            const totalWithTax = totalTax + total;
            const reportData = {
                subtotal,
                surchargeMaterialValue,
                surchargeMaterial: firstCompanySetting.surchargeMaterial,
                surchargeWorkValue,
                surchargeWork: firstCompanySetting.surchargeWork,
                total,
                data: sectionWithTotalPriceList,
                totalTax,
                totalWithTax,
            };
            res.json(reportData);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "fag -> report.controller.ts -> fetchReportData",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.fetchReportData = fetchReportData;
