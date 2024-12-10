import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import MainPage from './pages/MainPage'
import NavBar from './components/NavBar/NavBar'
import FeedbackPage from './pages/FeedbackPage'

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  )
}

export default App
