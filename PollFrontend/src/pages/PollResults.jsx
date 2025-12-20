// src/pages/PollResults.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { pollAPI } from '../api/api'

function PollResults() {
  const { pollId } = useParams()
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      navigate('/login')
      return
    }

    fetchResults()
  }, [pollId, navigate])

  const fetchResults = async () => {
    try {
      const response = await pollAPI.getPollResults(pollId)
      setResults(response.data)
    } catch (error) {
      setError('Error loading poll results')
    } finally {
      setLoading(false)
    }
  }

  const getBackPath = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.role === 'ADMIN' ? '/admin' : '/polls'
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

  if (error) {
    return (
      <div style={{
        fontFamily: 'Poppins, Inter, system-ui, sans-serif',
        background: '#0c0c0c',
        color: '#ffffff',
        minHeight: '100vh',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        <div style={{
          background: '#1c1c24',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid #2a2a35',
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.15), 0 0 40px rgba(99, 102, 241, 0.15)'
        }}>
          <div style={{
            color: '#f87171',
            background: 'rgba(248, 113, 113, 0.1)',
            border: '1px solid #f87171',
            boxShadow: '0 0 10px rgba(248, 113, 113, 0.4)',
            padding: '12px',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: '500',
            marginBottom: '20px'
          }}>{error}</div>
          <button 
            onClick={() => navigate(getBackPath())} 
            style={{
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
            }}
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      fontFamily: 'Poppins, Inter, system-ui, sans-serif',
      background: '#0c0c0c',
      color: '#ffffff',
      minHeight: '100vh',
      padding: '40px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '650px',
        background: '#1c1c24',
        borderRadius: '20px',
        padding: '40px',
        border: '1px solid #2a2a35',
        boxShadow: '0 0 20px rgba(34, 211, 238, 0.15), 0 0 40px rgba(99, 102, 241, 0.15)'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontWeight: '700',
          color: '#22d3ee',
          textShadow: '0 0 10px #22d3ee, 0 0 20px #6366f1'
        }}>Poll Results</h2>
        
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h3 style={{ color: '#22d3ee', marginBottom: '10px' }}>{results.poll.title}</h3>
          <p style={{ color: '#a1a1aa', marginBottom: '10px' }}>{results.poll.description}</p>
          <p style={{ color: '#ffffff' }}><strong>Total Votes:</strong> {results.totalVotes}</p>
        </div>

        <div>
          <h4 style={{ color: '#22d3ee', marginBottom: '20px' }}>Results:</h4>
          {results.results.map((result) => (
            <div key={result.optionId} style={{
              background: '#111',
              padding: '20px',
              borderRadius: '16px',
              marginBottom: '18px',
              borderLeft: '4px solid #22d3ee',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#ffffff', fontWeight: '600' }}>{result.text}</span>
                <span style={{ color: '#22d3ee', fontWeight: '600' }}>{result.count} votes ({result.percentage}%)</span>
              </div>
              <div style={{ 
                backgroundColor: '#2a2a35', 
                height: '20px', 
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
                    height: '100%',
                    width: `${result.percentage}%`,
                    borderRadius: '10px',
                    transition: 'width 0.8s ease',
                    boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate(getBackPath())}
          style={{
            width: '100%',
            marginTop: '30px',
            padding: '14px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '50px',
            border: 'none',
            cursor: 'pointer',
            color: '#fff',
            background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
            boxShadow: '0 6px 15px rgba(34, 211, 238, 0.4), 0 0 25px rgba(99, 102, 241, 0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          Back to {JSON.parse(localStorage.getItem('user'))?.role === 'ADMIN' ? 'Dashboard' : 'Polls'}
        </button>
      </div>
    </div>
  )
}

export default PollResults