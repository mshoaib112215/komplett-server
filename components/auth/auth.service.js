"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_validation_1 = require("./auth.validation");
const user_model_1 = require("../user/user.model");
/**
 * @export
 * @implements {IAuthService}
 */
const AuthService = {
    /**
     * @param {IUserModel} body
     * @returns {Promise <IUserModel>}
     * @memberof AuthService
     */
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = auth_validation_1.default.createUser(body);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                const user = new user_model_1.default({
                    email: body.email,
                    password: body.password
                });
                const query = yield user_model_1.default.findOne({
                    email: body.email
                });
                if (query) {
                    throw new Error('This email already exists');
                }
                const saved = yield user.save();
                return saved;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    },
    /**
     * @param {IUserModel} body
     * @returns {Promise <IUserModel>}
     * @memberof AuthService
     */
    getUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = auth_validation_1.default.getUser(body);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                const user = yield user_model_1.default.findOne({
                    email: body.email
                });
                const isMatched = user && (yield user.comparePassword(body.password));
                if (isMatched) {
                    return user;
                }
                throw new Error('Invalid password or email');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
};
exports.default = AuthService;
