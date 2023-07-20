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
const mongoose_1 = require("mongoose");
const connections = require("../../config/connection/connection");
const user_model_1 = require("../user/user.model");
/**
 * @swagger
 * components:
 *  schemas:
 *    CustomerSchema:
 *      properties:
 *        userId:
 *          type: string
 *        contactPerson:
 *          type: string
 *        customerType:
 *          type: string
 *        contactPersonNumber:
 *          type: string
 *        organizationNumber:
 *          type: string
 *        contactPersonEmail:
 *          type: string
 *        locationId:
 *          type: string
 *        location:
 *          type: object
 *          $ref : '#/components/schemas/LocationSchema'
 *        user:
 *          $ref : '#/components/schemas/UserSchema'
 *
 */
const CustomerSchema = new mongoose_1.Schema({
    contactPerson: String,
    customerType: String,
    contactPersonNumber: String,
    organizationNumber: String,
    contactPersonEmail: String,
    //relations
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'UserModel'
    },
    locationId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'LocationModel'
    }
}, {
    collection: 'Customers',
    timestamps: true
});
// on save customer also update customerId field in user table
CustomerSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const self = this;
            if (self.userId) {
                const user = yield user_model_1.default.findByIdAndUpdate({ _id: mongoose_1.Types.ObjectId(self.userId) }, { customerId: self._id });
            }
            next();
        }
        catch (error) {
            throw new Error(error);
        }
    });
});
// deactive from user table so he can not login 
CustomerSchema.pre('remove', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //FIXME : is there any login after removing customer
    });
});
exports.default = connections.db.model('CustomerModel', CustomerSchema);
