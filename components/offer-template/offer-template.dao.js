"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = require("../dao");
const offer_template_model_1 = require("./offer-template.model");
class OfferTemplateDAO extends dao_1.default {
    constructor() {
        super(...arguments);
        this.model = offer_template_model_1.OfferTemplateModel;
    }
}
exports.default = new OfferTemplateDAO();
