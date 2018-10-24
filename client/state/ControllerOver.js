import { serverInfo } from './sockets/serverInfo'

class ControllerOver extends Phaser.State {
  constructor () {
    super()
    // construct stuff here, if needed
  }

  preload () {
    // load stuff here, if needed
  }

  create () {    
    let gm = this.game
    let socket = serverInfo.socket
    let div = document.getElementById("main-controller")
    let canvas = document.getElementById("canvas-container")

    let p1 = document.createElement("p")
    p1.innerHTML = "Are you happy with your score? If not, TOO BAD.";
    div.appendChild(p1)

    // only the VIP can start a new round or completely stop the game
    if(serverInfo.vip) {
      let p2 = document.createElement("p")
      p2.innerHTML = "You can either start the next round (same room, same players, you keep your score), or end the game.";
      div.appendChild(p2)

      let btn1 = document.createElement("button")
      btn1.innerHTML = "Start next round!"

      btn1.addEventListener('click', function(event) {
        // tell the server that we want to start a new round (we don't need to go to the menu or waiting, just go straight to suggestions)
        socket.emit('timer-complete', { nextState: 'Suggestions', certain: true })
      })
      div.appendChild(btn1)

      let btn2 = document.createElement("button")
      btn2.innerHTML = "Destroy the game!"

      btn2.addEventListener('click', function(event) {
        // tell the server that we want to destroy the game
        // this disconnects everyone and destroys the room on the server
        socket.emit('destroy-game', { room: serverInfo.roomCode })
      })
      div.appendChild(btn2)
    }


    console.log("Controller Over state");
  }

  update () {
    // update loopieloopie
  }
}

export default ControllerOver
