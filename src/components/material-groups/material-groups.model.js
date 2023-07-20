"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubgroupsModel = exports.MaterialGroupsModel = void 0;
var mongoose_1 = require("mongoose");
var connections = require("../../config/connection/connection");
var groupSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subgroups: {
        type: [{ type: mongoose_1.Types.ObjectId, ref: "SubgroupsModel" }],
        default: [],
    },
}, {
    collection: "MaterialGroups",
    timestamps: true,
});
var MaterialGroupsModel = connections.db.model("MaterialGroupsModel", groupSchema);
exports.MaterialGroupsModel = MaterialGroupsModel;
var subGroupSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    groupId: {
        type: mongoose_1.Types.ObjectId,
        ref: "MaterialGroupsModel",
        required: true,
    },
}, {
    collection: "Subgroups",
    timestamps: true,
});
subGroupSchema.post("save", function (subGroupObj, next) {
    MaterialGroupsModel.findById({ _id: subGroupObj.groupId }).exec(function (err, gObj) {
        if (err) {
            console.error("subGroupSchema.post => save => Group.findById()", err);
        }
        if (gObj.subgroups.indexOf(subGroupObj._id) === -1) {
            gObj.subgroups.push(subGroupObj._id);
        }
        gObj.save(function (err) {
            if (err) {
                console.error("subGroupSchema.post => save => groupObj.save()", err);
            }
        });
    });
    next();
});
subGroupSchema.post("findOneAndDelete", function (subGroupObj, next) {
    MaterialGroupsModel.findById({ _id: subGroupObj.groupId }).exec(function (err, gObj) {
        if (err) {
            console.error("subGroupSchema.post => findOneAndDelete => Group.findById()", err);
        }
        if (gObj.subgroups.indexOf(subGroupObj._id) > -1) {
            gObj.subgroups.pull(subGroupObj._id);
        }
        gObj.save(function (err) {
            if (err) {
                console.error("subGroupSchema.post => findOneAndDelete => groupObj.save()", err);
            }
        });
    });
    next();
});
var SubgroupsModel = connections.db.model("SubgroupsModel", subGroupSchema);
exports.SubgroupsModel = SubgroupsModel;
