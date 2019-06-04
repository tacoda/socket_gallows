// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket,
// and connect at the socket path in "lib/web/endpoint.ex".
//
// Pass the token on params as below. Or remove it
// from the params if you are not using authentication.
// import {Socket} from "phoenix"
// import hangman from "./hangman_app"

// let socket = new Socket("/socket", {params: {token: window.userToken}})

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "lib/web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "lib/web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/3" function
// in "lib/web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket, _connect_info) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//

// class Hangman {
//
//   constructor() {
//     this.socket = new Socket("/socket", {params: {token: window.userToken}})
//     this.socket.connect()
//   }
//
//   connect_to_hangman() {
//     this.setup_channel()
//     this.channel.on("tally", tally => {
//       console.log(tally)
//     })
//   }
//
//   setup_channel() {
//     this.channel = this.socket.channel("hangman:game", {})
//     this.channel
//         .join()
//         .receive("ok", resp => {
//           console.log("connected: " + resp)
//           this.fetch_tally()
//         })
//         .receive("error", resp => {
//           alert(resp)
//           throw(resp)
//         })
//   }
//
//   fetch_tally() {
//     this.channel.push("tally", {})
//   }
// }
//
// let app = new Hangman()
// app.connect_to_hangman()

// // TODO: Turn into ES6
// let hangman = function (spec) {
//     let that = {}
//
//     that.constructor = function () {
//       spec.socket.connect()
//     }
//
//     that.get_channel = function () {
//         return spec.channel
//     }
//
//     that.fetch_tally = function () {
//         that.get_channel().push("tally", {})
//     }
//
//     return that
// }

// // Finally, connect to the socket:
// socket.connect()
//
// // Now that you are connected, you can join channels with a topic:
// let channel = socket.channel("hangman:game", {})
// channel.join()
//   .receive("ok", resp => {
//     console.log("Joined successfully", resp)
//
//     // Domain logic
//     // hangman = new Hangman()
//     // hangman.fetch_tally(channel)
//     var app = hangman({channel: channel})
//     console.log(app)
//     app.fetch_tally()
//   })
//   .receive("error", resp => { console.log("Unable to join", resp) })
//
// export default socket
