"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var __1 = require("..");
var offer_template_controller_1 = require("./offer-template.controller");
var router = (0, express_1.Router)();
/**
 * POST method route
 * @example http://localhost:3000/api/offer-template/
 *
 * @swagger
 * /api/offer-template:
 *   post:
 *      description: create offer-template
 *      tags: ["offer-template"]
 *      security:
 *        - ApiKeyAuth: []
 *      requestBody:
 *        description: offer-template creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OfferTemplateSchema'
 *            example:
 *              title: "Demo"
 *              value: "Demo"
 *              surchargeMaterials: 5
 *              surchargeWorks: 12
 *      responses:
 *        201:
 *          description: return created offer-template
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/OfferTemplateSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', offer_template_controller_1.insertOfferTemplate);
/**
 * @example http://localhost:3000/api/offer-template
 *
 * @swagger
 * /api/offer-template:
 *  get:
 *    description: Get Company Settings of logged in user
 *    tags: ["offer-template"]
 *    security:
 *      - ApiKeyAuth: []
 *    responses:
 *      200:
 *        description: returns offer-template list
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/OfferTemplateSchema'
 *
 */
router.get('/', __1.OfferTemplateComponent.findOfferTemplate);
/**
 * PUT method route
 * @example http://localhost:3000/api/offer-template/
 *
 * @swagger
 * /api/offer-template:
 *   put:
 *      description: update offer-template
 *      tags: ["offer-template"]
 *      security:
 *        - ApiKeyAuth: []
 *      requestBody:
 *        description: _id field is required
 *        required: true
 *        content:
 *          application/json:
 *            required:
 *              - id
 *            schema:
 *              $ref: '#/components/schemas/OfferTemplateSchema'
 *            example:
 *              _id: "5fc49b4ef6b3f24784998ec5"
 *              title: "Demo"
 *              value: "Demo"
 *              surchargeMaterials: 5
 *              surchargeWorks: 12
 *      responses:
 *        201:
 *          description: return created offer-template
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/OfferTemplateSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.put('/', __1.OfferTemplateComponent.updateOfferTemplate);
/**
 * @example http://localhost:3000/api/offer-template/5f9bc88416d62e246cd2c504
 *
 * @swagger
 * /api/offer-template/{id}:
 *  delete:
 *    description: delete offer-template by id
 *    tags: ["offer-template"]
 *    security:
 *       - ApiKeyAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      204:
 *        content:
 *
 */
router.delete('/:id', offer_template_controller_1.deleteOfferTemplate);
exports.default = router;
