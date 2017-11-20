var websocket = new WebSocket("ws://localhost:8080"); //NOTE: change this later to be any IP
websocket.onopen = yesConnect;
function yesConnect(){
	websocket.send("hello");
}
