"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var connections = require("../../config/connection/connection");
/**
 * @swagger
 * components:
 *  schemas:
 *    FagSchema:
 *      properties:
 *        id:
 *          type: number
 *        description:
 *          type: string
 *        hourlyRate:
 *          type: number
 *
 */
var FagSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    hourlyRate: {
        type: Number,
        default: 0
    },
    isDefault: {
        type: Boolean,
        default: true
    }
}, {
    collection: 'Fags',
    timestamps: true
});
var FagModel = connections.db.model('FagModel', FagSchema);
exports.default = FagModel;
