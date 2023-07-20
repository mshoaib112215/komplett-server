"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var connections = require("../../config/connection/connection");
/**
 * @swagger
 * components:
 *  schemas:
 *    LocationSchema:
 *      properties:
 *        name:
 *          type: string
 *        street:
 *          type: string
 *        city:
 *          type: string
 *        state:
 *          type: string
 *        stateCode:
 *          type: string
 *        country:
 *          type: string
 *        countryCode:
 *          type: string
 *        postCode:
 *          type: string
 *        formattedAddress:
 *          type: string
 *        latitude:
 *          type: number
 *        longitude:
 *          type: number
 */
var locationsSchema = new mongoose_1.Schema({
    name: String,
    street: String,
    route: String,
    city: String,
    state: String,
    stateCode: String,
    country: String,
    countryCode: String,
    postCode: String,
    formattedAddress: String,
    latitude: Number,
    longitude: Number
}, {
    collection: 'Locations',
    timestamps: true
});
var LocationModel = connections.db.model('LocationModel', locationsSchema);
exports.default = LocationModel;
