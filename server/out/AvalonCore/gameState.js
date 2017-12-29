"use strict";
exports.__esModule = true;
var playerRole;
(function (playerRole) {
    playerRole[playerRole["UNSET"] = 0] = "UNSET";
    playerRole[playerRole["MINION"] = 1] = "MINION";
    playerRole[playerRole["LOYAL"] = 2] = "LOYAL";
})(playerRole = exports.playerRole || (exports.playerRole = {}));
;
var questState;
(function (questState) {
    questState[questState["WAITING"] = 0] = "WAITING";
    questState[questState["CHOOSING"] = 1] = "CHOOSING";
    questState[questState["VOTING"] = 2] = "VOTING";
    questState[questState["ATTEMPTING"] = 3] = "ATTEMPTING";
    questState[questState["SUCCEEDED"] = 4] = "SUCCEEDED";
    questState[questState["FAILED"] = 5] = "FAILED";
})(questState = exports.questState || (exports.questState = {}));
;
var playerState;
(function (playerState) {
    playerState[playerState["IDLE"] = 0] = "IDLE";
    playerState[playerState["VOTING"] = 1] = "VOTING";
    playerState[playerState["ACTING"] = 2] = "ACTING";
    playerState[playerState["CHOOSING"] = 3] = "CHOOSING";
    playerState[playerState["SPECTATING"] = 4] = "SPECTATING";
})(playerState = exports.playerState || (exports.playerState = {}));
;
var gameState;
(function (gameState) {
    gameState[gameState["JOINING"] = 0] = "JOINING";
    gameState[gameState["CHOOSING"] = 1] = "CHOOSING";
    gameState[gameState["VOTING"] = 2] = "VOTING";
    gameState[gameState["ATTEMPTING"] = 3] = "ATTEMPTING";
    gameState[gameState["ENDED"] = 4] = "ENDED";
})(gameState = exports.gameState || (exports.gameState = {}));
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
exports.Quest = Quest;
;
//touch
var Controller = (function () {
    function Controller() {
    }
    return Controller;
}());
exports.Controller = Controller;
var Player = (function () {
    function Player(id) {
        this.id = id;
        this.role = playerRole.UNSET;
        this.state = playerState.IDLE;
    }
    return Player;
}());
exports.Player = Player;
var Game = (function () {
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
exports.Game = Game;
