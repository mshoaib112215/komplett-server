"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const __1 = require("..");
const router = express_1.Router();
router.get('/', __1.reportComponent.fetchReportData);
exports.default = router;
