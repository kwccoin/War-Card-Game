import {o2s, sc, cl, debug} from "./logging.js"
// notsure include "logging.js"

// pageLoaded();

// function pageLoaded() {

// if not worjing error behind just nothing happen !

// use cl() help to deal with error tyoe if undefine

// chp 2

console.log("oo chapter 2 ... ")

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol

cl("Mozilla Symbols")

let obj = {}

obj[Symbol('a')] = 'a'
obj[Symbol.for('b')] = 'b'
obj['c'] = 'c'
obj.d = 'd'

for (let i in obj) {
   console.log(i)  // logs "c" and "d"
}

cl("javascript core"); 
cl("http://dmitrysoshnikov.com/ecmascript/javascript-the-core-2nd-edition/")
cl()


cl("arrow functions this is lexical !!! in general this is dynamic")

var xb = 10;
 
let foob = {
  xb: 20,
 
  // Dynamic `this`.
  bar() {
    return this.xb;
  },
 
  // Lexical `this`.
  // err wc and mac safari and chrome // baz: () => this.xb,
 
  qux() {
    // Lexical this within the invocation.
    let arrow = () => this.xb;
 
    return arrow();
  },
};
 
console.log(
  foob.bar(), // 20, from `foo`
  // foob.baz(), // 10, from global
  foob.qux(), // 20, from `foo` and arrow
);

cl("complicated dynamic context of this")


function fooa() {
  return this;
}
 
let bara = {
  fooa,
 
  baz() {
    return this;
  },
};
 
// `foo`
console.log(
  // 
  fooa(),       // global or undefined
 
  bara.fooa(),   // bar
  (bara.fooa)(), // bar
 
  (bara.fooa = bara.fooa)(), // global
);
 
// `bar.baz`
console.log(bara.baz()); // bar
 
let savedBaz = bara.baz;
console.log(savedBaz()); // global

cl("dynamic")

class Point {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }
 
  getX() {
    return this._x;
  }
 
  getY() {
    return this._y;
  }
}
 
let p1 = new Point(1, 2);
let p2 = new Point(3, 4);
 
// Can access `getX`, and `getY` from
// both instances (they are passed as `this`).
 
console.log(
  p1.getX(), // 1
  p2.getX(), // 3
);

cl("generic methods, ??? lisp like???")

// Generic Movable interface (mixin).

let Movable = {
 
  /**
   * This function is generic, and works with any
   * object, which provides `_x`, and `_y` properties,
   * regardless of the class of this object.
   */
  move(x, y) {
    this._x = x;
    this._y = y;
  },
};
 
let p3 = new Point(11, 12);

console.log(
  p3.getX(), // 1
  p3.getY(), // 3
);
 
// Make `p1` movable.
Object.assign(p3, Movable);
 
// Can access `move` method.
p3.move(100, 200);

console.log(
  p3.getX(), // 1
  p3.getY(), // 3
);

cl("Enqueue a new promise on the PromiseJobs queue.")

// Enqueue a new promise on the PromiseJobs queue.
// last result
new Promise(resolve => setTimeout(() => resolve(3310), 0))
  .then(value => console.log(value));
 
// This log is executed earlier, since it's still a
// running context, and job cannot start executing first
console.log(2020); // no 10 in wc 
 
// Output: 20, 10

cl("external upt possibly if use ext capture")

  let count = 0; // external upt possibly if use ext capture

function createCounter() {

   let count = 190;
  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
  };
}
 
let counter = createCounter();
 
console.log(
  counter.increment(), // 1
  counter.decrement(), // 0
  counter.increment(), // 1
);

count = 10;

console.log(
  counter.increment(), // 1
  counter.decrement(), // 0
  counter.increment(), // 1
);

cl("funArg has a downward and an upward assignment design issues to be fixed (static and dynamic)")

function foo33() {
  let fx = 10;
   
  // Closure, capturing environment of `foo`.
  function bar37() {
    cl(fx)
    return fx ;
  }
 
  // Upward funarg.
  // return 20; 
  return bar37;
}
 
let fx = 20;
 
// Call to `foo` returns `bar` closure.
let bar50 = foo33(); // wc see null here 

foo33()

cl(foo33)
cl(foo33())
cl(bar50)
 
// bar31(); // 10, not 20!

cl("xx3")

let xx3 = 10; // if var ckash wc just sikence
 
function foo() {
  console.log(xx3);
}
 
function bar(funArg) {
  let xx3 = 20;
  funArg(); // 10, not 20!
}
 
// Pass `foo` as an argument to `bar`.
bar(foo);

// Legacy variables using `var`.
var x2= 10;
 
// Modern variables using `let`.
let y2 = 20;
 
// Both are added to the environment record:
console.log(
  x2, // 10
  y2, // 20
);
 
// But only `x` is added to the "binding object".
// The binding object of the global environment
// is the global object, and equals to `this`:
 
console.log(
  // this.x2, // 10 undefibed in working copy
  // this.y, // undefined!
);
 
// Binding object can store a name which is not
// added to the environment record, since it's
// not a valid identifier:
 
// error // this['not valid ID'] = 30;
 
console.log(
  // this['not valid ID'], // 30
);


let x61 = 10;
let y62 = 20;
 
function fooNN(z) {
  let x61 = 100;
  return x61 + 
  // ?? strange // y62 + 
  z;
}

// y62=10000
cl(fooNN(30)); // not 150 ??? depend on y
// y=20000
cl(fooNN(40)); // see above not sure as run 2 times result diff

cl("recursive")

function recursive(flag) {

  cl(flag);
 
  // Exit condition.
  if (flag === 2) {
    return;
  }
 
  // Call recursively.
  recursive(++flag);
}
 
// Go.
recursive(0);

cl("generative function")

function *gen() {
  yield 1;
  return 2;
}
 
let g = gen();
 
console.log(
  g.next().value, // 1
  g.next().value, // 2
  
    g.next().value, // undefined
      g.next().value, // undefined
        g.next().value, // undefined
  
);

cl("Javascript Object Method book")
cl("object sum way from coping prop")

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

cl("move to the more general disucssion here")
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

/*

a2 is not a function and has no cobstructor ?
error here 

let aa2 = new a2; 
 
console.log(
  a2.getNumber(), // 1
  aa2.getNumber(), // 2
);

*/

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