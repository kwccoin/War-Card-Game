import {o2s, sc, cl, debug} from "./logging.js"
// notsure include "logging.js"

// pageLoaded();

// function pageLoaded() {

// if not worjing error behind just nothing happen !

// use cl() help to deal with error tyoe if undefine

// chp 2

console.log("oo chapter 2")

var sum = function (old_object, new_object) {
    var ret = {};
    for (var prop in old_object) {
            ret[prop] = old_object[prop]; }
    for (prop in new_object) {
            ret[prop] = new_object[prop]; }
    return ret;
} // end: sum()

function Dog(name, breed) {
	this.name = name;
	if (breed) {
		this.breed = breed;
	}
}

var bellaM1 = new Dog("BellaM1","Mixed"); 

cl("__proto__<-----")
cl(Dog.__proto__) // undefined 
cl(Dog.__proto__.constructor)// undefined
cl(bellaM1.__proto__) // empty object {}
cl(bellaM1.__proto__.constructor) // undefined
cl(bellaM1.__proto__.name) // undefined
cl(Object.getPrototypeOf(Dog) )// still undefined
cl(Object.getPrototypeOf(bellaM1) )// still undefined


cl("http://dmitrysoshnikov.com/ecmascript/javascript-the-core-2nd-edition/")

// Generic prototype for all letters.
let letter = {
  getNumber() {
    return this.number;
  }
};
 
let a = {number:  1, __proto__: letter};
let b = {number: 2, __proto__: letter};
// ...
let z = {number: 26, __proto__: letter};
 
console.log(
  a.getNumber(), // 1
  b.getNumber(), // 2
  z.getNumber(), // 26
);

function Letter2(number) {
  this.number = number;
}
 
Letter2.prototype.getNumber = function() {
  return this.number;
};
 
let a2 = new Letter2(21);
let b2 = new Letter2(22);
// ...
let z2 = new Letter2(226);
 
console.log(
  a2.getNumber(), // 1
  b2.getNumber(), // 2
  z2.getNumber(), // 26
);



class Letter3 {
  constructor(number) {
    this.number = number;
  }
 
  getNumber() {
    return this.number;
  }
}
 
let a3 = new Letter3(31);
let b3 = new Letter3(32);
// ...
let z3 = new Letter3(326);
 
console.log(
  a3.getNumber(), // 1
  b3.getNumber(), // 2
  z3.getNumber(), // 26
);


cl("Dog details ")
Dog.diet = "x"
cl(bellaM1.diet) // undefined 
Dog.prototype.diet = "y" // this cl 
cl(bellaM1.diet) // this cl 

cl(o2s(bellaM1));

var lassie = {
    name: 'Lassie',
    breed: 'Collie',
    speak: function () {
        return 'Woof! Woof!'; }
	};



var bellaM2 = Object.create(lassie)
cl("just obj created")
cl(bellaM2) // {}
cl(bellaM2.name) // strange 

cl("assign a name and why change color ..")
bellaM2.name = "bellaM2"
cl(bellaM2) // {}
cl(bellaM2.name) // strange 

cl(lassie)
cl(o2s(bellaM2))

cl("obj created by forcevia sum created")

var bellaM3 = sum (lassie, bellaM2)

cl(bellaM3) 
cl(bellaM3.name)
cl(lassie)

cl("change lassie breed")
lassie.breed = "new C"

cl(o2s(lassie))
cl(o2s(bellaM3))
cl(bellaM3.breed)

console.log("oo chapter 2 ended")

// chpt1 

/*

my_object = {    
    // name: 'bella',
    size: 'large',    
    color: 'blue',
    toString: function() { return 'inner size:' + this.size + ', color:' + this.color; } ,
    speak: function () {return "inner I am " + this.name}//,    
    // toString: function() { return 'size:' + this.size + ', color:' + this.color; } 
};

my_object.name = "bella";

console.log("universal, one, system, public-private-join-common-share")
            
console.log("martin rinehart js oo")
console.log("Graeme Stuart intro js dev ground up")
console.log(my_object);
console.log(" "+my_object); // use chrome engine
console.log(my_object.speak); // 1st ignore 2nd undefined
console.log(my_object.speak()); // no self but this
console.log("1------------------");

function MyObj  (name, size, color, speak) {
  var newMyObj = this;
  newMyObj.name = name;
  this.size = size;
  this.size2  = this.size *2 ; 
  this.color = color;
  this.speak = speak;
  // ok // this.toString = function() { return 'some info 2 is size:' + this.size + ', color:' + this.color; } 
} // method in func yes 

my_object2 = new MyObj('bella', 2, 'brown', function () {return "fun in I am 2 " + this.size2 + this.name}) // this not self; seem it can refer to 

MyObj.prototype.speak = function () {return " ext I am " + this.name}; // still no self ?? note .speak higher percedence to prototype.speak

MyObj.prototype.toString = function() { return 'ext some info is size:' + this.size2 + ', color:' + this.color; } 

console.log(my_object2);
console.log(" "+my_object2); // use chrome engine
//console.log(my_object2.speak); // 1st ignore 2nd undefined
console.log(my_object2.speak()); // no self but this

console.log("2-----------------");

MyObj.x = "xx";
console.log(my_object2.x);

MyObj.prototype.x = "xx";
console.log(my_object2.x);

console.log("3-----------------");

*/

// }