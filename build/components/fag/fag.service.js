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
const fag_dao_1 = require("./fag.dao");
const material_model_1 = require("../materials/material.model");
const master_material_model_1 = require("../master-material/master-material.model");
class FagService {
    constructor() {
        this.findFags = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const fags = yield fag_dao_1.default.getAllFags();
                return fags;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.checkIsFagUsed = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const checkMaterial = yield material_model_1.MaterialModel.findOne({ subject: id });
                const checkMasterMaterial = yield master_material_model_1.MasterMaterialModel.findOne({ subject: id });
                console.log(checkMaterial, checkMasterMaterial);
                if (!checkMasterMaterial && !checkMaterial) {
                    return {
                        isUsed: false
                    };
                }
                return { isUsed: true };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.insertFag = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield fag_dao_1.default.insert(body);
                return doc;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.updateFag = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield fag_dao_1.default.update(body._id, body);
                return doc;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.deleteFag = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield fag_dao_1.default.deleteRecord(id);
                return doc;
            }
            catch (error) {
                throw new Error(error);
            }
        });
        /**
         * replaces the fag in all materials
         * @param oldFagId
         * @param newFagId
         */
        this.replaceFag = (oldFagId, newFagId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const docsFromMaterialModel = yield material_model_1.MaterialModel.update({ subject: oldFagId }, { subject: newFagId });
                const docsFromMasterMaterialModel = yield master_material_model_1.MasterMaterialModel.update({ subject: oldFagId }, { subject: newFagId });
                return;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.FagService = FagService;
exports.default = new FagService();
