const generateRandomNum = (min, max) => {};

const app = Vue.createApp({
  data() {
    return {
      playerLife: 100,
      monsterLife: 100,
      currentRound: 0,
      logMessages: [],
    };
  },
  methods: {
    playerAttack() {},
    playerHeal() {},
    playerSpecialAttack() {},
    playerSurrender() {},
    monsterAttack() {},
    createLogMessage() {},
    restartGame() {},
  },
  computed: {
    playerLifeBarStyle() {
      return {};
    },
    monsterLifeBarStyle() {
      return {};
    },
  },
  watchers: {
    playerLife() {},
    monsterLife() {},
  },
});
