// import {o2s, sc, cl, debug} from "./logging.js"

var debug = true


function cl(msg,individual=false){
  if (individual || debug) {
    console.log(msg)
  }
}

cl("sarah: " + (8 + 13 + 17 +8 +8 +14+17+5+4+10+9+4+3+7))

cl("dennis: " + (8 + 9 + 12 + 15 +21+6+20+4+7+20+10+5+6+4+8+4))

cl("dominic: "+ (10 + 11 + 19+ 22 + 16+8+11+21+12+8+23+26+6))

// [ 1 2 3].reduce(+)

