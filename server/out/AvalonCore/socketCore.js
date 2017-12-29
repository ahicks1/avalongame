"use strict";
exports.__esModule = true;
var msgT;
(function (msgT) {
    //To User:
    msgT[msgT["JOIN_AWK"] = 0] = "JOIN_AWK";
    msgT[msgT["P_STATE"] = 1] = "P_STATE";
    msgT[msgT["REQ_VOTE"] = 2] = "REQ_VOTE";
    msgT[msgT["REQ_QUEST"] = 3] = "REQ_QUEST";
    //From User:
    msgT[msgT["P_JOIN"] = 4] = "P_JOIN";
    msgT[msgT["REQ_STATE"] = 5] = "REQ_STATE";
    msgT[msgT["ACT_VOTE"] = 6] = "ACT_VOTE";
    msgT[msgT["ACT_QUEST"] = 7] = "ACT_QUEST";
    msgT[msgT["CHOOSE_PLAYERS"] = 8] = "CHOOSE_PLAYERS";
    //To Controller:
    msgT[msgT["UPDATE_QUEST"] = 9] = "UPDATE_QUEST";
    msgT[msgT["UPDATE_PLAYERS"] = 10] = "UPDATE_PLAYERS";
    //From Controller:
    msgT[msgT["C_JOIN"] = 11] = "C_JOIN";
    msgT[msgT["START_GAME"] = 12] = "START_GAME";
    msgT[msgT["STOP_GAME"] = 13] = "STOP_GAME";
    msgT[msgT["RESET_GAME"] = 14] = "RESET_GAME";
})(msgT = exports.msgT || (exports.msgT = {}));
var serverMessage = (function () {
    function serverMessage(ts, data) {
        this.targets = ts;
        this.payload = JSON.stringify(data);
    }
    return serverMessage;
}());
exports.serverMessage = serverMessage;
/*export function getServerMessage(targets:string[],data:Object): serverMessage {
  let msg = new serverMessage();
  return msg;
}*/
