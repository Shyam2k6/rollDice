"use strict";
const rollDice = document.querySelector(".rollDice");
const hold = document.querySelector(".hold");
const newGame = document.querySelector(".newGame");
const currentScore1 = document.querySelector(".currentScore1");
const currentScore2 = document.querySelector(".currentScore2");
const player1 = document.querySelector(".player--1");
const player2 = document.querySelector(".player--2");
let scores = [0, 0];

let currentScore = 0;
let activePlayer = 1;
let playing = true;

//to display dice
const displayDice = function () {
  let diceElements = document.querySelectorAll(
    ".dice1, .dice2, .dice3, .dice4, .dice5, .dice6"
  );

  for (let i = 0; i < diceElements.length; i++) {
    diceElements[i].classList.add("hidden");
  }
};

//to roll the dice
rollDice.addEventListener("click", function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;

    displayDice();
    if (dice !== 1) {
      //add current score
      document.querySelector(`.dice${dice}`).classList.remove("hidden");
      currentScore += dice;
      document.querySelector(`.currentScore${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch the player
      document.querySelector(`.dice${dice}`).classList.remove("hidden");

      player1.classList.toggle("player-active");
      player2.classList.toggle("player-active");

      document.querySelector(`.currentScore${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 1 ? 2 : 1;
    }
  }
});

hold.addEventListener("click", function () {
  if (playing) {
    //add current score to totalscore
    scores[activePlayer - 1] += Number(
      document.querySelector(`.currentScore${activePlayer}`).textContent
    );
    document.querySelector(`.totalScore${activePlayer}`).textContent =
      scores[activePlayer - 1];
    document.querySelector(`.currentScore${activePlayer}`).textContent = 0;
    currentScore = 0;
    //winning condition
    if (scores[activePlayer - 1] >= 100) {
      //finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("playerwin");
      document.querySelector(`.playerhead${activePlayer}`).style.color =
        "#dee2e6";
      document.querySelector(`.totalScore${activePlayer}`).style.color =
        "#bac8ff";
      displayDice();
    } else {
      //switch the player
      activePlayer = activePlayer === 1 ? 2 : 1;
      player1.classList.toggle("player-active");
      player2.classList.toggle("player-active");
    }
  }
});

newGame.addEventListener("click", function () {
  //reset all to start new game
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 1;
  playing = true;
  player1.classList.add("player-active");
  player2.classList.remove("player-active");
  document.querySelector(`.currentScore1`).textContent = 0;
  document.querySelector(`.currentScore2`).textContent = 0;
  document.querySelector(`.totalScore1`).textContent = scores[activePlayer - 1];
  document.querySelector(`.totalScore2`).textContent = scores[activePlayer - 1];
  document.querySelector(`.playerhead1`).style.color = "#343a40";
  document.querySelector(`.playerhead2`).style.color = "#343a40";
    document.querySelector(`.totalScore1`).style.color = "#364fc7";
  document.querySelector(`.totalScore2`).style.color = "#364fc7";

  displayDice();

  document.querySelector(`.player--1`).classList.remove("playerwin");
  document.querySelector(`.player--2`).classList.remove("playerwin");
  document.querySelector(`.totalScore${activePlayer}`).style.color = "#364fc7";
});
