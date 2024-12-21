import './Chat.css'
import { assets } from '../../assets/assets'

const Chat = () => {
  return (
    <div className="chat">
      <p className="chat-online-counter">
        xxx <span>.</span>
      </p>
      <h3 className="chat-section-name">Chat</h3>
      <img className="chat-arrow-top" src={assets.arrow_top} alt="" />
      <img className="chat-arrow-down" src={assets.arrow_down} alt="" />

      <div className="chat-message-section">
        <div className="chat-message-field">
          <select name="select" aria-label="Role" className="custom-select">
            <option value="" disabled selected hidden>
              Role
            </option>
            <option value="value1">Snowman</option>
            <option value="value2">Pine tree</option>
            <option value="value3">Deer</option>
            <option value="value4">Wind</option>
            <option value="value5">Frost</option>
            <option value="value6">Ice</option>
          </select>
          <input
            type="text"
            placeholder="Type Your Wish"
            className="custom-input"
          />
          <div className="icon-container">
            <img src={assets.sent_message} alt="Deer Icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
