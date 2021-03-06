export enum playerRole {
    UNSET,
    MINION,
    LOYAL
  };

  export enum questState {
    WAITING,
    CHOOSING,
    VOTING,
    ATTEMPTING,
    SUCCEEDED,
    FAILED
  };

  export enum playerState {
    IDLE,
    VOTING,
    ACTING,
    CHOOSING,
    SPECTATING
  };

  export enum gameState {
    JOINING,
    CHOOSING,
    VOTING,
    ATTEMPTING,
    ENDED
  };

  export class Quest {
    //static state = questState;
    //Set in constructor
    numPlayers:number;
    voteCount:number;
    needsDouble:boolean;

    //Track state
    state:questState;

    //Track involved players
    leader:Player;
    members:Player[];

    constructor(players:number,double:boolean) {
      this.state = questState.WAITING;
      this.numPlayers = players;
      this.needsDouble = double;
      this.leader = undefined;
      this.members = []; //NOTE: includes player if they choose themselves
      this.voteCount = 0;
    }

    startChoosing(leader:Player) {}



  };
  //touch
  export class Controller {

  }

  export class Player {
    id:string;
    role:playerRole;
    state:playerState;

    constructor(id:string) {
      this.id = id;
      this.role = playerRole.UNSET;
      this.state = playerState.IDLE;
    }
  }

  export class Game {
    //Set in constructor
    maxPlayers:number;
    roles:playerRole[];
    quests:Quest[];

    //Track state
    state:gameState;
    leader:Player;

    //Track player information
    numPlayers:number;
    currentController:Controller;
    currentPlayers:Player[];


    constructor(players:number,roles:playerRole[]) {
      this.state = gameState.JOINING;
      this.maxPlayers = players;
      this.numPlayers = 0;
      this.currentController = null;
      this.currentPlayers = [];
      this.roles = roles;
      this.leader = null;
      this.quests = [];
    }
  }
