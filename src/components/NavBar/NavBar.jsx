import './NavBar.css'
import { assets } from '../../assets/assets'
import screenfull from 'screenfull'

const NavBar = () => {
  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle()
    }
  }

  return (
    <div className="nav-bar">
      <div className="nav-bar-main">
        <h1 className="nav-bar-logo">YEEEP! IT&apos;S 2025 </h1>

        <ul className="nav-bar-list">
          <li>About us</li>
          <li>Your mission</li>
          <li>Leave the comment</li>
          <li>Creator</li>
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
