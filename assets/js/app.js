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

class HangmanServer {

  constructor(tally) {
    this.tally = tally
    this.socket = new Socket("/socket", {params: {token: window.userToken}})
    this.socket.connect()
  }

  connect_to_hangman() {
    this.setup_channel()
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

  setup_channel() {
    this.channel = this.socket.channel("hangman:game", {})
    this.channel.on("tally", tally => {
      this.copy_tally(tally)
    })
  }

  fetch_tally() {
    this.channel.push("tally", {})
  }

  make_move(guess) {
    this.channel.push("make_move", guess)
  }

  new_game() {
    this.channel.push("new_game", {})
  }

  copy_tally(from) {
    for (let k in from) {
      this.tally[k] = from[k]
    }
  }
}

const RESPONSES = {
  won:          [ "success", "You Won!" ],
  lost:         [ "danger", "You Lost!" ],
  good_guess:   [ "success", "Good guess!" ],
  bad_guess:    [ "warning", "Bad guess!" ],
  already_used: [ "info", "You already guessed that" ],
  initializing: [ "info", "Let's Play!"]
}

let Vue = require("vue/dist/vue.min.js")

let view = function(hangman) {
  let app = new Vue({
    el: "#app",
    data: {
      tally: hangman.tally
    },
    computed: {
      game_over: function() {
        let state = this.tally.game_state
        return (state == "won") || (state == "lost")
      },
      game_state_message: function() {
        let state = this.tally.game_state
        return RESPONSES[state][1]
      },
      game_state_class: function() {
        let state = this.tally.game_state
        return RESPONSES[state][0]
      }
    },
    methods: {
      guess: function(ch) {
        hangman.make_move(ch)
      },
      new_game: function() {
        hangman.new_game()
      },
      already_guessed: function(ch) {
        return this.tally.used.indexOf(ch) >= 0
      },
      correct_guess: function(ch) {
        return this.already_guessed(ch) &&
                (this.tally.letters.indexOf(ch) >= 0)
      },
      turns_gt: function(left) {
        return this.tally.turns_left > left
      }
    }
  })
  return app
}

// window.onload = function() {}
let tally = {
  turns_left: 7,
  letters:    ["a", "_", "c"],
  game_state: "initializing",
  used:       []
}

let hangman = new HangmanServer(tally)
let app = view(hangman)
hangman.connect_to_hangman()
