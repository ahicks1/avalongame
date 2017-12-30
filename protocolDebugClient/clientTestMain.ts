import * as SC from "../AvalonCore/socketCore"


var websocket = new WebSocket("ws://localhost:8080"); //NOTE: change this later to be any IP
websocket.onopen = yesConnect;
function yesConnect(): void{
	websocket.send(getStartPacket("Banana"));
}


function getStartPacket(name:string): string{
	let clientInfo:any = {
		type:SC.connectionType.CLIENT,
		room:"test",
		name:name

	}
  let ret = new SC.serverMessage([],clientInfo);
  return JSON.stringify(ret);

}
