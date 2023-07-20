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
exports.deleteOfferTemplate = exports.updateOfferTemplate = exports.insertOfferTemplate = exports.findOfferTemplate = void 0;
var winston_1 = require("../../config/winston");
var offer_template_dao_1 = require("./offer-template.dao");
var offer_template_validator_1 = require("./offer-template.validator");
function findOfferTemplate(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var docs, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, offer_template_dao_1.default.fnGetAll()];
                case 1:
                    docs = _a.sent();
                    res.json(docs);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    winston_1.logger.log('error', error_1, { file: 'offer-template -> offer-template.controller.ts -> findOfferTemplate', request: req.method + ' :' + req.baseUrl + req.url });
                    res.status(400).json({ message: error_1.message || error_1 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findOfferTemplate = findOfferTemplate;
function insertOfferTemplate(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, doc, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.body;
                    return [4 /*yield*/, offer_template_dao_1.default.insert(body)];
                case 1:
                    doc = _a.sent();
                    return [2 /*return*/, doc];
                case 2:
                    error_2 = _a.sent();
                    winston_1.logger.log('error', error_2, { file: 'offer-template -> offer-template.controller.ts -> insertOfferTemplate', request: req.method + ' :' + req.baseUrl + req.url });
                    res.status(400).json({ message: error_2.message || error_2 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.insertOfferTemplate = insertOfferTemplate;
function updateOfferTemplate(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, validation, findDoc, doc, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    body = req.body;
                    validation = offer_template_validator_1.default.checkIdValidation({ id: body._id });
                    if (validation.error) {
                        throw new Error(validation.error.message);
                    }
                    return [4 /*yield*/, offer_template_dao_1.default.fnGet(body._id)];
                case 1:
                    findDoc = _a.sent();
                    if (!findDoc) {
                        throw new Error("No Offer Template item available with this id");
                    }
                    return [4 /*yield*/, offer_template_dao_1.default.update(body._id, body)];
                case 2:
                    doc = _a.sent();
                    res.json(doc);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    winston_1.logger.log('error', error_3, { file: 'offer-template -> offer-template.controller.ts -> updateOfferTemplate', request: req.method + ' :' + req.baseUrl + req.url });
                    res.status(400).json({ message: error_3.message || error_3 });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateOfferTemplate = updateOfferTemplate;
function deleteOfferTemplate(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, doc, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, offer_template_dao_1.default.deleteRecord(id)];
                case 1:
                    doc = _a.sent();
                    return [2 /*return*/, doc];
                case 2:
                    error_4 = _a.sent();
                    winston_1.logger.log('error', error_4, { file: 'offer-template -> offer-template.controller.ts -> deleteOfferTemplate', request: req.method + ' :' + req.baseUrl + req.url });
                    res.status(400).json({ message: error_4.message || error_4 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteOfferTemplate = deleteOfferTemplate;
