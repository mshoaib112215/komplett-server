"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var __1 = require("..");
var router = (0, express_1.Router)();
router.get('/', __1.reportComponent.fetchReportData);
exports.default = router;
