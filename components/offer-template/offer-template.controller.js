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
const offer_template_dao_1 = require("./offer-template.dao");
const offer_template_validator_1 = require("./offer-template.validator");
function findOfferTemplate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docs = yield offer_template_dao_1.default.fnGetAll();
            res.json(docs);
        }
        catch (error) {
            winston_1.logger.log('error', error, { file: 'offer-template -> offer-template.controller.ts -> findOfferTemplate', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.findOfferTemplate = findOfferTemplate;
function insertOfferTemplate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const doc = yield offer_template_dao_1.default.insert(body);
            return doc;
        }
        catch (error) {
            winston_1.logger.log('error', error, { file: 'offer-template -> offer-template.controller.ts -> insertOfferTemplate', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.insertOfferTemplate = insertOfferTemplate;
function updateOfferTemplate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const validation = offer_template_validator_1.default.checkIdValidation({ id: body._id });
            if (validation.error) {
                throw new Error(validation.error.message);
            }
            const findDoc = yield offer_template_dao_1.default.fnGet(body._id);
            if (!findDoc) {
                throw new Error("No Offer Template item available with this id");
            }
            const doc = yield offer_template_dao_1.default.update(body._id, body);
            res.json(doc);
        }
        catch (error) {
            winston_1.logger.log('error', error, { file: 'offer-template -> offer-template.controller.ts -> updateOfferTemplate', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.updateOfferTemplate = updateOfferTemplate;
function deleteOfferTemplate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const doc = yield offer_template_dao_1.default.deleteRecord(id);
            return doc;
        }
        catch (error) {
            winston_1.logger.log('error', error, { file: 'offer-template -> offer-template.controller.ts -> deleteOfferTemplate', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.deleteOfferTemplate = deleteOfferTemplate;
