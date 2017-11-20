export enum msgT{
  //To User:
  JOIN_AWK,
  P_STATE,
  REQ_VOTE,
  REQ_QUEST,

  //From User:
  P_JOIN,
  REQ_STATE,
  ACT_VOTE,
  ACT_QUEST,
  CHOOSE_PLAYERS,

  //To Controller:
  UPDATE_QUEST,
  UPDATE_PLAYERS,



  //From Controller:


}

/*export namespace msgType {

  enum InboundUserT {
    JOIN = 0,
    REQ_STATE,
    ACT_VOTE,
    ACT_QUEST,
    CHOOSE_PLAYERS,
  }

  enum InboundControllerT {
    START_GAME = 100,
    REQ_STATE
  }

  enum OutboundUserT {
    PLAYER_JOIN
  }
}*/


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
