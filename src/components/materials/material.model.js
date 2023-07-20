"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialModel = exports.SectionModel = exports.divisionTypes = exports.tabTypes = void 0;
var mongoose_1 = require("mongoose");
var connections = require("../../config/connection/connection");
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
})(tabTypes || (exports.tabTypes = tabTypes = {}));
var divisionTypes;
(function (divisionTypes) {
    divisionTypes[divisionTypes["Bath"] = 0] = "Bath";
    divisionTypes[divisionTypes["LaundryRoom"] = 1] = "LaundryRoom";
    divisionTypes[divisionTypes["WC"] = 2] = "WC";
    divisionTypes[divisionTypes["Kitchen"] = 3] = "Kitchen";
    divisionTypes[divisionTypes["BedRoom"] = 4] = "BedRoom";
    divisionTypes[divisionTypes["LivingRoom"] = 5] = "LivingRoom";
    divisionTypes[divisionTypes["Bod"] = 6] = "Bod";
})(divisionTypes || (exports.divisionTypes = divisionTypes = {}));
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
var SectionSchema = new mongoose_1.Schema({
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
    return __awaiter(this, void 0, void 0, function () {
        var self;
        var _this = this;
        return __generator(this, function (_a) {
            self = this;
            self.subMaterials.forEach(function (submaterial) { return __awaiter(_this, void 0, void 0, function () {
                var doc;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MaterialModel.remove({ _id: submaterial })];
                        case 1:
                            doc = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
});
var applicationDefaultUnits = [
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
var MaterialSchema = new mongoose_1.Schema({
    subject: {
        type: mongoose_1.Types.ObjectId,
        ref: "FagModel",
        // required: true
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
MaterialSchema.post("remove", function (doc, next) { return __awaiter(void 0, void 0, void 0, function () {
    var submaterialId, docr, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                submaterialId = doc._id;
                return [4 /*yield*/, SectionModel.find({
                        subMaterials: { $in: submaterialId },
                    })];
            case 1:
                docr = _a.sent();
                return [4 /*yield*/, docr[0].update({
                        $pull: {
                            subMaterials: submaterialId,
                        },
                    })];
            case 2:
                _a.sent();
                next();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                throw new Error(error_1);
            case 4: return [2 /*return*/];
        }
    });
}); });
var MaterialModel = connections.db.model("SubMaterialModel", MaterialSchema, "SubMaterials");
exports.MaterialModel = MaterialModel;
var SectionModel = connections.db.model("MaterialModel", SectionSchema, "Materials");
exports.SectionModel = SectionModel;
