/* eslint-disable no-unused-vars */
import './Gift.css'
import giftMessages from '../../giftMessages.json'
import { useState } from 'react'

const Gift = () => {
  const giftFiles = [
    '/public/Gift1.pdf',
    '/public/Gift2.pdf',
    '/public/Gift3.pdf',
    '/public/Gift4.pdf',
    '/public/Gift5.pdf',
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
    const fileUrl = window.location.origin + randomFile
    window.open(fileUrl, '_blank')
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
