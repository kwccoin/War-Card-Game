import {sc, cl, debug} from "./logging.js"
// notsure include "logging.js"

pageLoaded();

function pageLoaded() {

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

var bellaM1= new Dog("Bella","Mixed"); 

cl(bellaM1);

var dog = {



var bellaM2 = 


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

}