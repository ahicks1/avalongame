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

export enum connectionType {
  CONTROLLER,
  CLIENT,

}

export class serverMessage {
  targets:string[];
  payload:string;
  constructor(ts:string[],data:Object){
    this.targets = ts;
    this.payload = JSON.stringify(data);

  }

}

/*export function getServerMessage(targets:string[],data:Object): serverMessage {
  let msg = new serverMessage();
  return msg;
}*/
