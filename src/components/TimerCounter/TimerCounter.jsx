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

// ----------------

import './TimerCounter.css'
import { useState, useEffect, useRef } from 'react'
import screenfull from 'screenfull'
import { assets } from '../../assets/assets'
import SnowAnimation from '../SnowAnimation/SnowAnimation'
import TextAfterTimer from '../TextAfterTimer/TextAfterTimer'
import Gift from '../Gift/Gift'

const TimerCounter = () => {
  const [timeLeft, setTimeLeft] = useState(5)
  const [showTextAnimation, setShowTextAnimation] = useState(false)
  const [hideTextAnimation, setHideTextAnimation] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showTreeAnimation, setShowTreeAnimation] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showGiftAnimation, setShowGiftAnimation] = useState(false)
  const [showVolumeIcon, setShowVolumeIcon] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const [showRestartIcon, setShowRestartIcon] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const timerCompletedRef = useRef(false)
  const [audio] = useState(new Audio(`${assets.theme_song}`))

  useEffect(() => {
    audio.volume = volume

    const handleAudioEnded = () => {
      setShowRestartIcon(true) // Показуємо іконку після завершення пісні
      setShowVolumeIcon(false) // Сховати іконку регулювання гучності
    }

    audio.addEventListener('ended', handleAudioEnded)
    return () => {
      audio.removeEventListener('ended', handleAudioEnded)
    }
  }, [volume, audio])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else {
      timerCompletedRef.current = true
      if (document.visibilityState === 'visible') {
        setShowTextAnimation(true)
      }
    }
  }, [timeLeft])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && timerCompletedRef.current) {
        setShowTextAnimation(true)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    if (screenfull.isEnabled) {
      const handleFullscreenChange = () => {
        setIsFullScreen(screenfull.isFullscreen)
      }

      screenfull.on('change', handleFullscreenChange)
      return () => screenfull.off('change', handleFullscreenChange)
    }
  }, [])

  const handleTextAnimationEnd = () => {
    setHideTextAnimation(true)
    setShowButton(true)
  }

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const secs = String(seconds % 60).padStart(2, '0')
    return `${hrs} : ${mins} : ${secs}`
  }

  const handleButtonClick = () => {
    setShowTreeAnimation(true)
    setShowVolumeIcon(true)
    setShowRestartIcon(false)
    audio.play()
    setIsPlaying(true)

    setTimeout(() => {
      setShowGiftAnimation(true)
    }, 7900)
  }

  const handleVolumeIconClick = () => {
    setShowVolumeControl((prev) => !prev)
  }

  const handleVolumeChange = (e) => {
    setVolume(e.target.value)
  }

  const handleRestartClick = () => {
    setShowRestartIcon(false)
    audio.currentTime = 0
    audio.play()
    setIsPlaying(true)
    setShowVolumeIcon(true)
  }

  useEffect(() => {
    if (isPlaying && audio.current) {
      audio.play()
    } else if (audio.current) {
      audio.pause()
    }
  }, [isPlaying, audio.current])

  return (
    <div className={`timer ${isFullScreen ? 'fullscreen' : ''}`}>
      {showTreeAnimation ? (
        <SnowAnimation />
      ) : showButton ? (
        <h1 className="kreep">
          <button
            className="start-animation-button"
            onClick={handleButtonClick}
          >
            Click to see the miracle!
          </button>
        </h1>
      ) : showTextAnimation && !hideTextAnimation ? (
        <TextAfterTimer onAnimationEnd={handleTextAnimationEnd} />
      ) : (
        <h1 className="timer-numbers">{formatTime(timeLeft)}</h1>
      )}

      {showGiftAnimation && <Gift />}

      {showVolumeIcon && (
        <div className="audio-controls">
          <div className="volume-icon-container">
            <img
              src={assets.song_volume}
              alt="Play Theme Song"
              className="volume-icon"
              onClick={handleVolumeIconClick}
            />
            {showVolumeControl && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider white-slider"
              />
            )}
          </div>
        </div>
      )}

      {showRestartIcon && (
        <div className="audio-restart">
          <img
            src={assets.repeat_song}
            alt="Restart Theme Song"
            className="restart-icon"
            onClick={handleRestartClick}
          />
        </div>
      )}
    </div>
  )
}

export default TimerCounter
