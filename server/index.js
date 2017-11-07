const WebSocket = require('ws');
const gs = require('./gameState')


InboundUserT = {
  JOIN:1,
  REQ_STATE:2,
  ACT_VOTE:3,
  ACT_QUEST:4,
  CHOOSE_PLAYERS:5,
}
/* Inbound User Message Types:
//Start
//Join
  {
    type:InboundUserT.JOIN,
    name:string"
  }
//ActVote
  {
    type:InboundUserT.ACT_VOTE,
    approve:boolean
  }
//ReqState
  {
    type:InboundUserT.REQ_STATE,
  }
//ActQuest
  {
    type:ACT_QUEST,
    succeed:boolean
  }
//ChoosePlayers NOTE: flag if done
  {
    type:CHOOSE_PLAYERS,
    players:[playerIDs]
    isFinal:boolean
  }
*/

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
