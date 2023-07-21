"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
const Joi = require("joi");
class TaskValidation extends validation_1.default {
    constructor() {
        super();
    }
    insertTaskValidation(body) {
        const schema = Joi.object().keys({
            projectId: this.customJoi.objectId().required()
        });
        return Joi.validate(body, schema, { allowUnknown: true });
    }
}
exports.default = new TaskValidation();
