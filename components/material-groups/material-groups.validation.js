"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
/**
 * @export
 * @class MaterialGroupsValidation
 * @extends Validation
 */
class MaterialGroupsValidation extends validation_1.default {
    /**
     * Creates an instance of MaterialGroupsValidation.
     * @memberof MaterialGroupsValidation
     */
    constructor() {
        super();
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof MaterialGroupsValidation
     */
    createGroup(params) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            category: Joi.string().required(),
        });
        return Joi.validate(params, schema, { allowUnknown: true });
    }
}
exports.default = new MaterialGroupsValidation();
