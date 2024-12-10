// import { useState, useEffect } from 'react'

// const TimerCounter = () => {
//   const calculateTimeLeft = () => {
//     const now = new Date()
//     const nextYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0) // 1 січня наступного року
//     const difference = nextYear - now

//     if (difference > 0) {
//       const days = Math.floor(difference / (1000 * 60 * 60 * 24))
//       const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
//       const minutes = Math.floor((difference / 1000 / 60) % 60)
//       const seconds = Math.floor((difference / 1000) % 60)
//       return {
//         days,
//         hours,
//         minutes,
//         seconds,
//       }
//     }
//     return null
//   }

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
//   const [showMessage, setShowMessage] = useState(false)

//   useEffect(() => {
//     if (timeLeft) {
//       const timer = setInterval(() => {
//         const updatedTimeLeft = calculateTimeLeft()
//         if (updatedTimeLeft) {
//           setTimeLeft(updatedTimeLeft)
//         } else {
//           setTimeLeft(null)
//           setShowMessage(true)
//         }
//       }, 1000)

//       return () => clearInterval(timer)
//     }
//   }, [timeLeft])

//   return (
//     <div>
//       {showMessage ? (
//         <h1>HAPPY NEW YEAR!</h1>
//       ) : (
//         <h1>
//           {timeLeft
//             ? `${String(timeLeft.days).padStart(2, '0')} : ${String(
//                 timeLeft.hours
//               ).padStart(2, '0')} : ${String(timeLeft.minutes).padStart(
//                 2,
//                 '0'
//               )} : ${String(timeLeft.seconds).padStart(2, '0')}`
//             : '00 : 00 : 00 : 00'}
//         </h1>
//       )}
//     </div>
//   )
// }

// export default TimerCounter

import './TimerCounter.css'
import { useState, useEffect } from 'react'
import screenfull from 'screenfull'

const TimerCounter = () => {
  const [timeLeft, setTimeLeft] = useState(30)
  const [showMessage, setShowMessage] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else {
      setShowMessage(true)
    }
  }, [timeLeft])

  useEffect(() => {
    if (screenfull.isEnabled) {
      const handleFullscreenChange = () => {
        setIsFullScreen(screenfull.isFullscreen)
      }

      screenfull.on('change', handleFullscreenChange)
      return () => screenfull.off('change', handleFullscreenChange)
    }
  }, [])

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const secs = String(seconds % 60).padStart(2, '0')
    return `${hrs} : ${mins} : ${secs}`
  }

  return (
    <div className={`timer ${isFullScreen ? 'fullscreen' : ''}`}>
      {showMessage ? (
        <h1 className="timer-message">HELLO!</h1>
      ) : (
        <h1 className="timer-numbers">{formatTime(timeLeft)}</h1>
      )}
    </div>
  )
}

export default TimerCounter
