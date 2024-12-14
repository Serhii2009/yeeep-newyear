import './Gift.css'
import giftMessages from '../../giftMessages.json'
import { useState } from 'react'
import { assets } from '../../assets/assets'

const Gift = () => {
  // eslint-disable-next-line no-unused-vars
  const [randomGift, setRandomGift] = useState(
    giftMessages.wishes[Math.floor(Math.random() * giftMessages.wishes.length)]
  )

  return (
    <div className="gift">
      <div className="gift-words">
        <img
          src={assets.energy_wish}
          alt="Energy"
          className="gift-energy-wish"
        />
        <p className="gift-random-text">{randomGift.message}</p>
      </div>
    </div>
  )
}

export default Gift
