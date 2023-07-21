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
const _ = require("lodash");
const mongoose_1 = require("mongoose");
class DAO {
    constructor() {
        /**
         * Get All data
         * @deprecated NEVER EVER load all entries from DB!
         * @return {object}
         */
        this.fnGetAll = () => {
            return new Promise((resolve, reject) => {
                this.model.find()
                    .exec((err, docs) => {
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
        this.fnGetByConfigration = (config) => {
            let aggregation = [];
            const order = config.order && config.order == "desc" ? -1 : 1;
            const limit = config.limit || 10;
            const page = config.page || 1;
            const sort = config.sort || 'createdAt';
            const lookup = config.lookupAggregate;
            const skipNumber = (page - 1) * limit;
            // if any condition then match it first
            if (config.matchField && config.matchValue) {
                // const regEx= new RegExp(`${config.matchValue}` , 'i');
                const matchAggregate = { $match: { [config.matchField]: config.matchValue } };
                aggregation.push(matchAggregate);
            }
            const skipAggregate = { $skip: skipNumber };
            const sortAggregate = { $sort: { [sort]: order } };
            const limitAggregate = { $limit: limit };
            const facet = {
                '$facet': {
                    metadata: [{ $count: "total" }, { $addFields: { page: page } }],
                    data: [skipAggregate, limitAggregate]
                }
            };
            if (lookup) {
                aggregation.push(...lookup);
            }
            aggregation.push(sortAggregate, facet);
            // order 
            // 1. match
            // 2. lookup 
            // 2. sort 
            // 3. facet
            // console.log(aggregation)
            return new Promise((resolve, reject) => {
                this.model.aggregate(aggregation).then(result => {
                    resolve(result[0]);
                }, error => {
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
        this.fnGet = (id, fields) => {
            const _fields = fields || '';
            return new Promise((resolve, reject) => {
                this.model.findById({ _id: id }, _fields)
                    .exec((err, obj) => {
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
        this.insert = (body) => {
            return new Promise((resolve, reject) => {
                const obj = new this.model(body);
                obj.save((err, item) => {
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
        this.update = (id, fields) => __awaiter(this, void 0, void 0, function* () {
            try {
                const oid = mongoose_1.Types.ObjectId(id);
                // console.log('this.model', this.model)
                const doc = yield this.model.findOne({ _id: oid });
                // console.log(doc , 'it st the doc ')
                if (!doc) {
                    throw new Error('doc not found with this id');
                }
                const updated = _.merge(doc, fields);
                return updated.save();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        /**
         * Remove one record from db
         *
         * @param {string} id.
         * @return {number} number
         */
        this.deleteRecord = (id) => {
            return new Promise((resolve, reject) => {
                this.model.findOne({ _id: id }, (err, doc) => {
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
        this.fnCount = () => {
            return new Promise((resolve, reject) => {
                this.model.countDocuments((err, count) => {
                    if (err) {
                        console.error('DAO:fnCount() => count()', err);
                        reject(err);
                    }
                    resolve(count);
                });
            });
        };
    }
}
exports.default = DAO;
