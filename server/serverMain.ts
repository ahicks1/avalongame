//import ws = require('ws');
import * as WS from "ws";
import * as SC from "../AvalonCore/socketCore"
import * as GS from  "../AvalonCore/gameState"
import * as http from 'http';

console.log("hello world!")


const server = new WS.Server({ port: 8080 });
server.on('connection', handleNewConnection);

console.log("started! banana!");
let msg = new SC.serverMessage(["1","Hello"],{name:"Dude"});
let txt = JSON.stringify(msg);
console.log(JSON.parse(txt).payload);


function handleNewConnection(ws:WS,req:http.IncomingMessage) {
  console.log('New Connection!');

  ws.on('message', function incoming(raw) {
    console.log("message");

  });


}
