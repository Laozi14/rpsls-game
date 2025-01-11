export default class Game {
    constructor() {
      this.choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    }
  
    getRandomChoice() {
      return this.choices[Math.floor(Math.random() * this.choices.length)];
    }
  
    determineWinner(playerChoice, systemChoice) {
      const winConditions = {
        rock: ['scissors', 'lizard'],
        paper: ['rock', 'spock'],
        scissors: ['paper', 'lizard'],
        lizard: ['spock', 'paper'],
        spock: ['scissors', 'rock'],
      };
  
      if (playerChoice === systemChoice) return 'tie';
      if (winConditions[playerChoice].includes(systemChoice)) return 'player';
      return 'system';
    }
  }
  