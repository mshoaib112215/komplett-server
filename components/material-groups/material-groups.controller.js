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
const error_1 = require("../../config/error");
const winston_1 = require("../../config/winston");
const material_groups_validation_1 = require("./material-groups.validation");
const material_groups_dao_1 = require("./material-groups.dao");
const master_material_model_1 = require("../master-material/master-material.model");
const mongoose_1 = require("mongoose");
const material_subgroups_dao_1 = require("./material-subgroups.dao");
const material_subgroups_validation_1 = require("./material-subgroups.validation");
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function findAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let groups;
            groups = yield material_groups_dao_1.default.getAll(req.query);
            res.status(200).json(groups);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material-groups -> material-groups.controller.ts -> findAll",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            next(new error_1.default(error.message.status, error.message));
        }
    });
}
exports.findAll = findAll;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let body = req.body;
            const validate = material_groups_validation_1.default.createGroup(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const group = yield material_groups_dao_1.default.insert(body);
            res.status(201).json(group);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material-groups -> material-groups.controller.ts -> create",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.create = create;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let body = req.body;
            const validate = material_groups_validation_1.default.createGroup(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const group = yield material_groups_dao_1.default.update(body._id, body);
            res.status(201).json(group);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material-groups -> material-groups.controller.ts -> update",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.update = update;
// NOTE :  user is not deleted from db right now ,only making activate variable false from use table
function deleteGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const validate = material_groups_validation_1.default.checkIdValidation({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const MasterMaterial = yield master_material_model_1.MasterMaterialModel.findOne({
                groupId: mongoose_1.Types.ObjectId(id),
            });
            if (MasterMaterial) {
                throw new Error("This Group already used in some master material, you can't delete it.");
            }
            const doc = yield material_groups_dao_1.default.deleteRecord(id);
            res.json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material-groups -> material-groups.controller.ts -> deleteGroup",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.deleteGroup = deleteGroup;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function addSubgroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let groups;
            groups = yield material_subgroups_dao_1.default.addSubgroupRecord(req.body);
            res.status(200).json(groups);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material-groups -> material-groups.controller.ts -> addSubgroup",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            next(new error_1.default(error.message.status, error.message));
        }
    });
}
exports.addSubgroup = addSubgroup;
function updateSubgroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const groups = yield material_subgroups_dao_1.default.update(body._id, body);
            res.status(200).json(groups);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material-groups -> material-groups.controller.ts -> updateSubgroup",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            next(new error_1.default(error.message.status, error.message));
        }
    });
}
exports.updateSubgroup = updateSubgroup;
function deleteSubgroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const validate = material_subgroups_validation_1.default.checkIdValidation({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            // const subGroup: any = await SubgroupsModel.findById(id);
            // const MasterMaterial = await MasterMaterialModel.findOne({
            //   groupId: Types.ObjectId(subGroup.groupId),
            // });
            // console.log("group", MasterMaterial);
            // if (MasterMaterial) {
            //   throw new Error(
            //     "This Group already used with this Subgroup in some master material, you can't delete it."
            //   );
            // }
            const doc = yield material_subgroups_dao_1.default.deleteSubgroupRecord(id);
            res.json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material-groups -> material-groups.controller.ts -> deleteSubgroup",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.deleteSubgroup = deleteSubgroup;
