"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const serverHandlers = require("./serverHandlers");
const server_1 = require("./server");
const Server = http.createServer(server_1.default);
/**
 * Binds and listens for connections on the specified host
 */
Server.listen(process.env.PORT || 3000);
/**
 * Server Events
 */
Server.on('error', (error) => serverHandlers.onError(error, server_1.default.get('port')));
Server.on('listening', serverHandlers.onListening.bind(Server));
// import * as express from "express"
// const app = express();
// app.listen(3000, ()=>{
//     console.log("Listening on port http://localhost:3000")
// })
