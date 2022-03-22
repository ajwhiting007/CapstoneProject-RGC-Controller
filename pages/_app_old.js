// import '../styles/globals.css'
// import { useState } from 'react'
// import { useRouter } from 'next/router'
// import Pusher from 'pusher-js'
// import config from '../config.json'

// function MyApp({ Component, pageProps }) {
//   const router = useRouter()
//   const redirect = () => {
//     router.push('/controller')
//     router.reload
//   }

//   //This method will redirect to the controller page once the user has entered the game code
//   const handleSubmit = () => {
//     if (gameCode.length != 5) {
//       console.log('Gamecode: ', gameCode)
//       alert('Please enter a valid game code.')
//       return
//     }
//     const pusher = new Pusher(config.key, {
//       cluster: 'us2',
//       authEndpoint: 'api/pusher/auth',
//     })
//     print('Gamecode: ', gameCode)
//     const channel = pusher.subscribe('private-pong' + gameCode)
//     const triggerEvent = () => {
//       console.log('sending event')
//       channel.trigger('client-connection', '')
//     }
//     triggerEvent

//     console.log('channel ', channel)
//   }

//   const [gameCode, setGameCode] = useState('')
//   // return (
//   //   <div className="flex min-h-screen flex-col items-center justify-center py-2">
//   //     <form
//   //       onSubmit={() => {
//   //         router.push('/')
//   //       }}
//   //     >
//   //       <input
//   //         type="text"
//   //         placeholder="Enter game code"
//   //         onChange={(e) => {
//   //           setGameCode(e.currentTarget.value)
//   //         }}
//   //         className="rounded-md border-2 border-gray-500 py-2"
//   //       />
//   //       <button className="ml-3 rounded-md bg-blue-500 py-2 px-2 text-white">
//   //         Submit
//   //       </button>
//   //     </form>
//   //   </div>
//   // )
//   return (
//     <div>
//       <button onClick={() => redirect()}>click</button>
//     </div>
//   )
// }

// export default MyApp
