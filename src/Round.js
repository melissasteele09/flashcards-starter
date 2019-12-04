const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck;
    this.turn = 0;
    this.incorrectGuesses = [];
  }

  returnCurrentCard() {
    return this.deck.cards[this.turn];
  }

  takeTurn(guess) {
    let currentCard = this.returnCurrentCard();
    let turn = new Turn(guess, currentCard);
    let evalGuess = turn.evaluateGuess(guess, currentCard);
    this.turn ++;

    if(evalGuess === true) {
      return turn.giveFeedback();
    } else {
      this.incorrectGuesses.push(currentCard.id);
    }
  }

  calculatePercentCorrect() {
    let incorrect = this.incorrectGuesses.length;
    let percentageCorrect = Math.round(incorrect / this.turn * 100);
    return percentageCorrect;
  }

  endRound() {
    let incorrect = this.incorrectGuesses.length;
    let percentageCorrect = Math.round(incorrect / this.turn * 100);
    return `** Round over! ** You answered ${percentageCorrect}% of the questions correctly!`;
  }

}



module.exports = Round;
