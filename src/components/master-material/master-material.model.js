"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterMaterialModel = void 0;
var mongoose_1 = require("mongoose");
var connections = require("../../config/connection/connection");
var MasterSubMaterialSchema = new mongoose_1.Schema({
    subject: {
        type: mongoose_1.Types.ObjectId,
        ref: "FagModel",
        // required: true
    },
    // subject: String,
    category: {
        type: String,
        required: true,
    },
    NS3420: String,
    application: {
        type: String,
        required: true,
    },
    crowd: Number,
    unit: String,
    itemPrice: Number,
    itemFactor: Number,
    inverseFactor: Number,
    useListPrice: {
        type: Number,
    },
    documents: {
        type: [{ name: String, url: String }],
    },
    fdvDocument: {
        type: String,
    },
    quantity: {
        type: {
            type: String,
        },
        quantityPerComponent: Number,
        svinn: Number,
        inTotal: Number,
    },
    groupId: {
        type: mongoose_1.Types.ObjectId,
        ref: "MaterialGroupsModel",
    },
    subgroupId: {
        type: mongoose_1.Types.ObjectId,
        ref: "SubgroupsModel",
    },
    time: {
        minPerComponent: Number,
        hoursPerComponent: Number,
        totalTimeConsumption: String,
    },
}, {
    collection: "MasterMaterials",
    timestamps: true,
});
var MasterMaterialModel = connections.db.model("MasterSubMaterialModel", MasterSubMaterialSchema);
exports.MasterMaterialModel = MasterMaterialModel;
