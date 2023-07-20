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
const express = require("express");
const http = require("http");
const jwtConfig = require("../config/middleware/jwtAuth");
const swaggerUi = require("swagger-ui-express");
const auth_route_1 = require("../components/auth/auth.route");
const user_route_1 = require("../components/user/user.route");
const user_route_2 = require("../components/user copy/user.route");
const material_route_1 = require("../components/materials/material.route");
const project_route_1 = require("../components/project/project.route");
const customer_route_1 = require("../components/customer/customer.route");
const employee_route_1 = require("../components/employee/employee.route");
const task_route_1 = require("../components/task/task.route");
const master_material_route_1 = require("../components/master-material/master-material.route");
const fag_route_1 = require("../components/fag/fag.route");
const offer_template_route_1 = require("../components/offer-template/offer-template.route");
const company_settings_route_1 = require("../components/company-settings/company-settings.route");
const report_route_1 = require("../components/report/report.route");
const material_groups_route_1 = require("../components/material-groups/material-groups.route");
const fs = require("fs");
const archiver = require("archiver");
let swaggerDoc;
try {
    swaggerDoc = require("../../swagger.json");
}
catch (error) {
    console.log("***************************************************");
    console.log("  Seems like you doesn`t have swagger.json file");
    console.log("  Please, run: ");
    console.log("  $ swagger-jsdoc -d swaggerDef.js -o swagger.json");
    console.log("***************************************************");
}
/**
 * @export
 * @param {express.Application} app
 */
function init(app) {
    const router = express.Router();
    /**
     * @description
     *  Forwards any requests to the /v1/users URI to our UserRouter
     *  Also, check if user authenticated
     * @constructs
     */
    app.use("/v1/users", jwtConfig.isAuthenticated, user_route_2.default);
    app.use("/api/users", user_route_1.default);
    /**
     * @description Forwards any requests to the /auth URI to our AuthRouter
     * @constructs
     */
    app.use("/auth", auth_route_1.default);
    app.use("/api/material", material_route_1.default);
    app.use("/api/project", project_route_1.default);
    app.use("/api/customer", customer_route_1.default);
    app.use("/api/employee", employee_route_1.default);
    app.use("/api/task", task_route_1.default);
    app.use("/api/master-materials", master_material_route_1.default);
    app.use("/api/fag", fag_route_1.default);
    app.use("/api/offer-template", offer_template_route_1.default);
    app.use("/api/company-settings", jwtConfig.isAuthenticated, company_settings_route_1.default);
    app.use("/api/report", report_route_1.default);
    app.use("/api/material-groups", material_groups_route_1.default);
    app.get("/error-logs", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const archive = archiver("zip");
            var output = fs.createWriteStream("logs.zip");
            archive.pipe(output);
            archive.directory("logs", false);
            archive.finalize();
            res.set({
                "Content-Type": "application/zip",
                "Content-Disposition": "attachment",
            });
            output.on("finish", () => {
                res.download("logs.zip");
            });
        }
        catch (error) {
            res.send(error);
        }
    }));
    /**
     * @description
     *  If swagger.json file exists in root folder, shows swagger api description
     *  else send commands, how to get swagger.json file
     * @constructs
     */
    if (swaggerDoc) {
        app.use("/docs", swaggerUi.serve);
        app.get("/docs", swaggerUi.setup(swaggerDoc));
    }
    else {
        app.get("/docs", (req, res) => {
            res.send("<p>Seems like you doesn't have <code>swagger.json</code> file.</p>" +
                "<p>For generate doc file use: <code>swagger-jsdoc -d swaggerDef.js -o swagger.json</code> in terminal</p>" +
                "<p>Then, restart your application</p>");
        });
    }
    /**
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req, res, next) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });
    /**
     * @constructs all routes
     */
    app.use(router);
}
exports.init = init;
