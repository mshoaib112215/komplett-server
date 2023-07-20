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
const winston_1 = require("../../config/winston");
const fag_service_1 = require("./fag.service");
const fag_validation_1 = require("./fag.validation");
const fag_dao_1 = require("./fag.dao");
function findFags(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docs = yield fag_service_1.default.findFags();
            res.json(docs);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'fag -> fag.controller.ts -> findFags', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.findFags = findFags;
function checkFagIsUsed(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const docs = yield fag_service_1.default.checkIsFagUsed(id);
            res.json(docs);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'fag -> fag.controller.ts -> checkFagIsUsed', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.checkFagIsUsed = checkFagIsUsed;
function insertFag(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const doc = yield fag_service_1.default.insertFag(body);
            res.json(doc);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'fag -> fag.controller.ts -> insertFag', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.insertFag = insertFag;
function updateFag(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            if (!body._id) {
                throw new Error("_id is required field in body");
            }
            const validate = fag_validation_1.default.checkIdValidation({ id: body._id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const doc = yield fag_service_1.default.updateFag(body);
            res.json(doc);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'fag -> fag.controller.ts -> updateFag', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.updateFag = updateFag;
// NOTE :  user is not deleted from db right now ,only making activate variable false from use table 
function deleteFag(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const validate = fag_validation_1.default.checkIdValidation({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const doc = yield fag_service_1.default.deleteFag(id);
            res.json(doc);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'fag -> fag.controller.ts -> deleteFag', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.deleteFag = deleteFag;
function replaceFag(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const oldFagId = body.oldFagId;
            const newFagId = body.newFagId;
            if (!oldFagId || !newFagId) {
                throw new Error("oldFagId and newFagId is required fields");
            }
            const validate = fag_validation_1.default.checkIdValidation({ id: oldFagId });
            const validate2 = fag_validation_1.default.checkIdValidation({ id: newFagId });
            if (validate.error || validate2.error) {
                throw new Error(validate.error.message || validate2.error.message);
            }
            const oldDoc = fag_dao_1.default.fnGet(oldFagId);
            const newDoc = fag_dao_1.default.fnGet(newFagId);
            if (!oldDoc) {
                throw new Error("No document exits with oldFagId");
            }
            if (!newDoc) {
                throw new Error("No document exits with newFagId");
            }
            const doc = yield fag_service_1.default.replaceFag(oldFagId, newFagId);
            res.sendStatus(204);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'fag -> fag.controller.ts -> replaceFag', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.replaceFag = replaceFag;
