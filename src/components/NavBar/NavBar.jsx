import './NavBar.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import screenfull from 'screenfull'

const NavBar = () => {
  const [hoveredItem, setHoveredItem] = useState(null)

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
      info: 'Your mission is simple: share this site’s link with as many people as you can. Let’s spread the joy!',
    },
    {
      label: 'Leave the comment',
      info: 'Share your thoughts, feedback, or a special wish for the New Year. We’d love to hear from you!',
    },
    {
      label: 'Creator',
      name: 'Serhii Kravchenko',
    },
  ]

  return (
    <div className="nav-bar">
      <div className="nav-bar-main">
        <h1 className="nav-bar-logo">YEEEP! IT&apos;S 2025</h1>

        <ul className="nav-bar-list">
          {navItems.map((item, index) => (
            <li
              key={index}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              className="nav-bar-item"
            >
              {item.label}
              {hoveredItem === index && (
                <div className="nav-bar-tooltip">
                  <span className="tooltip-arrow"></span>
                  <div className="tooltip-content">
                    {item.name}
                    {item.info}
                  </div>
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
          />
          <img
            onClick={toggleFullscreen}
            src={assets.full_screen_mode}
            alt="full-screen"
            className="nav-bar-full-screen"
          />
        </div>
      </div>

      <button onClick={toggleFullscreen} className="nav-bar-full-btn-mob">
        FULL SCREEN
      </button>
      <button onClick={toggleFullscreen} className="nav-bar-full-btn">
        FULL SCREEN MODE
      </button>
    </div>
  )
}

export default NavBar
