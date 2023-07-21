"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connections = require("../../config/connection/connection");
/**
 * @swagger
 * components:
 *  schemas:
 *    OfferTemplateSchema:
 *      properties:
 *        title:
 *          type: string
 *        value:
 *          type: string
 *        surchargeMaterials:
 *          type: number
 *        surchargeWorks:
 *          type: number
 *
 */
const OfferTemplateSchema = new mongoose_1.Schema({
    title: String,
    value: String,
    surchargeMaterials: Number,
    surchargeWorks: Number
}, {
    collection: 'OfferTemplates',
    timestamps: true
});
const OfferTemplateModel = connections.db.model('OfferTemplateModel', OfferTemplateSchema);
exports.OfferTemplateModel = OfferTemplateModel;
