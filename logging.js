export let debug = false;

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