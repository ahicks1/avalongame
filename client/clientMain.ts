import {msgT} from "../AvalonCore/socketCore"

var websocket = new WebSocket("ws://localhost:8080"); //NOTE: change this later to be any IP
websocket.onopen = yesConnect;
function yesConnect(): void{
	websocket.send(getStartPacket("UnderLord"));
}


function getStartPacket(name:string){
  var ret = {
    type:msgT.P_JOIN,
    name:name
  }
  return JSON.stringify(ret);
}
