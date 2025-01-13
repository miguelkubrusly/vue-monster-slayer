const generateRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const M = "monster";
const P = "player";
const D = "draw";

const app = Vue.createApp({
  data() {
    return {
      playerLife: 100,
      monsterLife: 100,
      currentRound: 0,
      logMessages: [],
      winner: null,
    };
  },
  methods: {
    playerAttack() {
      const attackValue = generateRandomNum(12, 5);
      this.monsterLife -= attackValue;
      this.monsterAttack();
      this.createLogMessage(P.toUpperCase(), "attack", attackValue);
    },
    playerHeal() {
      const healingValue = generateRandomNum(15, 3);
      this.playerLife += healingValue;
      this.createLogMessage(P.toUpperCase(), "heal", healingValue);
    },
    playerSpecialAttack() {
      const specialAttackValue = generateRandomNum(22, 12);
      this.monsterLife -= specialAttackValue;
      this.monsterAttack();
      this.createLogMessage(
        P.toUpperCase(),
        "special attack",
        specialAttackValue
      );
    },
    playerSurrender() {
      this.winner = M;
    },
    monsterAttack() {
      const attackValue = generateRandomNum(18, 10);
      this.playerLife -= attackValue;
      this.monsterLife -= attackValue;
      this.createLogMessage(M.toUpperCase(), "attack", attackValue);
    },
    createLogMessage(who, what, value) {
      const message = {
        who,
        what,
        value,
      };
    },
    restartGame() {
      this.playerLife = 100;
      this.monsterLife = 100;
      this.currentRound = 0;
      this.logMessages = [];
      this.winner = null;
    },
  },
  computed: {
    playerLifeBarStyle() {
      return { width: this.playerLife + "%" };
    },
    monsterLifeBarStyle() {
      return { width: this.monsterLife + "%" };
    },
  },
  watchers: {
    playerLife() {
      if (this.playerLife > 100) {
        this.playerLife = 100;
      } else if (this.playerLife < 0) {
        this.playerLife = 0;
      }
      if (this.playerLife === 0 && this.monsterLife === 0) {
        this.winner = D;
      } else if (this.playerLife === 0) {
        this.winner = M;
      }
    },
    monsterLife() {
      if (this.monsterLife > 100) {
        this.monsterLife = 100;
      } else if (this.monsterLife < 0) {
        this.monsterLife = 0;
      }
      if (this.monsterLife === 0) {
        this.winner = P;
      }
    },
  },
});

app.mount("#game");
