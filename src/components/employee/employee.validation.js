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
var validation_1 = require("../validation");
var Joi = require("joi");
var EmployeeValidation = /** @class */ (function (_super) {
    __extends(EmployeeValidation, _super);
    function EmployeeValidation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmployeeValidation.prototype.updateEmployeeValidation = function (body) {
        var schema = Joi.object().keys({
            _id: this.customJoi.objectId().required()
        });
        return Joi.validate(body, schema, { allowUnknown: true });
    };
    EmployeeValidation.prototype.insertEmployeeValidation = function (body) {
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
    return EmployeeValidation;
}(validation_1.default));
exports.default = new EmployeeValidation();
