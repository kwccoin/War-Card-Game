// http://127.0.0.1:5500/index.html




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

let playerDeck, computerDeck, inRound, stop
const bias = 10

document.addEventListener("click", () => {
  console.log("event click <---");
  if (stop) {
    startGame() // only start when new web page and got 52
                // normal save or exist page refresh not here got 26?? 
    return
  }

  if (inRound) {
    cleanBeforeRound()
  } else {
    flipCards() // click 2 times needed
  }
})

startGame()
function startGame() {
  console.log("startGame() <------------------------");
  const deck = new Deck() // no parameter do and hence it would be fresh
  deck.shuffle()

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))  // 26 here
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
  inRound = false
  stop = false

  cleanBeforeRound()
}

function cleanBeforeRound() {
  console.log("cleanBeforeRound() <---");
  inRound = false
  computerCardSlot.innerHTML = ""
  playerCardSlot.innerHTML = ""
  text.innerText = ""

  updateDeckCount()
}

function flipCards() {
  console.log("flipCards() <---");
  inRound = true

  const playerCard = playerDeck.pop()
  const computerCard = computerDeck.pop()

  playerCardSlot.appendChild(playerCard.getHTML())
  computerCardSlot.appendChild(computerCard.getHTML())

  updateDeckCount()

  if (isRoundWinner(playerCard, computerCard, bias)) {
    text.innerText = "Win with bias:" + bias
    playerDeck.push(playerCard)
    playerDeck.push(computerCard)
  } else if (isRoundWinner(computerCard, playerCard, (- bias))) {
    text.innerText = "Lose with bias:" + bias
    computerDeck.push(playerCard)
    computerDeck.push(computerCard)
  } else { // note the draw
    text.innerText = "Draw with bias:" + bias // why K draw with 5 + 1
    playerDeck.push(playerCard)
    computerDeck.push(computerCard)
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "You Lose!!"
    stop = true
  } else if (isGameOver(computerDeck)) {
    text.innerText = "You Win!!"
    stop = true
  }
}

function updateDeckCount() {
  console.log("updateDeckCount() <---");
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
  console.log("isGameOver(deck) <---");
  return deck.numberOfCards === 0 // when one side is 0
}
