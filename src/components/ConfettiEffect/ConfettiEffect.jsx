import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'

const ConfettiEffect = () => {
  // eslint-disable-next-line no-unused-vars
  const [confettiPieces, setConfettiPieces] = useState(300)
  const [isFalling, setIsFalling] = useState(true)
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    const timer = setTimeout(() => setIsFalling(false), 3000)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {confettiPieces > 0 && (
        <Confetti
          numberOfPieces={isFalling ? confettiPieces : 0}
          recycle={false}
          gravity={0.5}
          width={dimensions.width}
          height={dimensions.height}
          style={{
            background: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  )
}

export default ConfettiEffect
