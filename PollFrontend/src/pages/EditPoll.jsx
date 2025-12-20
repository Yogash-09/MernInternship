// src/pages/EditPoll.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { pollAPI } from '../api/api'

function EditPoll() {
  const { pollId } = useParams()
  const [pollData, setPollData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.role !== 'ADMIN') {
      navigate('/login')
      return
    }

    fetchPoll()
  }, [pollId, navigate])

  const fetchPoll = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const response = await pollAPI.getPolls(user.id)
      const poll = response.data.polls.find(p => p._id === pollId)
      
      if (poll) {
        setPollData({
          title: poll.title,
          description: poll.description,
          startDate: new Date(poll.startDate).toISOString().slice(0, 16),
          endDate: new Date(poll.endDate).toISOString().slice(0, 16)
        })
      }
    } catch (error) {
      setError('Error loading poll data')
    }
  }

  const handleChange = (e) => {
    setPollData({
      ...pollData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const user = JSON.parse(localStorage.getItem('user'))
    
    try {
      await pollAPI.updatePoll(pollId, {
        ...pollData,
        userId: user.id
      })

      setSuccess('Poll updated successfully!')
      setTimeout(() => navigate('/admin'), 2000)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update poll')
    }
  }

  return (
    <div style={{
      fontFamily: 'Poppins, Inter, system-ui, sans-serif',
      background: '#0c0c0c',
      color: '#ffffff',
      minHeight: '100vh',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: '#1c1c24',
        borderRadius: '20px',
        padding: '40px',
        border: '1px solid #2a2a35',
        boxShadow: '0 0 20px rgba(34, 211, 238, 0.15), 0 0 40px rgba(99, 102, 241, 0.15)'
      }}>
        <h2 style={{
          fontWeight: '700',
          color: '#22d3ee',
          textShadow: '0 0 10px #22d3ee, 0 0 20px #6366f1',
          textAlign: 'center',
          marginBottom: '30px'
        }}>Edit Poll</h2>
        
        {error && <div style={{
          color: '#ff6b6b',
          background: 'rgba(255, 107, 107, 0.1)',
          padding: '12px',
          borderRadius: '10px',
          marginBottom: '20px',
          border: '1px solid rgba(255, 107, 107, 0.3)'
        }}>{error}</div>}
        
        {success && <div style={{
          color: '#51cf66',
          background: 'rgba(81, 207, 102, 0.1)',
          padding: '12px',
          borderRadius: '10px',
          marginBottom: '20px',
          border: '1px solid rgba(81, 207, 102, 0.3)'
        }}>{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#22d3ee',
              fontWeight: '600'
            }}>Title:</label>
            <input
              type="text"
              name="title"
              value={pollData.title}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#111',
                border: '2px solid #2a2a35',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#22d3ee',
              fontWeight: '600'
            }}>Description:</label>
            <textarea
              name="description"
              value={pollData.description}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#111',
                border: '2px solid #2a2a35',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '16px',
                height: '100px',
                resize: 'vertical',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#22d3ee',
              fontWeight: '600'
            }}>Start Date:</label>
            <input
              type="datetime-local"
              name="startDate"
              value={pollData.startDate}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#111',
                border: '2px solid #2a2a35',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#22d3ee',
              fontWeight: '600'
            }}>End Date:</label>
            <input
              type="datetime-local"
              name="endDate"
              value={pollData.endDate}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#111',
                border: '2px solid #2a2a35',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            padding: '16px',
            fontSize: '18px',
            fontWeight: '600',
            borderRadius: '50px',
            border: 'none',
            cursor: 'pointer',
            color: '#fff',
            background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
            boxShadow: '0 6px 15px rgba(34, 211, 238, 0.4), 0 0 25px rgba(99, 102, 241, 0.3)',
            transition: 'all 0.3s ease'
          }}>
            Update Poll
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditPoll