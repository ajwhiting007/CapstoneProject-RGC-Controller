import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Pusher from 'pusher-js'
import config from '../config.json'

export default function Controller() {
  /**********Router Variables************/
  let gameCode
  const router = useRouter()
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

    gameCode = router.query.gameCode
    channel = pusher.subscribe('private-pong' + gameCode)
    setChannelTest(channel)
    channel.bind('pusher:subscription_succeeded', () => {
      channel.trigger('client-controllerconnect', 'Connected')
    })
  }

  /************Play/Pause Variable****/

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
      //Pause Button
      <svg
        className="playButton"
        width="80%"
        height="100%"
        version="1.1" 
        viewBox="0 0 29.938 8.7603" 
        xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(-20.072 -82.585)" stroke-width=".26458">
        <path d="m24.07 82.585h21.943c2.2146 0 3.9974 1.7829 3.9974 3.9974v0.76546c0 2.2146-1.7828 3.9974-3.9974 3.9974h-21.943c-2.2146 0-3.9974-1.7829-3.9974-3.9974v-0.76546c0-2.2146 1.7829-3.9974 3.9974-3.9974z" fill="#00a0ff" fill-rule="evenodd"/>
        <g aria-label="Play">
          <g stroke-width=".070004" aria-label="Pause">
          <path d="m29.919 85.95q0 0.61736-0.42168 0.94809-0.42168 0.32797-1.1879 0.32797h-0.46302v1.5682h-0.50712v-4.0294h1.0666q1.5131 0 1.5131 1.1851zm-2.0726 0.8406h0.40514q0.60082 0 0.87092-0.19293 0.2701-0.19568 0.2701-0.62563 0-0.38861-0.2508-0.58153t-0.78272-0.19292h-0.51263z"/>
          <path d="m32.554 88.794-0.09646-0.42995h-0.02205q-0.226 0.28388-0.452 0.38585-0.22324 0.09922-0.565 0.09922-0.44648 0-0.70004-0.23427-0.25356-0.23427-0.25356-0.66146 0-0.92053 1.4525-0.96463l0.51263-0.01929v-0.17915q0-0.34451-0.14883-0.50712-0.14883-0.16536-0.4768-0.16536-0.23978 0-0.45475 0.07166-0.21222 0.07166-0.39963 0.15985l-0.15158-0.37207q0.22875-0.12127 0.49885-0.19017 0.2701-0.0689 0.53468-0.0689 0.54846 0 0.8158 0.24253 0.26734 0.24254 0.26734 0.7717v2.0615zm-1.0225-0.34451q0.41617 0 0.65319-0.22324 0.23978-0.226 0.23978-0.63941v-0.27285l-0.44648 0.01929q-0.5209 0.01929-0.76068 0.16536-0.23702 0.14607-0.23702 0.46026 0 0.23702 0.14332 0.3638 0.14607 0.12678 0.4079 0.12678z"/>
          <path d="m34.321 85.768v1.9485q0 0.36656 0.16261 0.5457 0.16536 0.17639 0.50987 0.17639 0.46578 0 0.678-0.25907 0.21222-0.25907 0.21222-0.83509v-1.5765h0.49885v3.0262h-0.4079l-0.07166-0.39963h-0.02481q-0.13505 0.21773-0.38309 0.33624t-0.57602 0.11851q-0.5457 0-0.82407-0.26183-0.27561-0.26183-0.27561-0.83785v-1.9816z"/>
          <path d="m39.312 87.959q0 0.42444-0.31695 0.6587-0.31695 0.23151-0.89021 0.23151-0.59807 0-0.95084-0.19017v-0.452q0.49885 0.24253 0.96187 0.24253 0.37483 0 0.5457-0.12127 0.17088-0.12127 0.17088-0.32522 0-0.17914-0.16536-0.30317-0.16261-0.12402-0.58153-0.28388-0.42719-0.16536-0.60082-0.28112-0.17363-0.11851-0.25632-0.26458-0.07993-0.14607-0.07993-0.35553 0-0.37207 0.30317-0.58704 0.30317-0.21497 0.83233-0.21497 0.51539 0 0.96463 0.20395l-0.16812 0.39412q-0.46026-0.19293-0.82958-0.19293-0.30868 0-0.46853 0.09922-0.15985 0.09646-0.15985 0.26734 0 0.16536 0.1378 0.27561 0.1378 0.10749 0.64216 0.30041 0.37758 0.14056 0.55673 0.26183 0.1819 0.12127 0.26734 0.27285 0.08544 0.15158 0.08544 0.3638z"/>
          <path d="m41.332 88.849q-0.68075 0-1.0694-0.41066-0.38585-0.41341-0.38585-1.1355 0-0.7276 0.36105-1.1576 0.36104-0.4327 0.97565-0.4327 0.57051 0 0.9095 0.36931 0.339 0.36656 0.339 0.99494v0.30041h-2.0726q0.01378 0.51539 0.26183 0.78273 0.24805 0.26734 0.7028 0.26734 0.24253 0 0.46026-0.04134 0.21773-0.0441 0.50987-0.16812v0.43546q-0.2508 0.10749-0.47129 0.15158-0.22049 0.0441-0.5209 0.0441zm-0.12402-2.7313q-0.35553 0-0.56224 0.22876-0.20671 0.22875-0.24529 0.63665h1.5406q-0.0055-0.42444-0.19568-0.64492-0.19017-0.22049-0.53743-0.22049z"/>
          </g>
        </g>
        </g>
      </svg>
    )
}
