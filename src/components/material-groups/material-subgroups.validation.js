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
/**
 * @export
 * @class MaterialGroupsValidation
 * @extends Validation
 */
var MaterialSubgroupsValidation = /** @class */ (function (_super) {
    __extends(MaterialSubgroupsValidation, _super);
    /**
     * Creates an instance of MaterialGroupsValidation.
     * @memberof MaterialGroupsValidation
     */
    function MaterialSubgroupsValidation() {
        return _super.call(this) || this;
    }
    /**
     * @param {ISubgroupModel} params
     * @returns {Joi.ValidationResult<ISubgroupModel>}
     * @memberof MaterialGroupsValidation
     */
    MaterialSubgroupsValidation.prototype.createGroup = function (params) {
        var schema = Joi.object().keys({
            name: Joi.string().required(),
            category: Joi.string().required(),
        });
        return Joi.validate(params, schema, { allowUnknown: true });
    };
    return MaterialSubgroupsValidation;
}(validation_1.default));
exports.default = new MaterialSubgroupsValidation();