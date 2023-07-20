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
exports.init = void 0;
var express = require("express");
var http = require("http");
var jwtConfig = require("../config/middleware/jwtAuth");
var swaggerUi = require("swagger-ui-express");
var auth_route_1 = require("../components/auth/auth.route");
var user_route_1 = require("../components/user/user.route");
var user_route_2 = require("../components/user copy/user.route");
var material_route_1 = require("../components/materials/material.route");
var project_route_1 = require("../components/project/project.route");
var customer_route_1 = require("../components/customer/customer.route");
var employee_route_1 = require("../components/employee/employee.route");
var task_route_1 = require("../components/task/task.route");
var master_material_route_1 = require("../components/master-material/master-material.route");
var fag_route_1 = require("../components/fag/fag.route");
var offer_template_route_1 = require("../components/offer-template/offer-template.route");
var company_settings_route_1 = require("../components/company-settings/company-settings.route");
var report_route_1 = require("../components/report/report.route");
var material_groups_route_1 = require("../components/material-groups/material-groups.route");
var fs = require("fs");
var archiver = require("archiver");
var swaggerDoc;
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
    var _this = this;
    var router = express.Router();
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
    app.get("/error-logs", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var archive, output;
        return __generator(this, function (_a) {
            try {
                archive = archiver("zip");
                output = fs.createWriteStream("logs.zip");
                archive.pipe(output);
                archive.directory("logs", false);
                archive.finalize();
                res.set({
                    "Content-Type": "application/zip",
                    "Content-Disposition": "attachment",
                });
                output.on("finish", function () {
                    res.download("logs.zip");
                });
            }
            catch (error) {
                res.send(error);
            }
            return [2 /*return*/];
        });
    }); });
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
        app.get("/docs", function (req, res) {
            res.send("<p>Seems like you doesn't have <code>swagger.json</code> file.</p>" +
                "<p>For generate doc file use: <code>swagger-jsdoc -d swaggerDef.js -o swagger.json</code> in terminal</p>" +
                "<p>Then, restart your application</p>");
        });
    }
    /**
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use(function (req, res, next) {
        res.status(404).send(http.STATUS_CODES[404]);
    });
    /**
     * @constructs all routes
     */
    app.use(router);
}
exports.init = init;
