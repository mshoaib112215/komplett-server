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
 * @class UserValidation
 * @extends Validation
 */
var UserValidation = /** @class */ (function (_super) {
    __extends(UserValidation, _super);
    /**
     * Creates an instance of UserValidation.
     * @memberof UserValidation
     */
    function UserValidation() {
        return _super.call(this) || this;
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    UserValidation.prototype.createUser = function (params) {
        var schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email({
                minDomainAtoms: 2
            }).required()
        });
        return Joi.validate(params, schema, { allowUnknown: true });
    };
    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    UserValidation.prototype.getUser = function (body) {
        var schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });
        return Joi.validate(body, schema);
    };
    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    UserValidation.prototype.removeUser = function (body) {
        var schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });
        return Joi.validate(body, schema);
    };
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    UserValidation.prototype.updateUser = function (params) {
        var schema = Joi.object().keys({
            _id: this.customJoi.objectId().required(),
            email: Joi.string().email(),
            name: Joi.string()
        });
        return Joi.validate(params, schema, { allowUnknown: true });
    };
    return UserValidation;
}(validation_1.default));
exports.default = new UserValidation();
