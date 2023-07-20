"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var serverHandlers = require("./serverHandlers");
var server_1 = require("./server");
var Server = http.createServer(server_1.default);
/**
 * Binds and listens for connections on the specified host
 */
Server.listen(process.env.PORT || 3000);
/**
 * Server Events
 */
Server.on('error', function (error) { return serverHandlers.onError(error, server_1.default.get('port')); });
Server.on('listening', serverHandlers.onListening.bind(Server));
// import * as express from "express"
// const app = express();
// app.listen(3000, ()=>{
//     console.log("Listening on port http://localhost:3000")
// })
