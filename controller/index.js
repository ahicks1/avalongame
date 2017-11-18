
InboundControllerT = {
  START_GAME:6,
  REQ_STATE:7
}

function getStartPacket(){
  var ret = {
    type:InboundControllerT.START_GAME,
    title:"Test Game"
  }
  return JSON.stringify(ret);
}
var websocket = new WebSocket("ws://localhost:8080"); //NOTE: change this later to be any IP
websocket.onopen = yesConnect;
function yesConnect(){
	websocket.send(getStartPacket());
}

websocket.onmessage = handleMessage;

function handleMessage(message) {
  console.log(message);
}
