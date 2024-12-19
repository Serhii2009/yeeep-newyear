import './Gift.css'
import giftMessages from '../../giftMessages.json'
import { useState } from 'react'

const Gift = () => {
  // eslint-disable-next-line no-unused-vars
  const [randomGift, setRandomGift] = useState(
    giftMessages.wishes[Math.floor(Math.random() * giftMessages.wishes.length)]
  )

  return (
    <div>
      <div className="wish">
        <div className="wish-words">
          <p className="wish-random-text">{randomGift.message}</p>
        </div>
      </div>
      <p className="gift-emoji">🎁</p>
    </div>
  )
}

export default Gift
