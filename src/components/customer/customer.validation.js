"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
var validation_1 = require("../validation");
var CustomerValidation = /** @class */ (function (_super) {
    __extends(CustomerValidation, _super);
    function CustomerValidation() {
        return _super.call(this) || this;
    }
    CustomerValidation.prototype.insertCustomerValidation = function (body) {
        var schema = Joi.object().keys({
            user: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().email({
                    minDomainAtoms: 2
                }).required()
            })
        });
        return Joi.validate(body, schema, { allowUnknown: true });
    };
    CustomerValidation.prototype.findCustomerByIdValidation = function (param) {
        var schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });
        return Joi.validate(param, schema);
    };
    CustomerValidation.prototype.updateCustomerValidation = function (body) {
        var schema = Joi.object().keys({
            _id: this.customJoi.objectId().required()
        });
        return Joi.validate(body, schema, { allowUnknown: true });
    };
    return CustomerValidation;
}(validation_1.default));
exports.default = new CustomerValidation();
