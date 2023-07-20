"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferTemplateModel = void 0;
var mongoose_1 = require("mongoose");
var connections = require("../../config/connection/connection");
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
var OfferTemplateSchema = new mongoose_1.Schema({
    title: String,
    value: String,
    surchargeMaterials: Number,
    surchargeWorks: Number
}, {
    collection: 'OfferTemplates',
    timestamps: true
});
var OfferTemplateModel = connections.db.model('OfferTemplateModel', OfferTemplateSchema);
exports.OfferTemplateModel = OfferTemplateModel;
