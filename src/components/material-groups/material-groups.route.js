"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var __1 = require("../");
var router = (0, express_1.Router)();
router.get("/", __1.MaterialGroupsComponent.findAll);
router.post("/", __1.MaterialGroupsComponent.create);
router.put("/", __1.MaterialGroupsComponent.update);
router.delete("/:id", __1.MaterialGroupsComponent.deleteGroup);
// Subgroup
// router.get("/subgroup/", MaterialGroupsComponent.findAllSubgroup);
router.post("/subgroup/", __1.MaterialGroupsComponent.addSubgroup);
router.put("/subgroup/", __1.MaterialGroupsComponent.updateSubgroup);
router.delete("/subgroup/:id", __1.MaterialGroupsComponent.deleteSubgroup);
exports.default = router;
