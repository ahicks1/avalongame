const WebSocket = require('ws');
const gs = require('./gameState')


// Inbound User Message Types:
//Start
//Join
//ActVote
//ReqState
//ActQuest
//ChoosePlayers NOTE: flag if done


// Outbound User Message Types:
//JoinAck
//PlayerState
//AskVote
//AskQuest
//AskChoosePlayers

// Inbound Center Message Types:
//ActNumPlayers
//ActRoles
//ReqState
//

function handleMessageFor(message,player) {

}
function handleNewConnection(ws,req) {

  console.log('headers: %s',req.headers['sec-websocket-key']);
  ws.on('message', function incoming(message) {
    handleMessageFor(message,ws);
    console.log('received: %s', message);
  });

  ws.send('something');
}

const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', handleNewConnection);

console.log("started!, %d",roles.UNSET);
