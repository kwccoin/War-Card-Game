// http://127.0.0.1:5500/index.html

import {sc, cl, debug} from "./logging.js"
/*
let debug = false;

function cl(msg,individual=false){
  if (individual || debug) {
    console.log(msg)
  }
}
*/

import Deck from "./deck.js"

const CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

const computerCardSlot = document.querySelector(".computer-card-slot")
const playerCardSlot = document.querySelector(".player-card-slot")
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector(".player-deck")
const text = document.querySelector(".text")

let playerDeck, computerDeck;
let inRound = true; 
let stop = true; 
let newGame = false;
let rounds = 0

const bias = 5, maxRounds = 10

// On mouse-over, execute myFunction # pragma ... not working ???
export function myFunction() {
  document.getElementById("myCheck").click(); // Click on the checkbox
  console.log("################ mouse over button ##################")
}

document.getElementById("myBtn").addEventListener("click", function() {
  document.getElementById("demo").innerHTML = "Click Blue Card!";
  stop = false;
  startGame()})

document.getElementById("playerDeck").addEventListener("click", function() {
// this is whole document click and move
//  document.addEventListener("click", () => {
  cl("event click <---");
  if (stop  ) {
    return
  }

  if (rounds >= 0) {
    document.getElementById("demo").innerHTML = "";
  }

  if (inRound) {
    cleanBeforeRound()
  } else {
    flipCards() // click 2 times needed
  }
})

startGame()
function startGame() {
  cl("startGame() <------------------------");
  const deck = new Deck() // no parameter do and hence it would be fresh
  deck.shuffle()

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))  // 26 here
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards)) // 26 here
  rounds = 0; 
  inRound = false
  stop = false

  cleanBeforeRound()
}

function cleanBeforeRound() {
  cl("cleanBeforeRound() <---");
  inRound = false
  computerCardSlot.innerHTML = ""
  playerCardSlot.innerHTML = ""
  text.innerText = ""

  updateDeckCount()
}

// https://stackoverflow.com/questions/2379197/how-to-mark-logical-sections-of-code-in-java-comments
// #pragma mark -
// #pragma mark Section name here (for Xcode and Objective C)
// region Desc
// endregion 

function flipCards() {
  rounds++; 
  cl("rounds "+ rounds + " flipCards() <---");
  inRound = true

  const playerCard = playerDeck.pop() // #pragma why const ??? and whole things not sure
  const computerCard = computerDeck.pop() // #pragma ??

  playerCardSlot.appendChild(playerCard.getHTML()) // #pragma ??
  computerCardSlot.appendChild(computerCard.getHTML()) // #pragma ??

  updateDeckCount()

  if (isRoundWinner(playerCard, computerCard, bias)) {
    text.innerText = "Win round "+ rounds + "\n with bias:" + bias
    playerDeck.push(playerCard)
    playerDeck.push(computerCard)
  } else if (isRoundWinner(computerCard, playerCard, (- bias))) {
    text.innerText = "Lose round "+ rounds + "\n with bias:" + bias
    computerDeck.push(playerCard)
    computerDeck.push(computerCard)
  } else { // note the draw
    text.innerText = "Draw round "+ rounds + "\n with bias:" + bias // why K draw with 5 + 1
    playerDeck.push(playerCard)
    computerDeck.push(computerCard)
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "You Lose the Game !!"
    stop = true
    rounds = 0
  } else if (isGameOver(computerDeck)) {
    text.innerText = "You Win the Game !!"
    stop = true
    rounds = 0
  } else if (rounds >= maxRounds) {
    text.innerText = "Max rounds "+rounds+"; Game Draw!!"
    stop = true
    rounds = 0
  }
}

function updateDeckCount() {
  cl("updateDeckCount() <---");
  computerDeckElement.innerText = computerDeck.numberOfCards
  playerDeckElement.innerText = playerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo, bias) {
  console.log(cardOne + cardTwo 
              + "isRoundWinner(cardOne, cardTwo) with bias" 
              + bias + " <---");
  return CARD_VALUE_MAP[cardOne.value] + bias
       > CARD_VALUE_MAP[cardTwo.value] 
       // should be up there - 15 // <-- bias value 
}

function isGameOver(deck) {
  cl("isGameOver(deck) <---"); // ,true);
  return deck.numberOfCards === 0 // when one side is 0
}
