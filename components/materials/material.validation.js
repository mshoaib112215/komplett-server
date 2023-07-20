"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
class MaterialValidation extends validation_1.default {
    constructor() {
        super();
    }
    /**
     * @param {{id:string}} body
     * @description need id of Material to find it's subMaterials
     */
    findSubMaterials(body) {
        const schema = Joi.object().keys({
            id: this.customJoi.objectId().required(),
        });
        return Joi.validate(body, schema);
    }
    insertSubMaterial(body) {
        const schema = Joi.object().keys({
            materialId: this.customJoi.objectId().required(),
        });
        return Joi.validate(body, schema, { allowUnknown: true });
    }
    updateSubMaterial(body) {
        const schema = Joi.object().keys({
            _id: this.customJoi.objectId().required(),
        });
        return Joi.validate(body, schema, { allowUnknown: true });
    }
    reorderValidation(body) {
        const schema = {
            type: Joi.string().required(),
        };
        return Joi.validate(body, schema, { allowUnknown: true });
    }
}
exports.default = new MaterialValidation();
