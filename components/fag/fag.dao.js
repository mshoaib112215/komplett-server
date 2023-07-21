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
const dao_1 = require("../dao");
const fag_model_1 = require("./fag.model");
class FagDAO extends dao_1.default {
    constructor() {
        super(...arguments);
        this.model = fag_model_1.default;
        this.getAllFags = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const aggregate = [];
                const sortAggregate = {
                    $sort: {
                        id: 1
                    }
                };
                aggregate.push(sortAggregate);
                const docs = yield this.model.aggregate(aggregate);
                console.log(docs);
                return docs;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = new FagDAO();
