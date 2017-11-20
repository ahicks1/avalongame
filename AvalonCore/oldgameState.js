roles = {
  UNSET:1,
  MINION:2,
  LOYAL:3
};

questStates = {
  WAITING:1,
  CHOOSING:2,
  VOTING:3,
  ATTEMPTING:4,
  SUCCEEDED:5,
  FAILED:6,

}
playerStates = {
  IDLE:1,
  VOTING:2,
  ACTING:3,
  CHOOSING:4,
  SPECTATING:5,
};

gameStates = {
  NO_CONTROLLER:7,
  JOINING:1,
  REVEALING:2,
  CHOOSING:3,
  VOTING:4,
  ATTEMPTING:5,
  ENDED:6
}



function quest(players,doubleReq) {
  this.state = questStates.WAITING;
  this.numPlayers = players;
  this.double = doubleReq;
  this.leader = undefined;
  this.members = []; //NOTE: includes player if they choose themselves
  this.voteCount = 0;

}

function setupQuests(num) {
  var ret = [];
  if (num == 5) {
    ret = [new quest(2, false), new quest(3, false), new quest(2,false), new quest(3,false), new quest(3,false)];
  }
  return ret;
}

exports.newPlayer = (id) =>{
  return new player(id);
}
function player(id) {
  this.id = id;
  this.role = roles.UNSET;
  this.state = playerStates.IDLE;
};

exports.newGame = (numPlayers,roles) => {
  return new game(numPlayers,roles);
}
function game(numPlayers,roles) {
  this.state = gameStates.NO_CONTROLLER;
  this.maxPlayers = numPlayers;
  this.numPlayers = 0;
  this.currentController = undefined;
  this.currentPlayers = [];
  this.roles = roles;
  this.leader = undefined;
  this.quests = setupQuests(numPlayers);

};
