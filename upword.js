// import {o2s, sc, cl, debug} from "./logging.js"

var debug = true


function cl(msg,individual=false){
  if (individual || debug) {
    console.log(msg)
  }
}

cl("sarah: " + (8 + 13 + 17 +8))

cl("dennis: " + (8 + 9 + 12 + 15))

cl("dominic: "+ (10 + 11 + 19+ 22))

