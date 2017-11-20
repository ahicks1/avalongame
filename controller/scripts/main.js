var gs;
(function (gs) {
    var role;
    (function (role) {
        role[role["UNSET"] = 0] = "UNSET";
        role[role["MINION"] = 1] = "MINION";
        role[role["LOYAL"] = 2] = "LOYAL";
    })(role = gs.role || (gs.role = {}));
    ;
    var questState;
    (function (questState) {
        questState[questState["WAITING"] = 0] = "WAITING";
        questState[questState["CHOOSING"] = 1] = "CHOOSING";
        questState[questState["VOTING"] = 2] = "VOTING";
        questState[questState["ATTEMPTING"] = 3] = "ATTEMPTING";
        questState[questState["SUCCEEDED"] = 4] = "SUCCEEDED";
        questState[questState["FAILED"] = 5] = "FAILED";
    })(questState = gs.questState || (gs.questState = {}));
    ;
    var playerState;
    (function (playerState) {
        playerState[playerState["IDLE"] = 0] = "IDLE";
        playerState[playerState["VOTING"] = 1] = "VOTING";
        playerState[playerState["ACTING"] = 2] = "ACTING";
        playerState[playerState["CHOOSING"] = 3] = "CHOOSING";
        playerState[playerState["SPECTATING"] = 4] = "SPECTATING";
    })(playerState = gs.playerState || (gs.playerState = {}));
    ;
    var gameState;
    (function (gameState) {
        gameState[gameState["NO_CONTROLLER"] = 0] = "NO_CONTROLLER";
        gameState[gameState["JOINING"] = 1] = "JOINING";
        gameState[gameState["CHOOSING"] = 2] = "CHOOSING";
        gameState[gameState["VOTING"] = 3] = "VOTING";
        gameState[gameState["ATTEMPTING"] = 4] = "ATTEMPTING";
        gameState[gameState["ENDED"] = 5] = "ENDED";
    })(gameState = gs.gameState || (gs.gameState = {}));
    ;
    var Quest = (function () {
        function Quest(players, double) {
            this.state = questState.WAITING;
            this.numPlayers = players;
            this.needsDouble = double;
            this.leader = undefined;
            this.members = []; //NOTE: includes player if they choose themselves
            this.voteCount = 0;
        }
        Quest.prototype.startChoosing = function (leader) { };
        return Quest;
    }());
    gs.Quest = Quest;
    ;
    //touch
    var Controller = (function () {
        function Controller() {
        }
        return Controller;
    }());
    gs.Controller = Controller;
    var Player = (function () {
        function Player(id) {
            this.id = id;
            this.role = role.UNSET;
            this.state = playerState.IDLE;
        }
        return Player;
    }());
    gs.Player = Player;
    var Game = (function () {
        function Game(players, roles) {
            this.state = gameState.NO_CONTROLLER;
            this.maxPlayers = players;
            this.numPlayers = 0;
            this.currentController = null;
            this.currentPlayers = [];
            this.roles = roles;
            this.leader = null;
            this.quests = [];
        }
        return Game;
    }());
    gs.Game = Game;
})(gs || (gs = {}));
System.register("AvalonCore/socketCore", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var msgT;
    return {
        setters: [],
        execute: function () {
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
            })(msgT || (msgT = {}));
            exports_1("msgT", msgT);
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
        }
    };
});
System.register("controller/controllerMain", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function yesConnect() {
        websocket.send("hello");
    }
    var websocket;
    return {
        setters: [],
        execute: function () {
            websocket = new WebSocket("ws://localhost:8080"); //NOTE: change this later to be any IP
            websocket.onopen = yesConnect;
        }
    };
});
