System.register("AvalonCore/AvlonProtocol", [], function (exports_1, context_1) {
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
                msgT[msgT["C_JOIN"] = 11] = "C_JOIN";
                msgT[msgT["START_GAME"] = 12] = "START_GAME";
                msgT[msgT["STOP_GAME"] = 13] = "STOP_GAME";
                msgT[msgT["RESET_GAME"] = 14] = "RESET_GAME";
            })(msgT || (msgT = {}));
            exports_1("msgT", msgT);
        }
    };
});
System.register("AvalonCore/gameState", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var playerRole, questState, playerState, gameState, Quest, Controller, Player, Game;
    return {
        setters: [],
        execute: function () {
            (function (playerRole) {
                playerRole[playerRole["UNSET"] = 0] = "UNSET";
                playerRole[playerRole["MINION"] = 1] = "MINION";
                playerRole[playerRole["LOYAL"] = 2] = "LOYAL";
            })(playerRole || (playerRole = {}));
            exports_2("playerRole", playerRole);
            ;
            (function (questState) {
                questState[questState["WAITING"] = 0] = "WAITING";
                questState[questState["CHOOSING"] = 1] = "CHOOSING";
                questState[questState["VOTING"] = 2] = "VOTING";
                questState[questState["ATTEMPTING"] = 3] = "ATTEMPTING";
                questState[questState["SUCCEEDED"] = 4] = "SUCCEEDED";
                questState[questState["FAILED"] = 5] = "FAILED";
            })(questState || (questState = {}));
            exports_2("questState", questState);
            ;
            (function (playerState) {
                playerState[playerState["IDLE"] = 0] = "IDLE";
                playerState[playerState["VOTING"] = 1] = "VOTING";
                playerState[playerState["ACTING"] = 2] = "ACTING";
                playerState[playerState["CHOOSING"] = 3] = "CHOOSING";
                playerState[playerState["SPECTATING"] = 4] = "SPECTATING";
            })(playerState || (playerState = {}));
            exports_2("playerState", playerState);
            ;
            (function (gameState) {
                gameState[gameState["JOINING"] = 0] = "JOINING";
                gameState[gameState["CHOOSING"] = 1] = "CHOOSING";
                gameState[gameState["VOTING"] = 2] = "VOTING";
                gameState[gameState["ATTEMPTING"] = 3] = "ATTEMPTING";
                gameState[gameState["ENDED"] = 4] = "ENDED";
            })(gameState || (gameState = {}));
            exports_2("gameState", gameState);
            ;
            Quest = (function () {
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
            exports_2("Quest", Quest);
            ;
            //touch
            Controller = (function () {
                function Controller() {
                }
                return Controller;
            }());
            exports_2("Controller", Controller);
            Player = (function () {
                function Player(id) {
                    this.id = id;
                    this.role = playerRole.UNSET;
                    this.state = playerState.IDLE;
                }
                return Player;
            }());
            exports_2("Player", Player);
            Game = (function () {
                function Game(players, roles) {
                    this.state = gameState.JOINING;
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
            exports_2("Game", Game);
        }
    };
});
System.register("AvalonCore/socketCore", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function getClientInitPacket(name, room) {
        var clientInfo = {
            type: connectionType.CLIENT,
            room: room,
            name: name
        };
        var ret = new serverMessage([], clientInfo);
        return JSON.stringify(ret);
    }
    exports_3("getClientInitPacket", getClientInitPacket);
    function getControllerInitPacket(name, room) {
        var controllerInfo = {
            type: connectionType.CONTROLLER,
            room: room,
            name: name
        };
        var ret = new serverMessage([], controllerInfo);
        return JSON.stringify(ret);
    }
    exports_3("getControllerInitPacket", getControllerInitPacket);
    var connectionType, serverMessage;
    return {
        setters: [],
        execute: function () {
            (function (connectionType) {
                connectionType[connectionType["CONTROLLER"] = 0] = "CONTROLLER";
                connectionType[connectionType["CLIENT"] = 1] = "CLIENT";
            })(connectionType || (connectionType = {}));
            exports_3("connectionType", connectionType);
            serverMessage = (function () {
                function serverMessage(ts, data) {
                    this.targets = ts;
                    this.payload = JSON.stringify(data);
                }
                return serverMessage;
            }());
            exports_3("serverMessage", serverMessage);
            /*export function getServerMessage(targets:string[],data:Object): serverMessage {
              let msg = new serverMessage();
              return msg;
            }*/
        }
    };
});
System.register("protocolController/controllerProtocol", ["AvalonCore/socketCore"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function joinClicked(event) {
        console.log("join pressed");
        websocket = new WebSocket("ws://localhost:8080"); //NOTE: change this later to be any IP
        websocket.onopen = yesConnect;
    }
    function yesConnect() {
        username = document.getElementById('username_field').value;
        room = document.getElementById('room_field').value;
        websocket.send(SC.getControllerInitPacket(username, room));
    }
    var SC, websocket, room, username;
    return {
        setters: [
            function (SC_1) {
                SC = SC_1;
            }
        ],
        execute: function () {
            document.getElementById('join_button').onclick = joinClicked;
        }
    };
});
