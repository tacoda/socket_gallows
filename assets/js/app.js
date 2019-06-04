// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

// import HangmanApp from "../hangman_app.js"

// import HangmanSocket from "../hangman_socket.js"

// let hangman = new HangmanSocket()
// hangman.connect_to_hangman()


import {Socket} from "phoenix"

class Hangman {

  constructor() {
    this.socket = new Socket("/socket", {params: {token: window.userToken}})
    this.socket.connect()
  }

  connect_to_hangman() {
    this.setup_channel()
    this.channel.on("tally", tally => {
      console.log(tally)
    })
  }

  setup_channel() {
    this.channel = this.socket.channel("hangman:game", {})
    this.channel
        .join()
        .receive("ok", resp => {
          console.log("connected: " + resp)
          this.fetch_tally()
        })
        .receive("error", resp => {
          alert(resp)
          throw(resp)
        })
  }

  fetch_tally() {
    this.channel.push("tally", {})
  }
}

let app = new Hangman()
app.connect_to_hangman()
