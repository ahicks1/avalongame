import * as SC from "../AvalonCore/socketCore"
var websocket = new WebSocket("ws://localhost:8080"); //NOTE: change this later to be any IP
websocket.onopen = handleConnection;
function handleConnection(){
	websocket.send(getStartPacket("Hello"));
}

function getStartPacket(name:string): string{
	let controllerInfo:any = {
		type:SC.connectionType.CONTROLLER,
		room:"test",
		name:name

	}
  let ret = new SC.serverMessage([],controllerInfo);
  return JSON.stringify(ret);

}
