import { useState } from 'react'
import { useRouter } from 'next/router'
import Pusher from 'pusher-js'
import config from '../config.json'

function Home() {
  const [gameCode, setGameCode] = useState('')
  const router = useRouter()

  /************Pusher Variables*************/
  let channel
  let pusher

  /***********FUNCTIONS**********/
  const redirect = () => {
    router.push({ pathname: '/controller', query: { gameCode: gameCode } })
  }

  async function connect() {
    if (gameCode.length != 5) {
      console.log('Gamecode: ', gameCode)
      alert('Please enter a valid game code.')
      return
    } else {
      console.log('In the connect: ')
      pusher = new Pusher(config.key, {
        cluster: 'us2',
        authEndpoint: 'api/pusher/auth',
      })
      console.log('Trying to subscribe')
      channel = pusher.subscribe('private-pong' + gameCode)
      console.log('Channel ', channel)
      channel.bind('pusher:subscription_succeeded', () => {
        let triggered = channel.trigger('client-controllerconnect', 'Connected')
        channel.bind('client-controllerconnectresponse', (message) => {
          if (message == 'Recieved') {
            redirect()
          } else {
            alert('An error has occurred. Please retry connection.')
          }
        })
      })
    }
  }

  /**************DISPLAY***********/
  return (
    <div className="background-white flex min-h-screen flex-row items-center justify-center bg-blue-500">
      <div className="rounded-md bg-white py-6 px-6">
        <input
          type="text"
          placeholder="Enter game code"
          onChange={(e) => {
            setGameCode(e.currentTarget.value)
          }}
          className="rounded-md border-2 border-gray-500 py-2 text-center font-bold uppercase"
        />
        <button
          className="ml-3 rounded-md bg-blue-500 py-2 px-2 font-bold text-white"
          onClick={() => connect()}
        >
          Connect
        </button>
      </div>
    </div>
  )
}

export default Home
