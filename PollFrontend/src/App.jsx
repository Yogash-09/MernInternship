// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import UserPollList from './pages/UserPollList'
import CreatePoll from './pages/CreatePoll'
import EditPoll from './pages/EditPoll'
import VotePage from './pages/VotePage'
import PollResults from './pages/PollResults'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create-poll" element={<CreatePoll />} />
          <Route path="/admin/edit-poll/:pollId" element={<EditPoll />} />
          <Route path="/polls" element={<UserPollList />} />
          <Route path="/vote/:pollId" element={<VotePage />} />
          <Route path="/results/:pollId" element={<PollResults />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App