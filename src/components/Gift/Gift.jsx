/* eslint-disable no-unused-vars */
import './Gift.css'
import giftMessages from '../../giftMessages.json'
import { useState } from 'react'

const Gift = () => {
  const giftFiles = [
    '/src/assets/Gift1.pdf',
    '/src/assets/Gift2.pdf',
    '/src/assets/Gift3.pdf',
    '/src/assets/Gift4.pdf',
    '/src/assets/Gift5.pdf',
  ]

  const [randomGift, setRandomGift] = useState(
    giftMessages.wishes[Math.floor(Math.random() * giftMessages.wishes.length)]
  )

  const [selectedGift, setSelectedGift] = useState(() => {
    const savedGift = localStorage.getItem('userGift')
    return savedGift ? JSON.parse(savedGift) : null
  })

  const handleGiftClick = () => {
    const randomFile = giftFiles[Math.floor(Math.random() * giftFiles.length)]
    setSelectedGift(randomFile)
    localStorage.setItem('userGift', JSON.stringify(randomFile))
    window.open(randomFile, '_blank')
  }

  return (
    <div>
      <div className="wish">
        <div className="wish-words">
          <p className="wish-random-text">{randomGift.message}</p>
        </div>
      </div>
      <p className="gift-emoji" onClick={handleGiftClick}>
        🎁
      </p>
    </div>
  )
}

export default Gift
