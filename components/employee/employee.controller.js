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
const employee_validation_1 = require("./employee.validation");
const employee_dao_1 = require("./employee.dao");
const winston_1 = require("../../config/winston");
function findEmployees(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const limit = parseInt(req.query.limit);
            const page = parseInt(req.query.page);
            const order = req.query.order;
            const sort = req.query.sort;
            const config = {
                limit, page, sort, order
            };
            const employees = yield employee_dao_1.default.findAllEmployee(config);
            res.status(200).json(employees);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'employee -> employee.controller.ts -> findEmployees', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.findEmployees = findEmployees;
function findEmployeeById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const validate = employee_validation_1.default.checkIdValidation({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const response = yield employee_dao_1.default.findEmployeeById(id);
            res.json(response);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'employee -> employee.controller.ts -> findEmployeeById', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.findEmployeeById = findEmployeeById;
function insertEmployee(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const validate = employee_validation_1.default.insertEmployeeValidation(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const response = yield employee_dao_1.default.insertEmployee(body);
            res.json(response);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'employee -> employee.controller.ts -> insertEmployee', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.insertEmployee = insertEmployee;
function updateEmployee(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const validate = employee_validation_1.default.updateEmployeeValidation(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const response = yield employee_dao_1.default.updateEmployee(body);
            res.json(response);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'employee -> employee.controller.ts -> updateEmployee', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.updateEmployee = updateEmployee;
// NOTE :  user is not deleted from db right now ,only making activate variable false from use table 
function deleteEmployee(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const validate = employee_validation_1.default.checkIdValidation({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const response = yield employee_dao_1.default.deleteEmployee(id);
            res.status(200).json(response);
        }
        catch (error) {
            winston_1.logger.error('error', error, { file: 'employee -> employee.controller.ts -> deleteEmployee', request: req.method + ' :' + req.baseUrl + req.url });
            res.status(400).json({ message: error.message || error });
        }
    });
}
exports.deleteEmployee = deleteEmployee;
