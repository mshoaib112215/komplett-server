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
const customer_dao_1 = require("./customer.dao");
const customer_dao_2 = require("./customer.dao");
const customer_validation_1 = require("./customer.validation");
const winston_1 = require("../../config/winston");
function insertCustomer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validate = customer_validation_1.default.insertCustomerValidation(req.body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const response = yield customer_dao_2.default.insertCustomer(req.body);
            res.status(201).json(response);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'customer -> customer.controller.ts -> insertCustomer', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.insertCustomer = insertCustomer;
// export async function findByName(req: any, res: Response, next: NextFunction) {
//     try {
//         const response = await customerDao.findCustomerByName(req.params.name);
//         res.status(200).json(response)
//     } catch (error) {
//         logger.error('error', error, { file: 'customer -> customer.controller.ts -> findByName', request: req.method + ' :' + req.baseUrl + req.url })
//         res.status(400).json({ message: error.message || error })
//     }
// }
function findCustomer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const limit = parseInt(req.query.limit);
            const page = parseInt(req.query.page);
            const order = req.query.order;
            const sort = req.query.sort;
            const customerName = req.query.customerName;
            const config = {
                limit, page, sort, order, customerName
            };
            const response = yield customer_dao_2.default.findAllCustomer(config);
            res.json(response);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'customer -> customer.controller.ts -> findCustomer', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.findCustomer = findCustomer;
function findCustomerById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const validate = customer_validation_1.default.findCustomerByIdValidation({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const response = yield customer_dao_2.default.findCustomerById(id);
            res.json(response);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'customer -> customer.controller.ts -> findCustomerById', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.findCustomerById = findCustomerById;
function deleteCustomer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const validate = customer_validation_1.default.findCustomerByIdValidation({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const result = yield customer_dao_2.default.deleteCustomer(id);
            res.status(204).end();
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'customer -> customer.controller.ts -> deleteCustomer', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.deleteCustomer = deleteCustomer;
function updateCustomer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validate = customer_validation_1.default.updateCustomerValidation(req.body);
            if (validate.error) {
                // console.log("in error")
                throw new Error(validate.error.message);
            }
            const doc = yield customer_dao_1.default.updateCustomer(req.body);
            res.status(200).json(doc);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'customer -> customer.controller.ts -> updateCustomer', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.updateCustomer = updateCustomer;
