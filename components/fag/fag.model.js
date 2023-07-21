"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connections = require("../../config/connection/connection");
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
const FagSchema = new mongoose_1.Schema({
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
const FagModel = connections.db.model('FagModel', FagSchema);
exports.default = FagModel;
