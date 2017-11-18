const WebSocket = require('ws');
const gs = require('./gameState')


InboundUserT = {
  JOIN:1,
  REQ_STATE:2,
  ACT_VOTE:3,
  ACT_QUEST:4,
  CHOOSE_PLAYERS:5,
}

InboundControllerT = {
  START_GAME:6,
  REQ_STATE:7
}

OutboundUserT = {
  PLAYER_JOIN:100
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
//StartGame
//ActNumPlayers
//ActRoles
//ReqState
//

// Outbound Controller Message Types
//PlayerJoined

function handleControllerMessage(message,controller) {
  console.log("Handling controller message "+JSON.stringify(message));
}

function handleControllerNC(message,controller) {

}

function handleControllerJoining(message,controller) {

}

function handleControllerRevealing(message,controller) {

}

function handleControllerVoting(message,controller) {

}

function handleControllerAttempting(message,controller) {

}

function handleControllerEnded(message,controller) {

}

var gameStates = {
  NO_CONTROLLER:7,
  JOINING:1,
  REVEALING:2,
  CHOOSING:3,
  VOTING:4,
  ATTEMPTING:5,
  ENDED:6
}

function handleClientMessage(message,player) {

}

function handleClientNC(message,player) {

}

function handleClientJoining(message,player) {

}

function handleClientRevealing(message,player) {

}

function handleClientVoting(message,player) {

}

function handleClientAttempting(message,player) {

}

function handleClientEnded(message,player) {

}

var currentGame;


function handleNewConnection(ws,req) {

  console.log('headers: %s',req.headers['sec-websocket-key']);
  ws.on('message', function incoming(raw) {
    try {
      var message = JSON.parse(raw);
      switch (ws.type) {
        case "client":
          handleClientMessage(message,ws);
          break;
        case "controller":
          handleControllerMessage(message,ws);
          break;
        default:
          switch(message.type) {
            case InboundControllerT.START_GAME:
              console.log("Game Started")
              currentGame = gs.newGame(5,[]);
              currentGame.state = gameStates.JOINING;
              currentGame.currentController = ws;
              ws.type = "controller";
            break;

            case InboundUserT.JOIN:
              ws.type = "client";
              var player = gs.newPlayer(message.name)
              currentGame.players += player;
              currentGame.currentController.send(notifyOfNewPlayer(currentGame.players));
            break;
          }

      }
    }
    catch(err) {
      console.log(err.message);
    }
    //handleMessageFor(message,ws);
    console.log('received: %s', raw);
  });

}

function notifyOfNewPlayer(ps) {
  var ret = {
    type:OutboundUserT.PLAYER_JOIN,
    players:ps
  }
  return JSON.stringify(ret);
}

const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', handleNewConnection);

console.log("started!");
