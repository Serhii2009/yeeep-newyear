import './NavBar.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import screenfull from 'screenfull'

const NavBar = () => {
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle()
    }
  }

  const navItems = [
    {
      label: 'About us',
      info: 'We created this site to evoke great emotions. Together, let’s make this New Year unforgettable!',
    },
    {
      label: 'Your mission',
      info: 'Your mission is simple! Share this site’s link with as many people as you can. Let’s spread the joy!',
    },
    {
      label: 'Leave the comment',
      info: 'Share your thoughts, feedback, or a special wish for the New Year. Just click!',
      path: '/feedback', // Додаємо шлях для навігації
    },
    {
      label: 'Creator',
      info: 'Serhii Kravchenko',
    },
  ]

  const handleNavigation = (path) => {
    if (path) {
      navigate(path)
    }
  }

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false)
    }
  }

  return (
    <div className="nav-bar">
      <div className="nav-bar-main">
        <Link to="/">
          <h1 className="nav-bar-logo">YEEEP! IT&apos;S 2025</h1>
        </Link>

        <ul className="nav-bar-list">
          {navItems.map((item, index) => (
            <li
              key={index}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavigation(item.path)} // Виклик навігації при кліку
              className="nav-bar-item"
            >
              {item.label}
              {hoveredItem === index && (
                <div className="nav-bar-tooltip">
                  <span className="tooltip-arrow"></span>
                  <div className="tooltip-content">{item.info}</div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="nav-bar-mobile-icons">
          <img
            src={assets.side_bar_mobile}
            alt="side-bar"
            className="nav-bar-side-bar"
            onClick={handleModalToggle}
          />
        </div>
      </div>

      <button onClick={toggleFullscreen} className="nav-bar-full-btn-mob">
        FULL SCREEN
      </button>
      <button onClick={toggleFullscreen} className="nav-bar-full-btn">
        FULL SCREEN MODE
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <ul>
              {navItems.map((item, index) => (
                <li key={index}>
                  {item.path ? (
                    <Link to={item.path} onClick={() => setIsModalOpen(false)}>
                      <strong>{item.label}:</strong> {item.info}
                    </Link>
                  ) : (
                    <>
                      <strong>{item.label}:</strong> {item.info}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar
