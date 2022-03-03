import '../styles/globals.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Pusher from 'pusher-js'
import config from '../config.json'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    router.push('/pong')
  }

  const pusher = new Pusher(config.key, {
    cluster: 'us2',
    authEndpoint: 'api/pusher/auth',
  })

  const channel = pusher.subscribe('private-pong')
  const triggerEvent = (move) => {
    console.log('sending event')
    channel.trigger('client-controllermovement', move, 'pong-game')
  }
  return (
    <div className="App">
      <div>
        <button onClick={() => triggerEvent('up')}>Send Up</button>
      </div>
      <div>
        <button onClick={() => triggerEvent('down')}>Send Down</button>
      </div>
    </div>
  )
}

export default MyApp
