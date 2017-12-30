"use strict";
exports.__esModule = true;
//import ws = require('ws');
var WS = require("ws");
var SC = require("../AvalonCore/socketCore");
console.log("hello world!");
var gamelst = {}; //An association list between name and serverGame
var server = new WS.Server({ port: 8080 });
server.on('connection', handleNewConnection);
console.log("started! banana!");
var msg = new SC.serverMessage(["1", "Hello"], { name: "Dude" });
var txt = JSON.stringify(msg);
console.log(JSON.parse(txt).payload);
function handleNewConnection(ws, req) {
    console.log('New Connection, waiting for init message');
    var meta = addMetaWS(ws, new avalonMeta);
    ws.on('message', function incoming(raw) {
        var msg = JSON.parse(raw.toString());
        //console.log(meta.room);
        //Handle init message
        if (meta.room == undefined && msg.targets.length == 0) {
            console.log("Init message:" + msg.payload);
            var init = JSON.parse(msg.payload);
            //Check if controller or client
            if (init.type == SC.connectionType.CONTROLLER) {
                if (init.room != undefined && init.name != undefined) {
                    meta.room = init.room;
                    meta.publicName = init.name;
                    gamelst[init.room] = new serverGame(init.room, meta);
                    console.log("created new game with name: " + init.room);
                }
            }
            else if (init.type == SC.connectionType.CLIENT) {
                //check to see if game exists
                if (gamelst[init.room] != undefined) {
                    meta.room = init.room;
                    meta.publicName = init.name;
                    gamelst[init.room].clients[init.name] = meta;
                    console.log("client " + init.name + " joined " + init.room);
                }
                else {
                    console.log("room doesn't exist");
                }
            }
            //Handle standard serverMessage
        }
        else if (meta.room != undefined && msg.targets.length == 0) {
        }
    });
    ws.on('close', function closed(code, reason) {
        if (meta.room != undefined && gamelst[meta.room] != undefined) {
            if (gamelst[meta.room].controller.publicName == meta.publicName) {
                //Connection closed was the controller; delete all clients
                console.log("controller connection closed, deleting game");
                for (var c in gamelst[meta.room].clients) {
                    console.log(c);
                    gamelst[meta.room].clients[c].close(1000, "controller disconnected");
                    delete gamelst[meta.room].clients[c]; // = undefined;
                }
                //All clients are deleted; delete room
                delete gamelst[meta.room]; // = undefined;
            }
            else {
                console.log("client connection closed");
                delete gamelst[meta.room].clients[meta.publicName]; //= undefined;
            }
        }
    });
}
function addMetaWS(ws, meta) {
    ws.room = meta.room;
    ws.publicName = meta.publicName;
    return ws;
}
var avalonMeta = (function () {
    function avalonMeta() {
    }
    return avalonMeta;
}());
var serverGame = (function () {
    function serverGame(name, controller) {
        this.name = name;
        this.controller = controller;
        this.clients = {};
    }
    return serverGame;
}());
