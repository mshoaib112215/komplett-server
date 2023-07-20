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
const connections = require("../../config/connection/connection");
var tabTypes;
(function (tabTypes) {
    tabTypes[tabTypes["Engineering"] = 0] = "Engineering";
    tabTypes[tabTypes["ContainerRent"] = 1] = "ContainerRent";
    tabTypes[tabTypes["CoveringAndDemolition"] = 2] = "CoveringAndDemolition";
    tabTypes[tabTypes["Carpentry"] = 3] = "Carpentry";
    tabTypes[tabTypes["Membraneworker"] = 4] = "Membraneworker";
    tabTypes[tabTypes["WallPlasterAndTileWork"] = 5] = "WallPlasterAndTileWork";
    tabTypes[tabTypes["RorarBeider"] = 6] = "RorarBeider";
    tabTypes[tabTypes["Electricalwork"] = 7] = "Electricalwork";
    tabTypes[tabTypes["T\u00F8mrerarbeider"] = 8] = "T\u00F8mrerarbeider";
    tabTypes[tabTypes["Coverage"] = 9] = "Coverage";
    tabTypes[tabTypes["Demolition"] = 10] = "Demolition";
})(tabTypes = exports.tabTypes || (exports.tabTypes = {}));
var divisionTypes;
(function (divisionTypes) {
    divisionTypes[divisionTypes["Bath"] = 0] = "Bath";
    divisionTypes[divisionTypes["LaundryRoom"] = 1] = "LaundryRoom";
    divisionTypes[divisionTypes["WC"] = 2] = "WC";
    divisionTypes[divisionTypes["Kitchen"] = 3] = "Kitchen";
    divisionTypes[divisionTypes["BedRoom"] = 4] = "BedRoom";
    divisionTypes[divisionTypes["LivingRoom"] = 5] = "LivingRoom";
    divisionTypes[divisionTypes["Bod"] = 6] = "Bod";
})(divisionTypes = exports.divisionTypes || (exports.divisionTypes = {}));
/**
 * @swagger
 * components:
 *  schemas:
 *    MaterialSchema:
 *      properties:
 *        quantity:
 *          type: number
 *        unit:
 *          type: string
 *        buildingComponents:
 *          type: string
 *        code:
 *          type: string
 *        level:
 *          type: string
 *        type:
 *          type: string
 *        subMaterials:
 *          type: array
 *          example: []
 *          items:
 *            $ref : '#/components/schemas/SubMaterialSchema'
 */
// FIXME : change findAll method in material.dao
// whenever there is a change in ISectionModel
const SectionSchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
    },
    unit: {
        type: String,
    },
    buildingComponents: {
        type: String,
        required: true,
    },
    code: {
        type: String,
    },
    level: {
        type: String,
    },
    type: {
        type: String,
    },
    division: {
        type: String,
    },
    index: {
        type: Number,
    },
    order: {
        type: Number,
    },
    subMaterials: {
        type: [{ type: mongoose_1.Types.ObjectId, ref: "SubMaterialModel" }],
        default: [],
    },
    description: String,
}, {
    timestamps: true,
});
SectionSchema.post("remove", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const self = this;
        self.subMaterials.forEach((submaterial) => __awaiter(this, void 0, void 0, function* () {
            const doc = yield MaterialModel.remove({ _id: submaterial });
        }));
    });
});
const applicationDefaultUnits = [
    { symbol: "lm", name: "lopemeter" },
    { symbol: "stk", name: "stykk" },
    { symbol: "m2", name: "kvadratmeter" },
    { symbol: "RS", name: "rundsum" },
];
/**
 * @swagger
 * components:
 *  schemas:
 *    SubMaterialSchema:
 *      properties:
 *        subject:
 *          type: string
 *        NS3420:
 *          type: string
 *        application:
 *          type: string
 *        crowd:
 *          type: number
 *        unit:
 *          type: string
 *        itemPrice:
 *          type: number
 *        itemFactor:
 *          type: number
 *        inverseFactor:
 *          type: number
 *        useListPrice:
 *          type: number
 *        documents:
 *          type: array
 *          items:
 *            type: object
 *        quantity:
 *          type: object
 *          properties:
 *            type:
 *              type: string
 *            quantityPerComponent:
 *              type: number
 *            svinn:
 *              type: number
 *            inTotal:
 *              type: number
 *        time:
 *          type: object
 *          properties:
 *            minPerComponent:
 *              type: number
 *            hoursPerComponent:
 *              type: number
 *            totalTimeConsumption:
 *              type: string
 *
 */
const MaterialSchema = new mongoose_1.Schema({
    subject: {
        type: mongoose_1.Types.ObjectId,
        ref: "FagModel",
    },
    // subject: String,
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
    masterMaterialId: mongoose_1.Types.ObjectId,
    useListPrice: {
        type: Number,
        default: 0,
    },
    documents: {
        type: [{ name: String, url: String }],
        default: [
            {
                name: "FDV",
                url: "https://export.byggtjeneste.no/api/media/2dd67cb0-9eef-4b62-95d5-56455d4d5cca?download=false",
            },
        ],
    },
    fdvDocument: {
        type: String,
    },
    quantity: {
        type: {
            type: String,
            default: "usual",
        },
        quantityPerComponent: Number,
        svinn: {
            type: Number,
            default: 20,
        },
        inTotal: Number,
    },
    time: {
        minPerComponent: Number,
        hoursPerComponent: Number,
        totalTimeConsumption: String,
    },
});
// to update svinn to 20
// db.SubMaterials.updateMany({} , {$set: {"quantity.svinn" : 20}})
MaterialSchema.post("remove", (doc, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const submaterialId = doc._id;
        const docr = yield SectionModel.find({
            subMaterials: { $in: submaterialId },
        });
        yield docr[0].update({
            $pull: {
                subMaterials: submaterialId,
            },
        });
        next();
    }
    catch (error) {
        throw new Error(error);
    }
}));
let MaterialModel = connections.db.model("SubMaterialModel", MaterialSchema, "SubMaterials");
exports.MaterialModel = MaterialModel;
let SectionModel = connections.db.model("MaterialModel", SectionSchema, "Materials");
exports.SectionModel = SectionModel;
