import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Pusher from 'pusher-js'
import config from '../config.json'

export default function Controller() {
  /**********Router Variables************/
  let router
  let gameCode

  /**********Pusher Variables************/
  let pusher
  let channel
  const [channelTest, setChannelTest] = useState(null)

  /**********On Screen Load Functions************/
  useEffect(() => {
    onScreenLoad()
    console.log(channel)
  }, [])
  const onScreenLoad = () => {
    //Creating the pusher to listen in for the redirection signal
    pusher = new Pusher(config.key, {
      cluster: 'us2',
      authEndpoint: 'api/pusher/auth',
    })
    router = useRouter()
    gameCode = router.query.gameCode
    console.log('gamecode = ', gameCode)
    channel = pusher.subscribe('private-pong' + gameCode)
    setChannelTest(channel)
    channel.bind('pusher:subscription_succeeded', () => {
      channel.trigger('client-controllerconnect', 'Connected')
    })
  }

  /************Functions*************/
  const triggerEvent = (move) => {
    channelTest.trigger('client-controllermovement', move)
  }

  /**********Display************/
  return (
    <div className="container">
      <div className="spacing">
        <button onClick={() => triggerEvent('1')}>
          <SVGArrow direction="up" />
          Send Up
        </button>
      </div>
      <div className="playSpacing">
        <button onClick={() => triggerEvent('0')}>
          <SVGPlay />
        </button>
      </div>
      <div className="spacing">
        <button onClick={() => triggerEvent('-1')}>
          <SVGArrow direction="down" />
          Send Down
        </button>
      </div>
    </div>
  )
}

function SVGArrow(props) {
  if (props.direction == 'up') {
    return (
      <svg
        className="upButton"
        width="90%"
        height="90%"
        version="1.1"
        viewBox="0 0 33.798 34.279"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(-84.137 -120.7)">
          <path
            d="m117.55 138.12a16.51 16.51 0 0 1-16.51 16.51 16.51 16.51 0 0 1-16.51-16.51 16.51 16.51 0 0 1 16.51-16.51 16.51 16.51 0 0 1 16.51 16.51z"
            fill-rule="evenodd"
            stroke="#000"
            stroke-width=".04827"
          />
          <g fill="#97b4d4" stroke="#fff" stroke-width=".6">
            <path d="m97.664 126h6.1819v6.1819h-6.1819z" />
            <path d="m97.664 132.19h6.1819v6.1819h-6.1819z" />
            <path d="m97.664 138.37h6.1819v6.1819h-6.1819z" />
            <path d="m103.85 144.64h4.8271c-2.4306 2.2633-5.1108 4.2306-7.7233 6.2752-2.7674-1.8939-5.2078-4.0741-7.7233-6.2752h4.3444z" />
          </g>
        </g>
      </svg>
    )
  }
  if (props.direction == 'down') {
    return (
      <svg
        className="downButton"
        width="90%"
        height="90%"
        version="1.1"
        viewBox="0 0 33.798 34.279"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(-84.137 -120.7)">
          <path
            d="m117.55 138.12a16.51 16.51 0 0 1-16.51 16.51 16.51 16.51 0 0 1-16.51-16.51 16.51 16.51 0 0 1 16.51-16.51 16.51 16.51 0 0 1 16.51 16.51z"
            fill-rule="evenodd"
            stroke="#000"
            stroke-width=".04827"
          />
          <g fill="#97b4d4" stroke="#fff" stroke-width=".6">
            <path d="m97.664 126h6.1819v6.1819h-6.1819z" />
            <path d="m97.664 132.19h6.1819v6.1819h-6.1819z" />
            <path d="m97.664 138.37h6.1819v6.1819h-6.1819z" />
            <path d="m103.85 144.64h4.8271c-2.4306 2.2633-5.1108 4.2306-7.7233 6.2752-2.7674-1.8939-5.2078-4.0741-7.7233-6.2752h4.3444z" />
          </g>
        </g>
      </svg>
    )
  }
}

function SVGPlay(props) {
  return (
    <svg
      className="playButton"
      width="100%"
      height="100%"
      version="1.1"
      viewBox="0 0 29.938 8.7603"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(-20.072 -82.585)" stroke-width=".26458">
        <path
          d="m24.07 82.585h21.943c2.2146 0 3.9974 1.7829 3.9974 3.9974v0.76546c0 2.2146-1.7828 3.9974-3.9974 3.9974h-21.943c-2.2146 0-3.9974-1.7829-3.9974-3.9974v-0.76546c0-2.2146 1.7829-3.9974 3.9974-3.9974z"
          fill="#00a0ff"
          fill-rule="evenodd"
        />
        <g aria-label="Play">
          <path d="m32.216 85.694q0 0.61736-0.42168 0.94809-0.42168 0.32797-1.1879 0.32797h-0.46302v1.5682h-0.50712v-4.0294h1.0666q1.5131 0 1.5131 1.1851zm-2.0726 0.8406h0.40514q0.60082 0 0.87092-0.19292 0.2701-0.19568 0.2701-0.62563 0-0.38861-0.2508-0.58153-0.2508-0.19292-0.78272-0.19292h-0.51263z" />
          <path d="m33.478 88.539h-0.49609v-4.2885h0.49609z" />
          <path d="m36.306 88.539-0.09646-0.42995h-0.02205q-0.226 0.28388-0.452 0.38585-0.22324 0.09922-0.565 0.09922-0.44648 0-0.70004-0.23427-0.25356-0.23427-0.25356-0.66146 0-0.92053 1.4525-0.96463l0.51263-0.01929v-0.17914q0-0.34451-0.14883-0.50712-0.14883-0.16536-0.4768-0.16536-0.23978 0-0.45475 0.07166-0.21222 0.07166-0.39963 0.15985l-0.15158-0.37207q0.22875-0.12127 0.49885-0.19017 0.2701-0.0689 0.53468-0.0689 0.54846 0 0.8158 0.24254 0.26734 0.24253 0.26734 0.7717v2.0615zm-1.0225-0.34451q0.41617 0 0.65319-0.22324 0.23978-0.226 0.23978-0.63941v-0.27285l-0.44648 0.01929q-0.5209 0.01929-0.76068 0.16536-0.23702 0.14607-0.23702 0.46026 0 0.23702 0.14332 0.3638 0.14607 0.12678 0.4079 0.12678z" />
          <path d="m37.13 85.512h0.53192l0.65319 1.7225q0.20671 0.56224 0.25356 0.82407h0.02205q0.0248-0.10198 0.113-0.38034 0.08819-0.28112 0.14883-0.44924l0.6146-1.717h0.53468l-1.3036 3.4451q-0.19017 0.50161-0.452 0.71934t-0.64768 0.21773q-0.20671 0-0.41066-0.04685v-0.39412q0.1378 0.03307 0.33073 0.03307 0.23702 0 0.40239-0.13229 0.16536-0.12954 0.2701-0.40239l0.1571-0.40239z" />
        </g>
      </g>
    </svg>
  )
}
