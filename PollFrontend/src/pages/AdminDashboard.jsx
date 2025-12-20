// src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { pollAPI } from '../api/api'

function AdminDashboard() {
  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.role !== 'ADMIN') {
      navigate('/login')
      return
    }

    fetchPolls(user.id)
  }, [navigate])

  const fetchPolls = async (userId) => {
    try {
      const response = await pollAPI.getPolls(userId)
      setPolls(response.data.polls)
    } catch (error) {
      console.error('Error fetching polls:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div style={{
    fontFamily: 'Poppins, Inter, system-ui, sans-serif',
    background: '#0c0c0c',
    color: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>Loading...</div>

  return (
    <div style={{
      fontFamily: 'Poppins, Inter, system-ui, sans-serif',
      background: '#0c0c0c',
      color: '#ffffff',
      minHeight: '100vh',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: '#1c1c24',
        borderRadius: '20px',
        padding: '40px',
        border: '1px solid #2a2a35',
        boxShadow: '0 0 20px rgba(34, 211, 238, 0.15), 0 0 40px rgba(99, 102, 241, 0.15)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{
            fontWeight: '700',
            color: '#22d3ee',
            textShadow: '0 0 10px #22d3ee, 0 0 20px #6366f1'
          }}>Admin Dashboard</h2>
          <Link to="/admin/create-poll">
            <button style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              color: '#fff',
              background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
              boxShadow: '0 6px 15px rgba(34, 211, 238, 0.4), 0 0 25px rgba(99, 102, 241, 0.3)',
              transition: 'all 0.3s ease'
            }}>Create New Poll</button>
          </Link>
        </div>

        <div>
          <h3 style={{ color: '#a1a1aa', marginBottom: '20px' }}>All Polls</h3>
          {polls.length === 0 ? (
            <p style={{ color: '#a1a1aa' }}>No polls created yet.</p>
          ) : (
            <div>
              {polls.map((poll) => (
                <div key={poll._id} style={{
                  background: '#111',
                  padding: '20px',
                  borderRadius: '16px',
                  marginBottom: '18px',
                  borderLeft: '4px solid #22d3ee',
                  transition: 'all 0.3s ease'
                }}>
                  <h4 style={{ color: '#22d3ee', marginBottom: '10px' }}>{poll.title}</h4>
                  <p style={{ color: '#a1a1aa', marginBottom: '10px' }}>{poll.description}</p>
                  <p style={{ color: '#ffffff', marginBottom: '5px' }}><strong>Status:</strong> {poll.status}</p>
                  <p style={{ color: '#ffffff', marginBottom: '5px' }}><strong>Start:</strong> {new Date(poll.startDate).toLocaleString()}</p>
                  <p style={{ color: '#ffffff', marginBottom: '15px' }}><strong>End:</strong> {new Date(poll.endDate).toLocaleString()}</p>
                  <Link to={`/results/${poll._id}`}>
                    <button style={{
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: '600',
                      borderRadius: '25px',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#fff',
                      background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                      transition: 'all 0.3s ease',
                      marginRight: '10px'
                    }}>View Results</button>
                  </Link>
                  <Link to={`/admin/edit-poll/${poll._id}`}>
                    <button style={{
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: '600',
                      borderRadius: '25px',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#fff',
                      background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
                      transition: 'all 0.3s ease'
                    }}>Edit Poll</button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard