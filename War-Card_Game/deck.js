// this is a library or module like for script.js
// #prgma is it must nodes and liveserver or can it be done under browser??

const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]

// yt has not export default just class initially

// use * as xxx or use another name if you want to qualify it or shorten it respectively
// see https://javascript.info/import-export

import {sc, cl, debug} from "./logging.js"  

/* 
let debug = false;

function sc(cards,msg,individual=false){
  if (individual || debug) {
    (console.log(msg+":"+cards.length+" <===---"));
    (console.log(cards));
  }
}
function sct(cards,msg){
    (console.log(msg+":"+cards.length+" <===---"));
    (console.log(cards));
}

function cl(msg,individual=false){
  if (individual || debug) {
    console.log(msg)
  }
}

function clt(msg){
    console.log(msg)
} */

export default class Deck {
  constructor(cards = freshDeck()) {
    cl(Date.now()+ " <===---")
    cl((new Date()).toUTCString() + " <===---");
    cl("constructor(cards = freshDeck()) <===---");
  
    this.cards = cards;
    sc(this.cards,"default class why only 26 not 52?? - ");
  }

  get numberOfCards() { // note the use get or getter !!!!
    cl("numberOfCards() "+this.cards.length+" <===---");
  
    return this.cards.length
  }

  pop() {
    sc(this.cards,"pop before"); // ,true);
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
    // argue in video https://www.youtube.com/watch?v=NxRwIZWjLtE&t=330s
    // this.cards.sort((a, b) => Math.radnom() - 0.5) is no good
    sc(this.cards,"shuffle before");
    for (let i = this.numberOfCards - 1; i > 0; i--) { // card index 0 ... 51 ???
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
    cl("constructor(suit, value) <===---");
    
    this.suit = suit
    this.value = value
  }

  get color() {
    cl("color() <===---");
    
    return this.suit === "♣" || this.suit === "♠" ? "black" : "red"
  }

  getHTML() {
    cl("getHTML() <===---");
    const cardDiv = document.createElement("div")
    cardDiv.innerText = this.suit
    cardDiv.classList.add("card", this.color)
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
  }
}

function freshDeck() {
  cl("freshDeck() <===---"); // not calling this why?
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
