export enum msgT {
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
  C_JOIN,
  START_GAME,
  STOP_GAME,
  RESET_GAME,

}
