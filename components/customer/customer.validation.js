"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
class CustomerValidation extends validation_1.default {
    constructor() {
        super();
    }
    insertCustomerValidation(body) {
        const schema = Joi.object().keys({
            user: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().email({
                    minDomainAtoms: 2
                }).required()
            })
        });
        return Joi.validate(body, schema, { allowUnknown: true });
    }
    findCustomerByIdValidation(param) {
        const schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });
        return Joi.validate(param, schema);
    }
    updateCustomerValidation(body) {
        const schema = Joi.object().keys({
            _id: this.customJoi.objectId().required()
        });
        return Joi.validate(body, schema, { allowUnknown: true });
    }
}
exports.default = new CustomerValidation();
