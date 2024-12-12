import { useState } from 'react'
import './Gift.css'

const Gift = () => {
  const [isBoxOpened, setIsBoxOpened] = useState(false)

  const handleBoxOpen = () => {
    setIsBoxOpened(true)
  }

  return (
    <div className="gidt-container">
      {!isBoxOpened && (
        <div className="gift-box" onAnimationEnd={handleBoxOpen}></div>
      )}
      {isBoxOpened && (
        <div className="gift-message-container">
          <p className="gift-message">Have a great day!</p>
        </div>
      )}
    </div>
  )
}

export default Gift
