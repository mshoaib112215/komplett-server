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
const material_model_1 = require("./material.model");
const master_material_model_1 = require("../master-material/master-material.model");
const MaterialService = {
    findAll(page, limit, order, type, sorting, division) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            try {
                let aggregation = [];
                // let facett = {
                //   $facet: {
                //     divisions: [{ $match: {type: type,  division: { $exists: true } } },],
                //     without:[{$match: {type: type,  division: { $exists: false} } }]
                //   },
                // };
                // aggregation.push(facett);
                if (type && type in material_model_1.tabTypes) {
                    let match = {
                        $match: { type: type },
                    };
                    aggregation.push(match);
                }
                if (division && division in material_model_1.divisionTypes) {
                    let match = {
                        $match: { division: division },
                    };
                    aggregation.push(match);
                }
                let sort = sorting
                    ? { $sort: { [sorting]: order } }
                    : { $sort: { _id: order } };
                let lookup = {
                    $lookup: {
                        from: "SubMaterials",
                        localField: "subMaterials",
                        foreignField: "_id",
                        as: "subMaterials",
                    },
                };
                const unwindSubMaterials = {
                    $unwind: {
                        path: "$subMaterials",
                        preserveNullAndEmptyArrays: true,
                    },
                };
                const lookupFag = {
                    $lookup: {
                        from: "Fags",
                        localField: "subMaterials.subject",
                        foreignField: "_id",
                        as: "subMaterials.subjectDoc",
                    },
                };
                const unwindSubject = {
                    $unwind: {
                        path: "$subMaterials.subjectDoc",
                        preserveNullAndEmptyArrays: true,
                    },
                };
                // FIXME - add $first here whenever change model
                const group = {
                    $group: {
                        _id: "$_id",
                        quantity: { $first: "$quantity" },
                        unit: { $first: "$unit" },
                        buildingComponents: { $first: "$buildingComponents" },
                        code: { $first: "$code" },
                        level: { $first: "$level" },
                        division: { $first: "$division" },
                        order: { $first: "$order" },
                        type: { $first: "$type" },
                        description: { $first: "$description" },
                        subMaterials: { $push: "$subMaterials" },
                        index: { $first: "$index" },
                    },
                };
                let facet = {
                    $facet: {
                        metadata: [{ $count: "total" }, { $addFields: { page: page } }],
                        data: [{ $skip: skip }, { $limit: limit }],
                    },
                };
                aggregation.push(lookup, unwindSubMaterials, lookupFag, unwindSubject, group, sort, facet);
                let result = yield material_model_1.SectionModel.aggregate(aggregation);
                const response = result[0];
                response.data.forEach((e, index) => {
                    let res = e.subMaterials.filter((o) => {
                        return Object.keys(o).length !== 0;
                    });
                    response.data[index].subMaterials = res;
                });
                return response;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    insert(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield material_model_1.SectionModel.create(body);
                return doc;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    insertWithSubMaterials(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let subMaterials = body.subMaterials;
                const copiedSubMaterialsArray = [];
                yield Promise.all(subMaterials.map((element) => __awaiter(this, void 0, void 0, function* () {
                    let elemId = element;
                    try {
                        let doc;
                        if (body.isDuplicate) {
                            doc = yield material_model_1.MaterialModel.findById(element).lean();
                        }
                        else {
                            doc = yield master_material_model_1.MasterMaterialModel.findById(elemId).lean();
                            // copy properties and insert in submaterial table
                            // fetch id of newly created submaterials replace sub material array with
                            // copiedSubMaterialsArray
                            if (!doc) {
                                throw new Error(`master material with id - ${elemId} is not available`);
                            }
                            doc.masterMaterialId = doc["_id"];
                        }
                        delete doc["_id"];
                        if (!doc.subject || !mongoose_1.Types.ObjectId.isValid(doc.subject)) {
                            delete doc.subject;
                        }
                        const newDoc = yield material_model_1.MaterialModel.create(doc);
                        copiedSubMaterialsArray.push(newDoc._id);
                    }
                    catch (error) {
                        throw new Error(error);
                    }
                })));
                if (body.isDuplicate) {
                    delete body.isDuplicate;
                }
                body.subMaterials = copiedSubMaterialsArray;
                //increnment order number
                const lastDoc = yield material_model_1.SectionModel.findOne({
                    type: body.type,
                    division: body.division,
                })
                    .sort({ order: -1 })
                    .limit(1);
                console.log("lastDoc", lastDoc);
                body.order = lastDoc ? lastDoc.order + 1 : 1;
                const newMaterialDoc = yield material_model_1.SectionModel.create(body);
                return newMaterialDoc;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    pushInSubMaterials(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subMaterials = body.subMaterials;
                const materialId = body.materialId;
                const copiedSubMaterialsArray = [];
                yield Promise.all(subMaterials.map((element) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        let doc = yield master_material_model_1.MasterMaterialModel.findById(element).lean();
                        // copy properties and insert in submaterial table
                        // fetch id of newly created submaterials replace sub material array with
                        // copiedSubMaterialsArray
                        if (!doc) {
                            throw new Error(`master material with id - ${element} is not available`);
                        }
                        doc.masterMaterialId = doc["_id"];
                        delete doc["_id"];
                        const newDoc = yield material_model_1.MaterialModel.create(doc); // create submaterial table
                        copiedSubMaterialsArray.push(newDoc._id); //push in matrail tabel
                    }
                    catch (error) {
                        throw new Error(error);
                    }
                })));
                const result = yield material_model_1.SectionModel.update(
                // material table(section)
                { _id: materialId }, // section ID
                { $push: { subMaterials: copiedSubMaterialsArray } });
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield material_model_1.SectionModel.findById(id);
                if (!doc) {
                    throw new Error("Doc with this id not found");
                }
                doc.remove();
                return doc;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    update(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oldDoc = yield material_model_1.SectionModel.findById(body._id);
                if (body.division && oldDoc.division !== body.division) {
                    const lastDoc = yield material_model_1.SectionModel.findOne({
                        type: oldDoc.type,
                        division: body.division,
                    })
                        .sort({ order: -1 })
                        .limit(1);
                    body.order = lastDoc ? lastDoc.order + 1 : 1;
                }
                const doc = yield material_model_1.SectionModel.findByIdAndUpdate({ _id: mongoose_1.Types.ObjectId(body._id) }, { $set: body });
                return doc;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    // DONE
    insetSubMaterial(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // delete body.materialId;
                const doc = yield material_model_1.MaterialModel.create(body);
                material_model_1.SectionModel.update({ _id: body.materialId }, { $push: { subMaterials: doc._id } }).then((res) => { });
                return doc;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    // DONE
    findSubMaterial(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let lookup = {
                    $lookup: {
                        from: "SubMaterials",
                        localField: "subMaterials",
                        foreignField: "_id",
                        as: "subMaterials",
                    },
                };
                const unwindSubMaterials = {
                    $unwind: {
                        path: "$subMaterials",
                    },
                };
                const lookupFag = {
                    $lookup: {
                        from: "Fags",
                        localField: "subMaterials.subject",
                        foreignField: "_id",
                        as: "subMaterials.subjectDoc",
                    },
                };
                const unwindSubject = {
                    $unwind: {
                        path: "$subMaterials.subjectDoc",
                    },
                };
                const group = {
                    $group: {
                        _id: "$_id",
                        subMaterials: { $push: "$subMaterials" },
                    },
                };
                let match = { $match: { _id: mongoose_1.Types.ObjectId(materialId) } };
                const subMaterials = material_model_1.SectionModel.aggregate([
                    match,
                    lookup,
                    unwindSubMaterials,
                    lookupFag,
                    unwindSubject,
                    group,
                    { $project: { subMaterials: 1 } },
                ]);
                return subMaterials;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    // DONE
    updateSubMaterial(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = material_model_1.MaterialModel.findByIdAndUpdate(body._id, { $set: body });
                return doc;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    removeSubMaterial(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield material_model_1.MaterialModel.findById(id);
                if (!doc) {
                    throw new Error("Doc with this id not found");
                }
                doc.remove();
                return doc;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    clearAllQuantity() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield material_model_1.SectionModel.updateMany({}, { quantity: 0 });
                if (!doc) {
                    throw new Error("Doc with this id not found");
                }
                return doc;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    reorderData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const from = body.from;
            const to = body.to;
            const type = body.type;
            const division = body.division ? body.division : "";
            let doc;
            try {
                if (from.order > to) {
                    const query = division
                        ? { order: { $gte: to, $lt: from.order }, type, division }
                        : { order: { $gte: to, $lt: from.order }, type };
                    const test = yield material_model_1.SectionModel.updateMany(query, //Your Condition
                    { $inc: { order: 1 } } //YOUR JSON contents
                    );
                    console.log("increment", test);
                }
                else {
                    console.log("decrement");
                    const query = division
                        ? { order: { $lte: to, $gt: from.order }, type, division }
                        : { order: { $lte: to, $gt: from.order }, type };
                    yield material_model_1.SectionModel.updateMany(query, //Your Condition
                    { $inc: { order: -1 } } //YOUR JSON contents
                    );
                }
                doc = yield material_model_1.SectionModel.updateOne({ _id: mongoose_1.Types.ObjectId(from.id) }, { $set: { order: to } });
                return "Reorder done";
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
};
exports.default = MaterialService;
