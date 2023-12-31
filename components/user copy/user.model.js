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
const bcrypt = require("bcrypt");
const connections = require("../../config/connection/connection");
const crypto = require("crypto");
const mongoose_1 = require("mongoose");
const constants_1 = require("../../constants/constants");
/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - email
 *        - name
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        passwordResetToken:
 *          type: string
 *        passwordResetExpires:
 *          type: string
 *          format: date
 *        tokens:
 *          type: array
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    name: String,
    role: {
        type: String,
        enum: [constants_1.USERROLES.ADMIN, constants_1.USERROLES.CUSTOMER, constants_1.USERROLES.EMPLOYEE, constants_1.USERROLES.SUPER_ADMIN, constants_1.USERROLES.USER]
    },
    phoneNumber: String,
    dob: Date,
    imageUrl: String,
    customerId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'CustomerModel',
    },
    employeeId: {
        type: mongoose_1.Types.ObjectId
    },
    active: {
        type: Boolean,
        default: true
    },
    password: String,
    tokens: Array,
}, {
    collection: 'usermodel',
    versionKey: false,
    timestamps: true
}).pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password')) {
            return next();
        }
        try {
            const salt = yield bcrypt.genSalt(10);
            const hash = yield bcrypt.hash(user.password, salt);
            user.password = hash;
            next();
        }
        catch (error) {
            return next(error);
        }
    });
});
/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const match = yield bcrypt.compare(candidatePassword, this.password);
            return match;
        }
        catch (error) {
            return error;
        }
    });
};
/**
 * Helper method for getting user's gravatar.
 */
UserSchema.methods.gravatar = function (size) {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};
exports.default = connections.db.model('UserModel', UserSchema);
