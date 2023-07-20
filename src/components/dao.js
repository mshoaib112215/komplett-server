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
var _ = require("lodash");
var mongoose_1 = require("mongoose");
var DAO = /** @class */ (function () {
    function DAO() {
        var _this = this;
        /**
         * Get All data
         * @deprecated NEVER EVER load all entries from DB!
         * @return {object}
         */
        this.fnGetAll = function () {
            return new Promise(function (resolve, reject) {
                _this.model.find()
                    .exec(function (err, docs) {
                    if (err) {
                        console.error('DAO:fnGetAll() => find()', err);
                        reject(err);
                    }
                    resolve(docs);
                });
            });
        };
        /**
         * Get data by pagination,filter and sorting
         * @param {Number} limit -default is `10`
         * @param {Number} page -default is `1`
         * @param {'acs'|'desc'} order -can be 'acs' or 'desc', default is `acs`
         * @param {string} sort -sort field name default it is `createdAt`
         * @param {string} matchField -field name to use for searching
         * @param {string} matchValue -value to be compared
         * @param {Array<object>} lookupAggregate -lookup aggregation object
         */
        this.fnGetByConfigration = function (config) {
            var _a, _b;
            var aggregation = [];
            var order = config.order && config.order == "desc" ? -1 : 1;
            var limit = config.limit || 10;
            var page = config.page || 1;
            var sort = config.sort || 'createdAt';
            var lookup = config.lookupAggregate;
            var skipNumber = (page - 1) * limit;
            // if any condition then match it first
            if (config.matchField && config.matchValue) {
                // const regEx= new RegExp(`${config.matchValue}` , 'i');
                var matchAggregate = { $match: (_a = {}, _a[config.matchField] = config.matchValue, _a) };
                aggregation.push(matchAggregate);
            }
            var skipAggregate = { $skip: skipNumber };
            var sortAggregate = { $sort: (_b = {}, _b[sort] = order, _b) };
            var limitAggregate = { $limit: limit };
            var facet = {
                '$facet': {
                    metadata: [{ $count: "total" }, { $addFields: { page: page } }],
                    data: [skipAggregate, limitAggregate]
                }
            };
            if (lookup) {
                aggregation.push.apply(aggregation, lookup);
            }
            aggregation.push(sortAggregate, facet);
            // order 
            // 1. match
            // 2. lookup 
            // 2. sort 
            // 3. facet
            // console.log(aggregation)
            return new Promise(function (resolve, reject) {
                _this.model.aggregate(aggregation).then(function (result) {
                    resolve(result[0]);
                }, function (error) {
                    reject(error);
                });
            });
        };
        /**
         * Fetch one record from db
         *
         * @param {string} id.
         * @param {string} fields.
         * @return {object}
         */
        this.fnGet = function (id, fields) {
            var _fields = fields || '';
            return new Promise(function (resolve, reject) {
                _this.model.findById({ _id: id }, _fields)
                    .exec(function (err, obj) {
                    if (err) {
                        console.error('DAO:fnGet() => findById()', err);
                        reject(err);
                    }
                    resolve(obj);
                });
            });
        };
        /**
         * Insert new record in db
         * @param {object}
         * @return {object}
         */
        this.insert = function (body) {
            return new Promise(function (resolve, reject) {
                var obj = new _this.model(body);
                obj.save(function (err, item) {
                    if (err) {
                        console.error('DAO:fnInsert() => save()', err);
                        reject(err);
                    }
                    resolve(item);
                });
            });
        };
        /**
         * Update record in db
         * @param {string} id.
         * @param {object} fields.
         * @return {object}
         */
        this.update = function (id, fields) { return __awaiter(_this, void 0, void 0, function () {
            var oid, doc, updated, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        oid = mongoose_1.Types.ObjectId(id);
                        return [4 /*yield*/, this.model.findOne({ _id: oid })];
                    case 1:
                        doc = _a.sent();
                        // console.log(doc , 'it st the doc ')
                        if (!doc) {
                            throw new Error('doc not found with this id');
                        }
                        updated = _.merge(doc, fields);
                        return [2 /*return*/, updated.save()];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Remove one record from db
         *
         * @param {string} id.
         * @return {number} number
         */
        this.deleteRecord = function (id) {
            return new Promise(function (resolve, reject) {
                _this.model.findOne({ _id: id }, function (err, doc) {
                    if (!doc) {
                        reject('no document with this id');
                    }
                    if (err) {
                        reject(err);
                    }
                    if (doc) {
                        doc.remove();
                    }
                    resolve(doc);
                });
            });
        };
        /**
         * Count All data
         *
         * @return {number}
         */
        this.fnCount = function () {
            return new Promise(function (resolve, reject) {
                _this.model.countDocuments(function (err, count) {
                    if (err) {
                        console.error('DAO:fnCount() => count()', err);
                        reject(err);
                    }
                    resolve(count);
                });
            });
        };
    }
    return DAO;
}());
exports.default = DAO;
