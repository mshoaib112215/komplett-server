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
var MaterialValidation = /** @class */ (function (_super) {
    __extends(MaterialValidation, _super);
    function MaterialValidation() {
        return _super.call(this) || this;
    }
    /**
     * @param {{id:string}} body
     * @description need id of Material to find it's subMaterials
     */
    MaterialValidation.prototype.findSubMaterials = function (body) {
        var schema = Joi.object().keys({
            id: this.customJoi.objectId().required(),
        });
        return Joi.validate(body, schema);
    };
    MaterialValidation.prototype.insertSubMaterial = function (body) {
        var schema = Joi.object().keys({
            materialId: this.customJoi.objectId().required(),
            // subject: this.customJoi.objectId().required()
        });
        return Joi.validate(body, schema, { allowUnknown: true });
    };
    MaterialValidation.prototype.updateSubMaterial = function (body) {
        var schema = Joi.object().keys({
            _id: this.customJoi.objectId().required(),
            // subject: this.customJoi.objectId().required()
        });
        return Joi.validate(body, schema, { allowUnknown: true });
    };
    MaterialValidation.prototype.reorderValidation = function (body) {
        var schema = {
            type: Joi.string().required(),
        };
        return Joi.validate(body, schema, { allowUnknown: true });
    };
    return MaterialValidation;
}(validation_1.default));
exports.default = new MaterialValidation();
