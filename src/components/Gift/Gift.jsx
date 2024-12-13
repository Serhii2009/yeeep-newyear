// import './Gift.css'
// import screenfull from 'screenfull'
// import { useState, useEffect } from 'react'

// const Gift = () => {
//   const [isFullScreen, setIsFullScreen] = useState(
//     screenfull.isEnabled ? screenfull.isFullscreen : false
//   )

//   useEffect(() => {
//     if (screenfull.isEnabled) {
//       const handleFullscreenChange = () => {
//         setIsFullScreen(screenfull.isFullscreen)
//       }

//       setIsFullScreen(screenfull.isFullscreen)

//       screenfull.on('change', handleFullscreenChange)
//       return () => screenfull.off('change', handleFullscreenChange)
//     }
//   }, [])

//   return (
//     <div className={`animation-container ${isFullScreen ? 'fullscreen' : ''}`}>
//       <div className="explosion-point"></div>
//       <div className="laser-ring"></div>
//       <div className="laser-text">Welcome!</div>
//     </div>
//   )
// }

// export default Gift
