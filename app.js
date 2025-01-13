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
      specialBuffer: 0,
      logMessages: [],
      winner: null,
    };
  },
  methods: {
    playerAttack() {
      this.specialBuffer -= 1;
      const attackValue = generateRandomNum(10, 5);
      this.monsterLife -= attackValue;
      this.createLogMessage(P, "attack", attackValue);
      this.monsterAttack();
    },
    playerHeal() {
      const healingValue = generateRandomNum(25, 15);
      this.playerLife += healingValue;
      this.createLogMessage(P, "heal", healingValue);
      this.monsterAttack();
    },
    playerSpecialAttack() {
      const attackValue = generateRandomNum(22, 12);
      this.monsterLife -= attackValue;
      this.createLogMessage(P, "attack", attackValue);
      this.monsterAttack();
      this.specialBuffer = 3;
    },
    playerSurrender() {
      this.winner = M;
    },
    monsterAttack() {
      const attackValue = generateRandomNum(18, 10);
      this.playerLife -= attackValue;
      this.createLogMessage(M, "attack", attackValue);
    },
    createLogMessage(who, what, value) {
      const message = {
        who,
        what,
        value,
      };
      this.logMessages.unshift(message);
    },
    restartGame() {
      this.playerLife = 100;
      this.monsterLife = 100;
      this.specialBuffer = 0;
      this.logMessages = [];
      this.winner = null;
    },
  },
  computed: {
    playerLifeBarStyle() {
      if (this.playerLife > 100) {
        this.playerLife = 100;
      } else if (this.playerLife < 0) {
        this.playerLife = 0;
      }
      return { width: this.playerLife + "%" };
    },
    monsterLifeBarStyle() {
      if (this.monsterLife > 100) {
        this.monsterLife = 100;
      } else if (this.monsterLife < 0) {
        this.monsterLife = 0;
      }
      return { width: this.monsterLife + "%" };
    },
  },
  watch: {
    playerLife(value) {
      if (value <= 0 && this.monsterLife <= 0) {
        this.winner = D;
      } else if (value <= 0) {
        this.winner = M;
      }
    },
    monsterLife(value) {
      if (this.playerLife <= 0 && value <= 0) {
        this.winner = D;
      } else if (value <= 0) {
        this.winner = P;
      }
    },
  },
});

app.mount("#game");
