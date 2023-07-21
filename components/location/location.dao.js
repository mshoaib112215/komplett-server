"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = require("../dao");
const location_model_1 = require("./location.model");
class LocationDAO extends dao_1.default {
    constructor() {
        super(...arguments);
        this.model = location_model_1.default;
    }
}
exports.default = new LocationDAO();
