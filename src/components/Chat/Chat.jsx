import './Chat.css'
import { useState, useEffect } from 'react'

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
        setMessages(data)
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

      <div className="chat-input">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
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
