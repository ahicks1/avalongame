"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import ws = require('ws');
var WS = require("ws");
var SC = require("../AvalonCore/socketCore");
console.log("hello world");
var server = new WS.Server({ port: 8080 });
server.on('connection', handleNewConnection);
console.log("started! banana!");
var msg = new SC.serverMessage(["1", "Hello"], { name: "Dude" });
console.log(JSON.stringify(msg));
function handleNewConnection(ws, req) {
    console.log('New Connection!');
    ws.on('message', function incoming(raw) {
        console.log("message");
    });
}
