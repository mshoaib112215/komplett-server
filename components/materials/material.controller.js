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
const material_model_1 = require("./material.model");
const material_dao_1 = require("./material.dao");
const material_validation_1 = require("./material.validation");
const winston_1 = require("../../config/winston");
const mongoose_1 = require("mongoose");
const master_material_model_1 = require("../master-material/master-material.model");
function findAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let order = req.query.order;
        let type = req.query.type;
        let sort = req.query.sort ? req.query.sort : "";
        let division = req.query.division;
        page = page ? page : 1;
        limit = limit ? limit : 500;
        order = order ? order : "asc";
        order = order === "des" ? -1 : 1;
        try {
            const doc = yield material_dao_1.default.findAll(page, limit, order, type, sort, division);
            res.status(200).json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material -> material.controller.ts -> findAll",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.findAll = findAll;
function insert(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            let matchAggregate = [
                {
                    $match: {
                        type: body.type,
                        buildingComponents: body.buildingComponents,
                    },
                },
            ];
            const result = yield material_model_1.SectionModel.aggregate(matchAggregate);
            if (result.length > 0) {
                throw new Error("Section with same name already exist");
            }
            const doc = yield material_dao_1.default.insert(req.body);
            res.status(200).json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material -> material.controller.ts -> insert",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.insert = insert;
function insertWithSubMaterials(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const subMaterials = body.subMaterials;
            if (!subMaterials || !Array.isArray(subMaterials)) {
                throw new Error("subMaterials should be an array");
            }
            if (!body.buildingComponents) {
                throw new Error("buildingComponents not available in request body");
            }
            if (!body.type || !(body.type in material_model_1.tabTypes)) {
                throw new Error("type in request body is not valid");
            }
            // let matchAggregate = [
            //   {
            //     $match: {
            //       type: body.type,
            //       buildingComponents: body.buildingComponents,
            //     },
            //   },
            // ];
            // const result = await SectionModel.aggregate(matchAggregate);
            // if (result.length > 0) {
            //   throw new Error("Section with same name already exist");
            // }
            const doc = yield material_dao_1.default.insertWithSubMaterials(req.body);
            res.status(200).json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material -> material.controller.ts -> insertWithSubMaterials",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.insertWithSubMaterials = insertWithSubMaterials;
function pushInSubMaterials(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const subMaterialsToPush = body.subMaterials;
            const materialId = body.materialId; //section ID
            if (!subMaterialsToPush || !Array.isArray(subMaterialsToPush)) {
                throw new Error("subMaterials should be an array");
            }
            if (!materialId) {
                throw new Error("materialId is required");
            }
            const validate = material_validation_1.default.checkIdValidation({ id: materialId });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const aggregate = [
                {
                    $match: {
                        _id: mongoose_1.Types.ObjectId(materialId),
                    },
                },
                {
                    $lookup: {
                        from: "SubMaterials",
                        localField: "subMaterials",
                        foreignField: "_id",
                        as: "subMaterials",
                    },
                },
            ];
            const result = yield material_model_1.SectionModel.aggregate(aggregate);
            if (result.length) {
                const subMaterials = result[0].subMaterials;
                yield Promise.all(subMaterialsToPush.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const masterMaterial = yield master_material_model_1.MasterMaterialModel.findById(element);
                    subMaterials.forEach((subMaterial) => {
                        if (masterMaterial.application === subMaterial.application) {
                            throw new Error("Material with same name already exist");
                        }
                    });
                })));
            }
            const doc = yield material_dao_1.default.pushInSubMaterials(body);
            res.status(200).json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material -> material.controller.ts -> pushInSubMaterials",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.pushInSubMaterials = pushInSubMaterials;
function remove(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const validate = material_validation_1.default.checkIdValidation({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const doc = yield material_dao_1.default.remove(id);
            res.status(200).json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material -> material.controller.ts -> remove",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.remove = remove;
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            if (body.buildingComponents) {
                let matchAggregate = [
                    {
                        $match: {
                            type: body.type,
                            buildingComponents: body.buildingComponents,
                        },
                    },
                ];
                const result = yield material_model_1.SectionModel.aggregate(matchAggregate);
                if (result.length > 0) {
                    result.forEach((element) => {
                        if (element._id != body._id) {
                            throw new Error("Section with same name already exist");
                        }
                    });
                }
            }
            const doc = yield material_dao_1.default.update(req.body);
            res.status(200).json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material -> material.controller.ts -> update",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.update = update;
/** Materials API */
// DONE
function insertSubMaterial(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const element = req.body;
            const validate = material_validation_1.default.insertSubMaterial(element);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            // check id fag with this id exits
            // if (element.subject) {
            //     const fagDoc = await FagModel.findById(element.subject);
            //     if (!fagDoc) {
            //         throw new Error("Fag(subject) with id does not exits");
            //     }
            // }
            const body = req.body;
            const materialId = body.materialId;
            const aggregate = [
                {
                    $match: {
                        _id: mongoose_1.Types.ObjectId(materialId),
                    },
                },
                {
                    $lookup: {
                        from: "SubMaterials",
                        localField: "subMaterials",
                        foreignField: "_id",
                        as: "subMaterials",
                    },
                },
            ];
            const materialMatch = yield material_model_1.SectionModel.aggregate(aggregate);
            if (!materialMatch.length) {
                throw new Error("Material with this materialId does not exist");
            }
            const subMaterials = materialMatch[0].subMaterials;
            if (subMaterials) {
                subMaterials.forEach((element) => {
                    if (element.application === body.application) {
                        throw new Error("Material with same name exist");
                    }
                });
            }
            const doc = yield material_dao_1.default.insetSubMaterial(element);
            res.status(201).json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material -> material.controller.ts -> insertSubMaterial",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.insertSubMaterial = insertSubMaterial;
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
                        yield material_model_1.MaterialModel.findByIdAndUpdate(doc._id, doc);
                    }
                }
            }
            const result = yield material_model_1.MaterialModel.findById(data._id);
            res.json(result);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material -> material.controller.ts -> uploadDocument",
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
            yield material_model_1.MaterialModel.findByIdAndUpdate(id, {
                fdvDocument: "",
            });
            const result = yield material_model_1.MaterialModel.findById(id);
            res.json(result);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material -> material.controller.ts -> deleteDocument",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.deleteDocument = deleteDocument;
// DONE
function findSubMaterial(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doc = yield material_dao_1.default.findSubMaterial(req.params.id);
            res.status(200).json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material -> material.controller.ts -> findSubMaterial",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.findSubMaterial = findSubMaterial;
// DONE
function updateSubMaterial(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const validation = material_validation_1.default.updateSubMaterial(body);
            if (validation.error) {
                throw new Error(validation.error.message);
            }
            // check if subject id is valid
            // if (body.subject) {
            //     const fagDoc = await FagModel.findById(body.subject);
            //     if (!fagDoc) {
            //         throw new Error("Fag(subject) with id does not exits");
            //     }
            // }
            const aggregate = [
                {
                    $match: {
                        subMaterials: mongoose_1.Types.ObjectId(body._id),
                    },
                },
                {
                    $lookup: {
                        from: "SubMaterials",
                        localField: "subMaterials",
                        foreignField: "_id",
                        as: "subMaterials",
                    },
                },
            ];
            const result = yield material_model_1.SectionModel.aggregate(aggregate);
            if (result.length) {
                const subMaterials = result[0].subMaterials;
                if (subMaterials) {
                    subMaterials.forEach((element) => {
                        if (element._id != body._id &&
                            element.application === body.application) {
                            throw new Error("Material with same name exist");
                        }
                    });
                }
            }
            const doc = yield material_dao_1.default.updateSubMaterial(req.body);
            res.status(200).json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material -> material.controller.ts -> updateSubMaterial",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.updateSubMaterial = updateSubMaterial;
function removeSubMaterial(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const validate = material_validation_1.default.checkIdValidation({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const doc = yield material_dao_1.default.removeSubMaterial(id);
            res.status(200).json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material -> material.controller.ts -> removeSubMaterial",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.removeSubMaterial = removeSubMaterial;
// export async function clearAllQuantity(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const doc: ISectionModel = await MaterialService.update(req.body);
//   } catch (err) {}
// }
function clearAllQuantity(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doc = yield material_dao_1.default.clearAllQuantity();
            res.status(200).json(doc);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material -> material.controller.ts -> clearAllQuantity",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.clearAllQuantity = clearAllQuantity;
function reorder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const validate = material_validation_1.default.reorderValidation(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            let result;
            result = yield material_dao_1.default.reorderData(body);
            // const result = await MaterialService.reorderData(body);
            res.status(200).json(result);
        }
        catch (error) {
            winston_1.logger.error("error", error, {
                file: "material -> material.controller.ts -> reorder",
                request: req.method + " :" + req.baseUrl + req.url,
            });
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.reorder = reorder;
