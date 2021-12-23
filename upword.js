// import {o2s, sc, cl, debug} from "./logging.js"

var debug = true


// export
function cl(msg,individual=false){
  if (individual || debug) {
    console.log(msg)
  }
}

cl("sarah:   " + (8 + 13 + 19))
cl("dennis:  " + (8 + 9))
cl("dominic: " + (10 + 10))