import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Pusher from 'pusher-js'
import config from '../config.json'
import '../styles/controller.css'

export default function Controller() {
  /**********Router Variables************/
  const router = useRouter()
  const gameCode = router.query.gameCode

  /**********Pusher Variables************/
  let pusher
  let channel

  /**********On Screen Load Functions************/
  useEffect(() => {
    onScreenLoad()
  }, [])
  const onScreenLoad = () => {
    //Creating the pusher to listen in for the redirection signal
    pusher = new Pusher(config.key, {
      cluster: 'us2',
      authEndpoint: 'api/pusher/auth',
    })
    channel = pusher.subscribe('private-pong' + gameCode)
    channel.bind('pusher:subscription_succeeded', () => {
      let triggered = channel.trigger('client-controllerconnect', 'Connected')
    })
  }

  /************Functions*************/
  const triggerEvent = (move) => {
    channel.trigger('client-controllermovement', move)
  }

  /**********Display************/
  return (
    <div id="container" className="flex min-h-screen flex-col items-center justify-center py-2">
      <div>
        <button id="item" onClick={() => triggerEvent('up')}>Send Up</button>
      </div>
      <div>
        <button id="item" onClick={() => triggerEvent('down')}>Send Down</button>
      </div>
    </div>
  )
}
