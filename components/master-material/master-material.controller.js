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
const error_1 = require("../../config/error");
const winston_1 = require("../../config/winston");
const material_model_1 = require("../materials/material.model");
const master_material_dao_1 = require("./master-material.dao");
const master_material_validation_1 = require("./master-material.validation");
const master_material_model_1 = require("./master-material.model");
// DONE
function findByCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = req.query.category || "all";
            const groupId = req.query.groupId || "all";
            const limit = parseInt(req.query.limit);
            const page = parseInt(req.query.page);
            const order = req.query.order;
            const sort = req.query.sort;
            const config = {
                limit,
                page,
                sort,
                order,
                category,
                groupId,
            };
            const masterMaterials = yield master_material_dao_1.default.findMasterMaterialByCategory(config);
            res.json(masterMaterials);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "master-material -> master-material.controller.ts -> findAll",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.findByCategory = findByCategory;
// DONE
function insertInMasterMaterial(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            if (!body.category || !(body.category in material_model_1.tabTypes)) {
                throw new mongoose_1.Error("category field is not Correct !!");
            }
            if (!body.application) {
                throw new mongoose_1.Error("application is not present in request body");
            }
            // check if subject id is valid
            // if (body.subject) {
            //     const fagDoc = await FagModel.findById(body.subject);
            //     if (!fagDoc) {
            //         throw new Error("Fag(subject) with id does not exits");
            //     }
            // }
            const doc = yield master_material_dao_1.default.insertInMasterMaterial(body);
            res.json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "master-material -> master-material.controller.ts -> insertInMasterMaterial",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.insertInMasterMaterial = insertInMasterMaterial;
function deleteMasterMaterial(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const validate = master_material_validation_1.default.checkIdValidation({ id: id });
            if (validate.error) {
                throw new mongoose_1.Error(validate.error.message);
            }
            const doc = yield master_material_dao_1.default.deleteRecord(id);
            res.json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "master-material -> master-material.controller.ts -> deleteMasterMaterial",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.deleteMasterMaterial = deleteMasterMaterial;
// DONE
function updateMasterMaterial(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const id = body._id;
            const validate = master_material_validation_1.default.checkIdValidation({ id: id });
            if (validate.error) {
                throw new mongoose_1.Error(validate.error.message);
            }
            if (body.category && !(body.category in material_model_1.tabTypes)) {
                throw new mongoose_1.Error("Category is not valid..");
            }
            // check if subject id is valid
            // if (body.subject) {
            //     const fagDoc = await FagModel.findById(body.subject);
            //     if (!fagDoc) {
            //         throw new Error("Fag(subject) with id does not exits");
            //     }
            // }
            const doc = yield master_material_dao_1.default.update(id, req.body);
            // update submaterial
            const updatedDoc = yield master_material_model_1.MasterMaterialModel.findById(id).lean();
            delete updatedDoc["_id"];
            yield material_model_1.MaterialModel.update({ masterMaterialId: id }, updatedDoc);
            res.json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "master-material -> master-material.controller.ts -> updateMasterMaterial",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.updateMasterMaterial = updateMasterMaterial;
function uploadDocument(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var fullUrl = req.protocol + "://" + req.get("host");
            const data = req.body;
            if (req.file && req.file.path) {
                const imageUrl = req.file.path;
                if (imageUrl) {
                    data["url"] = fullUrl + "/" + imageUrl;
                    if (data._id) {
                        // const doc = {
                        //     _id: data._id,
                        //     documents: [
                        //         {
                        //             url: fullUrl + '/' + imageUrl
                        //         }
                        //     ]
                        // }
                        const doc = {
                            _id: data._id,
                            fdvDocument: fullUrl + "/" + imageUrl,
                        };
                        yield master_material_model_1.MasterMaterialModel.findByIdAndUpdate(doc._id, doc);
                    }
                }
            }
            const result = yield master_material_model_1.MasterMaterialModel.findById(data._id);
            res.json(result);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "masterMaterial -> masterMaterial.controller.ts -> uploadDocument",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.uploadDocument = uploadDocument;
function deleteDocument(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO :  delete file from folder
        try {
            const id = req.params.id;
            yield master_material_model_1.MasterMaterialModel.findByIdAndUpdate(id, {
                fdvDocument: "",
            });
            const result = yield master_material_model_1.MasterMaterialModel.findById(id);
            res.json(result);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "masterMaterial -> masterMaterial.controller.ts -> deleteDocument",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.deleteDocument = deleteDocument;
