// this is a library or module like for script.js
// #prgma is it must nodes and liveserver or can it be done under browser??

const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]

// yt has not export default just class initially

function sc(cards,msg){
  (console.log(msg+":"+cards.length+" <===---"));
  (console.log(cards));
}

export default class Deck {
  constructor(cards = freshDeck()) {
    console.log(Date.now()+ " <===---")
    console.log((new Date()).toUTCString() + " <===---");
    console.log("constructor(cards = freshDeck()) <===---");
  
    this.cards = cards;
    sc(this.cards,"default class why only 26 not 52?? - ");
  }

  get numberOfCards() {
    console.log("numberOfCards() "+this.cards.length+" <===---");
  
    return this.cards.length
  }

  pop() {
    sc(this.cards,"pop before");
    let card = this.cards.shift();
    sc(card,"card pop");
    sc(this.cards,"pop after");
    return card
  }

  push(card) {
    sc(card,"card push before");
    sc(this.cards,"push before");
    this.cards.push(card)
    sc(this.cards,"push after");
  }

  shuffle() {
    sc(this.cards,"shuffle before");
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1))
      const oldValue = this.cards[newIndex]
      this.cards[newIndex] = this.cards[i]
      this.cards[i] = oldValue
    }
    sc(this.cards,"shuffle after");
  }
}

class Card {
  constructor(suit, value) {
    console.log("constructor(suit, value) <===---");
    
    this.suit = suit
    this.value = value
  }

  get color() {
    console.log("color() <===---");
    
    return this.suit === "♣" || this.suit === "♠" ? "black" : "red"
  }

  getHTML() {
    console.log("getHTML() <===---");
    const cardDiv = document.createElement("div")
    cardDiv.innerText = this.suit
    cardDiv.classList.add("card", this.color)
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
  }
}

function freshDeck() {
  console.log("freshDeck() <===---"); // not calling this why?
  let flatSuit = SUITS.flatMap(suit => {   // function call 3 final and compress
    return VALUES.map(value => {   // function call 2
      return new Card(suit, value) // function call 1; oo card
    })
  })
  sc(flatSuit,"flatSuit");
    
  return flatSuit;
} // [[1, 2] , [3, 4]] -> [1, 2, 3, 4]
  // without flatMap on the outer, 
  // the function will return 4 suits of 13 cards 
  // or 4 array of 13 card array
