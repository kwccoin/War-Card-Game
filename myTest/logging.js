// to use
// import {sc, cl, debug} from "./logging.js"

// export let debug = false ; 
export let debug = true; 

export function sc(cards,msg,individual=false){
  if (individual || debug) {
    (console.log(msg+":"+cards.length+" <===---"));
    (console.log(cards));
  }
}
/* function sct(cards,msg){
    (console.log(msg+":"+cards.length+" <===---"));
    (console.log(cards));
}*/

export function cl(msg,individual=false){
  if (individual || debug) {
    console.log(msg)
  }
}

/* function clt(msg){
    console.log(msg)
} */

export function o2s (obj) {
    var ret = [];
    for (var pname in obj) {
        var prop = obj[pname];
        if (typeof prop !== 'function') {
            ret.push(pname + ': ' + prop);
        }
}
    return 'o2s object no function is {' + ret.join(', ') + '}';
}