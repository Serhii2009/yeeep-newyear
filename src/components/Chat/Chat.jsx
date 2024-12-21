import './Chat.css'
import { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'

const Chat = () => {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])

  // Завантаження повідомлень із сервера
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          'https://yeeep-newyear-backend.onrender.com/api/messages'
        )
        const data = await response.json()

        // Логування отриманих даних
        console.log('Fetched messages:', data)

        if (Array.isArray(data)) {
          setMessages(data)
        } else {
          console.error('Expected array but got:', data)
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    fetchMessages()
  }, [])

  // Відправлення повідомлення
  const handleSendMessage = async () => {
    if (!name || !text) {
      alert('Please enter your name and message!')
      return
    }

    try {
      const response = await fetch(
        'https://yeeep-newyear-backend.onrender.com/api/messages',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, text }),
        }
      )

      if (!response.ok) {
        throw new Error('Error sending message')
      }

      const newMessage = await response.json()
      setMessages([newMessage, ...messages]) // Додаємо нове повідомлення зверху
      setText('') // Очищення текстового поля
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <h3>Chat</h3>
      </div>

      <div className="chat-message-section">
        <div className="chat-message-field">
          <input
            className="custom-select"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Message"
            className="custom-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div onClick={handleSendMessage} className="icon-container">
          <img
            style={{ background: 'none' }}
            src={assets.sent_message}
            alt="Deer Icon"
          />
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg._id} className="chat-message">
            <strong>{msg.name}:</strong> {msg.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chat
