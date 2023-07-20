"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
const Joi = require("joi");
class EmployeeValidation extends validation_1.default {
    updateEmployeeValidation(body) {
        const schema = Joi.object().keys({
            _id: this.customJoi.objectId().required()
        });
        return Joi.validate(body, schema, { allowUnknown: true });
    }
    insertEmployeeValidation(body) {
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
}
exports.default = new EmployeeValidation();
