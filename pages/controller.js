import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Pusher from 'pusher-js'
import config from '../config.json'

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
    <div className="container" >
      <div className="spacing">
        <button onClick={() => triggerEvent('up')}><SVGArrow direction="up" />Send Up</button>
      </div>
      <div className="spacing"> 
        <button onClick={() => triggerEvent('down')}><SVGArrow direction="down" />Send Down</button>
      </div>
    </div>
  )
}

function SVGArrow(props) {
  if(props.direction == "up")
  {
    return <svg className='item' width="100%" height="100%" version="1.1" viewBox="0 0 33.798 34.279" xmlns="http://www.w3.org/2000/svg">
     <g transform="translate(-84.137 -120.7)">
      <path d="m117.55 138.12a16.51 16.51 0 0 1-16.51 16.51 16.51 16.51 0 0 1-16.51-16.51 16.51 16.51 0 0 1 16.51-16.51 16.51 16.51 0 0 1 16.51 16.51z" fill-rule="evenodd" stroke="#000" stroke-width=".04827"/>
      <g fill="#97b4d4" stroke="#fff" stroke-width=".6">
       <path d="m97.664 126h6.1819v6.1819h-6.1819z"/>
       <path d="m97.664 132.19h6.1819v6.1819h-6.1819z"/>
       <path d="m97.664 138.37h6.1819v6.1819h-6.1819z"/>
       <path d="m103.85 144.64h4.8271c-2.4306 2.2633-5.1108 4.2306-7.7233 6.2752-2.7674-1.8939-5.2078-4.0741-7.7233-6.2752h4.3444z"/>
      </g>
     </g>
    </svg>;
  }
  if(props.direction == "down")
  {
    return <svg className='item2' width="100%" height="100%" version="1.1" viewBox="0 0 33.798 34.279" xmlns="http://www.w3.org/2000/svg">
     <g transform="translate(-84.137 -120.7)">
      <path d="m117.55 138.12a16.51 16.51 0 0 1-16.51 16.51 16.51 16.51 0 0 1-16.51-16.51 16.51 16.51 0 0 1 16.51-16.51 16.51 16.51 0 0 1 16.51 16.51z" fill-rule="evenodd" stroke="#000" stroke-width=".04827"/>
      <g fill="#97b4d4" stroke="#fff" stroke-width=".6">
       <path d="m97.664 126h6.1819v6.1819h-6.1819z"/>
       <path d="m97.664 132.19h6.1819v6.1819h-6.1819z"/>
       <path d="m97.664 138.37h6.1819v6.1819h-6.1819z"/>
       <path d="m103.85 144.64h4.8271c-2.4306 2.2633-5.1108 4.2306-7.7233 6.2752-2.7674-1.8939-5.2078-4.0741-7.7233-6.2752h4.3444z"/>
      </g>
     </g>
    </svg>;
  }
}