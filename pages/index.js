import { useState } from 'react'
import { useRouter } from 'next/router'
import Pusher from 'pusher-js'
import config from '../config.json'

/**
 * Description: The main page for the controller project.
 * @author Travis Wisecup
 * @author Jean Paulsen
 * @author AJ Whiting
 * Note: Use with Remote Game Control Game project
 * @function Home
 */

function Home() {
  const [gameCode, setGameCode] = useState('')
  const router = useRouter()

  /************Pusher Variables*************/

  let channel // the pusher channel
  let pusher // the pusher instance

  /***********FUNCTIONS**********/

  /**
   * Description: This function redirects the current page to the controller page
   * @function redirect
   */
  const redirect = () => {
    router.push({ pathname: '/controller', query: { gameCode: gameCode } })
  }

  /**
   * Description: This async function connects to the pusher instance as well
   * as the correct game channel
   * @function connect
   */
  async function connect() {
    //Here we check to see if the game code is of valid length. It has to be 5 characters
    if (gameCode.length != 5) {
      alert('Please enter a valid game code.')
      return
    } else {
      //We first try to grab the pusher instance if it is already in memory.
      //This way we do not get extra connections.
      pusher = Pusher.instances[0]

      //If the pusher instance doesn't exist we make one.
      if (pusher == undefined) {
        pusher = new Pusher(config.key, {
          cluster: 'us2',
          authEndpoint: 'api/pusher/auth',
        })
      }

      //Now we connect to the channel and set up the function bindings.
      channel = pusher.subscribe('presence-pong' + gameCode)
      channel.bind('pusher:subscription_succeeded', () => {
        let triggered = channel.trigger('client-controllerconnect', 'Connected')
        channel.bind('client-controllerconnectresponse', (message) => {
          if (message == 'Recieved') {
            redirect()
            channel.unbind('client-controllerconnectresponse')
          } else if (message == 'Full') {
            alert(
              'This game is full. Please try again when the current player is finished.'
            )
          } else {
            alert('An error has occurred. Please retry connection.')
          }
        })
      })
    }
  }

  /**************DISPLAY***********/
  /**
   * The return function for what to render on the screen
   */
  return (
    <div className="z-0 flex min-h-screen flex-col items-center justify-center bg-red-700 py-2">
      <div className="rounded-md bg-white py-6 px-6">
        <input
          type="text"
          placeholder="Enter game code"
          onChange={(e) => {
            setGameCode(e.currentTarget.value.toUpperCase())
          }}
          className="rounded-md border-2 border-gray-500 py-2 text-center font-bold uppercase"
        />
        <button
          className="ml-3 rounded-md bg-red-700 py-2 px-2 font-bold text-white"
          onClick={() => connect()}
        >
          Connect
        </button>
      </div>
    </div>
  )
}

export default Home
